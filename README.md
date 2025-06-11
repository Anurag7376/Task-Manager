# 📝 Task Manager App (MERN Stack)

A full-stack Task Manager application built with the **MERN stack (MongoDB, Express, React, Node.js)**. This app allows users to register, log in, and manage tasks with priorities and statuses. Designed to be fast, responsive, and secure.

---

## 🚀 Features

- ✅ **User Authentication** (JWT-based secure login/signup)
- ✅ **Create, Read, Update, Delete (CRUD) Tasks**
- ✅ **Task Prioritization** (High, Medium, Low)
- ✅ **Task Status Tracking** (Pending, Incomplete, Completed)
- ✅ **Responsive Design** (Mobile & Desktop friendly using TailwindCSS)
- ✅ **RESTful API** structure
- ✅ **Cross-Browser Compatibility**
- ✅ **Robust Security**:
  - Input validation
  - Encrypted passwords with bcrypt
  - Secure API routes with JWT
- ✅ **Frontend Routing using Axios & React Router**
- ✅ **Modern UI/UX** using TailwindCSS

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js
- TailwindCSS
- Axios
- React Router DOM
- Notistack (for notifications)

### 🌐 Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)
- dotenv (environment variables)

---

## 📂 Folder Structure
root/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
├── server/ # Node/Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js




# Backend Setup
cd Backend
npm run dev


# Frontend Setup
cd Frontend
npm run dev
