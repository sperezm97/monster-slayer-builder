---
name: React Web Best Practices
description: Guidelines for writing modern React apps with Tailwind CSS, specializing in advanced responsive design, state management, animations, and premium UX for dashboards and builders.
---

# React Web Application Best Practices

This guide establishes the rules and best practices for developing high-quality, high-performance React applications using Atomic Design + Vertical Slices + Redux Toolkit.

---

## 1. Advanced Responsive Design & Viewports

All components must look outstanding on mobile (375px+), tablet (768px+), desktop (1024px+), and ultra-wide screens.

*   **Mobile-First Approach:** Implement Tailwind classes starting with mobile layout as default, add `md:`, `lg:`, `xl:` modifiers to scale up.
*   **Touch Targets:** Ensure interactive elements on mobile have a minimum touch target of `44px x 44px`.
*   **Flexible Reflows:** Use CSS Grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) for item lists and flex rows that wrap (`flex flex-wrap`) for navigation and tags.
*   **Scroll Management:** Use `min-h-screen` for main layout and `overflow-y-auto` for heavy sub-panels to avoid double page scrollbars.

---

## 2. Atomic Design UI Architecture

All shared UI must follow the Atomic Design hierarchy under `src/components/shared/`:

| Level | Folder | Rules |
|:------|:-------|:------|
| **Atoms** | `atoms/` | No business logic. Single visual element. Accept only primitive props. |
| **Molecules** | `molecules/` | Compose 2–4 atoms. May accept domain types as props, but no store access. |
| **Organisms** | `organisms/` | Complex UI blocks. **May** use RTK hooks to read store state. |
| **Templates** | `templates/` | Layout shells only — no data, no store. Pass everything via `children` or slots. |

Rules:
- Atoms never import from Molecules, Organisms, or Features.
- Molecules never import from Organisms or Features.
- Component names must match the file name exactly (`Button.tsx` exports `Button`).

---

## 3. Vertical Slice Domain Architecture

Each game system lives in its own self-contained directory under `src/features/[feature]/`:

```
[feature]/
├── [feature].errors.ts      # Custom Error classes for this domain
├── [feature].page.tsx       # Top-level page component for this tab
├── [feature].test.ts        # Vitest unit and integration tests
├── [feature].hooks.ts       # RTK selector + dispatch wrappers
├── components/              # Feature-local atoms/molecules/organisms
├── [feature].util.ts        # Pure business logic and stat helpers
├── [feature].md             # Domain documentation
└── [feature].services.ts    # Future API / remote data connectors
```

Rules:
- Features **must not** import from other features directly.
- Features communicate via the **Redux store** only (dispatch actions, read selectors).
- All RTK `useSelector` and `useDispatch` calls live in `[feature].hooks.ts`, never in component files.

---

## 4. Redux Toolkit (RTK) State Management

### 4.1 Store Setup

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistenceMiddleware } from './persistenceMiddleware';
import heroesReducer from './slices/heroesSlice';
// ... other slices

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    // ...
  },
  middleware: (getDefault) => getDefault().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 4.2 Typed Hooks (always use these instead of raw RTK hooks)

```typescript
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 4.3 Creating a Slice

```typescript
// src/store/slices/heroesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroesState {
  heroId: string;
  heroLevel: number;
  heroAwakenStars: number;
  ascensionLevel: number;
}

const initialState: HeroesState = {
  heroId: 'ranger',
  heroLevel: 1,
  heroAwakenStars: 0,
  ascensionLevel: 0,
};

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroId: (state, action: PayloadAction<string>) => {
      state.heroId = action.payload;
    },
    setHeroLevel: (state, action: PayloadAction<number>) => {
      state.heroLevel = Math.max(1, action.payload);
    },
    setHeroAwakenStars: (state, action: PayloadAction<number>) => {
      state.heroAwakenStars = Math.min(5, Math.max(0, action.payload));
    },
    setAscensionLevel: (state, action: PayloadAction<number>) => {
      state.ascensionLevel = Math.max(0, action.payload);
    },
  },
});

