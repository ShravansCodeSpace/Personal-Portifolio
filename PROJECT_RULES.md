# Project Rules

## Product Direction
- Build an Obsidian Kinetic portfolio that positions Shravan Chinnaram as an adaptable engineer: deep SAP Commerce specialist, delivery owner, integration builder, and emerging AI practitioner.
- Every section must advance the story: achievements, works/modules, rewards/recognition, capability proof, leadership, and learning velocity.
- Resume content is the primary source of truth. Do not invent, inflate, or add technologies, responsibilities, metrics, projects, certifications, education details, or achievements unless explicitly provided by Shravan.
- Do not introduce unrelated concepts or visual gimmicks unless they directly support this engineering story.

## Design System
- Visual tone: Obsidian Kinetic, industrial futurism, minimal glassmorphism, pitch-black foundation, metallic text, technical precision.
- Preserve the visual identity from `/Users/admin/Downloads/stitch_heic_pattern_transformer/DESIGN.md` and `screen.png`; do not invent a new visual direction without explicit approval.
- Core tokens:
  - Pitch black: `#0C0C0C`
  - Background/surface: `#131314`
  - Surface container lowest: `#0e0e0f`
  - Surface container low: `#1b1c1c`
  - Surface container: `#1f2020`
  - Surface bright: `#393939`
  - Primary: `#fcfdff`
  - Primary container: `#d7e2ea`
  - On surface: `#e4e2e2`
  - On surface variant: `#c4c7ca`
  - Secondary text: `#646973`
  - Outline variant: `#43474a`
- Use a white capability band only where the reference does; otherwise keep the pitch-black industrial canvas.
- Components use CSS variables and semantic Tailwind tokens rather than hardcoded component colors.

## Typography
- Use `next/font` with Kanit for display/headlines, Inter for body copy, and Geist-style mono labeling for technical labels.
- Headings are uppercase with tight tracking to match the reference image.
- Keep paragraphs short. Prefer proof-led bullets, chips, and metric blocks over long resume-style text.

## Motion Principles
- Motion must be restrained, purposeful, and aligned with the Obsidian Kinetic reference.
- Use Framer Motion for reveal-on-scroll, staggered lists, marquee motion, and sticky card entrances.
- Reveal motion should use fade + 60-80px slide + slight scale, trigger around 20% viewport entry, and apply stagger to lists, cards, skills, projects, and timeline items.
- Secondary motion: soft hover elevation, subtle glows, and progress indicators.
- Always respect `prefers-reduced-motion`; reduced-motion users should see static content with no essential information hidden.
- Avoid heavy JavaScript loops, uncontrolled canvas animation, or fixed animated decorative elements.

## Accessibility
- Maintain strong contrast on all text.
- Keyboard focus states must be visible.
- Links and buttons need meaningful labels.
- Content must remain readable without animation or JavaScript-driven enhancement.
- Privacy is a hard requirement: never expose mobile number, personal photos, government IDs, private documents, addresses, or unrelated personal information in the portfolio.
- Public contact/profile information is limited to email and LinkedIn URL only.

## Component Architecture
- Keep the current rebuild simple: Next.js App Router with TypeScript and Tailwind.
- Use typed data files under `lib/data`.
- Place section components under `components/sections`.
- Place reusable primitives under `components/ui`.
- Use client components only where interactivity or Framer Motion requires them.

## Coding Conventions
- Use TypeScript, semantic HTML, and accessible landmark sections.
- Use `next/image` for local images.
- Use absolute asset paths under `/assets/...`.
- Keep edits scoped to the new portfolio. Do not restore removed legacy code.
- Run `next build` and `tsc --noEmit` before handing off.
