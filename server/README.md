# KEM LLC Backend Server

Backend server for handling contact form submissions and sending emails.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Gmail App Password

Since Gmail requires an App Password for third-party applications:

1. Go to your Google Account settings
2. Enable 2-Step Verification (if not already enabled)
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate a new App Password for "Mail"
5. Copy the 16-character password

### 3. Create Environment File

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gmail App Password:

```
GMAIL_USER=kem.sales.us@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
PORT=3001
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/contact

Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### GET /api/health

Health check endpoint.

## Email Configuration

The server sends emails to `kem.sales.us@gmail.com` with:
- Professional HTML template
- All form fields included
- Reply-to set to customer email
- Timestamp of submission

