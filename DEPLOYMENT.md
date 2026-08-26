# 🚀 DEPLOYMENT.md — Production Deployment Guide

This guide outlines the production deployment procedure for **Archazor Mountain Resort & Spa** using Docker Compose or VPS server setup.

---

## 1. Server Requirements

- **OS**: Ubuntu 22.04 LTS or Debian 12
- **CPU**: Minimal 2 vCPU
- **RAM**: Minimal 4 GB RAM
- **Storage**: 40 GB SSD
- **Dependencies**: Docker 24+, Docker Compose v2+

---

## 2. Quick Start via Docker Compose

### 1. Clone repository to production server
```bash
git clone https://github.com/oydinoykamolova1-rgb/arccazor.git
cd arccazor
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
nano .env
```
> Make sure to update `POSTGRES_PASSWORD`, `AdminSeed__Password`, and `NEXT_PUBLIC_API_URL`.

### 3. Launch Services
```bash
docker compose up -d --build
```

### 4. Verify Health Status
```bash
docker compose ps
curl http://localhost:5144/health
```

---

## 3. Reverse Proxy & SSL (Nginx + Certbot)

Sample `/etc/nginx/sites-available/archazor.conf`:

```nginx
server {
    server_name archazor.uz www.archazor.uz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    server_name api.archazor.uz;

    location / {
        proxy_pass http://localhost:5144;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Issue SSL certificate via Certbot:
```bash
sudo certbot --nginx -d archazor.uz -d www.archazor.uz -d api.archazor.uz
```

---

## 4. Database Backup & Restore

### Backup
```bash
docker exec -t archazor_postgres pg_dump -U archazor_user archazor_db > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
cat backup_20260826.sql | docker exec -i archazor_postgres psql -U archazor_user -d archazor_db
```
