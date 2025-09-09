FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
        netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Create startup script in a location that won't be overwritten by volume mount
RUN echo '#!/bin/bash\n\
# Wait for database to be ready\n\
echo "Waiting for database..."\n\
while ! nc -z db 5432; do\n\
  sleep 1\n\
done\n\
echo "Database is ready!"\n\
\n\
# Run migrations\n\
python manage.py migrate\n\
\n\
# Create superuser if it doesn'\''t exist\n\
python manage.py create_superuser\n\
\n\
# Check if we'\''re in development or production mode\n\
if [ "$DEBUG" = "True" ]; then\n\
    echo "Starting Django development server..."\n\
    python manage.py runserver 0.0.0.0:8000\n\
else\n\
    echo "Starting Django with Gunicorn..."\n\
    python manage.py collectstatic --noinput\n\
    gunicorn --bind 0.0.0.0:8000 simple_backend.wsgi:application\n\
fi' > /usr/local/bin/start.sh && chmod +x /usr/local/bin/start.sh

# Expose port
EXPOSE 8000

# Run the application
CMD ["/usr/local/bin/start.sh"]
