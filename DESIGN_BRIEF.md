# Monas Waqar — Portfolio Redesign Brief

**Approach:** Modify existing site (monaswaqar.me), not a rebuild. Single-page, anchor-nav scroll site.
**Style direction:** Minimal but polished — restraint, precision, confident typography, tasteful motion.

---

## 1. Visual System

### Theme
- **Background:** Cream/off-white (`#F2F0EC` approx — verify exact hex during build), NOT flat — animated via LiquidChrome (see Section 4)
- **Accent:** Monochrome black only. No color accent. High-contrast black-on-cream throughout.
- **Text hierarchy:** Near-black for headings, dark gray for body, mid-gray for secondary/meta text

### Typography
- **Headlines:** Space Grotesk (technical, geometric feel)
- **Body:** Inter (neutral, highly readable)
- Only these two font families — no third font anywhere
- Type scale: bold/oversized headlines, tight letter-spacing on large text, generous line-height on body

### Spacing
- 8px base spacing scale, applied consistently
- Generous whitespace between sections — content should breathe, nothing cramped

### Buttons
- All primary CTAs use **SpecularButton** (see Section 5) — tune `baseColor` to near-black / dark gray to match monochrome system, `textColor` white/cream

---

## 2. Layout & Navigation

**Single page**, all sections on one scroll. Sections in order:
`Hero → About → Education & Certifications → Skills → Projects → Contact → Footer`

### Nav: Floating Pill
- Collapsed state: black rounded pill, top of page, floating (not full-width bar) — shows name + "•••" (three dots) button
- On click: pill expands **downward** into a rounded black panel (smooth grow/scale animation, not instant)
- "•••" becomes "✕" close button
- Inside panel: individual cream/light pill-shaped buttons stacked vertically — **About, Skills, Projects, Contact**
- Each nav item uses **VariableProximity** — letters warp/shift weight as cursor approaches (see Section 5)
- Clicking an item smooth-scrolls to that section and closes the panel
- Nav shows **active-section highlight** — bold/underline whichever section is currently in view while scrolling
- This single pattern serves both desktop and mobile (no separate hamburger needed)

---

## 3. Section-by-Section Content

### Hero
- Name: **Monas Waqar**
- Role (animated): **TextType** cycling through:
  `"DevOps Engineer" → "Cloud Engineer" → "Full Stack Developer"`
- Tagline: *"Building and automating scalable cloud infrastructure with CI/CD, containerization, and modern DevOps practices."*
- Sub-description: *"Based in Lahore, Pakistan. Software Engineering student focused on DevOps, cloud infrastructure, full stack development, and scalable software solutions."*
- CTA buttons (SpecularButton): **View Work**, **Contact Me**, **Resume**
- No photo — pure typographic hero. Background is LiquidChrome (ambient, subtle).
- Load animation: heading/text staggers in on first page load (subtle, not flashy)

### About
Body copy (apply **ScrollReveal** effect — blur + fade + slight rotate-in per word as user scrolls):

> I'm Monas, a Software Engineering student based in Lahore, Pakistan, focused on DevOps, cloud infrastructure, and modern software development.
>
> I'm interested in everything that happens between writing code and running it reliably in production. I've worked with AWS, Linux, CI/CD, server deployment, and full stack applications, with a growing focus on automation, scalability, and reliable infrastructure.
>
> Currently, I'm continuing to build real world projects while expanding my knowledge of cloud engineering, DevOps practices, and modern deployment technologies.

### Education & Certifications
*(Positioned directly after About, before Skills)*

**Education**
- Bachelor of Science in Software Engineering
- University of Central Punjab, Lahore
- Graduating 2028 · GPA 3.5+

**Certifications** (title — issuer — issued date only; no credential IDs or verification links)
- Start Writing Prompts like a Pro — Google — Issued Jun 2026
- Using Python to Access Web Data — University of Michigan — Issued Feb 2025
- Python Data Structures — University of Michigan — Issued Feb 2025
- Programming for Everybody (Getting Started with Python) — University of Michigan — Issued Jan 2025
- Work Smarter, Not Harder: Time Management for Personal & Professional Productivity — UC Irvine Division of Continuing Education / Coursera — Issued Jan 2025

Layout suggestion: Education as a short highlighted card/block, Certifications as a clean list or small card grid beneath it — keep consistent with the monochrome system, no icons/logos required unless it fits cleanly.

