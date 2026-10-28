---
version: v3.0
name: Portfolio v3.0 — Linktree-Inspired Bold Color-Blocking & Tactile Editorial Design
description: "Inspired directly by https://linktr.ee/. Full-viewport solid color-blocked sections, iconic high-contrast color pairings (Forest Canopy #254F1A + Electric Lime #D2E823, Deep Burgundy #780016 + Soft Rose #E9C0E9, Royal Cobalt #2665D6 + Warm Alabaster #F3F3F1), oversized 32px–40px rounded cards with ZERO borders, floating white pill navbar, and heavy 800-weight geometric display typography. Zero dark-mode AI slop."
status: "Specification Ready — Strict Anti-AI-Slop Blueprint"
author: "Mikołaj Mołodecki"
github_handle: "MiniowaPM"
role_positioning: "Software Engineer"
locales: ["en", "pl"]
default_locale: "en"

colors:
  # Core Linktree-Inspired Section & Card Surfaces (Solid, Flat, High-Contrast — NO Gradients, NO Translucent Dark Boxes)
  canopy-green: "#254F1A"       # Hero section background & deep forest cards
  electric-lime: "#D2E823"      # Signature Linktree lime — Hero display accent, primary CTA pills, & highlight cards
  alabaster: "#F3F3F1"          # Warm off-white primary canvas for Projects & Archive sections
  soft-rose: "#E9C0E9"          # Pastel pink/lavender for Engineering section & PlanPM / ALEKSY accents
  deep-burgundy: "#780016"      # Rich crimson/burgundy for Contact section & high-contrast cards
  royal-plum: "#502274"         # Deep violet-plum for AI / ALEKSY card surface
  cobalt-blue: "#0B3B59"        # Deep maritime cobalt for Ocean Simulation card surface
  ice-blue: "#B8E8FC"           # Crisp sky-blue accent paired with Cobalt Blue
  charcoal: "#1E2330"           # Primary dark ink for text on light/pastel surfaces and dark pill buttons
  pure-white: "#FFFFFF"         # Floating navbar surface & crisp card/text contrast

  # Strict High-Contrast Color Pairings (Background -> Text/Headline)
  pair-hero:     { bg: "#254F1A", headline: "#D2E823", body: "#FFFFFF", ctaBg: "#E9C0E9", ctaText: "#1E2330" }
  pair-ocean:    { bg: "#0B3B59", headline: "#B8E8FC", body: "#E2F4FD", pillBg: "#B8E8FC", pillText: "#0B3B59" }
  pair-planpm:   { bg: "#E9C0E9", headline: "#502274", body: "#1E2330", pillBg: "#502274", pillText: "#FFFFFF" }
  pair-drones:   { bg: "#D2E823", headline: "#254F1A", body: "#1E2330", pillBg: "#254F1A", pillText: "#D2E823" }
  pair-aleksy:   { bg: "#502274", headline: "#E9C0E9", body: "#F3F3F1", pillBg: "#E9C0E9", pillText: "#502274" }
  pair-navpm:    { bg: "#254F1A", headline: "#D2E823", body: "#F3F3F1", pillBg: "#D2E823", pillText: "#1E2330" }
  pair-context:  { bg: "#E9C0E9", headline: "#780016", body: "#1E2330", cardBg: "#FFFFFF", cardText: "#1E2330" }
  pair-archive:  { bg: "#F3F3F1", headline: "#1E2330", body: "#4A4F5C", hoverBg: "#D2E823", hoverText: "#1E2330" }
  pair-contact:  { bg: "#780016", headline: "#E9C0E9", body: "#F3F3F1", cardBg: "#502274", ctaBg: "#D2E823", ctaText: "#1E2330" }

