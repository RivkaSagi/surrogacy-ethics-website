# Surrogacy Ethics Website - Rewrite Implementation Plan

## Project Overview

Rewriting the surrogacy-ethics-website from scratch while preserving the main structure. The current `src/` will be renamed to `src-legacy/` and a new implementation will be built based on the Figma design with specific modifications.

## Project Location
`~/dev/my/surrogacy-ethics-website/`

## Figma Design
- **URL**: https://www.figma.com/design/8vi0GaQEUktNpAqCF6hTc8/Surrogacy-site?node-id=0-1
- **File Key**: `8vi0GaQEUktNpAqCF6hTc8`
- Main page frame: `1:64` (Surrogacy)
- Update card component: `34:241` (Default), `34:243` (Hover with arrow)
- Arrow icon node: `34:253` (north_east)
- Background circles: `1:136` (BGcircles)

## Figma MCP Setup
- Figma MCP server configured at user scope in `~/.claude.json` under `mcpServers.figma`
- Current URL: `http://127.0.0.1:3845/mcp`
- **Note**: URL changes when Figma Desktop restarts - update in `~/.claude.json` if connection fails

---

## Content Sources

### Local Files (Static Content)

| Content | Source Path | Notes |
|---------|-------------|-------|
| 10 Ethical Principles | `~/dev/my/ethical principles.md` | Markdown with bold text formatting |
| About Summary | `~/dev/my/about.md` | 2 paragraphs |
| Team Members | `~/dev/my/participates/` | 9 people (image + .docx description each) |
| Partner Logos | `~/dev/my/partner logos/` | Currently: `bria.png`, `haaguda.png` (scalable for more) |

### Remote Fetching (Keep from Legacy)

| Data | Source | Method |
|------|--------|--------|
| Updates/News | Google Doc | Fetch HTML, parse paragraphs |
| Signatories List | Google Sheets | Fetch CSV, parse with PapaParse, **keep sorting/filtering from legacy** |

---

## Design Tokens (from Figma)

### Colors
```typescript
colors: {
  background: "#fff9f4",   // Page background
  primary: "#d0674e",      // CTA buttons, accents (clay)
  highlight: "#ffc5b2",    // Subtitle underlines, update card hover border
  dark: "#1f1c1b",         // Footer background
  border: "#e49c84",       // Section dividers
  text: "#000000",         // Body text
  white: "#ffffff",
}
```

### Font
- **Heebo** (Hebrew-optimized) - Regular 400, Bold 700
- Replaces current Rubik + Secular One

### Typography
```
H2: Heebo Regular, 36px
Body: Heebo Regular, 18px
Button/Nav: Heebo Bold, 14px
Subtitle: Heebo Bold, 18px
```

---

## Components Specification

### Header (`Header.tsx`)
| Property | Value |
|----------|-------|
| Background | **Solid `#fff9f4`** (NO transparency) |
| Position | Sticky top |
| Content | Logo image (right) + Nav links (left) + CTA button |
| Nav Links | "מי אנחנו" → `/team`, "אנשי המקצוע החתומים" → `/signatories` |
| Mobile | Hamburger menu |

### LogoSection (`LogoSection.tsx`)
| Property | Value |
|----------|-------|
| Content | Animated SVG logo (**placeholder for scroll animation - deferred**) |
| Title | "הקוד האתי לפונדקאות בישראל" |
| Note | Leave placeholder div with scroll listener hook for future animation |

### Background Half-Circle (`BGHalfCircle.tsx`)
| Property | Value |
|----------|-------|
| Shape | **Half circle with flat base** (semicircle, not full ellipse) |
| Size | Radius calculated so **top is at 80vh** |
| Behavior | Scrolls with content, stops before footer |
| Color | Light peachy tone from Figma |

### Subtitle Component (`Subtitle.tsx`)
| Property | Value |
|----------|-------|
| Style | Bold text + highlight bar underneath |
| Highlight color | `#ffc5b2` |
| Reusable | Yes, with `text` prop |

### BulletItem Component (`BulletItem.tsx`)
| Property | Value |
|----------|-------|
| Structure | Decorative circle + Title (H2) + Description |
| Title | Principle name (e.g., "שותפות") |
| Description | Text with preserved **bold** sections from markdown |
| Count | 10 items |

### EthicCodeSection (`EthicCodeSection.tsx`)
| Property | Value |
|----------|-------|
| Data | Static from `~/dev/my/ethical principles.md` |
| Structure | Subtitle + 10 BulletItems + CTA button |
| CTA | "לקריאת הקוד האתי המלא" → Opens PDF in **new browser tab** |
| Border | Bottom border `#e49c84` |

### PrimaryButton Component (`PrimaryButton.tsx`)
| Property | Value |
|----------|-------|
| Background | `#d0674e` |
| Text | White, Heebo Bold 14px |
| Border radius | 16px |
| Padding | 8px 24px |
| Hover | Slight darken |
| Variants | `href` prop for link vs `onClick` for action |

### PartnersSection (`PartnersSection.tsx`)
| Property | Value |
|----------|-------|
| Data | Static images from `~/dev/my/partner logos/` |
| Current logos | `bria.png`, `haaguda.png` |
| Layout | Centered flex, responsive wrap |
| Border | Bottom border `#e49c84` |
| Note | Scalable - easy to add more logos |