### Skills
Categorized list:
- **Cloud:** AWS
- **CI/CD:** GitHub Actions, Jenkins
- **IaC:** Terraform
- **Containers:** Docker, Kubernetes
- **Languages:** Java, Python, C++
- **Database:** MySQL

Below the categorized list, add a **LogoLoop** — horizontally scrolling row of tech logos for all tools above (AWS, GitHub Actions, Jenkins, Terraform, Docker, Kubernetes, Java, Python, C++, MySQL). Use `fadeOut` edges, moderate `speed`, `scaleOnHover` for a nice tactile touch.

### Projects
Single featured project card (scalable — grid/layout should support adding more later without redesign):

**Vaultly**
- One-line: *A smart warranty and receipt management platform that securely organizes product purchases, receipts, and warranty information.*
- Longer description: *Vaultly helps users keep track of their products, receipts, and warranty expiration dates in one centralized dashboard. Built with a full Products CRUD system, secure receipt uploads with AI-powered data extraction, warranty tracking and reminders, search, notifications, and user settings. The application uses Next.js 16, TypeScript, Prisma, Supabase, AWS S3, and Inngest to provide a scalable full-stack architecture.*
- Tech tags: `Next.js 16` `TypeScript` `React` `Tailwind CSS` `Prisma` `Supabase` `PostgreSQL` `AWS S3` `Inngest` `AI` `Zod`
- Live demo: **vaulty.site**
- Screenshots: pending upload (dashboard, product cards, warranty status, receipt info, dark/light UI)
- Card behavior: hover-scale (~1.02x) + shadow lift

### Contact
- Real contact form — needs backend integration (Formspree or equivalent free service)
- Fields: Name, Email, Project/Message
- Submit button: SpecularButton
- Direct links: `monaswaqar01@gmail.com` · [LinkedIn](https://www.linkedin.com/in/monas-waqar/) · [GitHub](https://github.com/Monas-01)

### Footer
- © 2026 Monas Waqar. All Rights Reserved.
- **ScrollVelocity** marquee — scrolling skills text: `AWS · DOCKER · KUBERNETES · TERRAFORM · CI/CD · JENKINS · GITHUB ACTIONS · JAVA · PYTHON · MYSQL ·` (repeating loop)

---

## 4. Background: LiquidChrome (tuned down)

Full-page ambient animated background replacing a static grain texture.

**Tuning direction (start here, adjust to taste):**
- `baseColor`: cream tone, e.g. `[0.95, 0.94, 0.92]` (convert your exact cream hex to normalized RGB)
- `amplitude`: `0.1–0.15` (default 0.3–0.6 is too strong — must feel barely-there)
- `speed`: `0.1` (slow, ambient)
- `interactive`: `true` — subtle mouse-reactive ripple
- Full-page, sits behind all content (z-index below everything, content needs solid contrast to remain readable on top)

---

## 5. Animated Components (React Bits)

All sourced from React Bits — full code provided in `AGENT_PROMPTS.md` for direct copy-paste.

| Component | Used for | Key props to tune |
|---|---|---|
| **TextType** | Hero role cycling | `text=[...]`, `typingSpeed`, `pauseDuration`, `loop=true` |
| **ScrollReveal** | About paragraph | `baseOpacity`, `blurStrength`, `baseRotation` — keep subtle |
| **ScrollVelocity** | Footer marquee | `velocity`, `numCopies` |
| **LiquidChrome** | Page background | see Section 4 |
| **VariableProximity** | Nav menu item hover | `radius`, `falloff` |
| **LogoLoop** | Skills section logos | `speed`, `fadeOut`, `scaleOnHover` |
| **SpecularButton** | All CTAs (Hero, Contact submit, nav actions) | `baseColor` (tune to black/dark gray), `textColor` (white/cream) |

**Additional standard animations (no library component needed, agent implements directly):**
- Section fade + slide-up on scroll entry (~400ms, ease-out)
- Nav active-section highlight (bold/underline current section)
- Hero load stagger (heading elements animate in on first paint)

---

## 6. Functional Requirements
- Contact form needs email delivery — recommend Formspree free tier (or equivalent)
- Resume: PDF to be linked from nav/hero "Resume" button (file pending)
- Fully responsive — nav pill pattern should scale down cleanly to mobile without a separate menu system
- Performance: LiquidChrome is WebGL — test on lower-end devices/mobile, consider disabling or simplifying on mobile if it causes jank

---

## 7. Explicitly Out of Scope (for now)
- No photo of Monas anywhere in the design
- No multi-page routing — everything is anchor-scroll on one page
- No color accent beyond black/monochrome
