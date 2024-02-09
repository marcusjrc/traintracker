# Train Tracker Prototype App

![train tracker image](https://i.postimg.cc/FsNkd57G/Screenshot-2024-02-09-at-18-53-10.png)

## Overview

This is train tracker application demo that uses React (Vite), TypeScript, Redux, React-Query & Mapbox.
For styling, Tailwind.css is used.

## Local Setup

1. Nvm is recommended for node version management (https://github.com/nvm-sh/nvm): `nvm use` in root folder. Node version 20.0+ is recommended if you don't use nvm
1. Run `npm i` and then `npm run dev` to initialise the application. Folder structure is straight forwarded, pages can be found under `src/pages`, components under `src/components`

## Testing & Linting

1. ESLint is used for linting and prettier for formatting. Run `npm run lint` for checking lint & formatting errors. Run `npm run lint:fix` to fix lint & formatting errors.
1. For testing, vi-testing is used. React-testing-library is used for component testing. Run via `npm run test`. mswjs is also used for mocking network requests (https://mswjs.io/)
