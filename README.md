# Simple Full-Stack Project

This project consists of a Django backend with PostgreSQL database and a React frontend, all containerized with Docker.

## Project Structure

```
simple/
├── backend/                 # Django backend
│   ├── simple_backend/     # Django project settings
│   ├── api/                # Django app with REST API
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Unified Docker image
│   ├── env.example         # Environment variables template
│   └── wait-for-it.sh      # Database wait script
├── frontend/               # React frontend
│   ├── src/                # React source code
│   ├── package.json        # Node.js dependencies
│   └── Dockerfile          # Unified Docker image
├── docker-compose.yml      # Unified Docker Compose
├── env.example             # Environment variables template
└── README.md              # This file
```

## Quick Start

### Setup Environment Variables

1. **Copy the environment template:**
   ```bash
   cp env.example .env
   ```

2. **Edit the .env file with your desired configuration:**
   - For development: Keep `DEBUG=True` and `NODE_ENV=development`
   - For production: Set `DEBUG=False` and `NODE_ENV=production`

### Start the Application

1. **Start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the applications:**
   - **Development Mode:**
     - Frontend: http://localhost:5173
     - Backend API: http://localhost:8000/api/
     - Django Admin: http://localhost:8000/admin/
   - **Production Mode:**
     - Frontend: http://localhost:3000
     - Backend API: http://localhost:8000/api/
     - Django Admin: http://localhost:8000/admin/
   - **Database:** localhost:5432

## API Endpoints

- `GET /api/health/` - Health check
- `POST /api/register/` - User registration
- `GET /api/user/` - Get current user info (authenticated)
- `GET /api/profile/` - Get user profile (authenticated)
- `PUT /api/profile/` - Update user profile (authenticated)

## Database

The project uses PostgreSQL as the database. In development, you can access it directly:

- Host: localhost
- Port: 5432
- Database: simple_db
- Username: postgres
- Password: password

## Environment Variables

Copy `env.example` to `.env` in the root directory and customize as needed:

```env
# Database Configuration
POSTGRES_DB=simple_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

# Backend Configuration
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:password@db:5432/simple_db
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
BACKEND_PORT=8000

# Frontend Configuration
NODE_ENV=development
FRONTEND_PORT=3000
FRONTEND_DEV_PORT=5173
VITE_API_URL=http://localhost:8000/api
```

**Key Variables:**
- `DEBUG`: Set to `True` for development, `False` for production
- `NODE_ENV`: Set to `development` for dev mode, `production` for prod mode
- `SECRET_KEY`: Change this to a secure random string in production

## Useful Commands

### Backend Commands

```bash
# Run migrations (inside Docker)
docker-compose exec backend python manage.py migrate

# Create superuser (inside Docker)
docker-compose exec backend python manage.py createsuperuser

# Access Django shell (inside Docker)
docker-compose exec backend python manage.py shell

# Collect static files (inside Docker)
docker-compose exec backend python manage.py collectstatic
```

### Database Commands

```bash
# Access PostgreSQL shell
docker-compose exec db psql -U postgres -d simple_db

# Backup database
docker-compose exec db pg_dump -U postgres simple_db > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres simple_db < backup.sql
```

### Docker Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Rebuild specific service
docker-compose up --build backend
```

## Development

### Backend Development

The Django backend includes:
- Django REST Framework for API endpoints
- PostgreSQL database with psycopg2
- CORS headers for frontend communication
- User authentication and profiles
- Admin interface

### Frontend Development

The React frontend is built with Vite and includes:
- TypeScript support
- Modern React with hooks
- CSS styling
- API integration ready

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 5173, 8000, and 5432 are not in use
2. **Database connection issues**: Wait for the database to be ready before starting the backend
3. **Permission issues**: Make sure Docker has proper permissions on your system
4. **Build failures**: Try rebuilding with `--no-cache` flag: `docker-compose build --no-cache`

## Contributing

1. Make changes to the code
2. Test in development mode: `docker-compose -f docker-compose.dev.yml up --build`
3. Run tests if available
4. Submit pull request
