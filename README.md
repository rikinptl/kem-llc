# KEM LLC - Landing Page

A minimalist, high-end landing page for KEM, an IT automation company, built with React and Tailwind CSS.

## Design Philosophy

- **Swiss International Typographic Style**: Clean, objective, sans-serif design
- **Color Palette**: Deep Midnight Blue (#001F3F), Slate Silver (#708090), Stark White (#FFFFFF)
- **Typography**: Inter font family with tight tracking and generous spacing

## Features

- Responsive design with mobile-first approach
- Smooth scroll behavior
- Fade-in animations for text blocks
- Micro-interactions on hover states
- Mathematical grid system (8px/12px base)
- Generous section padding (100px+)
- Automatic logo background removal using Canvas API

## Getting Started

### Frontend Setup

1. **Install Dependencies**

```bash
npm install
```

2. **Start Development Server**

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup (Contact Form)

The contact form requires a backend server to send emails.

1. **Navigate to Server Directory**

```bash
cd server
npm install
```

2. **Configure Gmail App Password**

   - Enable 2-Step Verification on your Google Account
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Generate a new App Password for "Mail"
   - Copy the 16-character password

3. **Create Environment File**

   Create a `.env` file in the `server` directory:

```bash
GMAIL_USER=kem.sales.us@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
PORT=3001
```

4. **Start Backend Server**

```bash
npm start
```

The backend will run on `http://localhost:3001`

### Running Both Servers

Open two terminal windows:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm start
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
kem_llc/
├── public/
│   └── images/
│       └── logo.jpg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── Philosophy.jsx
│   │   ├── Features.jsx
│   │   └── Footer.jsx
│   ├── utils/
│   │   └── removeLogoBackground.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```
