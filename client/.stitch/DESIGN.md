# Design System Strategy: The Modern Lexicon (Navy & Elevated Edition)

## 1. Overview & Creative North Star
K-Dict is a personal English-to-Vietnamese learning assistant for developers. It leverages a dark navy dashboard theme centered around **The Modern Lexicon** — which elevates lexical definition lookups and translation workflows into a highly readable, premium, and structured coding dashboard.

Instead of generic colors and solid divisions, it features a modern sky-blue primary accent, elevated card items with classic depth shadows, and bubble-up micro-interactions, making it an engaging and visual self-study tool.

---

## 2. Colors & Surface Philosophy
The system is built on a deep navy slate palette with a clean sky-blue primary color.

### Color Tokens
*   **Base Canvas (`background`):** `#0b0f19` - A deep dark navy base.
*   **Sidebar/Header Containers (`surface_low`):** `#0f172a` - Sidebar background.
*   **Vocabulary & Interactive Cards (`surface_lowest`):** `#161e2e` - Elevated cards and inputs.
*   **Primary Brand Color (`primary`):** `#3C94D4` - Modern sky-blue accent used for buttons, active state highlights, and title accents.

### Structural Divisions
*   **Sidebar Borders:** Features a solid `1px solid rgba(60, 148, 212, 0.15)` border on the right to divide the navigation panel from the main workspace.
*   **Pills & Badge Tints:** Vocabulary cards display categorization pills with low-opacity pastel-navy colors:
    *   *Word*: Green tint (`rgba(16, 185, 129, 0.1)` / `#10b981`)
    *   *Phrase*: Blue/Indigo tint (`rgba(79, 70, 229, 0.1)` / `#4f46e5`)
    *   *Sentence*: Amber/Orange tint (`rgba(245, 158, 11, 0.1)` / `#f59e0b`)

---

## 3. Typography
To separate administrative UI labels from English/Vietnamese content:
*   **Headlines (Outfit):** Heavy, bold typography used for main headwords and page titles to establish structure.
*   **Definitions & Translations (Inter):** Highly readable body font at all weights for translation banners, definitions, and explanations.
*   **Phonetics & Metadata (Space Grotesk):** Geometric font used for grammatical type badges (`word`, `phrase`, `sentence`) and metadata tags.

---

## 4. Elevation, Depth & Hover Animations
*   **Elevated Shadows:** Cards and active inputs utilize physical depth elevation:
    *   `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15)`
*   **Bubble-Up Hover Animation:** Hovering over vocabulary cards, list items, or buttons causes them to gently rise and expand their glow to invite clicks:
    *   `transform: translateY(-4px) scale(1.005)`
    *   `box-shadow: 0 8px 24px rgba(60, 148, 212, 0.15), 0 4px 8px rgba(0, 0, 0, 0.12)`
*   **Moderate Roundness:** Border-radii are constrained to moderate, semi-square values to give a classic feel:
    *   `--radius: 8px`
    *   `--radius-lg: 10px`
