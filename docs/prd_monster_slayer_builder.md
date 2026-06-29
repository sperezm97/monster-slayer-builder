# Product Requirements Document (PRD)
## Project: Monster Slayer Builder Web Application

---

## 1. Overview & Objective

### 1.1 Goal
Create **Monster Slayer Builder**, a web-based companion application for the mobile game *Monster Slayer: Idle RPG*. The application will enable players to simulate, calculate, and optimize character builds across all progression systems (Heroes, Skills, Equip, Masteries, Relics, Traits, Awaken, Ascension, Pets, Alchemy, World, Zodiac). 

### 1.2 Target Audience
*   **Active Players:** Who want to calculate their current stats and find the most cost-effective upgrade paths.
*   **Theorycrafters / Min-Maxers:** Who want to simulate end-game gear setups, skill combos, and Zodiac configurations to maximize DPS (Damage Per Second) and Gold gain.

---

## 2. Core Game Systems to Support

The app must model the following 12 progression systems, showing their descriptions, levels, stats, and custom icons/images:

| System | Description & Core Progression Mechanics |
| :--- | :--- |
| **Heroes (Héroes)** | Base character selection (e.g., Ranger, Knight, Mage) with distinct growth curves. |
| **Powers (Poderes/Habilidades)** | Equippable active/passive skills. Calculation of skill multipliers, cooldowns, and element types. |
| **Equipment (Equipos)** | Weapons, Armor, Rings, and amulets. Includes Rarity (Common to Mythic), Enhancement Level (+0 to +200), and Set Bonuses. |
| **Masteries (Maestrías)** | A points-based passive stat tree (ATK, HP, Gold Gain, Crit Rate) unlocked via levels. |
| **Relics (Reliquias)** | Permanent relics leveled up with special dungeon currencies, yielding multiplicative global stats. |
| **Traits (Atributos)** | Random slots rolled (Grade C to SS) for bonuses like Boss DMG, ATK%, CD Reduction. |
| **Awaken (Despertar)** | Hero-specific star ascension tiers that unlock passive nodes or amplify skill effects. |
| **Ascension (Ascensión)** | Account prestige tier that resets temporary gold levels for permanent stat multipliers. |
| **Pets (Mascotas)** | Companion slots providing passive bonus multipliers and active combat support skills. |
| **Alchemy (Alquimia)** | Potions brewed for timed or passive boosts to material drop rates, gold, and stat scales. |
| **World (Mundo)** | Stage milestones simulator showing recommended DPS thresholds for stages/dungeons. |
| **Zodiac (Zodíaco)** | Stellar constellation tree requiring stardust to activate, boosting specific weapon types or attributes. |

---

## 3. Key Features

### 3.1 Profile & Progression Hub
*   **My Profile:** Users can input their current level/stats for every system.
*   **LocalStorage Save/Load:** Automatically save state changes to `localStorage` so player data persists across sessions. Support export/import of profile JSONs.

### 3.2 Multi-Variant Builder & Calculator
*   **Character Stat Panel:** A real-time calculated dashboard showing:
    *   *Offensive:* Base ATK, Bonus ATK%, Critical Hit Chance%, Critical Damage%, Attack Speed, Cooldown Reduction%, Element DMG.
    *   *Defensive:* HP, Defense, Damage Reduction%, Regeneration.
    *   *Utility:* Gold Gain%, EXP Gain%, Game Speed Multiplier, Double Drop%.
*   **Interactive Tabs:** 12 tabs corresponding to the 12 game systems, allowing users to increment levels, equip items, or allocate points.

### 3.3 Strategy & Path Optimization Engine
*   **DPS Optimizer:** Analyzes the cost (in gold/gems/currency) of upgrading different systems (e.g., Masteries vs. Equipment) and recommends the next best upgrade for the highest stat boost per unit of currency.
*   **Loadout Builder:** Recommends optimal Skill & Pet combinations based on the active game mode (Farming vs. Boss Rush vs. Dungeon).

---

## 4. Visual Design & Interface (UX/UI)

