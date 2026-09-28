# MindSense

MindSense is a React frontend and Express/MongoDB backend for a student wellbeing dashboard prototype. The frontend contains landing, platform, analytics, alerts, privacy, contact, login, and admin views. The current API provides item CRUD endpoints.

> **Prototype notice:** Login is currently a client-side demo flow; it does not verify credentials or protect routes. The seeded users are sample data. Do not use this deployment for real accounts, student records, or sensitive wellbeing data without implementing and reviewing production authentication, authorization, and privacy controls.

## Project Layout

```text
MindSense-main/
├── README.md                     Project setup and deployment guide
├── package.json                  Workspace scripts
├── package-lock.json             Root npm lockfile
├── vercel.json                   Vercel frontend build and SPA rewrite
├── backend/                      Express API and MongoDB integration
│   ├── .env.example              Backend environment variable template
│   ├── package.json              Backend scripts and dependencies
│   ├── server.js                 Express app and HTTP server startup
│   ├── start-api.bat             Windows API startup helper
│   ├── config/
│   │   └── db.js                 MongoDB connection setup
│   ├── controllers/
│   │   └── itemController.js     Item CRUD request handlers
│   ├── middleware/
│   │   └── errorHandler.js       API error and not-found handlers
│   ├── models/
│   │   ├── Item.js               Mongoose item model
│   │   └── User.js               Mongoose user model
│   ├── routes/
│   │   └── itemRoutes.js         Item API route definitions
│   └── seeds/
│       └── seedUsers.js          Sample user database seeder
└── mindsense/                    React frontend (Create React App)
  ├── .env.example              Frontend API URL template
  ├── package.json              Frontend scripts and dependencies
  ├── vercel.json               Frontend SPA rewrite
  ├── public/
  │   └── index.html            HTML document shell
  └── src/
    ├── App.jsx               Page switching and app shell
    ├── index.js              React entry point
    ├── index.css             Global styles and design tokens
    ├── api/
    │   └── itemsApi.js       Frontend API client for items
    ├── components/
    │   ├── Footer.jsx        Shared footer
    │   ├── Navbar.jsx        Shared navigation
    │   └── UI.jsx            Shared UI elements and effects
    └── pages/
      ├── AdminPage.jsx     Admin overview
      ├── AIEnginePage.jsx  AI pipeline overview
      ├── AlertsPage.jsx    Alerts view
      ├── ContactPage.jsx   Contact view
      ├── DashboardPage.jsx Analytics dashboard
      ├── HomePage.jsx      Landing page
      ├── LoginPage.jsx     Demo login flow
      ├── PlatformPage.jsx  Student platform view
      └── PrivacyPage.jsx   Privacy information
```

Dependency folders such as `node_modules/`, generated output such as `mindsense/build/`, and private `.env` files are intentionally not listed.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB locally, or a MongoDB Atlas database

## Run Locally

Install frontend and backend dependencies from the repository root:

```bash
npm install --prefix mindsense
npm install --prefix backend
```

Configure the backend environment. From the `backend` directory, copy `.env.example` to `.env` and set `MONGODB_URI` to your local or Atlas connection string. Keep `.env` private and never commit it.

Start the API in one terminal:

```bash
cd backend
npm start
```

Start the frontend in another terminal:

```bash
cd mindsense
npm start
```

Open <http://localhost:3000>. The API health endpoint is <http://localhost:5000/health>.

To populate MongoDB with sample users, run `npm run seed` from `backend`. The seed script contains fixed demo passwords; do not use them for real accounts.

## Environment Variables

### Backend

Set these in `backend/.env` for local development or in the backend host's environment settings for deployment:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string; required |
| `PORT` | Local API port; defaults to `5000`. The hosting provider supplies this in production. |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated if needed |

See [backend/.env.example](backend/.env.example). For Atlas, create a database user and use its connection string. URL-encode special characters in the password. Configure Atlas Network Access to permit connections from the backend host.

### Frontend

Set `REACT_APP_API_BASE_URL` to the API origin, with no `/api/items` suffix. For local development, use `http://localhost:5000`. For deployment, use the public backend URL, such as `https://your-api.onrender.com`.

Create `mindsense/.env.local` for local overrides. For a hosted build, set this variable in the frontend provider's environment settings and rebuild. Create React App embeds `REACT_APP_*` variables at build time.

## API

The backend runs on port `5000` by default:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Health check |
| `GET` | `/api/items` | List items |
| `POST` | `/api/items` | Create an item |
| `GET` | `/api/items/:id` | Get one item |
| `PUT` | `/api/items/:id` | Update an item |
| `DELETE` | `/api/items/:id` | Delete an item |

## Production Build

From the repository root:

```bash
npm run build
```

The static frontend output is written to `mindsense/build`.

## Free-Tier Deployment

For this repository, a straightforward free-tier setup is **Vercel for the frontend, Render for the Express API, and MongoDB Atlas Free for the database**. Free plans have resource and availability limits; this setup is suitable for demos and prototypes, not production workloads.

### 1. Create the MongoDB database

Create an Atlas free cluster, create a database user, and copy the application connection string. Set the database user's password in the URI (URL-encode special characters). Configure Network Access to allow the API host to connect. Store the URI as a secret; do not put it in frontend variables or commit it.

### 2. Deploy the backend to Render

Create a Render **Web Service** connected to the repository:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI`: Atlas connection string
  - `CORS_ORIGIN`: deployed frontend origin, for example `https://your-app.vercel.app`

Render supplies `PORT` automatically. After deployment, verify `https://your-api.onrender.com/health` returns `{"ok":true}`. Free Render web services spin down after inactivity, so the first request after a quiet period can take about a minute.

### 3. Deploy the frontend to Vercel

Import the same repository into Vercel and use the **repository root** as the Root Directory. The root [vercel.json](vercel.json) configures the frontend build:

- Install command: `npm install --prefix mindsense`
- Build command: `npm run build --prefix mindsense`
- Output directory: `mindsense/build`

Add `REACT_APP_API_BASE_URL` in the Vercel project settings and set it to the deployed Render API origin, for example `https://your-api.onrender.com`. Redeploy after adding or changing it. The frontend rewrite is configured for client-side page navigation.

### 4. Verify the deployment

- Open the Vercel site and refresh a page after navigating within the app.
- Open the Render `/health` URL and confirm it responds successfully.
- Test the dashboard's item operations and check browser developer tools for failed API requests or CORS errors.
- Confirm the Render `CORS_ORIGIN` exactly matches the Vercel production origin.

See current provider limits before relying on free hosting: [Vercel Hobby](https://vercel.com/pricing), [Render free services](https://render.com/docs/free), and [Atlas free cluster limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/).