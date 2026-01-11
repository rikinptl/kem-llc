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

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
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
