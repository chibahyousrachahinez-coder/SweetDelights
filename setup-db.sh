#!/bin/bash
# Database setup script for SweetDelights

echo "🍰 SweetDelights - Database Setup"
echo "=================================="
echo ""

echo "Step 1: Generating Prisma Client..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    echo "Try closing any running dev servers and try again"
    exit 1
fi

echo "✅ Prisma client generated"
echo ""

echo "Step 2: Pushing schema to database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to push schema to database"
    echo "Make sure your database is running and accessible"
    exit 1
fi

echo "✅ Schema pushed to database"
echo ""

echo "Step 3: Seeding database with initial data..."
npm run db:seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded successfully"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Admin credentials:"
echo "  Email: admin@sweetdelights.com"
echo "  Password: admin123"
echo ""
echo "Start the dev server with: npm run dev"
