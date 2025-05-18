# Student Performance Dashboard

A web application for visualizing and analyzing student performance data, built with Node.js, Express, MySQL, and Chart.js.

## Project Structure
ASIA Task Performance/<br>
├── backend/<br>
│   ├── app.js                # Express server setup<br>
│   └── routes/<br>
│       └── grades.js         # API routes for grades and students<br>
├── db/<br>
│   └── db.js                 # MySQL connection pool<br>
├── public/<br>
│   ├── index.html            # Main dashboard HTML<br>
│   ├── main.js               # Chart rendering and frontend logic<br>
│   └── style.css             # Dashboard styles<br>
├── .env                      # Environment variables (DB credentials, port)<br>
├── .hintrc                   # Linter configuration<br>
├── package.json              # Project metadata and scripts<br>
├── package-lock.json         # Dependency lock file<br>
└── node_modules/             # Installed dependencies<br>


## Setup Instructions

### 1. Git Clone Repository

```bash
git clone https://github.com/kayl10913/ASIA-Task-Performance.git
```

### 2. Prerequisites

- Node.js (v16+ recommended)
- MySQL server

### 3. Install Dependencies

```bash
npm init -y
npm install express mysql2 cors
```

### 4. Configure .env
Create a .env file in the root directory and add your MySQL credentials:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_performance
```

### 5. Database Setup

- Create a MySQL database named student_performance.
- Import the provided SQL file to create the necessary tables and populate with sample data.

### 6. Run the Application

```bash
npm run dev
```
The server will run at http://localhost:3000.

### Backend API Overview

- GET /api/grades/average-by-subject — Average grades per subject
- GET /api/grades/grade-distribution — Grade distribution by letter
- GET /api/grades/grades-over-time — Average grades over time
- GET /api/grades/students-per-class — Student count per class
- GET /api/grades/top-students — Top 5 students by average grade
- GET /api/grades/grade-count-per-subject — Grade count per subject and letter
- GET /api/grades/average-grade-per-month — Average grade per month
- GET /api/grades/student-averages-per-month — Student averages per month
- GET /api/grades/total-students — Total number of students
- GET /api/grades/most-students-class — Class with most students
See backend/routes/grades.js for implementation details.

### Authors

- Calingasan, Kyle Matthew D.
- Caringal, Mark Laurence L.
- Patron, Kian Marcus V.