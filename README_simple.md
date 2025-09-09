Simple Project

A full-stack web application with Django backend, React frontend, and PostgreSQL database, containerized with Docker. all running with Docker. You don’t need to install Python, Node.js, or PostgreSQL on your computer.

📌 Prerequisites

- Install and run Docker Desktop
- Access to a terminal (Command Prompt / Terminal)
- Note: Make sure Docker Desktop is running (green icon in system tray)

📥 How to Download

**Option 1: Clone with Git (Recommended)**
```bash
git clone git@github.com:realmowhamad/WithMe-Test.git
cd WithMe-Test
```

**Option 2: Download ZIP**
1. Go to: https://github.com/realmowhamad/WithMe-Test
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location
5. Rename the folder to `simple` (optional)

🚀 Quick Start
1️⃣ Start the Project

Open your terminal, go to the project folder, and run:

docker-compose up --build

Note: The first run may take a few minutes because Docker images are downloaded and built.

2️⃣ Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

3️⃣ Admin Login (Development)

A script automatically creates a superuser for the admin panel during the first run. This makes it easy to log in, and it won’t create duplicates on later runs.

Superuser Credentials (Development Only):

Username: adminuser123

Email: a@gmail.com

Password: London2025

Security Note: These credentials are hardcoded and should only be used in development. Production environments will use safer methods.

✅ How to Use

1. Open the frontend in your browser: http://localhost:5173
2. Open the admin panel: http://localhost:8000/admin/
3. Log in with the superuser credentials above
4. Test API endpoints at: http://localhost:8000/api/

That's it! The project will now be running, and you can explore it without any programming knowledge.