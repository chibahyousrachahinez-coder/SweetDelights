@echo off
REM Database setup script for SweetDelights (Windows)

echo.
echo 🍰 SweetDelights - Database Setup
echo ==================================
echo.

echo Step 1: Generating Prisma Client...
call npm run db:generate

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to generate Prisma client
    echo Try closing any running dev servers and try again
    exit /b 1
)

echo ✅ Prisma client generated
echo.

echo Step 2: Pushing schema to database...
call npm run db:push

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to push schema to database
    echo Make sure your database is running and accessible
    exit /b 1
)

echo ✅ Schema pushed to database
echo.

echo Step 3: Seeding database with initial data...
call npm run db:seed

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to seed database
    exit /b 1
)

echo ✅ Database seeded successfully
echo.
echo 🎉 Setup complete!
echo.
echo Admin credentials:
echo   Email: admin@sweetdelights.com
echo   Password: admin123
echo.
echo Start the dev server with: npm run dev
