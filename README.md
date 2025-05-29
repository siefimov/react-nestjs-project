# Mini Project Management App

A simple project management web application for organizing projects and tasks. Users can create, view, edit, and delete projects and tasks, filter and paginate task lists, and manage access based on user roles. The app features a modern React frontend and a robust NestJS backend with PostgreSQL.

---

## 🛠 Technologies Used

### Frontend

- React 19 (Vite)
- TypeScript
- TanStack Query v5
- React Hook Form
- Zod
- Axios
- SASS (SCSS)
- ESLint

### Backend

- Node.js v22.15.0 or higher
- NestJS v11
- TypeORM
- PostgreSQL v17.5 or higher
- class-validator
- @nestjs/swagger (Swagger API docs)
- ESLint

### DevOps

- Docker & docker-compose
- pnpm v10.10.0 or higher (for both frontend and backend)

---

## ✨ Features

- **Swagger Docs:** API documentation via @nestjs/swagger (available at `/api/docs`)
- **JWT Auth:** User registration, login, and token-based authentication
- **Pagination & Filtering:** Task list supports pagination and filtering by status
- **Role-based Access Control:** Only project owners can delete projects, etc.
- **Docker Setup:** docker-compose for easy local development with Postgres and NestJS

---

## 📁 Backend API Endpoints (examples)

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | /projects      | Get all projects             |
| POST   | /projects      | Create a new project         |
| GET    | /projects/:id  | Get project by ID            |
| DELETE | /projects/:id  | Delete project (owner only)  |
| GET    | /tasks         | Get all tasks (with filters) |
| POST   | /tasks         | Create a new task            |
| GET    | /tasks/:id     | Get task by ID               |
| PUT    | /tasks/:id     | Edit task                    |
| DELETE | /tasks/:id     | Delete task                  |
| POST   | /auth/register | Register a new user          |
| POST   | /auth/login    | Login and get JWT token      |

---

## 🧰 Getting Started Locally

### Prerequisites

- Node.js v22.15.0 or newer
- pnpm v10.10.0 or newer
- PostgreSQL v17.5 or newer

---

### 1. Clone the Repository

```sh
git clone https://github.com/siefimov/react-nestjs-project.git
cd react-nestjs-project
```

### 2. Install Dependencies

**Backend**

```
cd backend
pnpm install
```

**Frontend**

```
cd ../frontend
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory with the following content (edit as needed):

**Database settings for Postgres and backend**

```
POSTGRES_USER=your_name
POSTGRES_PASSWORD=your_password
POSTGRES_DB=db_title

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=your_name
DB_PASSWORD=your_password
DB_DATABASE=db_title
```

**JWT secret for backend**

```
JWT_SECRET=your_jwt_secret
```

**Frontend API URL**

```
VITE_API_URL=http://localhost:3000
```

> **Note:**
>
> - This `.env` file will be used by both Docker Compose and the backend service.
> - **Do not commit your `.env` file to version control!** Add `.env` to your `.gitignore`.

---

### 4. Run Database Migrations

Before running the application, apply database migrations to create all tables:

```sh
cd backend
pnpm migration:run
```

### 5. Seed the Database (optional, for demo data)

To insert demo data (admin user, demo project, demo tasks), run:

```sh
pnpm seed
```

---

### 6. Start PostgreSQL

If running locally (not via Docker), make sure your PostgreSQL server is running and a database named as in your `.env` (`db_title`) exists:

```sh
createdb <your_db_name>
```

### 7. Run the Application

**Backend**

```
cd backend
pnpm start:dev
```

**Frontend**

```
cd ../frontend
pnpm dev
```

## 🐳 Docker Setup (Alternative)

If you prefer, you can run the entire stack using Docker and `docker compose`.

### Prerequisites

- Docker
- docker compose (v2+)

### Steps

1. Create your `.env` file in the **project root** as described above.
2. From the project root, run:

   ```sh
   docker compose up --build
   ```

   This will start PostgreSQL, the NestJS backend, and the React frontend.

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Swagger Docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

3. RUn migration

```sh
cd backend
pnpm migration:run
```

4. To insert demo data (admin user, demo project, demo tasks), run:

```sh
pnpm seed
```

### ⏯️ Starting and Stopping Containers (Next Runs)

- **Start containers (in background):**

  ```sh
  docker compose start
  ```

  or

  ```sh
  docker compose up -d
  ```

- **Stop containers (without removing data/volumes):**

  ```sh
  docker compose stop
  ```

- **Stop and remove containers, networks, etc.:**
  ```sh
  docker compose down
  ```

You can use `docker compose up -d` to start everything in the background, and `docker compose stop` or `docker compose down` to stop the stack when you're done.
