# Multi-tenant SaaS

A small multi-tenant SaaS demo that shows how a single backend can serve multiple tenants, each with its own organization, feature flags, and admin experience.

This project includes:

- a Node.js/Express backend
- a super-admin panel for creating organizations
- an organization admin panel for managing feature flags
- a user-facing panel for viewing feature availability per organization

---

## Overview

The app models a simple SaaS platform where:

- super admins create and manage tenant organizations
- organization admins manage feature flags for their own tenant
- end users can view which features are enabled for a selected organization

This is a practical example of tenant-based feature management using one shared backend and separate frontend experiences.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing
- dotenv for environment configuration
- CORS enabled for frontend communication

### Frontends

- React
- Vite
- Tailwind-style utility classes
- Axios for API requests

---

## Project Structure

```text
Multi-tenant-Saas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── frontends/
│   ├── frontend-super-admin/
│   ├── frontend-org-admin/
│   ├── frontend-user/
│   ├── run-all-frontends.js
│   └── package.json
├── README.md
└── LICENSE
```

### Backend modules

- `config/` - database and super-admin config
- `controllers/` - auth, organization, and feature flag logic
- `middleware/` - authentication middleware
- `models/` - MongoDB schemas for users, organizations, and feature flags
- `routes/` - API route definitions

### Frontend apps

- `frontend-super-admin` - create organizations and manage tenants
- `frontend-org-admin` - login/signup as an org admin and manage feature flags
- `frontend-user` - view feature availability by organization

---

## How It Works

### 1. Super admin flow

- The super admin logs in with a secure credential.
- They can create new organizations.
- The created organizations appear in the tenant list.

### 2. Organization admin flow

- An organization admin signs up or logs in.
- They choose an organization during signup.
- They can create, update, toggle, or delete feature flags for their tenant.

### 3. End-user flow

- A user opens the user interface.
- They select an organization.
- The app reads the flags for that organization and shows whether each feature is enabled or disabled.

### 4. Backend flow

- The backend uses MongoDB to store organizations, users, and feature flags.
- JWT is issued on login/signup.
- Protected routes require a valid token.

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

### Example

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/multi-tenant-saas
JWT_SECRET=your_super_secret_key
```

### Variables explained

- `PORT` - the port where the Express server runs
- `MONGODB_URI` - your MongoDB connection string
- `JWT_SECRET` - secret used to sign JWT tokens

> For MongoDB Atlas, use your Atlas connection string instead of the local example.

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd Multi-tenant-Saas
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontends
npm install
```

---

## Running the Project

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on the port defined in `.env`.

### Start all frontend apps

From the `frontends` folder:

```bash
npm run dev
```

This starts the three frontend apps together.

---

## API Highlights

### Authentication

- `POST /api/users/signup`
- `POST /api/users/login`
- `POST /api/users/superlogin`

### Organizations

- `GET /api/org/getOrgs`
- `POST /api/org/createOrg`
- `DELETE /api/org/deleteOrg/:id`

### Feature flags

- `POST /api/flags/createflag`
- `PUT /api/flags/updateflag/:id`
- `DELETE /api/flags/deleteflag/:id`
- `GET /api/flags/getflags/:organizationId`

---

## What This Project Demonstrates

- multi-tenant architecture basics
- role-based access for super admin and organization admin
- isolated feature flag management per organization
- JWT-based authentication
- a shared backend serving multiple distinct frontend experiences

---

## Notes

- The current project is a demo and is intended for learning and assessment purposes.
- Make sure MongoDB is running or your MongoDB Atlas URI is valid before starting the backend.
- The super-admin credentials are configured through environment values in the backend config.
