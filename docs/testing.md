# Testing

The repository has separate client and server tests plus root convenience scripts.

## Root Commands

Run all tests:

```powershell
npm test
```

Run the build and all tests:

```powershell
npm run ci
```

## Client Tests

```powershell
npm run test:client
```

Client tests run with Vitest and React Testing Library. They cover UI behavior such as:

- catalog loading
- search
- sidebar filters
- manual search
- manual expand/collapse
- video modal controls
- mobile sidebar behavior

Client test setup lives in:

```text
client/src/setupTests.js
client/src/App.test.jsx
```

## Server Tests

```powershell
npm run test:server
```

Server tests run with Mocha and Supertest. They cover:

- `/health`
- `/catalog`
- `/video`
- `/thumbnail`
- 404 behavior for missing media
- CORS access from the dev client

Server tests live in:

```text
server/test
```

## Build Verification

```powershell
npm run build
```

This verifies the Vite client can compile for production.

## Future Browser Smoke Tests

Add browser-level tests for the highest-value user flows:

- app loads and renders catalog cards
- search filters videos
- category filters update results
- manual search expands matching groups
- video modal opens, traps focus, and closes with Escape
- mobile sidebar opens and closes as a drawer

Browser tests should run against the app through `npm run dev` or against a production preview once Express serves the built client.
