# CLAUDE.md

# FM Designs Development Standards

## Mission

Build websites that feel handcrafted by world-class designers and engineers.

Every project should look and feel comparable to the work of companies like:

- Apple
- Linear
- Vercel
- Stripe
- Framer
- Arc Browser
- Notion
- Raycast

Never build websites that look AI-generated.

---

# Core Philosophy

Design first.

Every layout must have a purpose.

Every animation must reinforce hierarchy.

Every section should tell part of a story.

Every interaction should feel intentional.

Prioritize quality over speed.

---

# Design Principles

Avoid:

- Generic centered hero sections
- Random gradients
- Floating glassmorphism cards everywhere
- Oversized rounded buttons
- Excessive blur
- Neon glow effects
- Fake dashboard illustrations
- Template-looking layouts
- Cookie-cutter SaaS designs
- Symmetrical layouts with no rhythm

Instead create:

- Editorial layouts
- Strong typography
- Large imagery
- Cinematic storytelling
- Asymmetrical compositions
- Premium spacing
- Beautiful negative space
- Layered backgrounds
- Elegant motion
- Authentic photography
- Subtle color systems

---

# Typography

Typography is the primary design element.

Prefer typography over decorative UI.

Use scale intentionally.

Good hierarchy is more important than adding components.

Avoid:

- Giant bold headings everywhere
- Tiny unreadable paragraphs
- Multiple font families

Prefer:

- Clean sans-serif fonts
- Large display headings
- Comfortable reading widths
- Strong vertical rhythm

---

# Layout

Every page should have rhythm.

Alternate between:

- image left
- image right
- overlapping content
- split layouts
- full-width imagery
- editorial sections

Never repeat the same layout twice in succession.

Use generous whitespace.

---

# Color

Never use dull gray websites.

Each project should have its own color system.

Use:

- expressive accents
- layered backgrounds
- subtle gradients only when purposeful
- rich neutrals
- accessible contrast

Avoid random rainbow palettes.

---

# Images

# Image Generation

## Image Policy

Never use placeholder images, generic stock illustrations, or lorem ipsum graphics.

Every page should include meaningful, high-quality imagery that supports the narrative and design.

When imagery is required:

1. Check whether the project contains a Hugging Face image generation utility or npm script.
2. If available, use the project's Hugging Face image generation workflow to create original images.
3. Save generated images inside:

public/images/

4. Convert images to WebP when possible.
5. Use descriptive filenames.
6. Optimize images for performance.
7. Generate responsive image sizes when appropriate.

## Prompt Quality

Generate detailed, production-quality prompts.

Avoid vague prompts.

Describe:

- subject
- environment
- lighting
- composition
- camera angle
- focal length
- mood
- materials
- color palette
- realism level
- aspect ratio

Example prompt:

Ultra-realistic editorial photograph of a software engineer working in a premium studio office, cinematic natural lighting, warm walnut desk, modern monitor setup, shallow depth of field, Sony A7R V, 35mm lens, highly detailed, premium workspace, minimal aesthetic, no text, landscape composition.

## Website Imagery

Prefer:

- editorial photography
- cinematic environments
- realistic workspaces
- architectural interiors
- product photography
- device mockups
- macro textures
- abstract materials
- environmental storytelling

Avoid:

- AI-looking illustrations
- cartoon graphics
- generic 3D blobs
- overused SaaS artwork
- obvious AI artifacts

## Fallback

If no Hugging Face image generation utility exists in the project:

- Clearly identify every required image.
- Produce detailed generation prompts.
- Never leave placeholder graphics without explanation.

---

# Motion

Motion should feel premium.

Preferred libraries:

- GSAP
- Motion (formerly Framer Motion) when appropriate

Avoid unnecessary animations.

Use:

- parallax
- reveal animations
- pinned scrolling
- staggered entrances
- cinematic transitions
- scroll storytelling
- image transformations
- subtle hover interactions

Animations should improve usability.

Respect prefers-reduced-motion.

---

# Development

Always use:

- TypeScript
- Next.js App Router (or React + Vite when requested)
- Tailwind CSS
- ESLint
- Prettier

Prefer:

- reusable components
- composition
- server components where appropriate
- lazy loading
- code splitting

Avoid unnecessary dependencies.

---

# Performance

Target:

- Lighthouse 95+
- Fast First Contentful Paint
- Fast Largest Contentful Paint

Always:

- optimize images
- lazy load media
- preload important assets
- avoid layout shift
- minimize bundle size

---

# Accessibility

Always include:

- semantic HTML
- keyboard navigation
- visible focus states
- alt text
- sufficient color contrast
- accessible forms
- ARIA attributes only when needed

---

# Responsive Design

Desktop first for concept.

Then refine for:

- laptop
- tablet
- mobile

Do not simply stack everything vertically.

Re-think layouts for smaller screens.

Ensure animations degrade gracefully.

---

# Components

Every component should:

- have one responsibility
- be reusable
- have clean props
- be typed
- avoid duplicated logic

---

# Forms

Forms should:

- validate properly
- show loading states
- show success states
- show error states
- never freeze

---

# Buttons

Buttons should feel tactile.

Hover:

- slight movement
- subtle elevation
- color transition

Never oversized.

---

# Images & Media

Prefer:

- WebP
- AVIF when supported
- responsive images
- lazy loading

Compress assets.

---

# Code Quality

Write code like a senior engineer.

Always:

- explain architectural decisions when appropriate
- avoid duplication
- avoid deeply nested logic
- use descriptive naming
- remove dead code
- keep files organized

---

# Git

Write meaningful commit messages.

Example:

feat: add cinematic hero animation

fix: improve responsive navigation

refactor: simplify project card component

---

# Project Structure

Organize projects clearly.

Example:

app/

components/

features/

hooks/

lib/

styles/

public/images/

types/

utils/

---

# Before Completing Any Task

Review:

- Is the layout visually interesting?
- Does it feel premium?
- Does it tell a story?
- Is it responsive?
- Is it accessible?
- Is it performant?
- Is the code maintainable?
- Would this impress a senior designer?

If the answer is "no", iterate before considering the task complete.

---

# Final Rule

Never produce work that looks obviously AI-generated.

Aim for craftsmanship.

Prioritize originality, thoughtful interaction design, excellent performance, accessibility, and maintainable code over simply finishing quickly.