typography:
  display:   { family: "Plus Jakarta Sans", weight: 800, size: "clamp(36px, 4.2vw, 68px)", lineHeight: 1.02, tracking: "-0.035em" }
  h1:        { family: "Plus Jakarta Sans", weight: 800, size: "clamp(32px, 3.8vw, 54px)", lineHeight: 1.05, tracking: "-0.03em" }
  h2:        { family: "Plus Jakarta Sans", weight: 800, size: "clamp(24px, 2.5vw, 34px)", lineHeight: 1.12, tracking: "-0.025em" }
  lead:      { family: "Inter", weight: 500, size: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.55, tracking: "-0.01em" }
  body:      { family: "Inter", weight: 500, size: "16px", lineHeight: 1.55, tracking: "-0.005em" }
  tag:       { family: "Inter", weight: 700, size: "13px", lineHeight: 1.20, tracking: "-0.01em" }

radius:
  navbar: 9999                  # Full pill floating navbar (linktr.ee signature)
  section-card: 40              # Oversized tactile card corners (32px on mobile, 40px on desktop)
  media-stage: 24               # Generous rounded inner media frame
  pill-button: 9999             # Chunky full-pill buttons (never sharp 8px boxes)

spacing:
  page-max-width: 1280
  page-gutter: "clamp(20px, 4vw, 56px)"
  grid-gap: 24                  # Bold 24px gap between colorful Bento cards
  section-padding-y: "clamp(80px, 10vw, 136px)" # Full-bleed section vertical padding
  card-padding: "clamp(28px, 3.5vw, 44px)"

motion:
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
  spring: "type: 'spring', stiffness: 260, damping: 22"
---

# Portfolio v3.0 — Linktree-Inspired Architectural & Design Specification

