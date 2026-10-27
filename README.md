# Cloud-Based Student Management System

A full-stack, cloud-native Student Management System developed for academic submission under the MCA Program at Presidency College (Autonomous), Bangalore. The application utilizes a decoupled 3-tier architecture with full production hosting on Render and Amazon Web Services (AWS RDS).

---

## 🛠️ Tech Stack & Architecture
* **Frontend Tier:** React.js (v18), Tailwind CSS, Axios HTTP Client (Hosted on Render Static Site)
* **Backend Tier:** Python (v3.11), Flask RESTful API, PyMySQL, Gunicorn WSGI Server (Hosted on Render Web Service)
* **Database Tier:** MySQL Engine (v8.0) hosted on Amazon Web Services Relational Database Service (AWS RDS)

---

## 📁 Repository Structure
```text
Student-database-management/
├── backend/
│   ├── app.py                # Flask REST API application & route handlers
│   └── requirements.txt      # Python dependencies (Flask, PyMySQL, Flask-CORS, gunicorn)
├── frontend/
│   ├── public/
│   │   └── index.html        # Main HTML entry point
│   ├── src/
│   │   ├── App.js            # Main React component & state management
│   │   ├── index.js          # React DOM render entry point
│   │   └── index.css         # Global styles & Tailwind CSS directives
│   ├── package.json          # Node dependencies & React build scripts
│   ├── tailwind.config.js    # Tailwind CSS configuration mapping source paths
│   └── postcss.config.js     # PostCSS processor configuration
└── README.md                 # Project documentation


**SQL Database Configuration (AWS RDS)
The platform connects the Python/Flask backend to an enterprise-grade Amazon Web Services Relational Database Service (AWS RDS) MySQL instance using the PyMySQL driver over TCP port 3306.

Security & Isolation
To prevent security leaks, sensitive database parameters are loaded dynamically from server environment variables rather than hardcoded in the repository:

DB_HOST: AWS RDS Endpoint URL

DB_PORT: 3306

DB_USER: Database Master Username

DB_PASSWORD: Database Master Password

DB_NAME: student_db

Database Schema (DDL)
SQL
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    gpa DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_department ON students(department);
CREATE INDEX idx_name ON students(name);
☁️ Cloud Deployment Setup (Render)
The application uses a monorepo continuous integration and deployment pipeline on Render:

Backend Web Service (/backend):

Root Directory: backend

Environment: Python 3.11

Build Command: pip install -r requirements.txt

Start Command: gunicorn app:app

Environment Variables: Injected securely via the Render Environment Dashboard.

Frontend Static Site (/frontend):

Root Directory: frontend

Build Command: npm install && npm run build

Publish Directory: build

Render compiles static React and Tailwind CSS bundles served globally via CDN.

🚀 Live Application Links
Frontend Website: https://student-frontend.onrender.com (Replace with your live frontend URL)

Backend API Endpoint: https://student-database-7xik.onrender.com/api/students (Replace with your live backend API URL)**
