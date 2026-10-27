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
