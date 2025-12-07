#!/bin/sh
set -e

echo "Starting EBMC GROUP application..."

# Wait for database to be ready
echo "Waiting for database..."
sleep 5

# Run Prisma migrations
echo "Running database migrations..."
./node_modules/.bin/prisma db push --skip-generate 2>/dev/null || echo "Migration skipped or failed (may already be up to date)"

# Create admin user if it doesn't exist
echo "Ensuring admin user exists..."
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  try {
    const existing = await prisma.user.findUnique({
      where: { email: 'admin@ebmc-group.com' }
    });

    if (!existing) {
      const password = bcrypt.hashSync('admin123', 12);
      await prisma.user.create({
        data: {
          email: 'admin@ebmc-group.com',
          password,
          name: 'Administrateur',
          role: 'SUPER_ADMIN',
          active: true
        }
      });
      console.log('Admin user created: admin@ebmc-group.com / admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (e) {
    console.log('Could not create admin:', e.message);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
" 2>/dev/null || echo "Admin creation skipped"

# Start the application
echo "Starting Next.js server..."
exec node server.js