### UpdateCard Component (`UpdateCard.tsx`)
| Property | Value |
|----------|-------|
| Background | White |
| Border radius | 8px |
| Padding | 24px |
| Text styling | **Bold text** = larger/prominent, regular text = smaller hierarchy |
| Links | If link exists → show **north_east arrow icon** (from Figma) + open in **new tab** |
| Hover state | Bottom border `#ffc5b2` (12px), arrow visible |
| Arrow SVG | `north_east` icon, positioned bottom-left, rotated 180° with -scale-y |

### UpdatesSection (`UpdatesSection.tsx`)
| Property | Value |
|----------|-------|
| Data | Google Doc fetch (keep existing pattern) |
| Title | **REMOVED** (no "עדכונים" subtitle) |
| Layout | Grid of UpdateCards, responsive |
| Parse | Extract paragraphs, detect bold text and links |

### ContactSection (`ContactSection.tsx`)
| Property | Value |
|----------|-------|
| Background | `#1f1c1b` (dark) |
| Subtitle highlight | `#d0674e` |
| Text | "נשמח לשמוע מכם" + email address |
| CTA | "כתבו לנו" button → mailto link |

---

## Pages Structure

### Main Page (`/`)
```
<Layout>
  <Header />                    {/* Sticky, solid bg, no transparency */}
  <BGHalfCircle />              {/* Half-circle, top at 80vh */}
  <main>
    <LogoSection />             {/* Logo + title, scroll animation placeholder */}
    <EthicCodeSection />        {/* 10 principles + PDF button (new tab) */}
    <PartnersSection />         {/* 2+ partner logos */}
    <UpdatesSection />          {/* Cards from Google Doc, NO title */}
    <ContactSection />          {/* Dark footer */}
  </main>
</Layout>
```

### Team Page (`/team`) - Basic Layout
```
<Layout>
  <Header />
  <main>
    <PageTitle text="מי אנחנו" />
    <AboutSection />            {/* From ~/dev/my/about.md */}
    <TeamGrid />                {/* From ~/dev/my/participates/ */}
  </main>
  <ContactSection />
</Layout>
```

### Signatories Page (`/signatories`) - Basic Layout
```
<Layout>
  <Header />
  <main>
    <PageTitle text="אנשי המקצוע החתומים" />
    <SignatoriesTable />        {/* Google Sheets fetch, KEEP sorting/filtering from legacy */}
  </main>
  <ContactSection />
</Layout>
```

---

## Special Requirements Summary

| Requirement | Implementation |
|-------------|----------------|
| **Header** | NO transparency - solid `#fff9f4` background |
| **Logo animation** | Placeholder for scroll-based animation (**deferred to end**) |
| **Background** | Half-circle (semicircle with flat base), top at **80vh**, scrolls to footer |
| **PDF** | Opens in **new browser tab**, not modal |
| **Updates title** | **REMOVED** - no "עדכונים" subtitle |
| **Update cards** | Bold/regular text hierarchy, arrow icon for links |
| **Update links** | **North-east arrow** from Figma (not emoji), opens in new tab |
| **Mobile** | Fully responsive - hamburger menu, stacked layouts |
| **Ethical principles** | 10 items from local markdown file |
| **Partner logos** | Local files, scalable for future additions |
| **Signatories** | Keep sorting and filtering functionality from legacy |

---

## Files to Copy from Legacy

| File | Purpose |
|------|---------|
| `src/lib/google.ts` | Google Docs/Sheets fetch utilities |
| `src/hooks/use-google-doc.ts` | Hook for fetching docs |
| `src/hooks/use-signatories.ts` | Hook for signatories with sorting/filtering |
| `src/config/content.ts` | Google Doc/Sheet IDs |
| `src/components/signatories-table.tsx` | Keep sorting/filtering logic |
| `public/TheEthicsCode.pdf` | PDF file |
| `public/Logo-new-*.png` | Logo images |

---

## Build Order

1. Mark current as legacy (rename `src/` → `src-legacy/`)
2. Initialize new `src/` structure
3. Tailwind config + Heebo font
4. Global styles + RTL support
5. Header (solid background, responsive)
6. PrimaryButton
7. Subtitle
8. LogoSection (with animation placeholder)
9. BGHalfCircle (semicircle, 80vh)
10. BulletItem
11. EthicCodeSection (10 principles, PDF opens new tab)
12. PartnersSection
13. UpdateCard (with arrow icon for links) + UpdatesSection (no title)
14. ContactSection
15. Assemble main page
16. Team page (basic layout)
17. Signatories page (basic layout with legacy sorting/filtering)
18. Mobile responsive pass
19. **(Deferred)** Logo scroll animation

---

## Assets

### From Figma (to export)
- North-east arrow SVG for update card links
- Background circle/ellipse SVG
- Bullet decorative circle SVG
- Logo SVG elements (for future animation)

### From Legacy Project
- `public/TheEthicsCode.pdf`
- `public/Logo-new-*.png`

### From Local Files
- Partner logos: `~/dev/my/partner logos/*.png`
- Team images: `~/dev/my/participates/*.png|jpg|jpeg`

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Heebo (Google Fonts)
- **Direction**: RTL (Hebrew)
