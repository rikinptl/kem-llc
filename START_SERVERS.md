# Quick Start Guide - Running the Application

## Step 1: Start Backend Server

Open Terminal 1:

```bash
cd server
npm install  # Only needed first time
```

Create `.env` file in the `server` directory:

```bash
cat > .env << 'EOF'
GMAIL_USER=kem.sales.us@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here
PORT=3001
EOF
```

**Important**: Replace `your_app_password_here` with your Gmail App Password:
1. Go to https://myaccount.google.com/apppasswords
2. Generate App Password for "Mail"
3. Copy the 16-character password
4. Paste it in the .env file

Then start the backend:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3001
📧 Contact form endpoint: http://localhost:3001/api/contact
```

## Step 2: Start Frontend

Open Terminal 2 (keep Terminal 1 running):

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 3: Test Contact Form

1. Go to http://localhost:5173/contact
2. Fill out the form
3. Submit

If you see "Thank you! Your message has been sent successfully", everything is working!

## Troubleshooting

### Backend not running?
- Make sure you're in the `server` directory
- Check that `.env` file exists and has the Gmail App Password
- Check Terminal 1 for error messages

### Still getting errors?
- Check browser console (F12) for detailed error messages
- Verify backend is running on port 3001: http://localhost:3001/api/health
- Make sure Gmail App Password is correct (16 characters, no spaces)

