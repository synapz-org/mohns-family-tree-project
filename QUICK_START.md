# 🚀 Quick Start Guide

Get the Mohns Family Tree Management System up and running in minutes!

## Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher
- **Docker** and **Docker Compose** (optional but recommended)
- **Git**

## 🏃‍♂️ Quick Setup

### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd family-tree-manager
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

That's it! The setup script will:
- ✅ Check system requirements
- ✅ Install all dependencies
- ✅ Set up environment variables
- ✅ Start database services (if Docker is available)
- ✅ Run database migrations and seeding
- ✅ Build the applications

### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Set up environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start database services**
   ```bash
   docker-compose up -d postgres redis
   ```

4. **Run database setup**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## 🌐 Access the Application

Once running, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api-docs
- **Health Check**: http://localhost:8000/health

### Additional Services (with Docker)

- **MinIO Console**: http://localhost:9001 (file storage)
- **MailHog**: http://localhost:8025 (email testing)
- **Elasticsearch**: http://localhost:9200 (search)
- **Kibana**: http://localhost:5601 (search management)

## 👥 Default Users

The system comes with sample data including:

### Admin User
- **Email**: admin@mohns.com
- **Password**: admin123
- **Role**: Admin

### Branch Representative
- **Email**: representative@mohns.com
- **Password**: rep123
- **Role**: Branch Representative

### Family Member
- **Email**: member@mohns.com
- **Password**: member123
- **Role**: Family Member

## 🛠️ Development Commands

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run test         # Run tests
```

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run start        # Start production server
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run test         # Run tests
```

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build both applications
npm run test         # Run all tests
npm run lint         # Run all linters
```

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=family_tree_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=family-tree-uploads

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Docker Services

Start specific services:

```bash
# Start only database services
docker-compose up -d postgres redis

# Start with file storage
docker-compose up -d postgres redis minio

# Start with email testing
docker-compose up -d postgres redis mailhog

# Start with search
docker-compose up -d postgres redis elasticsearch kibana

# Start everything
docker-compose up -d
```

## 🧪 Testing

### Run Tests
```bash
# All tests
npm run test

# Frontend tests only
cd frontend && npm run test

# Backend tests only
cd backend && npm run test

# Watch mode
npm run test:watch
```

### Test Coverage
```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## 📊 Database Management

### Migrations
```bash
# Create new migration
cd backend
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo
```

### Seeding
```bash
# Run seeders
npm run db:seed

# Create new seeder
npx sequelize-cli seed:generate --name seeder-name

# Undo seeders
npx sequelize-cli db:seed:undo:all
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Database connection issues**
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Restart database
docker-compose restart postgres
```

**Node modules issues**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Docker issues**
```bash
# Clean up Docker
docker system prune -a

# Rebuild containers
docker-compose build --no-cache
```

### Logs

View application logs:

```bash
# Frontend logs
cd frontend && npm run dev

# Backend logs
cd backend && npm run dev

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📚 Next Steps

1. **Explore the codebase**
   - Check out the project structure
   - Review the API documentation
   - Examine the component library

2. **Set up your development environment**
   - Configure your IDE
   - Set up debugging
   - Install recommended extensions

3. **Start developing**
   - Pick a feature to work on
   - Create a feature branch
   - Write tests for your changes

4. **Join the community**
   - Read the contributing guidelines
   - Join discussions
   - Share your ideas

## 🆘 Need Help?

- 📖 **Documentation**: Check the `/docs` folder
- 🐛 **Issues**: Create an issue on GitHub
- 💬 **Discussions**: Join the project discussions
- 📧 **Email**: Contact the development team

---

**Happy coding! 🌳**

The Mohns Family Tree Management System is designed to be developer-friendly and easy to get started with. If you encounter any issues, don't hesitate to reach out for help! 