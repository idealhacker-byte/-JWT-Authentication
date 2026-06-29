# 🔐 JWT Authentication App

A full-stack authentication system built with **Express.js** and **React.js** 
using **JSON Web Tokens (JWT)** for secure user authentication.

## 🚀 Features
- ✅ User Registration with password hashing (bcrypt)
- ✅ User Login with JWT token generation
- ✅ Protected route accessible only with valid JWT
- ✅ Token stored in localStorage on frontend
- ✅ Clean and responsive React UI

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, JWT, bcryptjs, CORS
- **Frontend:** React.js, Fetch API, localStorage

## 📁 Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /register | Register new user |
| POST | /login | Login & get JWT token |
| GET | /protected | Protected (JWT required) |

## ⚡ Run Locally
# Backend
cd backend && npm install && node server.js

# Frontend  
cd frontend && npm install && npm start
