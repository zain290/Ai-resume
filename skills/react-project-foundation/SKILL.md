---
name: react-project-foundation
description: >
  Set up the complete foundation for a modern React + Three.js + Vite project with full-stack capabilities.
  Use this skill whenever the user asks to scaffold a new React project, set up a Three.js/3D portfolio,
  initialize a project with GSAP and Framer Motion animations, create a design system with React Context,
  set up an Express backend, or build a full-stack React application with 3D effects.
  This skill covers the entire initial setup — from project initialization and dependency installation
  to folder structure, theme system, component architecture, animation configuration, 3D scene setup,
  and backend structure. If the user mentions "React setup", "project foundation", "scaffold project",
  "portfolio setup", "full-stack React", or "3D React project", this skill likely applies.
---

# React Project Foundation — Complete Setup Blueprint

## Overview

Scaffolds a modern React + Vite project with a full technology stack:
- **Frontend**: React 18+, Vite, TypeScript, Tailwind CSS
- **3D**: Three.js, React Three Fiber, React Three Drei
- **Animation**: Framer Motion (micro-animations + magnetic effects) + GSAP + @gsap/react (complex timelines)
- **Backend**: Express.js with MVC pattern
- **Design System**: React Context + ThemeProvider with design tokens
- **Sound**: Howler.js for audio effects
- **Utilities**: Custom hooks for magnetic effects, 3D helpers, and animation controllers

## Architecture Philosophy

The project follows a **single-source-of-truth** pattern. One ThemeProvider controls ALL visual tokens (colors, fonts, shadows, spacing). One backend App class initializes the server and routes. Components are modular, reusable, and styled with Tailwind. Every animation is either a Framer Motion variant or a GSAP timeline — never both in the same component.

---

## Workflow

### 1. Project Initialization

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install All Dependencies

**Core:**
```bash
npm install react react-dom react-router-dom
npm install -D @types/react @types/react-dom typescript
```

**3D Stack:**
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Animation:**
```bash
npm install framer-motion gsap @gsap/react
```

**Styling:**
```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Backend:**
```bash
npm install express cors
npm install -D @types/express @types/cors tsx
```

**Sound:**
```bash
npm install howler
npm install -D @types/howler
```

### 3. Folder Structure

Create the following structure. Every folder and file below is required.

```
src/
├── main.tsx                    # ReactDOM entry
├── App.tsx                     # Root component with Router + ThemeProvider
├── vite-env.d.ts
├── styles/
│   └── globals.css             # Tailwind directives + CSS custom properties fallback
├── theme/
│   ├── ThemeContext.tsx         # React Context definition
│   ├── ThemeProvider.tsx        # Provider wrapping the app
│   ├── tokens.ts               # All design tokens (colors, fonts, shadows, spacing)
│   └── useTheme.ts             # Hook for consuming theme
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx          # Wraps Header + children + Footer
│   ├── three/
│   │   ├── Scene.tsx           # Canvas wrapper with lights, controls, environment
│   │   ├── Model.tsx           # GLTF loader with useGLTF + fallback geometry
│   │   └── ParticleField.tsx   # Code-generated particle system
│   ├── animation/
│   │   └── AnimatedSection.tsx # Framer Motion scroll-reveal wrapper
│   └── ui/
│       ├── Button.tsx          # With magnetic hover effect
│       └── MagneticWrapper.tsx # Framer Motion magnetic effect hook
├── hooks/
│   ├── useMagneticEffect.ts    # Framer Motion magnetic hover hook
│   ├── useSound.ts             # Howler.js wrapper hook
│   ├── useScrollAnimation.ts   # GSAP ScrollTrigger hook
│   └── useTheme.ts             # Re-export from theme/
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── services/
│   └── api.ts                  # Axios/fetch wrapper for backend calls
├── utils/
│   ├── cn.ts                   # clsx + tailwind-merge utility
│   └── constants.ts            # App-wide constants
server/
├── index.ts                    # Entry point
├── app.ts                      # Express app class
├── routes/
│   ├── index.ts                # Route aggregator
│   └── api.routes.ts
├── controllers/
│   └── api.controller.ts
└── middleware/
    └── error.middleware.ts
