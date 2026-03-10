# Assignment Status

## Scope Matrix

| Item | Frontend | Backend/Fullstack |
|---|---|---|
| Home Page UI | Yes (close possible) | Yes (not strict figma) |
| Home Page Content | Hardcoded | Should come from BE |
| APIs | NA | Required (design + implement) |
| Auth | Yes (client based) | Yes (BE based) |

## Current State

- Multiple companion cards: Yes (frontend map rendering is already in place).
- Home content from backend: No (still hardcoded in frontend).
- Auth APIs: Implemented (`register`, `login`, `logout`, `refresh-token`, `me`).
- Companion/chat APIs for homepage feed: Pending.

## What Remains

1. Create companion list API in backend.
2. Replace hardcoded companions in frontend with API data.
3. Add create/list chat APIs if required by assignment flow.
4. Improve responsive polish for mobile and tablet.
5. Keep code modular (separate API service layer in frontend).

## Evaluation Checklist

### Frontend
- Completion vs expectation
- Responsive layout quality
- Readable and modular code
- Clear understanding of implemented code

### Backend/Fullstack
- Completion vs expectation
- Readable and modular code
- Scalable API structure
- Well-formulated API design
