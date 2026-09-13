# help2gether

A web app that helps volunteers coordinate humanitarian aid. People's requests for food, clothes and medicine are collected in one shared database. Volunteers can browse them as a list or on a map, take one on, and mark it done.

**Live demo:** https://help2gether-a15a6.web.app

I built help2gether in the first months of the full-scale war in Ukraine, when many people urgently needed help and volunteers had no single place to see all the requests. It started as my individual internship project at Sigma Software.

## Features

**For everyone (no account needed)**
- Browse all requests as cards or on an interactive map
- Filter by status, urgency and category, and search by city
- Open a request to see its details and location on the map

**For signed-in volunteers**
- See the contact name and phone number for each request
- Add requests. The address is picked from autocomplete suggestions, so every request has a map location
- Edit the requests you created
- **Take** a request, which moves it to *In progress*; **unassign** it, or **mark it completed**
- "Your demands" lists every request you've taken, with its own list and map views
- Sign up and log in with email and password, reset a forgotten password, and edit your profile

**Privacy:** contact names and phone numbers are visible only to signed-in users. Guests read a separate copy of each request that has the contact details removed.

**Permissions:** only a request's creator (or an admin) can edit its details. Any volunteer can take a free request, but only the assigned volunteer can unassign or complete it. Security rules in [`database.rules.json`](database.rules.json) enforce all of this on the database, not just in the UI.

## Tech stack

| Area | Tools |
|---|---|
| Frontend | [Vue 2](https://v2.vuejs.org/), [Vue Router](https://v3.router.vuejs.org/), [Vuex](https://v3.vuex.vuejs.org/) |
| UI | [BootstrapVue](https://bootstrap-vue.org/), [Vue Toastification](https://github.com/Maronato/vue-toastification) |
| Backend | [Firebase Authentication](https://firebase.google.com/docs/auth), [Firebase Realtime Database](https://firebase.google.com/docs/database) |
| Maps | [Leaflet](https://leafletjs.com/) with [vue2-leaflet](https://vue2-leaflet.netlify.app/), [OpenStreetMap](https://www.openstreetmap.org/) tiles |
| Address search | [Photon](https://photon.komoot.io/), limited to addresses in Ukraine |
| Hosting | [Firebase Hosting](https://firebase.google.com/docs/hosting), deployed with GitHub Actions |

## Getting started

### Requirements

- Node.js 22 (the version used in CI) and npm

### Install and run

```bash
git clone https://github.com/viravelmozhna/help2gether.git
cd help2gether
npm ci
npm run serve
```

The app runs at http://localhost:8080.

The project includes an `.npmrc` with `legacy-peer-deps=true`. It works around a peer dependency conflict between the ESLint packages, so plain `npm ci` works.

### Firebase configuration

The Firebase web config is in [`src/firebase.js`](src/firebase.js), and the app connects to the `help2gether-a15a6` project out of the box. To run it against your own Firebase project:

1. Create a Firebase project and enable **Authentication → Email/Password** and **Realtime Database**.
2. Replace the config object in `src/firebase.js` with your project's web app config.
3. Change the project ID in `.firebaserc`.
4. Deploy the security rules:
   ```bash
   firebase deploy --only database
   ```
5. Optionally, make your account an admin (see [Data model](#data-model)).

## Scripts

| Command | What it does |
|---|---|
| `npm run serve` | Starts the dev server with hot reload |
| `npm run build` | Builds for production into `dist/` |
| `npm run lint` | Lints and fixes files with ESLint |

## Project structure

```
src/
├── views/              # Top-level pages: demands, login, user, reset password, 404
├── components/
│   ├── demands/        # Request cards, list and map views, details, add/edit form
│   ├── filters/        # Filter checkboxes, city search, active filter chips
│   ├── map/            # Leaflet map, markers, popups, address autocomplete
│   ├── user/           # Sign-up, profile and profile edit forms
│   └── common/         # Navbar, modal, back button
├── router/             # Routes and the auth guard
├── store/              # Vuex store: user, requests, filters
├── utils/              # Filtering, public-copy sync, profile setup, helpers
├── env/constants.js    # Filter options, auth error messages, map defaults
└── firebase.js         # Firebase app and auth setup
database.rules.json     # Realtime Database security rules
```

### Data model

The Realtime Database has four top-level nodes:

| Node | Contents | Who can read |
|---|---|---|
| `demands` | Full requests, including contact name and phone, and `createdBy` (the creator's uid) | Signed-in users |
| `publicDemands` | Copies of requests without contact details | Everyone |
| `users/{uid}` | Name, phone and email | Signed-in users |
| `admins/{uid}` | `true` for admin accounts | Only that user |

Admins can edit any request, including old ones created before `createdBy` existed. The app can't change the `admins` node, so add an admin from the Firebase console or CLI:

```bash
firebase database:set /admins/<uid> --data true
```

Every change to a request (create, edit, take, unassign, complete) also updates its public copy.

## Deployment

The site is hosted on Firebase Hosting (project `help2gether-a15a6`).

- **Every push to `main`** builds the app and deploys it to the live site ([workflow](.github/workflows/firebase-hosting-merge.yml)).
- **Every pull request** gets a temporary preview link, posted as a comment on the PR ([workflow](.github/workflows/firebase-hosting-pull-request.yml)).

GitHub Actions deploys only the website. After changing `database.rules.json`, deploy the rules yourself:

```bash
firebase deploy --only database
```

## My role

I built this project on my own. My work covered:

- The concept and UI sketches
- App structure with Vue Router and Vuex state management
- Components styled with BootstrapVue
- Firebase Authentication: sign-up, login, password reset and protected routes
- Realtime Database: reading, adding and updating requests, plus security rules
- The guest mode that hides contact details
- The map view with Leaflet and OpenStreetMap, and address autocomplete with Photon
- CI/CD with GitHub Actions and Firebase Hosting
