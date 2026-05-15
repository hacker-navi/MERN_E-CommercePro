
# NavMall (MERN) — E‑Commerce

NavMall is a full-stack MERN (MongoDB, Express, React, Node) e-commerce example project with user authentication, product management, and order processing. It includes a backend API and a React frontend suitable for local development and learning.

## Features
- User registration and authentication (JWT)
- Product listing, product details, and product management for admins
- Shopping cart, checkout flow, and order history
- Admin dashboard with charts and order management

## Technology Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JSON Web Tokens (`jsonwebtoken`), password hashing (`bcryptjs`)
- Frontend: React, React Router, Axios

## Repository Structure

- `backend/` — Express API server
- `frontend/` — React SPA

See the source folders for controllers, routes, models, and React pages.

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- A MongoDB instance (cloud Atlas or local)

## Environment
Create a `.env` file inside `backend/` with the following variables (do NOT commit secrets):

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Replace `your_mongo_connection_string` and `your_jwt_secret` with secure values.

##Demo Video

https://github.com/user-attachments/assets/458d8a1d-f714-4734-8f51-ecf632f77554

## Backend — Setup & Run

1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Start the server:

```bash
# development with auto-reload
npm run dev

# or production
npm start
```

The API runs on `http://localhost:5000` by default (see `PORT`).

## Frontend — Setup & Run

1. Install dependencies and run the React app:

```bash
cd frontend
npm install
npm start
```

2. The frontend dev server runs on `http://localhost:3000` by default and expects the backend API at `/api/*` endpoints.

## Common API Endpoints (overview)
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate and receive JWT
- `GET /api/products` — list products
- `GET /api/products/:id` — product details
- `POST /api/orders` — create an order (authenticated)
- `GET /api/orders` — list orders (authenticated / admin)

Explore `backend/routes/` for a complete list and request/response shapes.

## Development Notes
- Database connection is handled in `backend/config/db.js` using `process.env.MONGO_URI`.
- Server entry point: `backend/server.js`.
- Frontend API utilities are in `frontend/src/utils/api.jsx`.

## Contributing
Contributions and fixes are welcome — open an issue or submit a pull request.

## License
This project is provided as-is. Add a license file if you intend to reuse or publish it.

---

If you'd like, I can: run tests, add a `contributing.md`, or redact sensitive data from `backend/.env` before you publish this repo.
