# Hex-to-RGB Integration Testing

A JavaScript colour conversion library and Express REST API with automated unit and integration tests.

## Requirements

- Node.js and npm
- Git for version control
- curl for manual API testing

## Installation

From the project folder, install the dependencies:

```sh
npm ci
```

## Start the API

```sh
npm start
```

The server runs at http://localhost:3000 by default.
Set the PORT environment variable to use a different port.

## Input and Output Specification

The library accepts a string containing exactly six hexadecimal digits,
optionally prefixed with #. Uppercase, lowercase, and mixed-case digits
are accepted.

Examples: #FF0000, 123456, #abcdef.

Three-digit shorthand, alpha channels, whitespace, invalid characters,
and non-string inputs are rejected.

The output is an object with numeric r, g, and b properties.
Each channel ranges from 0 to 255.

Example: #123456 becomes { "r": 18, "g": 52, "b": 86 }.

## REST API

### POST /api/convert

Content-Type: application/json

Request body:

```json
{ "hex": "#123456" }
```

Successful response: HTTP 200

```json
{ "r": 18, "g": 52, "b": 86 }
```

Invalid colour response: HTTP 400

```json
{
  "error": "Hex colour must contain exactly six hexadecimal digits, optionally prefixed with #."
}
```

Missing or non-string hex values return HTTP 400 with:

```json
{ "error": "Hex colour must be a string." }
```

Malformed JSON returns HTTP 400 with:

```json
{ "error": "Request body must contain valid JSON." }
```

Unknown endpoints return HTTP 404.

## Automated Tests

Run all tests:

```sh
npm test
```

Run unit tests only:

```sh
npm run test:unit
```

Run integration tests only:

```sh
npm run test:integration
```

The suite contains 12 unit tests and 11 integration tests.

Unit tests check conversion results, channel boundaries, accepted formats,
and invalid inputs.

Integration tests check HTTP status codes, response bodies, JSON content
types, input validation, malformed JSON, and unknown endpoints.

Supertest uses the exported Express application. A separately running
server is not required for the automated tests.

These tests cover the specified examples and validation cases.
They do not establish exhaustive correctness or measure performance,
security, or behaviour under load.

## Manual API Testing

Start the server in one terminal. In another Windows PowerShell terminal,
run:

```powershell
'{"hex":"#123456"}' | curl.exe -i -X POST "http://localhost:3000/api/convert" -H "Content-Type: application/json" --data-binary '@-'
```

Expected: HTTP 200 and {"r":18,"g":52,"b":86}.

```powershell
'{"hex":"#GG0000"}' | curl.exe -i -X POST "http://localhost:3000/api/convert" -H "Content-Type: application/json" --data-binary '@-'
```

Expected: HTTP 400 and a validation error message.

## Project Files

- src/hexToRgb.js: conversion library
- src/app.js: Express application and API route
- src/server.js: server startup
- tests/hexToRgb.test.mjs: unit tests
- tests/api.test.mjs: integration tests
- package.json: project settings and commands
- package-lock.json: dependency lockfile
- .gitignore: excludes dependencies and generated files

## Verified Results

During local testing, all 23 automated tests passed.
Manual curl requests returned HTTP 200 for #123456 and HTTP 400 for #GG0000.
