# Architectural Decision Record (ADR)
## Project: Monster Slayer Builder

This document describes the key architectural decisions made during the design and development of the **Monster Slayer Builder** web application.

---

## ADR 1: Technology Stack - React + Vite + TypeScript

### Context
We need to build a interactive web application that handles rapid reactive calculations of multiple mathematical game systems (12 progression types) and updates the UI instantly as inputs change.

### Decision
We chose **Vite** as the bundler and **React** with **TypeScript** as the framework.
*   **Vite:** Provides extremely fast Hot Module Replacement (HMR) during development and optimized tree-shaken builds.
*   **React:** Component-based composition allows us to break down the 12 tabs into independent UI units while maintaining a shared state.
*   **TypeScript:** Enforces strict types over player profiles, equipment slots, rarity grades, and system nodes, preventing runtime errors in complex calculations.

### Consequences
*   Highly responsive UI that updates calculations immediately when levels or configurations are toggled.
*   Compilation verification through `tsc -b && vite build` ensures type safety before deployment.

---

## ADR 2: LocalState Management with Context API & LocalStorage Persistence

### Context
The application needs to save the user's progress and custom configurations so that they are not lost on reload. However, at this stage, we want to avoid the cost and complexity of a backend database (Firebase/Supabase) and authentication.

### Decision
We implemented a custom React Context (`BuilderContext`) that manages the player profile state and serializes/deserializes it to/from **browser LocalStorage** using simple JSON APIs.
*   **React Context:** Avoids "prop drilling" across nested layouts (App -> TabsContent -> SidebarStats).
*   **LocalStorage:** Provides instant, zero-cost, persistent storage matching the player's local device.

### Consequences
*   No database costs or user authentication flows are required for the initial release.
*   All calculations are performed strictly on the client side, resulting in sub-millisecond updates and offloaded server cost.
*   *Limitation:* Cross-device syncing is not natively supported, though we have provided state resets and structured JSON configurations for future export/import options.

---

## ADR 3: Styling with Tailwind CSS v4 & Glassmorphism Aesthetics

### Context
The user requested a premium, highly aesthetic design that feels like a modern mobile RPG dashboard (dark backgrounds, glowing status badges, vibrant highlight colors for elements/rarities).

### Decision
We utilized **Tailwind CSS v4** with CSS variables (`index.css`) to build a responsive glassmorphic slate theme.
*   **Tailwind CSS v4:** Directly integrates with Vite via `@tailwindcss/vite`, compiling fast without requiring a separate `tailwind.config.js` file.
*   **Design Tokens:** Configured dark slate background (`#0b0c10`), charcoal card fills (`bg-slate-950/60`), glowing element borders, and custom scrollbars.

### Consequences
*   The application fits naturally into desktop and mobile screens (wrapping 12 tabs on mobile).
*   Clean styling code utilizing utilities directly in component structures.

---

## ADR 4: In-Memory Heuristic Optimization Advisor

### Context
The application needs to guide the user on the "best strategy" to upgrade stats. An exhaustive global optimization search across all 12 systems is computationally heavy and requires complex solvers.

### Decision
We created a **Heuristic Cost-Benefit Analyzer** (`OptimizationAdvisor.tsx`). It parses all available upgrades for Masteries, Relics, and Equipment, computes the relative damage percent increase per unit of currency, and outputs a sorted list of recommendations.

### Consequences
*   Executes instantly on state changes with zero UI lag.
*   Guides theorycrafters through clear, actionable upgrading recommendations.

---

## ADR 5: State Management Migration — React Context → Redux Toolkit with Persistence

### Context
The initial implementation used a single `BuilderContext` (React Context API) to manage all 12 progression system states in one monolithic object. As the number of features grows and the Vertical Slice architecture is adopted, this creates:
*   Unwanted re-renders across all tab components when any single slice changes.
*   A flat, hard-to-test state structure that does not align with the independent feature domain model.
*   No DevTools support for time-travel debugging or action replay.

### Decision
Migrate global state to **Redux Toolkit (RTK) 2.x** with the following conventions:
*   One `createSlice` per game system domain (e.g., `heroesSlice`, `skillsSlice`).
*   A custom `persistenceMiddleware` (instead of `redux-persist` dependency) that serializes each slice under namespaced `localStorage` keys (`msb:heroes`, `msb:skills`, etc.) on every dispatched action.
*   Store is hydrated from `localStorage` on initial `configureStore()` call, with safe fallbacks to `initialState` if keys are missing or corrupted.
*   Feature hooks (e.g., `heroes.hooks.ts`) expose typed `useSelector` and `useDispatch` wrappers so components never import Redux directly.

### Consequences
*   Each feature slice re-renders only when its own state changes, vastly improving performance in the builder with many concurrent inputs.
*   Redux DevTools integration enables action replay and time-travel debugging during development.
*   The Vertical Slice pattern is fully enabled: each domain slice lives inside its own feature folder alongside its types, hooks, and services.
*   Migration requires replacing all `useBuilder()` context calls with feature-specific RTK hooks.