```

### 4. Theme / Design System (`src/theme/`)

**Why this pattern**: Every visual decision in the app flows from one source of truth. Changing `tokens.ts` propagates everywhere — no magic values, no scattered color literals.

**`tokens.ts`** — Define all design tokens:
```typescript
export const tokens = {
  colors: {
    primary: '#6366f1',
    secondary: '#ec4899',
    background: '#0a0a0f',
    surface: '#1a1a2e',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    accent: '#22d3ee',
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.3)',
    md: '0 4px 6px rgba(0,0,0,0.4)',
    lg: '0 10px 25px rgba(0,0,0,0.5)',
    glow: '0 0 20px rgba(99,102,241,0.3)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    section: '6rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
}
```

**`ThemeContext.tsx`** — Context with tokens only, no state:
```typescript
import { createContext } from 'react'
import { tokens } from './tokens'

export type ThemeTokens = typeof tokens
export const ThemeContext = createContext<ThemeTokens>(tokens)
```

**`ThemeProvider.tsx`** — Wraps app, sets CSS variables on `:root` and provides tokens:
```typescript
import { ThemeContext } from './ThemeContext'
import { tokens } from './tokens'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Set CSS custom properties on :root for Tailwind compatibility
  // Provide tokens via context for hook consumption
  return (
    <ThemeContext.Provider value={tokens}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**`useTheme.ts`** — Simple context consumer hook.

### 5. Tailwind CSS Configuration

**`src/styles/globals.css`:**
```css
@import "tailwindcss";
```

**`vite.config.ts`** — Add Tailwind plugin:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
})
```

### 6. Animation Setup

**Framer Motion (micro-animations + magnetic effect):**

All Framer Motion animations use variants defined next to the component, not in a global file. The `MagneticWrapper` component wraps any element to add a magnetic hover effect:

```typescript
// hooks/useMagneticEffect.ts
// Returns { ref, onMouseMove, onMouseLeave }
// Uses requestAnimationFrame + Framer Motion's set() for zero-lag feel
// Element follows cursor within bounds, springs back on leave
```

**GSAP (complex timelines + scroll animations):**

GSAP is imported directly where needed. Register plugins once in `App.tsx`:
```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

The `useScrollAnimation` hook provides a declarative interface for scroll-triggered animations:
```typescript
// Returns a ref to attach to the target element
// Accepts: animation config (from, to, scrub, etc.)
```

### 7. 3D Setup (`src/components/three/`)

**`Scene.tsx`** — Wraps `<Canvas>` from R3F with default lighting, controls, and environment:
```typescript
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'

// Props: children, camera position, controls enabled/disabled
// Includes: ambient light, directional light, contact shadows, HDRI environment
```

**`Model.tsx`** — Loads GLTF models with `useGLTF`. Falls back to geometry primitives if the model file is not found:
```typescript
// Props: url (optional), geometry type fallback (box, sphere, torusKnot)
// Animates on hover via GSAP or Framer Motion (use one, not both)
// Auto-scales and positions the model
```

**`ParticleField.tsx`** — Code-generated particle system using Points geometry:
```typescript
// Configurable: count, spread, colors, size, movement speed
// Self-animating with useFrame
```

### 8. Magnetic Effect (`src/components/ui/MagneticWrapper.tsx`)

Uses Framer Motion to create a magnetic hover effect. The child element follows the cursor position within its bounding box and springs back on mouse leave:

```typescript
// Tracks mouse position relative to element center
// Transforms child position with useSpring for smooth interpolation
// Strength prop controls how far the element follows
// Works with any children (buttons, cards, icons)
```

### 9. Sound (`src/hooks/useSound.ts`)

Wraps Howler.js in a React hook:
```typescript
// Usage: const { play, stop, setVolume } = useSound('/sounds/hover.mp3')
// Manages a Howl instance internally
// Cleans up on unmount
```

