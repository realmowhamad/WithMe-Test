# Complete Beginner's Guide to Running This Project

This is a **complete step-by-step guide** for someone who has never run a project like this before. Don't worry if you don't understand everything - just follow the steps exactly!

## What This Project Is

This project has two main parts:
- **Backend**: A server that handles data and user accounts (built with Django/Python)
- **Frontend**: A website that users see and interact with (built with React/TypeScript)
- **Database**: Where all the data is stored (PostgreSQL)

Everything runs inside "containers" using Docker, which means you don't need to install Python, Node.js, or PostgreSQL on your computer.

## Prerequisites (What You Need First)

### 1. Install Docker Desktop
- Go to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Download Docker Desktop for your operating system (Windows, Mac, or Linux)
- Install it and make sure it's running (you should see a Docker icon in your system tray)

### 2. Install Git (if you don't have it)
- Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Download and install Git for your operating system

## Step-by-Step Setup Instructions

### Step 1: Get the Project Files
1. Open your terminal/command prompt
2. Navigate to where you want to put this project (like your Desktop)
3. If you have the project files already, skip to Step 2
4. If you need to download the project, use: `git clone [project-url]`
5. Navigate into the project folder: `cd simple`

### Step 2: Set Up Environment Variables
1. In the project folder, you'll see a file called `env.example`
2. **Copy this file** and rename the copy to `.env` (note the dot at the beginning)
   - On Windows: `copy env.example .env`
   - On Mac/Linux: `cp env.example .env`
3. **Don't change anything in the .env file** - the default values will work fine for getting started

### Step 3: Start the Project
1. Make sure Docker Desktop is running
2. In your terminal, make sure you're in the project folder (`simple`)
3. Run this command: `docker-compose up --build`
4. **Wait patiently** - this will take several minutes the first time as it downloads and builds everything

### Step 4: Access the Application
Once everything is running (you'll see logs in your terminal), you can access:

- **Frontend (the website)**: Open your browser and go to `http://localhost:5173`
- **Backend API**: `http://localhost:8000/api/`
- **Admin Panel**: `http://localhost:8000/admin/`

## What Each Part Does

### Frontend (http://localhost:5173)
- This is the main website users will see
- Built with React and TypeScript
- Includes login/register pages and navigation

### Backend API (http://localhost:8000/api/)
- This handles all the data and user management
- Provides endpoints for:
  - User registration
  - User login
  - User profiles
  - Health checks

### Admin Panel (http://localhost:8000/admin/)
- This is where you can manage users and data
- You'll need to create an admin account first (see below)

## Creating an Admin Account

To access the admin panel, you need to create an admin user:

1. Make sure the project is running (`docker-compose up --build`)
2. Open a new terminal window
3. Run this command: `docker-compose exec backend python manage.py createsuperuser`
4. Follow the prompts to create your admin account
5. Now you can log into the admin panel at `http://localhost:8000/admin/`

## Common Commands You'll Need

### Starting the Project
```bash
docker-compose up --build
```

### Stopping the Project
```bash
docker-compose down
```

### Viewing Logs (to see what's happening)
```bash
docker-compose logs -f
```

### Running Database Migrations (if needed)
```bash
docker-compose exec backend python manage.py migrate
```

### Accessing the Database
```bash
docker-compose exec db psql -U postgres -d simple_db
```

## Troubleshooting (When Things Go Wrong)

### Problem: "Port already in use"
**Solution**: Something else is using the ports. Try:
1. Stop the project: `docker-compose down`
2. Wait a few seconds
3. Start again: `docker-compose up --build`

### Problem: "Docker is not running"
**Solution**: 
1. Start Docker Desktop
2. Wait for it to fully start (green icon in system tray)
3. Try running the project again

### Problem: "Permission denied" or "Access denied"
**Solution**: 
1. Make sure Docker Desktop is running
2. On Windows, try running your terminal as Administrator
3. On Mac/Linux, you might need to add your user to the docker group

### Problem: "Build failed" or "Image not found"
**Solution**:
1. Stop everything: `docker-compose down`
2. Remove old images: `docker system prune -a`
3. Start fresh: `docker-compose up --build`

### Problem: Database connection errors
**Solution**:
1. Wait longer - the database takes time to start
2. Check if the database is healthy: `docker-compose ps`
3. Restart just the backend: `docker-compose restart backend`

## Understanding the Project Structure

```
simple/
├── backend/                 # Django backend (Python)
│   ├── api/                # Main application code
│   ├── simple_backend/     # Django settings
│   ├── requirements.txt    # Python packages needed
│   └── Dockerfile          # How to build the backend
├── frontend/               # React frontend (TypeScript)
│   ├── src/                # React source code
│   ├── package.json        # Node.js packages needed
│   └── Dockerfile          # How to build the frontend
├── docker-compose.yml      # Orchestrates all services
├── .env                    # Your configuration (you create this)
└── env.example             # Template for .env file
```

## Development vs Production

### Development Mode (Default)
- Frontend runs on port 5173 with hot reloading
- Backend runs on port 8000 with debug mode
- Changes to code are reflected immediately
- More verbose error messages

### Production Mode
- Frontend runs on port 3000 (optimized build)
- Backend runs on port 8000 (optimized)
- No hot reloading
- Better performance, fewer error details

To switch to production mode, edit your `.env` file:
```
NODE_ENV=production
DEBUG=False
```

## Making Changes to the Code

### Backend Changes
1. Edit files in the `backend/` folder
2. The changes will be reflected automatically (hot reloading)
3. If you add new Python packages, update `requirements.txt`

### Frontend Changes
1. Edit files in the `frontend/src/` folder
2. Changes will be reflected automatically in your browser
3. If you add new Node.js packages, update `package.json`

## Database Information

- **Type**: PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database Name**: simple_db
- **Username**: postgres
- **Password**: password

## API Endpoints

- `GET /api/health/` - Check if the API is working
- `POST /api/register/` - Create a new user account
- `GET /api/user/` - Get current user info (requires login)
- `GET /api/profile/` - Get user profile (requires login)
- `PUT /api/profile/` - Update user profile (requires login)

## Getting Help

If you're still stuck:

1. **Check the logs**: `docker-compose logs -f` to see what's happening
2. **Check if services are running**: `docker-compose ps`
3. **Restart everything**: `docker-compose down && docker-compose up --build`
4. **Check Docker Desktop**: Make sure it's running and has enough resources

## Next Steps

Once you have the project running:

1. Explore the frontend at `http://localhost:5173`
2. Try creating a user account
3. Log into the admin panel at `http://localhost:8000/admin/`
4. Look at the API endpoints at `http://localhost:8000/api/`
5. Read the code to understand how it works
6. Make small changes and see what happens

Remember: It's okay to make mistakes! That's how you learn. If something breaks, just restart the project and try again.

## Useful Resources

- [Docker Documentation](https://docs.docker.com/)
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

Good luck, and don't hesitate to experiment! 🚀