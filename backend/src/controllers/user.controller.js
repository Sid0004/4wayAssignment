import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import User from '../models/user.model.js'

const cookieOptions = { httpOnly: true, secure: true }

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (err) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body

    if (!fullName?.trim() || !email?.trim() || !username?.trim() || !password?.trim())
        throw new ApiError(400, "All fields are required")

    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) throw new ApiError(409, "User already exists")

    const user = await User.create({ fullName, email, password, username: username.toLowerCase() })
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(201, { user: createdUser, accessToken }, "User registered successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if (!email && !username) throw new ApiError(400, "Email or username required")

    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (!user) throw new ApiError(404, "User not found")

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken }, "Login successful"))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "user logged out"))

})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user

    return res
        .status(200)
        .json(new ApiResponse(200, user, "current user fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request")

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)


        if (!user) throw new ApiError(401, "invalid refresh token")

        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "wrong refresh token")

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "access token refreshed"))
    }
    catch (err) {
        throw new ApiError(500, err?.message || "invalid refresh token")
    }

})

export { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken }
