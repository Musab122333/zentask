# ZenTask - Premium Full Stack Task Manager

A sleek, modern task management application built as a technical assignment. Featuring a premium glassmorphism UI, smooth animations, and a robust Node.js backend.

## 🚀 Features

- **Premium UI**: Glassmorphism design with vibrant gradients and dark mode.
- **Micro-animations**: Smooth transitions using Framer Motion.
- **Full CRUD**: Create, Read, Update (Toggle Status), and Delete tasks.
- **Filtering**: View all, active, or completed tasks.
- **Persistence**: Tasks are saved to a local JSON file (`backend/data/tasks.json`).
- **Responsive**: Designed to look great on all screen sizes.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Lucide React, Framer Motion, Axios.
- **Backend**: Node.js, Express, CORS, Body-parser.
- **Persistence**: File-based JSON storage.

## 📦 Setup Instructions

### 1. Prerequisites
- Node.js installed on your system.

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## 📝 Assumptions & Trade-offs

- **Storage**: Used a simple JSON file for persistence to keep the project setup easy (as per bonus requirements). In a production environment, a database like MongoDB or PostgreSQL would be preferred.
- **Authentication**: Authentication was omitted as per the assignment scope to focus on core functionality and UI/UX.
- **Error Handling**: Basic error handling is implemented for API failures and empty inputs.
- **Design**: Prioritized a "Wow" factor with glassmorphism while keeping the interface intuitive and clean.
