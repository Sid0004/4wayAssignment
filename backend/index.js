import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import connectDB from './src/db/index.js';
import { app } from './app.js';

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is Up || port:  ${process.env.PORT || 8000}`)

        })
        app.on("error", (err) => {
            console.log(`ERROR: ${err}`)
        })
    })
    .catch((err) => {
        console.log("mongodb connection failed !! ", err);
    }
    )