### 4.1 Aesthetics
*   **Theme:** RPG-focused dark theme (Deep slate grey/charcoal `#0F172A`, gold accents `#EAB308`, and vibrant element colors).
*   **Glassmorphism:** Frosted panel overlays (`backdrop-blur`) and micro-animations on interactive cards.
*   **Modern Typography:** Inter / Outfit font sets.
*   **Visual Assets:** High-quality icons for skills, gear, pets, and systems using custom SVGs or procedurally styled icons with Tailwind colors.

---

## 5. Technical Requirements

*   **Framework:** React 19 / Vite.
*   **Styling:** Tailwind CSS (Utility classes and custom components).
*   **State Management:** React Context or a clean state slice pattern.
*   **Persistence:** JSON Serialization to `localStorage`.
*   **Responsive Web Design:** Fully optimized for both desktop and mobile viewports (since the target audience plays on mobile).

---

## 6. Development Milestones

1.  **Phase 1: Foundation & Data Modeling:** Set up project workspace, model the stat equations, and create the mock data structure for all 12 systems.
2.  **Phase 2: UI Shell & Stat Dashboard:** Build the dashboard, profile tabs, and localStorage syncing.
3.  **Phase 3: Interactive Sub-Systems:** Implement individual builders (Equipment selector, Mastery allocator, Skill bar).
4.  **Phase 4: Optimization Engine:** Implement recommendation logic (DPS & Gold upgrades advisor).
5.  **Phase 5: Refinement, Assets & Polish:** Add tooltips, animations, visual effects, and verify build correctness.
6.  **Phase 6 (Pending): API Integration & Real Game Data:** Investigate and connect to any available official or community APIs to replace static mock data with live game data (see Section 7).

---

## 7. ⏳ PENDING — External API & Live Game Data Integration

> [!IMPORTANT]
> This section is a **pending investigation item** to be prioritized in a future development phase. No implementation has started. The goal is to replace the current static `gameData.ts` mock database with live, accurate game data sourced from an authoritative API.

### 7.1 Problem Statement
All current game data (hero names, skill multipliers, equipment sets, mastery costs, zodiac nodes, etc.) is hardcoded in `src/data/gameData.ts` based on community-sourced research. This means:
*   Values may be outdated when Fansipan releases game updates.
*   Adding new heroes, relics, or zodiac constellations requires a manual code change and redeploy.
*   Player-facing images and real icon assets are not available without an official content API.

### 7.2 Sources to Investigate

| Source | Type | Status | Notes |
|:-------|:-----|:-------|:------|
| **Fansipan Official API** | Official | 🔍 Pending investigation | No public API documented yet. Contact via official Discord. |
| **Google Play / App Store Metadata** | Semi-official | 🔍 Pending | Game store listings may expose versioned asset bundles. |
| **Community Wiki (Fandom/GamePress)** | Community scrape | 🔍 Pending | A Fandom wiki with structured game data could be scraped or converted to a static JSON feed. |
| **Data Mining / APK Extraction** | Community | 🔍 Pending | Some players extract game data from APK files. Legal and ethical review required before use. |
| **TapTap Community Database** | Community | 🔍 Pending | TapTap hosts reviews and guides that may reference structured data. |

### 7.3 Proposed Implementation (Future Phase)
If a usable API or data feed is identified:
1.  Each feature's `[feature].services.ts` file will implement the API client calls.
2.  RTK Query (`createApi`) will be adopted to cache, invalidate, and re-fetch game data efficiently.
3.  An ADR entry must be created documenting the chosen data source and any legal/licensing considerations.
4.  The static `gameData.ts` file will be migrated to serve as an offline fallback only.

### 7.4 Action Items
- [ ] Research whether Fansipan Limited exposes any public REST or GraphQL API.
- [ ] Evaluate the Monster Slayer Fandom Wiki for structured exportable game data.
- [ ] Review legal terms for APK data extraction.
- [ ] Prototype a `heroes.services.ts` API integration with mock endpoints to validate the architecture.