Place sound files in `public/sounds/`.

### 10. Backend Setup (`server/`)

**`server/app.ts`** — Main App class:
```typescript
class App {
  private app: express.Application
  constructor() {
    this.app = express()
    this.configureMiddleware()
    this.registerRoutes()
    this.registerErrorHandler()
  }
  private configureMiddleware() { /* cors, json */ }
  private registerRoutes() { /* mount route groups */ }
  private registerErrorHandler() { /* global error handler */ }
  public start(port: number) { /* listen */ }
}
```

**`server/index.ts`** — Entry point that instantiates App and starts listening:
```typescript
import { App } from './app'
const app = new App()
app.start(Number(process.env.PORT) || 3001)
```

**Routes pattern**: `routes/api.routes.ts` defines route → controller mappings. Controllers handle request/response logic. Middleware handles errors, auth, etc.

### 11. Component Architecture Pattern

Every component follows this pattern:

1. **Types/interface defined first** (at the top or in a co-located `.types.ts`)
2. **Framer Motion variants** (if animated) defined as constants before the component
3. **Component function** with typed props
4. **Export default** or named export matching the filename

Example:
```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
}

const variants = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
  secondary: 'bg-pink-500 text-white hover:bg-pink-600',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/5',
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <MagneticWrapper strength={0.3}>
      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${variants[variant]}`}
      >
        {children}
      </button>
    </MagneticWrapper>
  )
}
```

### 12. Verification Checklist

After scaffolding, verify:

- [ ] `npm run dev` starts the Vite dev server without errors
- [ ] `npm run build` produces a production build
- [ ] `npx tsx server/index.ts` starts the Express server
- [ ] ThemeProvider wraps the app in `App.tsx`
- [ ] Tailwind classes render correctly in the browser
- [ ] A basic Three.js `<Canvas>` renders a test geometry
- [ ] A Framer Motion animated element works on mount
- [ ] A GSAP animated element works (run `gsap.to(...)` test in console)
- [ ] The magnetic effect hook compiles without TS errors

### 13. Report Structure

At the end of scaffolding, produce this report for the user:

```
## Project Scaffold Complete

### Installed Dependencies
- React 18 + TypeScript + Vite
- Three.js + React Three Fiber + Drei
- Framer Motion + GSAP + @gsap/react + ScrollTrigger
- Tailwind CSS (v4)
- Express + CORS
- Howler.js

### Folder Structure Created
- src/theme/ — Design tokens + ThemeProvider
- src/components/layout/ — Header, Footer, Layout
- src/components/three/ — Scene, Model, ParticleField
- src/components/ui/ — Button, MagneticWrapper
- src/hooks/ — useMagneticEffect, useSound, useScrollAnimation
- src/pages/ — Home, About, Contact
- src/services/ — api.ts
- src/utils/ — cn.ts, constants.ts
- server/ — Express app with routes, controllers, middleware

### Assets Required
- 3D models (.glb/.gltf) → Place in public/models/
- Sound effects (.mp3/.wav) → Place in public/sounds/
- Images → Place in public/images/

### Next Steps
1. Replace theme tokens in src/theme/tokens.ts
2. Add your 3D models to public/models/
3. Add route pages in src/pages/
4. Implement backend controllers in server/controllers/
5. Run `npm run dev` to start developing
```

---

## Key Principles

1. **Single source of truth** — Theme tokens, API base URL, and constants each live in exactly one place.
2. **One animation library per component** — Never mix Framer Motion and GSAP on the same element. Use Framer Motion for entry/hover/magnetic effects, GSAP for timeline and scroll-driven sequences.
3. **Collocation** — Keep variants, types, and styles close to their component. Extract only when shared across 3+ components.
4. **Progressive enhancement** — Start with code-generated geometry. Add user-provided GLTF models as a drop-in replacement via the `Model` component's fallback pattern.
5. **No magic strings** — Every color, font, shadow, and spacing value comes from `tokens.ts`.
