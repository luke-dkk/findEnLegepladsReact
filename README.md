# FindEnLegePlads

FindEnLegePlads is a small React web app for finding and viewing playgrounds. It provides a searchable list of playgrounds, map views, and basic user profile features (login, register, manage children, check-in/out).

Deployed demo: https://legeplads.team-ice.dk/

## Purpose

The project helps parents and guardians discover nearby playgrounds and manage visits. It includes features for authentication, viewing playground details, and tracking children checked in at a playground.

## Features

- Browse playgrounds in a list and on a map
- View playground details and child-friendly information
- User authentication (register / login)
- Manage user profile and children
- Check in / check out children

## Tech stack

- Frontend: React (Vite)
- Routing: react-router
- Styling: CSS files per component
- API calls are centralized in `apiReader.js`.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

The main app entry point is `src/main.jsx` and routes are defined in `src/App.jsx`.

## Project structure (high level)

- `src/` — application source
	- `components/` — React components grouped by feature
	- `Api/` — API facade for backend requests
	- `assets/` — static assets
	- `index.css` / `App.css` — global styles

## Deployment

The site can be built with `npm run build` and the `dist/` output deployed to any static hosting service. A copy of the site is currently deployed at the demo link above.

## Contributing

If you'd like help translating more UI text to English or improving accessibility, tell me which components to update (for example `src/components/profile/child/ChildList.jsx`).

## License

Please check the repository owner for licensing details.

