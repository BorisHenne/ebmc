#!/bin/bash
# =============================================================================
# EBMC GROUP - Docker Setup Script
# =============================================================================
# Adapté pour UGreen DXP4800 Plus (UGos)
# Usage: ./docker-setup.sh [command]
# Commands:
#   init     - First time setup (create .env, build, start)
#   start    - Start all containers
#   stop     - Stop all containers
#   restart  - Restart all containers
#   rebuild  - Rebuild and restart app container
#   logs     - Show logs
#   shell    - Open shell in app container
#   db       - Open MySQL shell
#   migrate  - Run Prisma migrations
#   seed     - Seed the database
#   clean    - Remove all containers and volumes
#   status   - Show container status
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Docker command (UGos requires sudo)
DOCKER_COMPOSE="sudo docker compose"
DOCKER="sudo docker"

# Functions
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  EBMC GROUP - Docker Management${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! $DOCKER info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Generate NEXTAUTH_SECRET
generate_secret() {
    openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64
}

# Initialize project
init() {
    print_header
    print_info "Initializing EBMC GROUP Docker environment..."
    
    # Check if .env exists
    if [ ! -f .env ]; then
        print_info "Creating .env file from template..."
        cp .env.docker.example .env
        
        # Generate NEXTAUTH_SECRET
        SECRET=$(generate_secret)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/NEXTAUTH_SECRET=CHANGE_ME_GENERATE_WITH_OPENSSL/NEXTAUTH_SECRET=$SECRET/" .env
        else
            # Linux
            sed -i "s/NEXTAUTH_SECRET=CHANGE_ME_GENERATE_WITH_OPENSSL/NEXTAUTH_SECRET=$SECRET/" .env
        fi
        
        print_success ".env file created with generated secret"
        print_warning "Please edit .env to configure your settings!"
        echo ""
        read -p "Press Enter to continue after editing .env, or Ctrl+C to abort..."
    else
        print_info ".env file already exists"
    fi
    
    # Build containers
    print_info "Building Docker containers..."
    $DOCKER_COMPOSE build
    
    # Start containers
    print_info "Starting containers..."
    $DOCKER_COMPOSE up -d
    
    # Wait for database
    print_info "Waiting for database to be ready..."
    sleep 10
    
    # Run Prisma migrations
    print_info "Running database migrations..."
    $DOCKER_COMPOSE exec app npx prisma migrate deploy || true
    
    # Seed database
    print_info "Seeding database..."
    $DOCKER_COMPOSE exec app npx prisma db seed || true
    
    print_success "EBMC GROUP is now running!"
    echo ""
    print_info "Access the application at: http://NAS-IP:3080"
    print_info "Database admin at: http://NAS-IP:8180"
    echo ""
}

# Start containers
start() {
    print_header
    print_info "Starting EBMC GROUP containers..."
    $DOCKER_COMPOSE up -d
    print_success "Containers started!"
    status
}

# Stop containers
stop() {
    print_header
    print_info "Stopping EBMC GROUP containers..."
    $DOCKER_COMPOSE down
    print_success "Containers stopped!"
}

# Restart containers
restart() {
    print_header
    print_info "Restarting EBMC GROUP containers..."
    $DOCKER_COMPOSE restart
    print_success "Containers restarted!"
    status
}

# Rebuild app
rebuild() {
    print_header
    print_info "Rebuilding EBMC GROUP app container..."
    $DOCKER_COMPOSE build app
    $DOCKER_COMPOSE up -d app
    print_success "App container rebuilt and restarted!"
}

# Show logs
logs() {
    $DOCKER_COMPOSE logs -f "${@:-app}"
}

# Open shell in app container
shell() {
    $DOCKER_COMPOSE exec app sh
}

# Open MySQL shell
db_shell() {
    source .env 2>/dev/null || true
    $DOCKER_COMPOSE exec db mysql -u${MYSQL_USER:-ebmc_user} -p${MYSQL_PASSWORD:-ebmc_password_2024} ${MYSQL_DATABASE:-ebmc_group}
}

# Run migrations
migrate() {
    print_header
    print_info "Running Prisma migrations..."
    $DOCKER_COMPOSE exec app npx prisma migrate deploy
    print_success "Migrations completed!"
}

# Seed database
seed() {
    print_header
    print_info "Seeding database..."
    $DOCKER_COMPOSE exec app npx prisma db seed
    print_success "Database seeded!"
}

# Clean everything
clean() {
    print_header
    print_warning "This will remove all containers, images, and volumes!"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        $DOCKER_COMPOSE down -v --rmi all
        print_success "Cleaned up all EBMC GROUP Docker resources"
    else
        print_info "Aborted"
    fi
}

# Show status
status() {
    print_header
    echo "Container Status:"
    echo "-----------------"
    $DOCKER_COMPOSE ps
    echo ""
    echo "Volumes:"
    echo "--------"
    $DOCKER volume ls | grep ebmc || echo "No volumes found"
}

# Help
help() {
    print_header
    echo "Usage: ./docker-setup.sh [command]"
    echo ""
    echo "Commands:"
    echo "  init     - First time setup (create .env, build, start)"
    echo "  start    - Start all containers"
    echo "  stop     - Stop all containers"
    echo "  restart  - Restart all containers"
    echo "  rebuild  - Rebuild and restart app container"
    echo "  logs     - Show logs (optional: service name)"
    echo "  shell    - Open shell in app container"
    echo "  db       - Open MySQL shell"
    echo "  migrate  - Run Prisma migrations"
    echo "  seed     - Seed the database"
    echo "  clean    - Remove all containers and volumes"
    echo "  status   - Show container status"
    echo "  help     - Show this help"
    echo ""
}

# Main
check_docker

case "${1:-help}" in
    init)
        init
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    rebuild)
        rebuild
        ;;
    logs)
        shift
        logs "$@"
        ;;
    shell)
        shell
        ;;
    db)
        db_shell
        ;;
    migrate)
        migrate
        ;;
    seed)
        seed
        ;;
    clean)
        clean
        ;;
    status)
        status
        ;;
    help|*)
        help
        ;;
esac