export const { setHeroId, setHeroLevel, setHeroAwakenStars, setAscensionLevel } = heroesSlice.actions;
export default heroesSlice.reducer;
```

### 4.4 Custom Persistence Middleware (no redux-persist dependency)

```typescript
// src/store/persistenceMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './index';

const NAMESPACE = 'msb';

export const persistenceMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();

  // Persist each slice under its own namespaced key
  try {
    Object.entries(state).forEach(([key, value]) => {
      localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
    });
  } catch (e) {
    console.warn('[Persistence] Failed to write to localStorage', e);
  }

  return result;
};

// Hydrate a slice from localStorage (call in configureStore's preloadedState)
export function loadSlice<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${NAMESPACE}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
```

### 4.5 Feature Hooks Pattern

```typescript
// src/features/heroes/heroes.hooks.ts
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setHeroId, setHeroLevel, setHeroAwakenStars, setAscensionLevel } from '../../store/slices/heroesSlice';

// Selectors
export const useHeroId = () => useAppSelector((s) => s.heroes.heroId);
export const useHeroLevel = () => useAppSelector((s) => s.heroes.heroLevel);
export const useAwakenStars = () => useAppSelector((s) => s.heroes.heroAwakenStars);

// Actions
export const useHeroActions = () => {
  const dispatch = useAppDispatch();
  return {
    selectHero: (id: string) => dispatch(setHeroId(id)),
    setLevel: (lvl: number) => dispatch(setHeroLevel(lvl)),
    setAwaken: (stars: number) => dispatch(setHeroAwakenStars(stars)),
    setAscension: (lvl: number) => dispatch(setAscensionLevel(lvl)),
  };
};
```

### 4.6 Rules & Anti-patterns

*   ✅ **DO:** Use `useAppSelector` / `useAppDispatch` everywhere, never raw RTK hooks.
*   ✅ **DO:** Keep all `useSelector` calls inside `[feature].hooks.ts`.
*   ✅ **DO:** Use RTK Immer-powered `state.field = value` directly inside `reducers`.
*   ❌ **DON'T:** Use `useSelector` inside components — always wrap in a feature hook.
*   ❌ **DON'T:** Put async logic in reducers — use `createAsyncThunk` for API calls.
*   ❌ **DON'T:** Store derived/computed values in state — select raw data and compute in selectors or `useMemo`.

---

## 5. State Render Optimization

*   **Derive, Don't Store:** Never store computed stats (DPS, finalATK) in Redux. Compute them in `useMemo` from raw slice values.
*   **Memoize Selectors:** For expensive computations that aggregate multiple slices, use `createSelector` (reselect, included in RTK).
*   **Memoize Child Props:** Use `useCallback` for action callbacks and `React.memo` for pure child components in large lists.

---

## 6. High-Quality UX/UI & Dashboard Heuristics

*   **Visual Hierarchy:** Titles, DPS, and key currencies must be visually dominant (bold gradients, larger fonts).
*   **Color-Coded Feedback:**
    *   *Success/Buffs:* Emerald (`text-emerald-400`)
    *   *Warnings/Missing Resources:* Red (`text-red-400`)
    *   *Primary Currency/Actions:* Amber Gold (`text-amber-400`)
*   **Disabled States:** All upgrade buttons must be disabled when resources are insufficient.
*   **Micro-interactions:** For random generators (like Trait rollers), add simulated delay + hover scales.

---

## 7. Animations & Micro-animations

*   **Transitions:** Apply `transition-all duration-200 ease-in-out` on all cards and buttons.
*   **Hover Scales:** Use `hover:scale-[1.02]` on clickable cards.
*   **Resource Shakes:** CSS keyframe shake animation when a player lacks sufficient resources for an upgrade.
*   **Pulsing Highlights:** `animate-pulse` or custom glow keyframes for recommended upgrade items.

---

## 8. Tool Integration & Icons

*   **Lucide React:** Use consistently. Wrap in `flex items-center` containers with explicit `size={18}`.
*   **Modular Feature Components:** Each feature owns its components. Never place feature-specific components in `shared/`.