**Owner:** Mikołaj Mołodecki (`MiniowaPM`)  
**Role:** Software Engineer  
**Visual Benchmark:** **[https://linktr.ee/](https://linktr.ee/) (Collins / Linktree Design System)**  

Instead of the cliché 2025/2026 "dark-mode AI portfolio" (`#09090B` background, `#121214` boxes, `1px` white/10 borders, monospace `01 // TELEMETRY` labels, and radial spotlight glows), this portfolio embraces **Linktree's bold, color-blocked editorial design**:
- **Full-viewport solid color zones** where every section transitions into a distinct, high-contrast color world (`#254F1A` Forest Green $\rightarrow$ `#F3F3F1` Warm Alabaster $\rightarrow$ `#E9C0E9` Soft Rose $\rightarrow$ `#780016` Deep Burgundy).
- **Oversized, borderless `36px–40px` rounded cards** in saturated and pastel solid fills with expressive color-paired headlines.
- **Chunky, tactile `rounded-full` pill buttons** and a **crisp white floating pill navbar**.
- **Real project screenshots and photography** presented cleanly inside playful, spring-animated stages.

---

## 1. STRICT ANTI-AI-SLOP RULES (CRITICAL — ZERO TOLERANCE)

Every developer or AI agent working on this codebase MUST obey these hard bans. Anything from the list below immediately makes the site look "vibe-coded" and is **strictly forbidden**:

1. **NO Dark-Mode Crypto/Linear Cliché (`#09090B` / `#121214` Banned):**
   - **NEVER** use `#09090B`, `#121214`, `#18181B`, or dark zinc/slate backgrounds with `1px solid rgba(255,255,255,0.07)` borders.
   - **NEVER** use `SpotlightCard` mouse-tracking radial glows, top "specular highlight" 1px gradients, or `blur-3xl` glowing orbs.
   - Every section and card must be a **100% flat, solid, opaque color surface** with **ZERO border** (`border: none`). Contrast comes from bold color blocking, never from thin 1px lines or shadows.

2. **NO Fake "Tech-Bro / AI Slop" Copywriting or Numbered Section Headers:**
   - **NEVER** write fake robotic labels like `01 // PROJECTS`, `02 // TELEMETRY`, `03 // ARCHIVE`, `04 // CONNECT`, `BACKGROUND & ATHLETIC DISCIPLINE`, `[ CAD_ENCLOSURE_REV4 ]`, `Zero-Cloud Edge AI`, `In Production`, or `Matte Architectural Bento v2.3`.
   - Section headings must be **direct, bold, human display titles** in `Satoshi 800/900` (e.g., *"Selected work that ships."*, *"Built across hardware, graphics & mobile."*, *"More projects & experiments."*, *"Let's build something together."*).

3. **NO `JetBrains Mono` Overload or Middle-Dot Chains:**
   - Do not use `JetBrains Mono` for section headers, descriptions, or fake terminal counters.
   - Technology tags inside colorful project cards use **solid, high-contrast Linktree-style mini pills** (`rounded-full`, `font-sans font-bold text-[13px]`, solid opaque background matching the card's color pair — NEVER translucent `bg-cyan-500/15 border-cyan-500/30` neon pills!).

4. **NO Fake Coded UI Widgets:**
   - **NEVER** draw fake soundwave equalizers, SVG dashed node graphs, fake macOS red/yellow/green window dots, or fake URL bars.
   - **ALWAYS** use real images from `public/images/...` inside clean, generously rounded (`24px`) frames that tilt, fan out, or cross-fade smoothly with spring physics on hover.

5. **NO Pulsing Status Dots (`animate-ping` Banned):**
   - Do not put pulsing green dots in the navbar, on cards, or next to location text.

---

## 2. Floating White Pill Navigation Bar (`linktr.ee` Signature)

Just like `linktr.ee`, the navigation bar is a **solid white (`#FFFFFF`) floating pill** that stays fixed at the top with generous breathing room around it:

* **Positioning & Spacer:**
  * Fixed container at `top: 20px` (`z-50`), centered (`max-width: 1240px`, `width: calc(100% - 32px)`).
  * **CRITICAL OVERLAP PREVENTION:** The Hero section MUST have `padding-top: 136px` (`pt-32 md:pt-36`) so the fixed pill navbar NEVER overlaps the Hero content at scroll position `0`.
* **Visual Style:**
  * `background: #FFFFFF`, `border-radius: 9999px` (`rounded-full`), `height: 72px`, `padding: 10px 12px 10px 28px`, subtle elevation shadow `0 8px 30px rgba(0, 0, 0, 0.10)`.
* **Left:**
  * `Mikołaj Mołodecki` in `Satoshi 900` (`19px`, `#1E2330`, `tracking: -0.03em`).
* **Center Links:**
  * `Projects`, `About`, `Contact` in `Inter 600` (`15px`, `#1E2330`).
  * Hover state: solid soft gray pill (`hover:bg-[#F3F3F1] rounded-full px-4 py-2.5 transition-colors`).
* **Right Actions:**
  * **Language Toggle (`EN` / `PL`):** Solid warm gray pill (`bg-[#F3F3F1] text-[#1E2330] font-bold text-[14px] rounded-full px-4 py-2.5 hover:bg-[#E5E5E0]`).
  * **Primary Action Button (`CV ↗`):** Solid dark charcoal pill (`bg-[#1E2330] text-[#FFFFFF] font-bold text-[15px] rounded-full px-6 py-3 hover:bg-[#2F364A] transition-transform active:scale-95`).

---

## 3. Home Page (`/`) — Full-Viewport Color-Blocked Sections

The Home page is divided into **5 full-bleed (`100vw`) color-blocked sections**. Each section has its own solid background color and high-contrast typography.

---

### Section 01: Hero Block — Canopy Forest Green (`#254F1A`) + Electric Lime (`#D2E823`)
* **Full-Bleed Background:** Solid `#254F1A` (`min-height: 92vh`, `padding-top: 136px`, `padding-bottom: 96px`).
* **Layout (`1280px` container, 12-column grid, `gap: 32px`, vertically centered):**
  * **Left Column (7 Columns):**
    * **Display Headline (`Satoshi 900`, `clamp(44px, 5.8vw, 78px)`, `line-height: 0.98`, `tracking: -0.04em`, color `#D2E823`):**
      * EN: *"Software Engineer building real-time simulations, Edge AI & mobile apps."*
      * PL: *"Software Engineer tworzący symulacje czasu rzeczywistego, Edge AI i aplikacje mobilne."*
    * **Lead Paragraph (`Inter 500`, `19px`, `line-height: 1.5`, color `#FFFFFF`, `max-width: 580px`):**
      * EN: *"Based in Szczecin, Poland (Politechnika Morska). Experience spanning GlobalLogic IoT/AI internship, KNI science club leadership, production Flutter apps used by thousands, and C#/HLSL ocean shaders."*
      * PL: *"Szczecin, Politechnika Morska. Doświadczenie obejmujące staż IoT/AI w GlobalLogic, prowadzenie projektów w kole naukowym KNI, produkcyjne aplikacje Flutter oraz shadery oceanu w C#/HLSL."*
    * **Action Pill Row (`margin-top: 36px`, `flex-wrap`, `gap: 12px`):**
      * **Primary CTA Pill:** `Explore Projects ↓` — Solid Soft Rose (`bg-[#E9C0E9] text-[#1E2330] font-bold text-[16px] rounded-full px-8 py-4 hover:scale-[1.03] transition-transform`).
      * **Secondary Pills:** `GitHub ↗`, `LinkedIn ↗`, `Copy Email` — Solid Electric Lime (`bg-[#D2E823] text-[#1E2330] font-bold text-[15px] rounded-full px-6 py-4 hover:scale-[1.03] transition-transform`).
  * **Right Column (5 Columns) — Interactive Portrait Card Stack:**
    * Oversized rounded card (`rounded-[40px]`, `aspect-[4/4.6]`, `overflow-hidden`, `bg-[#D2E823]`, `p-3`, `shadow-2xl`) that tilts slightly (`rotate: 2deg` $\rightarrow$ `rotate: 0deg` on hover with spring physics).
    * Displays real photos from `PHOTO_DATA[0]` (`/images/HeroPage/Hero/1.jpg`..`5.jpg`) inside a `rounded-[30px]` frame.
    * Clicking the card cycles to the next photo with a spring scale/fade transition.
    * Bottom floating solid pill (`bg-[#FFFFFF] text-[#1E2330] font-bold text-[13px] rounded-full px-4 py-2 shadow-md`): photo caption + `1 / 5` counter.

---

### Section 02: Featured Projects Bento — Warm Alabaster Canvas (`#F3F3F1`) with Bold Color-Blocked Cards
* **Full-Bleed Background:** Solid `#F3F3F1` (`padding: 112px 0`).
* **Section Headline (`Satoshi 900`, `clamp(36px, 4.8vw, 60px)`, color `#1E2330`, `margin-bottom: 48px`):**
  * EN: *"Selected work, from GPU shaders to production apps."*
  * PL: *"Wybrane projekty — od shaderów GPU po aplikacje produkcyjne."*
* **Bento Grid (`12-column` grid, `gap: 24px`):**
  Every card has `border-radius: 36px` (`rounded-[36px]`), **zero border**, `padding: 36px`, and its own signature Linktree color pair. Hovering a card lifts it (`-translate-y-1.5`) and triggers a smooth spring motion on its real media assets:

| Row & Span | Project | Card Surface & Text Colors | Media Stage & Unique Spring Interaction |
| :--- | :--- | :--- | :--- |
| **Row 1 Left (`7 Cols`)** | **Real-Time Ocean Simulation** | **Bg:** Maritime Cobalt `#0B3B59`<br>**Title:** Ice Blue `#B8E8FC`<br>**Body:** `#E2F4FD`<br>**Tags:** Solid `#B8E8FC` pills with `#0B3B59` text | `rounded-[24px]` stage showing `/images/ShipSim/1.jpg`–`4.jpg`. Bottom-right holds 4 rounded image thumbnails (`44×32px`); clicking or hovering any thumbnail smoothly cross-fades the main simulation shot and scales the image (`scale(1.03)`). |
| **Row 1 Right (`5 Cols`)** | **PlanPM — Mobile Application** | **Bg:** Soft Rose `#E9C0E9`<br>**Title:** Deep Plum `#502274`<br>**Body:** `#1E2330`<br>**Tags:** Solid `#502274` pills with `#FFFFFF` text | Two uncropped phone screenshots (`/images/PlanPM/8.jpg` & `9.jpg`) in clean dark frames (`rounded-[24px] shadow-xl`). On card hover, the two phones fan out in opposite angles (`-4deg` and `+4deg`) and rise upward with spring physics. |
| **Row 2 Left (`6 Cols`)** | **World of Drones — GlobalLogic** | **Bg:** Electric Lime `#D2E823`<br>**Title:** Canopy Green `#254F1A`<br>**Body:** `#1E2330`<br>**Tags:** Solid `#254F1A` pills with `#D2E823` text | Main hardware photo (`/images/WorldOfDrones/1.jpg`) in a `rounded-[24px]` frame with a floating secondary card (`/images/WorldOfDrones/2.jpg` — 3D enclosure) in the bottom-right corner that swaps places on click and tilts on hover. |
| **Row 2 Right (`6 Cols`)** | **ALEKSY — Edge Voice Assistant** | **Bg:** Royal Plum `#502274`<br>**Title:** Soft Rose `#E9C0E9`<br>**Body:** `#F3F3F1`<br>**Tags:** Solid `#E9C0E9` pills with `#502274` text | Full 16:10 frame of `/images/ALEKSY/1.webp` (`rounded-[24px]`). Centered solid Electric Lime pill button (`bg-[#D2E823] text-[#1E2330] font-bold rounded-full px-5 py-2.5 shadow-lg`) reading `▶ Watch Demo` that scales up on hover and opens YouTube Shorts. |
| **Row 3 Full (`12 Cols`)** | **NavigatorPM — Campus Wayfinding** | **Bg:** Canopy Green `#254F1A`<br>**Title:** Electric Lime `#D2E823`<br>**Body:** `#FFFFFF`<br>**Tags:** Solid `#D2E823` pills with `#1E2330` text | Horizontal split card (5 cols text on left, 7 cols media on right). Right side displays the uncropped desktop interface (`/images/NavigatorPM/1.png`) in a clean `rounded-[24px]` frame that glides upward and tilts `-1deg` on hover. |

* **Card Footer Anatomy:**
  * Left: Solid mini pills (`rounded-full px-3.5 py-1.5 font-bold text-[12.5px]`) using the card's exact `pillBg` / `pillText` pair.
  * Right: Solid high-contrast pill link (`Case Study →` or `GitHub ↗`).

---

### Section 03: Engineering Context, GitHub & Photography — Soft Rose Block (`#E9C0E9`)
* **Full-Bleed Background:** Solid Soft Rose `#E9C0E9` (`padding: 112px 0`).
* **Section Headline (`Satoshi 900`, `clamp(36px, 4.8vw, 60px)`, color `#780016`, `margin-bottom: 48px`):**
  * EN: *"Code activity, toolkit & team moments."*
  * PL: *"Aktywność w kodzie, technologie i praca zespołowa."*
* **3-Card Bento Row (`12 columns`, `gap: 24px`):**
  1. **GitHub Activity Card (`5 Columns`, `bg-[#FFFFFF]`, `text-[#1E2330]`, `rounded-[36px]`, `p-8`):**
     * Shows real contribution count for `MiniowaPM` in `Satoshi 900` (`40px`, `#254F1A`) + light-mode GitHub contribution calendar (`colorScheme="light"`, empty cells `#F3F3F1`, active ramp from `#A3D977` to `#254F1A`).
     * Bottom solid pill button: `@MiniowaPM on GitHub ↗` (`bg-[#254F1A] text-[#D2E823] rounded-full px-5 py-2.5 font-bold text-[14px]`).
  2. **Technical Toolkit Card (`4 Columns`, `bg-[#780016]`, `text-[#E9C0E9]`, `rounded-[36px]`, `p-8`):**
     * Bold typographic blocks for the 3 domains:
       * **Languages:** `TypeScript · Python · Dart · C# · C++ · HLSL · Java`
       * **Frameworks & Engines:** `Flutter · React · Vue.js · FastAPI · Spring Boot · Unity`
       * **Systems & Hardware:** `Linux · NVIDIA Jetson · Raspberry Pi · STM32 · CI/CD · Supabase`
  3. **Team & Event Photography Card (`3 Columns`, `bg-[#D2E823]`, `text-[#254F1A]`, `rounded-[36px]`, `p-3`):**
     * Displays real photos from `PHOTO_DATA[1]` and `PHOTO_DATA[2]` inside a `rounded-[28px]` image frame.
     * Clicking cycles through the photos; bottom bar holds the caption in bold `#254F1A` and a link pill to `/about` (`More story & photos →`).

---

### Section 04: Archive & Experiments — Warm Alabaster Block (`#F3F3F1`)
* **Full-Bleed Background:** Solid `#F3F3F1` (`padding: 112px 0`).
* **Section Headline (`Satoshi 900`, `clamp(32px, 4vw, 52px)`, color `#1E2330`, `margin-bottom: 40px`):**
  * EN: *"More projects & prototypes."*
  * PL: *"Pozostałe projekty i prototypy."*
* **Tactile Row Cards (8 Projects from `GRID_PROJECTS`):**
  * Each archive item is a clean, solid white pill-bar/card (`bg-[#FFFFFF] text-[#1E2330] rounded-[24px] px-7 py-5 mb-3 transition-all duration-200`).
  * **Hover Effect (Linktree Style):** Hovering a row transforms its background into **Electric Lime (`#D2E823`)** and shifts the title `6px` to the right!
  * **4 Columns per row:**
    1. **Project Title** (`Satoshi 800`, `19px`, `#1E2330`)
    2. **One-line description** (`Inter 500`, `15px`, `#4A4F5C` $\rightarrow$ `#1E2330` on hover, hidden on mobile)
    3. **Tech Stack** (`Inter 700`, `13px`, solid `#F3F3F1` pill $\rightarrow$ `#254F1A` text `#D2E823` pill on row hover)
    4. **Direct Action Pill** (`GitHub ↗` or `Live Demo ↗` in `font-bold text-[14px]`)

---

### Section 05: Contact & Footer Block — Deep Burgundy (`#780016`) + Royal Plum (`#502274`)
* **Full-Bleed Background:** Solid Deep Burgundy `#780016` (`padding: 112px 0 64px 0`).
* **Oversized Centerpiece Card (`rounded-[44px]`, `bg-[#502274]`, `p-8 md:p-14`, 12-column grid inside):**
  * **Left Column (7 Columns):**
    * **Headline (`Satoshi 900`, `clamp(38px, 5vw, 64px)`, color `#E9C0E9`, `line-height: 1.0`):**
      * EN: *"Let's build something together."*
      * PL: *"Zbudujmy coś wspólnie."*
    * **Subtext (`Inter 500`, `18px`, color `#F3F3F1`, `margin-top: 20px`):**
      * Available for software engineering roles, internships, and R&D projects in Szczecin or remotely.
    * **Chunky Action Pills (`margin-top: 36px`, `flex-wrap`, `gap: 14px`):**
      1. **Copy Email** — Solid Electric Lime (`bg-[#D2E823] text-[#1E2330] rounded-full px-7 py-4 font-bold text-[16px]`) — copies `mikolaj.molodecki133@gmail.com` and switches text to `"Copied email! ✓"`.
      2. **GitHub (`@MiniowaPM`) ↗** — Solid Soft Rose (`bg-[#E9C0E9] text-[#1E2330] rounded-full px-7 py-4 font-bold text-[16px]`).
      3. **LinkedIn ↗** — Solid White (`bg-[#FFFFFF] text-[#1E2330] rounded-full px-7 py-4 font-bold text-[16px]`).
      4. **Download CV (PDF) ↓** — Solid Canopy Green (`bg-[#254F1A] text-[#D2E823] rounded-full px-7 py-4 font-bold text-[16px]`).
  * **Right Column (5 Columns):**
    * Interactive photo card (`rounded-[32px]`, `bg-[#E9C0E9]`, `p-3`) cycling through `PHOTO_DATA[3]` (`/images/HeroPage/Contact/1.jpg`..`5.jpg`) with a bold caption pill.

---

## 4. Subpages Specification (`/projects/[slug]` & `/about`)

### `/projects/[slug]` — Project Case Study Page
* **Top Hero Banner:** Uses the project's signature color pair (e.g., `#0B3B59` + `#B8E8FC` for Ocean Sim, `#E9C0E9` + `#502274` for PlanPM, `#D2E823` + `#254F1A` for World of Drones, `#502274` + `#E9C0E9` for ALEKSY, `#254F1A` + `#D2E823` for NavigatorPM) with `padding-top: 136px`, `padding-bottom: 72px`.
  * `← Back to all projects` pill button (`bg-white/90 text-[#1E2330] rounded-full px-5 py-2.5 font-bold text-[14px]`).
  * Project Title in `Satoshi 900` (`clamp(36px, 5vw, 64px)`), lead paragraph, metadata pills (`Status`, `Team`), and primary external links (`Google Play ↗`, `App Store ↗`, `GitHub ↗`, `Watch Demo ↗`).
* **Body Section (`bg-[#F3F3F1] text-[#1E2330] py-20`):**
  * **Interactive Media Showcase:** Large `rounded-[32px]` stage with thumbnail selector for all project screenshots (`project.images`).
  * **3 Editorial Cards (`rounded-[32px] bg-[#FFFFFF] p-8 md:p-10`):**
    1. *System Architecture & Implementation*
    2. *Key Technical Challenges*
    3. *Results & Engineering Takeaways*
  * **Behind-the-scenes Team Photos** in `rounded-[28px]` frames where applicable.

### `/about` — Background, Story & Photo Gallery
* **Top Hero Banner (`bg-[#254F1A] text-[#D2E823]`, `padding-top: 136px`, `padding-bottom: 80px`):**
  * `← Back to overview` pill button.
  * Headline (`Satoshi 900`) & introduction narrative.
* **4 Color-Blocked Story Cards (`bg-[#F3F3F1] py-20`, 2×2 grid of `rounded-[36px]` cards):**
  1. *Maritime University of Szczecin* (`bg-[#0B3B59] text-[#B8E8FC]`)
  2. *KNI Science Club Leadership* (`bg-[#E9C0E9] text-[#502274]`)
  3. *GlobalLogic IoT & Edge AI Internship* (`bg-[#D2E823] text-[#254F1A]`)
  4. *Volleyball, Skiing & Kayaking* (`bg-[#780016] text-[#E9C0E9]`)
* **Photo Gallery (`bg-[#E9C0E9] py-20`):**
  * Category filter pills (`All`, `Sports`, `Teamwork`) in solid `#780016` / `#FFFFFF`.
  * 3-column grid of `rounded-[32px] bg-[#FFFFFF] p-3` photo cards displaying all 11 photos from `PHOTO_DATA[1]` and `PHOTO_DATA[2]`.