# 🚀 Team Task Manager (Full Stack)

A full-stack web application to manage projects, assign tasks, and track progress with role-based access control (Admin / Member).

---

## 🌐 Live Demo
Live : https://team-task-backend-silk.vercel.app/  


---

## 📂 GitHub Repositories
Frontend: https://github.com/Rag333/Team-Task-Frontend  
Backend: https://github.com/Rag333/Team-Task-Backend  

---

## ✨ Features
- 🔐 Authentication (Signup/Login with JWT)
- 👥 Role-Based Access (Admin / Member)
- 📁 Project Management
- ✅ Task Assignment & Status Tracking
- 📊 Dashboard with task overview
- ⏰ Overdue task tracking

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Axios
- Bootstrap / CSS

Backend:
- Node.js
- Express.js
- MongoDB

Deployment:
- Vercel (Frontend)
- Railway / Vercel (Backend)

---

## ⚙️ Setup Instructions

### Clone Repositories
git clone https://github.com/Rag333/Team-Task-Frontend  
git clone https://github.com/Rag333/Team-Task-Backend  

---

### Backend Setup
cd Team-Task-Backend  
npm install  

Create `.env` file:
PORT=5000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  

Run:
npm start  

---

### Frontend Setup
cd Team-Task-Frontend  
npm install  
npm run dev  

---

## 🔌 API Endpoints

POST /api/auth/signup → Register user  
POST /api/auth/login → Login  
GET /api/projects → Get projects  
POST /api/tasks → Create task  
PUT /api/tasks/:id → Update task  

---

## 📽 Demo Video
Adding

---

## 👨‍💻 Author
Mahipal Singh  
https://www.linkedin.com/in/mahipalsingh07/

---

## 📄 License
MIT
