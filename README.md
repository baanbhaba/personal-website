# Baan's Corner - Personal Portfolio Platform

## Project Overview
This is my personal project acting as a portfolio of my life. It's where I dump everything I care about — Linux configs, photos, music, and whatever else I'm into at the moment.

No corporate bullshit. Just me.

---

## Live Site

[https://baanbhaba.vercel.app](https://baanbhaba.vercel.app)

---

## Core System Modules

### 1. Navigation Controller (Navbar)
The platform uses a top-docked, responsive navigation bar providing fast routing to different subsections of the single-page layout.
*   **Contextual Scrolling**: Integrated custom scroll-into-view handlers with smooth transition attributes.
*   **External Integration Links**: Houses high-visibility hyperlinks pointing directly to external configuration resources (e.g., Hyprland Configuration Repositories).

### 2. User Profiles & Imagery (Hero)
The hero landing stage establishes the user profile identity using dynamic typography pairings and optimized local image rendering.
*   **Responsive Image Frame**: Displays custom portraits (`/public/me.jpg`) with structural constraints, custom responsive dimensions, and high-performance layout wrappers.
*   **Profile Highlights**: Introduces the user and key specialties clearly under high typographic contrast.

### 3. Developer Skill Profiling (AboutSection)
Provides a structured display of the user's focus areas, systems configurations (such as Arch Linux, Hyprland window managers), and development skills. Includes detailed sections profiling personal terminal workflows and text processing tools.

### 4. Photographic Showcase (PhotoFrames)
A highly polished visual gallery rendering digital photography in structural layouts. 
*   **Frame Adaptability**: Employs responsive grid layouts to adjust automatically to desktop, tablet, and mobile viewport requirements.
*   **Display Quality**: Ensures crisp imagery and uniform grid boundaries across differing visual formats.

### 5. Client Interactive Guestbook (Guestbook)
Includes a modern interactive guestbook form allowing visitors to leave structured entries. Employs robust client-side state handling to display entries sequentially with form field validation.

### 6. Media Audio Simulation (AnalogSynth)
An integrated custom browser-synthesizer and audio control engine designed to demonstrate full-stack interactive client capabilities and custom Web Audio API or audio playlist controls.

---

## Technology Stack

The platform leverages modern, industry-standard client technology:

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **React 18** | Application Framework | Core component structure, hooks-driven state management, and lifecycle execution. |
| **Vite** | Build Tooling | High-speed local dev server and optimized rollup compilation pipeline. |
| **Tailwind CSS** | Styling Engine | Utility-first responsive design framework mapping global variables and typography. |
| **Motion** | Orchestration | High-performance animation engine rendering smooth transitions, hover effects, and keyframe sequences. |
| **Lucide React** | Icon Suite | Scalable vector icon library rendering system control cues. |

---

## Directory Architecture

```text
├── public/                 # Static local assets (images, placeholders)
├── src/
│   ├── components/         # Modular application blocks
│   │   ├── AboutSection.tsx
│   │   ├── AnalogSynth.tsx
│   │   ├── Footer.tsx
│   │   ├── Guestbook.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── PhotoFrames.tsx
│   ├── App.tsx             # Root application orchestrator
│   ├── index.css           # Global typography, import rules, and Tailwind configuration
│   ├── main.tsx            # DOM mounting entrypoint
│   └── types.ts            # Centralized TypeScript declarations and interfaces
├── metadata.json           # Application platform configuration metadata
├── package.json            # Target dependencies and build script entries
├── tsconfig.json           # TypeScript compilation configuration
└── vite.config.ts          # Vite build pipeline configurations
```

---

## Installation & Local Execution

Follow these standard instructions to run the application in a local workspace:

### Prerequisites
Ensure that the Node.js runtime environment (version 18 or above) and npm package manager are installed.

### 1. Install Dependencies
Run the package installation command to acquire the defined packages and lockfiles:
```bash
npm install
```

### 2. Launch Local Development Server
Boot the development server with local compilation active:
```bash
npm run dev
```
The application will default to the specified host and port (typically `http://localhost:3000`).

### 3. Run Static Code Quality Check (Linter)
Validate code syntax, type safety, and framework standards:
```bash
npm run lint
```

### 4. Build for Production Compilation
Compile optimized, production-ready static assets under the `dist/` build output folder:
```bash
npm run build
```
The static compiler will bundle and tree-shake assets for deployment under high-performance content delivery networks.

