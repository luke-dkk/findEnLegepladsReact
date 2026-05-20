# Agent Guide for findenlegeplads

## Purpose
This file helps AI coding agents understand the repository and make theme-related changes without guessing the project conventions.

## Project overview
- React application built with Vite.
- Uses `react`, `react-dom`, `react-router`, and a minimal starter template.
- Main app entry: `src/main.jsx`.
- Routes/outlet rendering from `src/App.jsx`.
- API access is centralized in `src/Api/ApiFacade.js`.
- UI components live under `src/components/`, including `PlaygroundList`, `Login`, `Register`, and `playground/Playground.jsx`.

## Build and CLI commands
- `npm install` to install dependencies.
- `npm run dev` to start the Vite development server.
- `npm run build` to produce a production build.
- `npm run lint` to run ESLint over the repository.

## Theme and styling guidance
- The repository uses CSS custom properties for colors and theming in `src/index.css`.
- Dark mode is already supported with `@media (prefers-color-scheme: dark)` in `src/index.css`.
- Preferred theme changes should be made by updating CSS variables in `src/index.css` or by introducing a root-level theme class/attribute, not by scattering inline styling in components.
- There is no dedicated React theme provider yet; theme state is currently handled purely through CSS.
- Key variables to preserve or extend:
  - `--text`
  - `--text-h`
  - `--bg`
  - `--border`
  - `--code-bg`
  - `--accent`
  - `--accent-bg`
  - `--accent-border`
  - `--social-bg`
  - `--shadow`
- If a theme switcher is added, toggle a root attribute or class such as `data-theme` on `document.documentElement` and define corresponding variable overrides in CSS.

## Component responsibilities
- `src/App.jsx`: loads playground data and renders the `PlaygroundList` plus route outlet.
- `src/components/PlaygroundList.jsx`: displays a list of playgrounds.
- `src/components/playground/Playground.jsx`: shows details for a single playground.
- `src/components/login/Login.jsx` and `src/components/register/Register.jsx`: UI for authentication flows.
- Component-specific styles are located alongside the component files as `.css` files.

## Notes for theme work
- Keep theme logic separate from data fetching and routing.
- Prefer consistent visual styles across the app by updating shared CSS variables rather than component-specific hard-coded colors.
- When updating the theme, make sure both light and dark modes remain coherent and accessible.

## Links
- [README](./README.md)
