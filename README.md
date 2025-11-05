# 📄 DocAI – Intelligent Document Management Portal

Welcome to **DocAI**, an intelligent document management system where users can securely upload, manage, and interact with their documents using AI-powered question answering.

---

## 🌟 Features

- 🔐 User Authentication (JWT-based)  
- 📤 Upload, update, and delete PDF documents  
- 🧠 Ask questions about your documents using AI  
- 🗂️ Organized dashboard for document management  
- 🎨 Clean, responsive UI built with React and Tailwind CSS  

---

## 🛠 Tech Stack

### 🔹 Frontend
- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- Hosted on **Vercel**

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) (via Mongoose)
- JWT Authentication (`jsonwebtoken`)
- [Multer](https://github.com/expressjs/multer) for file uploads
- Hosted on **Render.com**
- Repository: [https://github.com/yogeshm01/docai-backend](https://github.com/yogeshm01/docai-backend)

### 🔹 AI Integration
- [Gemini API (Google AI)](https://ai.google.dev/) or an alternative LLM model  
- Text extraction from PDFs using built-in parsing (OCR supported if needed)

---

## ⚙️ How to Run Locally

### 🔹 Backend (Node.js + Express)

```bash
git clone https://github.com/yogeshm01/docai-backend.git
cd docai-backend
npm install
npm run dev


### 🔹 Frontend (React)

```bash
git clone https://github.com/YOUR_USERNAME/docai-portal.git
cd docai-portal/frontend
npm install
npm start
```

### 🌐 Hosting Links

- Frontend: [https://sabapplier-frontend.vercel.app/](https://sabapplier-frontend.vercel.app/)
- Backend: [https://docai-backend-nnvs.onrender.com](https://docai-backend-nnvs.onrender.com)

## 📸 Screenshots

### 🔐 Login Page
![Login Page]((https://postimg.cc/s1NPWzmF))

### 🧠 Home Page
![AI Question](https://postimg.cc/bGYct1Yw)

### 📁 Dashboard
![Dashboard](https://postimg.cc/6yKHqtp9)

### 👨‍💻 Developer
- Made with ❤️ by [Yogesh Mishra](https://github.com/yogeshm01)

