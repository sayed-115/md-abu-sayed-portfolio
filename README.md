# Dynamic Portfolio + CV Generator

Build and publish a recruiter-ready personal portfolio with live updates and one-click CV export, fully on the frontend.

[![Live Demo](https://img.shields.io/badge/Live-Demo-0ea5e9?style=for-the-badge)](https://sayed-115.github.io/md-abu-sayed-portfolio/)
[![Vanilla Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-111827?style=for-the-badge)](#tech-stack)
[![PDF Export](https://img.shields.io/badge/CV-PDF%20Export-16a34a?style=for-the-badge)](#how-it-works)

## Live Demo

- App: https://sayed-115.github.io/md-abu-sayed-portfolio/
- Repository: https://github.com/sayed-115/md-abu-sayed-portfolio

## Demo Preview

- GIF Walkthrough: assets/demo/portfolio-cv-flow.gif
- Video Walkthrough: https://your-demo-video-link.example

> Replace media placeholders with your own GIF/video to increase recruiter engagement.

## Overview

Students and early-career developers often maintain two separate assets: an online portfolio and a printable CV. This leads to duplicated effort, outdated content, and inconsistent personal branding.

Dynamic Portfolio + CV Generator solves this with a single workflow:

- maintain profile data once,
- update portfolio presentation instantly,
- generate a polished CV PDF,
- and distribute your professional profile through a shareable link.

The result is a practical frontend product that improves portfolio quality, speed, and consistency for internship and job applications.

## Features

- Instant Portfolio Rendering
  - Data updates are reflected immediately in the UI for a live editing experience.
- Professional CV Download
  - Generates a clean, interview-ready PDF directly from browser-rendered content.
- Shareable Portfolio State
  - Supports encoded URL sharing so profile state can be transferred without a backend.
- Draft Persistence
  - Automatically stores user data in localStorage to protect progress.
- Dynamic GitHub Section
  - Fetches and displays repositories from GitHub API in a modern card layout.
- Responsive UX
  - Optimized for desktop, tablet, and mobile usage.

## Tech Stack

### Core

- HTML5
  - Semantic layout and clean content structure.
- CSS3 (Custom CSS)
  - Fine-grained visual control, consistent branding, and no framework lock-in.
- Vanilla JavaScript (ES6+)
  - Lightweight, dependency-minimal logic with direct DOM and API control.

### Libraries and Integrations

- html2pdf.js
  - Client-side PDF generation for CV export.
- EmailJS
  - Contact form delivery without server-side code.
- Font Awesome
  - Iconography for polished UI communication.

### Why Vanilla JavaScript + Custom CSS

- Proves strong frontend fundamentals.
- Keeps performance overhead low.
- Makes architecture and problem-solving decisions clear in interviews.
- Demonstrates ability to ship production-grade UI without UI frameworks.

## How It Works

1. User Input
   - Profile and contact information are captured through the interface.
2. Live Preview
   - JavaScript updates the portfolio/CV view instantly as data changes.
3. PDF Export
   - CV content is rendered and downloaded as a professional A4 PDF.
4. Share Link
   - Profile state can be serialized and encoded into a URL.
5. Persistence
   - Data is saved locally so users can continue later without re-entry.

## Screenshots

- Hero + Portfolio Overview: assets/screenshots/01-hero.png
- CV Modal Preview: assets/screenshots/02-cv-modal.png
- Generated PDF Sample: assets/screenshots/03-cv-pdf.png
- Contact + Feedback State: assets/screenshots/04-contact-feedback.png

> Add real screenshots with consistent dimensions for a stronger repository presentation.

## Installation

### Prerequisites

- Modern browser (Chrome, Edge, Firefox)
- Optional: VS Code + Live Server extension

### Run Locally

1. Clone the repository:

```bash
git clone https://github.com/sayed-115/md-abu-sayed-portfolio.git
cd md-abu-sayed-portfolio
```

2. Open index.html in your browser, or run with Live Server.

3. Verify key flows:

- navigation and section scroll behavior
- GitHub project feed loading
- CV modal and PDF download
- contact form message status

## Project Structure

```text
.
|-- index.html
|-- style.css
|-- script.js
|-- README.md
`-- assets/
    `-- img/
```

## Key Highlights

- Full Product Feel
  - Combines profile storytelling, project evidence, and downloadable CV in one polished interface.
- Real Integration Depth
  - Uses GitHub API, EmailJS, and client-side PDF generation in one cohesive experience.
- Recruiter-Oriented
  - Optimized to help recruiters quickly evaluate skills, projects, and communication quality.
- Zero Backend Dependency
  - Easy to deploy and maintain using static hosting.

## What I Learned

- How to architect a frontend-first product with real utility.
- How to blend design polish with performance considerations.
- How to handle asynchronous API flows with graceful UI fallbacks.
- How to prepare export-safe UI for consistent PDF output.
- How to position a student project as a product narrative, not just a code sample.

## Challenges and Solutions

| Challenge | Why It Is Difficult | Solution |
|---|---|---|
| Smooth live interactions with visual effects | Heavy animations can impact responsiveness | Balanced animation density and optimized event handling |
| Reliable PDF output from browser DOM | Styling differences can break print consistency | Tuned html2pdf/html2canvas settings and controlled CV layout |
| Third-party API reliability | Network errors or rate limits degrade UX | Added fallback states and graceful error messaging |
| Keeping UX clean across devices | Complex sections can overflow on small screens | Mobile-first responsive tuning and adaptive component spacing |

## Future Improvements

### Product Enhancements

- Encoded share-link generator with one-click copy feedback
- Structured form-to-CV editor mode (single source of truth)
- JSON import/export for quick profile switching
- Recruiter mode with condensed summary view

### MERN Upgrade Path

- MongoDB
  - Persist user profiles, multiple CV versions, and analytics events.
- Express + Node.js
  - API layer for auth, profile CRUD, and secure share tokens.
- React
  - Component-driven editor, reusable CV blocks, and scalable state architecture.
- Next capabilities
  - User accounts, template marketplace, private portfolio links, and version history.

## Use Cases

- CSE students preparing internship applications
- Fresh graduates applying to entry-level software roles
- Freelancers sharing portfolio + CV in one link
- Developers maintaining a personal brand with fast update cycles

## Interview Pitch (Use This)

### 30-Second Pitch

I built a frontend-only Dynamic Portfolio + CV Generator to solve a real candidate pain point: maintaining consistent portfolio and CV content. The app combines live profile presentation, project proof, and one-click PDF export in a responsive interface. I used vanilla JavaScript and custom CSS intentionally to demonstrate strong fundamentals and product-focused frontend engineering.

### 90-Second Deep-Dive

The project is designed around a single-source profile workflow. Users can present skills and projects, generate a professional CV PDF, and share their profile quickly. From an engineering perspective, I focused on responsive layout quality, integration reliability, and state continuity. I integrated GitHub API for project data, EmailJS for contact handling, and html2pdf for export. This project demonstrates my ability to build production-style user experiences, make practical technology choices, and ship independently without backend dependencies.

## Author

- Name: Md Abu Sayed
- Role: CSE Student | Web Developer | AI Enthusiast
- Email: abusayedsk99@gmail.com
- GitHub: https://github.com/eii-sayed
- LinkedIn: https://www.linkedin.com/in/md-abu-sayed-00751a281/

## License

This project is open-source and available under the MIT License.

---

If this project helps you, consider starring the repository.
