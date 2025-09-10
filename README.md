# Simple Project

A full-stack web application with Django backend, React frontend, and PostgreSQL database, containerized with Docker.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Useful Commands](#useful-commands)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Resources](#resources)

## 🚀 Project Overview

This project consists of three main components:

- **Backend**: Django/Python API server handling data and user accounts
- **Frontend**: React/TypeScript user interface
- **Database**: PostgreSQL for data storage

The entire project runs using Docker, eliminating the need to install Python, Node.js, or PostgreSQL locally.

## 📋 Prerequisites

Before starting, ensure you have:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/downloads) (if not already installed)

> **Note**: Make sure Docker Desktop is running (green icon in system tray)

### 📥 Download Options

If you haven't downloaded the project files yet or want to download directly from GitHub:

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
5. Rename the extracted folder to `simple` (optional)

## 🏃‍♂️ Quick Start

### 1. Start the Project

Open your terminal and run the following command:

```bash
docker-compose up --build
```

> **Note**: Make sure Docker Desktop is running (green icon in system tray)  
> **Note**: First run may take several minutes to download and build images.

### 2. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/



Follow the prompts and log in at `/admin/`.

## 🔐 Admin Panel Access

After running the project on Docker, the admin panel is accessible at:
**http://localhost:8000/admin**

### Development Superuser (Auto-Created)

During development, a script has been implemented that automatically creates a superuser for easy access to the admin panel on first run. In subsequent runs, this process automatically stops to prevent duplicate user creation.

**Development Admin Credentials:**
- **Username**: `adminuser123`
- **Email**: `a@gmail.com`
- **Password**: `London2025`

### Security Notes

- The superuser login credentials are hardcoded in the management command
- This method is used exclusively for development and testing environments
- In Production environments, we will use more secure methods (such as environment variables)
## 📁 Project Structure

```
simple/
├── backend/                 # Django backend
│   ├── api/                # Main app code
│   ├── simple_backend/     # Django settings
│   ├── requirements.txt    # Python packages
│   └── Dockerfile
├── frontend/               # React frontend
│   ├── src/                # Source code
│   ├── package.json        # Node packages
│   └── Dockerfile
├── docker-compose.yml      # All services
├── .env                    # Config (you create)
└── env.example             # Template
```

## 🔌 API Endpoints

> **Note**: For easier access and development, all authentication requirements have been removed from API endpoints. All endpoints are publicly accessible without login.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health/` | Check API status |
| `POST` | `/api/register/` | Create new user |
| `GET` | `/api/user/` | Get current user  |
| `GET` | `/api/profile/` | Get user profile  |
| `PUT` | `/api/profile/` | Update user profile  |

## 🛠️ Useful Commands

| Command | Description |
|---------|-------------|
| `docker-compose up --build` | Start the project |
| `docker-compose down` | Stop the project |
| `docker-compose logs -f` | View logs |
| `docker-compose exec backend python manage.py migrate` | Run database migrations |
| `docker-compose exec db psql -U postgres -d simple_db` | Access database |

## 🧪 Testing

This project includes comprehensive tests for both backend and frontend components. All tests can be run using Docker containers.

### Backend Tests

The backend includes Django tests for models and functionality:

#### Available Test Files:
- `test_profile.py` - Tests for Profile model functionality
- `test_superuser.py` - Tests for superuser creation command

#### Running Backend Tests:

**Run all Django tests:**
```bash
docker-compose exec backend python manage.py test
```

**Run specific test file:**
```bash
# Test Profile model
docker-compose exec backend python manage.py test api.tests.test_models

# Test superuser creation
docker-compose exec backend python test_superuser.py
```

**Run tests with verbose output:**
```bash
docker-compose exec backend python manage.py test --verbosity=2
```

### Frontend Tests

The frontend uses Vitest for testing React components:

#### Available Test Files:
- `Register.test.tsx` - Tests for Register component

#### Running Frontend Tests:

**Run all frontend tests:**
```bash
docker-compose exec frontend npm test
```

**Run tests in watch mode (for development):**
```bash
docker-compose exec frontend npm test -- --watch
```

**Run tests with UI interface:**
```bash
docker-compose exec frontend npm run test:ui
```

**Run tests with coverage report:**
```bash
docker-compose exec frontend npm test -- --coverage
```

### Running All Tests

**Run both backend and frontend tests:**
```bash
# Backend tests
docker-compose exec backend python manage.py test

# Frontend tests  
docker-compose exec frontend npm test
```

### Test Commands Summary

| Command | Description |
|---------|-------------|
| `docker-compose exec backend python manage.py test` | Run all Django tests |
| `docker-compose exec backend python test_superuser.py` | Test superuser creation |
| `docker-compose exec frontend npm test` | Run all frontend tests |
| `docker-compose exec frontend npm test -- --watch` | Run tests in watch mode |
| `docker-compose exec frontend npm run test:ui` | Open test UI interface |
| `docker-compose exec frontend npm test -- --coverage` | Run tests with coverage |

### Test Environment Notes

- All tests run in isolated Docker containers
- Backend tests use the same database as the main application
- Frontend tests use Vitest with jsdom environment
- Tests are automatically discovered based on naming conventions:
  - Backend: Files named `test_*.py` or `*_test.py`
  - Frontend: Files named `*.test.tsx` or `*.test.ts`

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `docker-compose down`, wait, then `docker-compose up --build` |
| Docker not running | Start Docker Desktop |
| Permission denied | Run terminal as Admin (Windows) or check docker group (Mac/Linux) |
| Build failed / Image not found | `docker system prune -a` and restart |
| Database connection errors | Wait, check `docker-compose ps`, restart backend |

## 💻 Development

### For Interviewers/Developers

1. Explore the frontend at http://localhost:5173
2. Try registering and logging in
3. Log into the admin panel
4. Check API endpoints
5. Review backend and frontend code

### Hot Reloading

The project supports hot reloading, so changes appear immediately during development.

## 📚 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)