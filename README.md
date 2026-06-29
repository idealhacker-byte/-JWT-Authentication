# JWT Authentication App

A full-stack authentication system using Express.js (backend) and React (frontend) with JSON Web Tokens (JWT).

## Project Structure

```
jwt-auth/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       └── App.css
└── README.md
```

## Features

### Backend (Express.js)
- **POST /register** — Accepts `username` and `password`, stores user data in an in-memory array
- **POST /login** — Validates credentials and returns a signed JWT on success
- **GET /protected** — Protected route; requires a valid JWT in the `Authorization: Bearer <token>` header

### Frontend (React)
- Registration form for new users
- Login form that stores the JWT in `localStorage` upon success
- Protected route page that reads the JWT from `localStorage` and sends it to the backend

## Setup & Running

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

Server runs on: `http://localhost:5000`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on: `http://localhost:3000`

## How It Works

1. **Register** a new user at `/register` — enter a username and password
2. **Login** with your credentials at `/login` — a JWT is returned and saved in `localStorage`
3. **Access the protected route** — the stored JWT is sent in the request header; the server verifies it and returns a welcome message

## API Reference

| Method | Route        | Auth Required | Description                        |
|--------|--------------|---------------|------------------------------------|
| POST   | /register    | No            | Register a new user                |
| POST   | /login       | No            | Login and receive a JWT            |
| GET    | /protected   | Yes (Bearer)  | Access protected content           |

## Technologies Used

- **Backend:** Node.js, Express.js, jsonwebtoken, cors
- **Frontend:** React 18, Vite, CSS3
