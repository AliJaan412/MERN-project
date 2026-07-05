# MERN Project — User CRUD API

A backend REST API for user CRUD operations with JWT authentication,
built on Express and Sequelize (PostgreSQL). It also models relational
data between users, addresses, roles, and courses.

## Tech stack

- Node.js / Express
- PostgreSQL via Sequelize
- JWT (`jsonwebtoken`) for authentication, delivered as an `httpOnly` cookie
- `joi` for request validation
- `bcryptjs` for password hashing
- `swagger-jsdoc` / `swagger-ui-express` for interactive API docs

## Project structure

```
app.js                    Express app setup and error handling
bin/
  www                     HTTP server bootstrap
  dbConnection.js         Sequelize instance, connects and syncs on boot
controller/                Request/response handling, input validation
service/                   Business logic
repository/                 Data-access layer (talks to Sequelize models)
models/
  index.js                Aggregates model definitions and their associations
  definitions/             Sequelize model definitions (User, Address, Role, Course, UserCourse)
routes/                     Express routers
middleware.js               JWT auth middleware
```

Request flow: `routes` → `controller` (validation) → `service` (business logic)
→ `repository` (data access) → `models` (Sequelize schema).

## Data model

- `User` belongs to one `Address` (1-to-1) and one `Role` (many-to-1).
- `User` and `Course` are many-to-many via `UserCourse`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values:
   ```bash
   cp .env.example .env
   ```
3. Start a local PostgreSQL instance and make sure the database named in
   `DB_NAME` exists. Tables are created/updated automatically on startup
   via `sequelize.sync()`.
4. Run the app:
   ```bash
   npm run dev   # nodemon, auto-restarts on change
   npm start     # plain node
   ```

The server listens on `PORT` (defaults to `3000`). Interactive API docs
(Swagger UI) are served at `/api-docs`.

## Environment variables

| Variable      | Description                              |
|---------------|-------------------------------------------|
| `PORT`        | HTTP port the server listens on            |
| `SECRET`      | Secret used to sign/verify JWTs            |
| `DB_HOST`     | PostgreSQL host                            |
| `DB_PORT`     | PostgreSQL port                            |
| `DB_USERNAME` | PostgreSQL username                        |
| `DB_PASSWORD` | PostgreSQL password                        |
| `DB_NAME`     | PostgreSQL database name                   |
| `DB_DIALECT`  | Sequelize dialect (`postgres`)             |

## API reference

All responses are JSON in the shape `{ "response": ... }` on success or
`{ "error": "..." }` on failure, with a matching HTTP status code.

### Auth (`/auth`)

| Method | Path       | Auth | Body                              | Description                          |
|--------|------------|------|------------------------------------|---------------------------------------|
| POST   | `/login`   | No   | `{ "userName", "password" }`       | Logs in, sets a `Session` JWT cookie |
| POST   | `/logout`  | No   | —                                   | Clears the `Session` cookie          |

### Users (`/user`)

| Method | Path | Auth | Body                          | Description                                  |
|--------|------|------|--------------------------------|------------------------------------------------|
| POST   | `/`  | No   | `{ "userName", "password" }`   | Registers a new user                           |
| GET    | `/`  | Yes  | —                               | Lists all users (password excluded)            |
| PUT    | `/`  | Yes  | `{ "userName" }`                | Updates the authenticated user's own profile   |
| DELETE | `/`  | Yes  | —                               | Deletes the authenticated user's own account   |

Endpoints marked "Auth: Yes" require a valid `Session` cookie obtained
from `POST /auth/login`. `PUT`/`DELETE` operate on the user identified
by the JWT, not a client-supplied ID.

### Example: register + login

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"userName": "jane.doe", "password": "s3cret-pass"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"userName": "jane.doe", "password": "s3cret-pass"}'
```
