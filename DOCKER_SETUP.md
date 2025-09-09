# راهنمای اجرای پروژه با Docker

## پیش‌نیازها
- Docker
- Docker Compose

## نحوه اجرا

### 1. کلون کردن پروژه
```bash
git clone <repository-url>
cd WithMe-Test
```

### 2. اجرای پروژه
```bash
docker-compose up --build
```

### 3. دسترسی به برنامه
- **Frontend (Development)**: http://localhost:5173
- **Frontend (Production)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

### 4. اطلاعات ورود به Admin Panel
- **Username**: adminuser123
- **Password**: London2025
- **Email**: a@gmail.com

## متوقف کردن پروژه
```bash
docker-compose down
```

## پاک کردن کامل (شامل دیتابیس)
```bash
docker-compose down -v
```

## نکات مهم
- پروژه به صورت خودکار دیتابیس را راه‌اندازی می‌کند
- Migration ها به صورت خودکار اجرا می‌شوند
- Superuser به صورت خودکار ایجاد می‌شود
- نیازی به نصب Python یا Node.js روی سیستم نیست
