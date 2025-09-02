# Docker Development Environment

This directory contains Docker configuration files for the food order webapp development environment.

## Quick Start

1. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

2. Start all services:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - App: http://localhost:3000
   - Database Admin: http://localhost:8081
   - API Health Check: http://localhost:3000/api/health

## Services

### Next.js Application (app)
- **Port**: 3000
- **Development**: Hot reload enabled
- **Health Check**: Available at `/api/health`

### PostgreSQL Database (postgres)
- **Port**: 5432
- **Database**: foodorder
- **User**: foodorder
- **Password**: password123 (development only)
- **Initialization**: Runs `init-db.sql` on first start

### Redis Cache (redis)
- **Port**: 6379
- **Configuration**: Custom config in `redis.conf`
- **Persistence**: Enabled for development

### Nginx Reverse Proxy (nginx)
- **Port**: 80
- **Features**: Rate limiting, caching, security headers
- **Configuration**: `nginx.conf`

### Adminer (Database Management)
- **Port**: 8081
- **Access**: Connect to `postgres` server with database credentials

## Development Workflow

1. **Start environment**: `docker-compose up`
2. **View logs**: `docker-compose logs -f [service-name]`
3. **Access shell**: `docker-compose exec app sh`
4. **Database access**: `docker-compose exec postgres psql -U foodorder -d foodorder`
5. **Redis CLI**: `docker-compose exec redis redis-cli`

## Troubleshooting

- **Port conflicts**: Stop services using those ports or change port mappings
- **Permission errors**: Ensure Docker has proper file system access
- **Database connection**: Wait for PostgreSQL health check to pass
- **Hot reload not working**: Verify volume mounts are correct

## Production Notes

- Change all default passwords and secrets
- Use environment-specific docker-compose files
- Configure proper SSL certificates
- Set up production logging and monitoring