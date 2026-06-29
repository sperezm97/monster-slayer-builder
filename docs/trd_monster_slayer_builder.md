# Technical Requirements Document (TRD)
## Project: Monster Slayer Builder

---

## 1. System Requirements & Stack Specifications

*   **Runtime Environment:** Node.js v18.0.0+ / npm v9.0.0+
*   **Framework:** React 19.x (using TypeScript)
*   **State Management:** Redux Toolkit (RTK) 2.x with state persistence (hydration from localStorage)
*   **Bundler:** Vite 8.x
*   **Styling Engine:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
*   **Icons:** Lucide React 0.x
*   **Compilation Settings:** TS compiler target ES2022, `verbatimModuleSyntax: true` (requiring type-only imports for strict type definitions).

---

## 2. Architecture & Directory Layout

The application utilizes **Atomic Design** for shared UI elements and **Vertical Slices** to isolate domain features.

### 2.1 UI Architecture (Atomic Design)

Shared components are grouped under `src/components/shared/` according to their complexity level:

| Level | Description | Examples |
|:------|:-----------|:---------|
| **Atoms** | Indivisible UI primitives | `Button`, `Badge`, `StatInput`, `Icon`, `ProgressBar` |
| **Molecules** | Combinations of 2+ atoms | `CurrencyDisplay`, `TabHeader`, `TraitSlotRow`, `GradeTag` |
| **Organisms** | Complex, standalone UI blocks | `SidebarStats`, `NavigationTabBar`, `OptimizationAdvisor` |
| **Templates** | Page layout shells | `DualColumnDashboardTemplate`, `FullWidthTabTemplate` |

### 2.2 Domain Architecture (Vertical Slices)

Each game system is modeled as a self-contained **feature slice** under `src/features/`. Every slice owns its UI components, Redux state, hooks, utilities, tests, and future service connectors — keeping the domain completely isolated and independently testable.

The canonical structure of a feature slice is:

```text
src/features/[feature]/
├── [feature].errors.ts       # Custom error classes and error boundary handlers for this domain
├── [feature].page.tsx        # Top-level React page component (consumed by the router/tab switcher)
├── [feature].test.ts         # Unit and integration tests (Vitest + Testing Library)
├── [feature].hooks.ts        # Custom React hooks wrapping RTK selectors and dispatched actions
├── components/               # Feature-specific UI components (Atoms / Molecules / Organisms)
│   ├── [ComponentA].tsx
│   └── [ComponentB].tsx
├── [feature].util.ts         # Pure helper functions: stat formulas, cost calculations, probability
├── [feature].md              # Documentation: domain rules, game mechanic references, scaling notes
└── [feature].services.ts     # External data sources, future API calls, remote persistence adapters
```

#### Applied Slices (12 Game Systems)

```text
src/features/
├── heroes/
│   ├── heroes.errors.ts
│   ├── heroes.page.tsx
│   ├── heroes.test.ts
│   ├── heroes.hooks.ts
│   ├── components/
│   │   ├── HeroCard.tsx
│   │   └── HeroSelector.tsx
│   ├── heroes.util.ts
│   ├── heroes.md
│   └── heroes.services.ts
├── skills/
├── equipment/
├── mastery/
├── relics/
├── traits/
├── awaken/
├── ascension/
├── pets/
├── alchemy/
├── world/
└── zodiac/
```

### 2.3 Redux Store & Persistence

Global state is managed using **Redux Toolkit** under `src/store/`. A persistence middleware serializes each slice's state to `localStorage` and rehydrates it on app startup, replacing the previous React Context approach.

```text
src/store/
├── index.ts                  # configureStore() wiring all slices + persistence middleware
├── persistenceMiddleware.ts  # Subscribes to state changes and serializes to localStorage
└── slices/
    ├── heroesSlice.ts        # createSlice for hero selection, level, awaken stars
    ├── skillsSlice.ts        # createSlice for equipped skills and skill levels
    ├── equipmentSlice.ts     # createSlice for gear slots, rarities, levels
    ├── masterySlice.ts       # createSlice for mastery node levels
    ├── relicsSlice.ts        # createSlice for relic levels
    ├── traitsSlice.ts        # createSlice for trait slots and rolled grades
    ├── petsSlice.ts          # createSlice for pet levels and equipped pets
    ├── alchemySlice.ts       # createSlice for active potions
    ├── worldSlice.ts         # createSlice for current stage progress
    ├── zodiacSlice.ts        # createSlice for unlocked zodiac nodes
    └── currencySlice.ts      # createSlice for gold, gems, masteryPoints, etc.
```

#### LocalStorage Persistence Schema

Each slice is stored independently under a namespaced key. Sample keys:

| Key | Content |
|:----|:--------|
| `msb:heroes` | `{ heroId, heroLevel, heroAwakenStars, ascensionLevel }` |
| `msb:skills` | `{ equippedSkills, skillLevels }` |
| `msb:equipment` | `{ weapon, armor, ring, amulet }` — each `{ id, rarity, level }` |
| `msb:mastery` | `{ atk_mastery: 5, hp_mastery: 3, ... }` |
| `msb:relics` | `{ golden_grail: 2, ... }` |
| `msb:traits` | Array of 5 `TraitSlot` objects |
| `msb:pets` | `{ petLevels, equippedPets }` |
| `msb:alchemy` | `{ activePotions }` |
| `msb:world` | `{ currentStage }` |
| `msb:zodiac` | `{ unlockedZodiacNodes }` |
| `msb:currency` | `{ goldOwned, gemsOwned, masteryPointsOwned, ... }` |

### 2.4 Full Source Directory Layout

```text
src/
├── types/
│   └── game.ts                   # TypeScript interface schemas for all 12 systems
├── data/
│   └── gameData.ts               # Static game database (heroes, skills, gear templates, etc.)
├── utils/
│   └── calculations.ts           # Stats engine: ATK, HP, DPS, Crit, Gold formulas
├── store/
│   ├── index.ts
│   ├── persistenceMiddleware.ts
│   └── slices/
├── components/
│   └── shared/
│       ├── atoms/
│       ├── molecules/
│       └── organisms/
├── features/
│   ├── heroes/
│   ├── skills/
│   ├── equipment/
│   ├── mastery/
│   ├── relics/
│   ├── traits/
│   ├── awaken/
│   ├── ascension/
│   ├── pets/
│   ├── alchemy/
│   ├── world/
│   └── zodiac/
├── App.tsx                        # Layout shell, tab routing
├── index.css                      # Tailwind v4 + dark base styles + scrollbars
└── main.tsx                       # App entry: Redux <Provider> wraps <App />
```

---

## 3. Mathematical Calculations Model

The calculations engine computes final stats using sequential aggregation of flat values and additive/multiplicative percentage multipliers.

### 3.1 Attack (ATK) Calculation
$$\text{Base ATK} = \text{Hero Base ATK} + (\text{Hero Level} - 1) \times \text{ATK Scale}$$
$$\text{Flat Gear ATK} = \sum \text{Flat ATK values from Weapons}$$
$$\text{Percent ATK Multipliers} = \sum \text{Gear Ring \%} + \text{Mastery \%} + \text{Relic \%} + \text{Pet \%} + \text{Trait \%} + \text{Awaken \%} + \text{Zodiac \%} + \text{Passive Skill \%}$$
$$\text{Final ATK} = (\text{Base ATK} + \text{Flat Gear ATK}) \times (1 + \text{Percent ATK Multipliers}) \times (1 + \text{Ascension Level} \times 0.15)$$

### 3.2 Health Points (HP) Calculation
$$\text{Base HP} = \text{Hero Base HP} + (\text{Hero Level} - 1) \times \text{HP Scale}$$
$$\text{Flat Gear HP} = \sum \text{Flat HP values from Armor}$$
$$\text{Percent HP Multipliers} = \sum \text{Gear Amulet \%} + \text{Mastery \%} + \text{Relic \%} + \text{Pet \%} + \text{Awaken \%} + \text{Passive Skill \%}$$
$$\text{Final HP} = (\text{Base HP} + \text{Flat Gear HP}) \times (1 + \text{Percent HP Multipliers}) \times (1 + \text{Ascension Level} \times 0.15)$$

### 3.3 Critical Strike & Attack Speed
*   **Critical Chance (Crit Rate):** $\text{Final Crit Rate} = \text{Base (5\%)} + \text{Mastery} + \text{Pet} + \text{Passive Skills}$ (Capped at 100%)
*   **Critical Damage:** $\text{Final Crit Damage} = \text{Base (150\%)} + \text{Mastery} + \text{Trait} + \text{Zodiac}$
*   **Attack Speed:** $\text{Final Attack Speed} = 1.0 + \text{Zodiac Atk Speed} + \text{Passive Skills Atk Speed}$
*   **Cooldown Reduction (CD):** $\text{Final CD Reduction} = \text{Trait CD} + \text{Zodiac CD}$ (Capped at 75%)

### 3.4 Estimated Damage Per Second (DPS)
$$\text{Base Attack DPS} = \text{Final ATK} \times \text{Final Atk Speed} \times \left(1 + \text{Crit Rate} \times (\text{Crit Damage} - 1)\right)$$
$$\text{Skills DPS} = \sum_{active} \left( \frac{\text{Skill Mult}}{\text{Cooldown} \times (1 - \text{CD Reduction})} \right) \times \text{Final ATK} \times (1 + \text{Awaken Skill DMG \%})$$
$$\text{Final Estimated DPS} = \text{Base Attack DPS} + \text{Skills DPS}$$

---

## 4. UI/UX Style Guidelines

*   **Color Palette:**
    *   *Base:* Slate Dark `#0b0c10` (Background), Slate Medium `#0f172a` (Panels).
    *   *Highlight:* Amber Gold `#eab308` (Titles, Primary Buttons, Selectors).
    *   *Elements:* Fire `#ef4444` · Water `#0ea5e9` · Earth `#10b981` · Dark `#a855f7`
    *   *Rarities:* Common `#6b7280` · Rare `#3b82f6` · Epic `#a855f7` · Legendary `#f59e0b` · Mythic `#ef4444`
*   **Frosted Glass Pattern:** `backdrop-blur-md bg-slate-900/60 border border-slate-800`
*   **Responsive Layout:** `grid grid-cols-1 lg:grid-cols-4 gap-6` for main shell; tab panel scrolls independently.
