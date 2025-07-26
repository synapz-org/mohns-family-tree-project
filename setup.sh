#!/bin/bash

# Family Tree Management System Setup Script
# This script sets up the complete development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    
    # Check Docker (optional)
    if command -v docker &> /dev/null; then
        DOCKER_AVAILABLE=true
        print_success "Docker is available"
    else
        DOCKER_AVAILABLE=false
        print_warning "Docker is not available. Some features may not work."
    fi
    
    # Check Docker Compose
    if command -v docker-compose &> /dev/null; then
        DOCKER_COMPOSE_AVAILABLE=true
        print_success "Docker Compose is available"
    else
        DOCKER_COMPOSE_AVAILABLE=false
        print_warning "Docker Compose is not available."
    fi
    
    print_success "System requirements check completed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    print_success "Dependencies installed successfully"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        print_success "Environment file created from template"
        
        # Generate secure secrets
        JWT_SECRET=$(openssl rand -base64 64)
        SESSION_SECRET=$(openssl rand -base64 64)
        COOKIE_SECRET=$(openssl rand -base64 64)
        
        # Update .env file with generated secrets
        sed -i.bak "s/your_super_secret_jwt_key_here_make_it_long_and_random/$JWT_SECRET/g" .env
        sed -i.bak "s/your_session_secret_here/$SESSION_SECRET/g" .env
        sed -i.bak "s/your_cookie_secret_here/$COOKIE_SECRET/g" .env
        
        print_success "Secure secrets generated and updated"
    else
        print_warning "Environment file already exists. Skipping creation."
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    if [ "$DOCKER_AVAILABLE" = true ] && [ "$DOCKER_COMPOSE_AVAILABLE" = true ]; then
        print_status "Starting database services with Docker..."
        docker-compose up -d postgres redis
        
        # Wait for database to be ready
        print_status "Waiting for database to be ready..."
        sleep 10
        
        # Run database migrations
        print_status "Running database migrations..."
        cd backend
        npm run db:migrate
        
        # Seed database with initial data
        print_status "Seeding database..."
        npm run db:seed
        cd ..
        
        print_success "Database setup completed"
    else
        print_warning "Docker not available. Please set up PostgreSQL and Redis manually."
        print_status "You can run the following commands manually:"
        echo "  cd backend"
        echo "  npm run db:migrate"
        echo "  npm run db:seed"
    fi
}

# Build applications
build_applications() {
    print_status "Building applications..."
    
    # Build frontend
    print_status "Building frontend..."
    cd frontend
    npm run build
    cd ..
    
    print_success "Applications built successfully"
}

# Setup development tools
setup_dev_tools() {
    print_status "Setting up development tools..."
    
    # Install git hooks
    if [ -d .git ]; then
        npx husky install
        print_success "Git hooks installed"
    fi
    
    # Create necessary directories
    mkdir -p logs uploads temp
    print_success "Directories created"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Family Tree Management System setup completed!"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Start the development servers:"
    echo "   npm run dev"
    echo ""
    echo "2. Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Documentation: http://localhost:8000/api-docs"
    echo ""
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "3. Additional services (if using Docker):"
        echo "   MinIO Console: http://localhost:9001"
        echo "   MailHog: http://localhost:8025"
        echo "   Elasticsearch: http://localhost:9200"
        echo "   Kibana: http://localhost:5601"
        echo ""
    fi
    echo "4. Environment configuration:"
    echo "   Edit .env file to configure external services"
    echo ""
    echo "5. Database management:"
    echo "   Migrations: npm run db:migrate"
    echo "   Seeding: npm run db:seed"
    echo ""
    echo "For more information, see the README.md file."
    echo ""
}

# Main setup function
main() {
    echo "🌳 Family Tree Management System Setup"
    echo "======================================"
    echo ""
    
    check_requirements
    install_dependencies
    setup_environment
    setup_database
    build_applications
    setup_dev_tools
    show_next_steps
}

# Run main function
main "$@" 