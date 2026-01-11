#!/bin/bash

# Script to start both frontend and backend servers

echo "🚀 Starting KEM LLC Development Servers..."
echo ""

# Check if backend server is running
if ! curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "📡 Starting backend server..."
    cd server
    if [ ! -f .env ]; then
        echo "⚠️  Warning: .env file not found in server directory"
        echo "   Please create .env with GMAIL_APP_PASSWORD"
        echo "   See server/README.md for instructions"
    fi
    npm start &
    BACKEND_PID=$!
    cd ..
    sleep 2
    echo "✅ Backend server started (PID: $BACKEND_PID)"
else
    echo "✅ Backend server already running on port 3001"
fi

echo ""
echo "🌐 Starting frontend server..."
npm run dev

