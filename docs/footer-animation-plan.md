# Footer Animation Plan (Updated v3)

## Animation Type: Physics-Based Frame Animation

The animation tells the surrogacy journey story through **45 sequential key frames** with **natural physics** - bouncing, gravity, rolling, and realistic movement. Direction: **Left to Right**.

---

## Element Symbols

| Symbol | Meaning | Visual |
|--------|---------|--------|
| **p1, p2** | Two parent circles (separate) | Outline circles |
| **p** | Parents merged | Single outline circle |
| **s** | Surrogate mother | Outline circle (larger) |
| **b** | Balance line | Horizontal line with curves |
| **pi** | Parent's interests | Small outline circle |
| **si** | Surrogate's interests | Small outline circle |
| **bb** | Baby | Small WHITE FILLED circle |

---

## Placement & Display

### Desktop
- **Position**: ABOVE the footer section
- **Footer acts as background** - visible behind/below animation
- **Size/proportion**: According to Figma images (1665px x 395px)

### Mobile
- **Position**: Below the content, above footer
- **Adapted proportions** for smaller screens

### During Pause
- Animation remains visible as background
- Footer buttons/links remain clickable

---

## Complete Story Breakdown (45 Frames)

### Phase 1: Parent Entry (Frames s1-s6)
**Elements**: p1, p2, pi

| Frame | Action |
|-------|--------|
| s1 | Empty - starting point |
| s2 | p1, p2 enter from LEFT with pi bouncing in |
| s3 | Parents approaching each other |
| s4 | Parents getting closer |
| s5 | Parents even closer |
| s6 | Parents almost touching |

**Physics**: Circles bounce in with gravity, roll toward center

---

### Phase 2: Parent Connection (Frames s7-s11) - SLOW/PAUSE
**Elements**: p1, p2, pi

| Frame | Action |
|-------|--------|
| s7 | Parents spread apart wide (tension) |
| s8 | **Parents come together - connection moment** |
| s9 | Parents overlapping |
| s10 | More overlap |
| s11 | Full overlap |

**Physics**: Slow rolling toward each other, gentle collision

---

### Phase 3: Parent Merge (Frame s12)
**Elements**: p, pi

| Frame | Action |
|-------|--------|
| s12 | **p1 + p2 MERGE into single "p"** |

**Physics**: Circles merge smoothly into one

---

### Phase 4: Surrogate Entry (Frames s13-s22)
**Elements**: p, s, pi, si

| Frame | Action |
|-------|--------|
| s13 | **Surrogate "s" enters from LEFT with "si"** - starts small |
| s14-s16 | Surrogate approaches parents, **S starts GROWING** |
| s17 | Surrogate getting close (KEY FRAME) - PAUSE before connection |
| s18 | **Surrogate connects with parents** |
| s19-s22 | All rolling together, forming connection, **S continues growing** |

**Physics**: Surrogate rolls in, approaches parents slowly
**Size**: Surrogate (s) GROWS continuously from entry until birth (s34)

---

### Phase 5: Balance Line Appears (Frames s23-s26)
**Elements**: p, s, b, pi, si

| Frame | Action |
|-------|--------|
| s23 | **Balance line "b" GROWS from "s"** |
| s24 | Balance line extends |
| s25 | Balance line reaches full length |
| s26 | pi and si JUMP onto balance line ends |

**Physics**: Line grows outward from S, small circles bounce onto ends

---

### Phase 6: Baby Appears (Frames s27-s33) - KEY MOMENT
**Elements**: p, s, bb, b, pi, si

| Frame | Action |
|-------|--------|
| s27 | **BABY "bb" APPEARS** - tiny white filled circle inside overlap |
| s28-s30 | Baby grows slightly |
| s31-s33 | Full logo formation complete |

**Physics**: Baby appears with subtle bounce/pop animation

---

### Phase 7: Birth - The Slide (Frames s34-s37) - KEY MOMENT
**Elements**: p, s, bb, b, pi, si

| Frame | Action |
|-------|--------|
| s34 | **BIRTH moment** - Parent (p) with baby (bb) starts rolling on balance line like a SLIDE |
| s35 | p+bb roll outward on the balance line |
| s36 | p+bb scroll back slightly |
| s37 | **Baby (bb) exits from parent** - separates out |

**Physics**:
- Parent+baby roll on balance line like going down a slide
- Then scroll/roll back a bit
- Baby separates from parent with natural physics
- **Surrogate (s) SHRINKS after birth** (was growing until now)

---

### Phase 8: Separation (Frames s39-s43) - SLOW/PHYSICS
**Elements**: p1, p2, s, bb, b, pi, si

| Frame | Action |
|-------|--------|
| s39 | **Parents SPLIT back to p1 + p2** - moment of letting go |
| s40 | **Parents separate by ROLLING apart, baby (bb) starts BOUNCING** |
| s41 | Parents continue rolling apart, baby bouncing |
| s42 | Balance line rotating like a roller |
| s43 | Balance line detaching |

**Physics**:
- Parents roll apart (separate by rolling motion)
- Baby starts bouncing with gravity (newly "born" - first independent movement)
- Balance rotates with physics-based momentum

---

### Phase 9: Exit (Frames s44-s45)
**Elements**: p1, p2, s, bb, pi, si, b

| Frame | Action |
|-------|--------|
| s44 | Balance (b) exits to LEFT with rolling rotation |
| s45 | All other elements bouncing and playing with each other |

**Physics**:
- **Balance line (b)**: Rolls/exits to LEFT side independently
- **All other elements (p1, p2, s, bb, pi, si)**: Bounce and PLAY with each other
- Elements move **above the LOWER part of the footer text** (on desktop)
- Then all elements **scroll out** of view
- Playful, bouncing interaction between circles before final exit

---

## Key Timing Moments

| Frame | Duration | Type | Description |
|-------|----------|------|-------------|
| s1-s6 | 200ms each | Normal | Parent entry with bouncing |
| s7-s10 | 250ms each | Normal | Parents approaching |
| **s11** | **500ms** | **PAUSE** | **Before parents merge** |
| s12 | 300ms | Normal | Parents merge |
| s13-s16 | 350ms each | **SLOW - Pregnancy begins** | Surrogate approach, growing |
| **s17** | **600ms** | **PAUSE** | **Before merging with surrogate** |
| s18-s26 | 400ms each | **SLOW - Pregnancy** | Connection & balance, surrogate growing |
| s27-s32 | 450ms each | **SLOW - Late pregnancy** | Baby appears, logo forms |
| **s33** | **700ms** | **PAUSE** | **Before birth (separation)** |
| **s34-s37** | **500ms each** | **SLOW** | **Birth - sliding, baby exits** |
| s38-s43 | 300ms each | Normal | Separation continues |
| s44-s45 | 350ms each | Normal | Exit with playful bouncing |

**Total duration**: ~15-18 seconds (natural, slow pace)

---

## Physics & Movement Rules

### Bouncing
- Circles bounce naturally with gravity at ENTRY (frames 1-6)
- Circles bounce at EXIT (frames 44-45)
- When not on "ground" level, bouncing occurs
- Each bounce loses energy (realistic damping)

### Rolling
- Direction: LEFT to RIGHT throughout
- Circles roll (not slide) toward each other
- Rolling speed varies based on "slope" and momentum
- Contact moments have natural deceleration

### Balance Line
- **GROWS FROM the "s" (surrogate) circle**
- pi and si JUMP onto balance line ends
- At exit, balance rotates like a roller (physics-based)
- Exits to LEFT with rotation

### Rotation
- Elements rotate based on their movement direction
- Balance line tilts naturally based on weight distribution
- Exit rotation follows physics (±15-30 degrees)

### Surrogate Size Changes
- **Entry (s13)**: Surrogate starts at smaller size
- **Growth (s13-s33)**: Surrogate GROWS continuously (representing pregnancy)
- **Peak (s33)**: Surrogate at maximum size before birth
- **Shrink (s34+)**: After birth, surrogate SHRINKS back to original size

### The Slide Physics (s34-s37)
- Parent (p) with baby (bb) inside rolls on balance line like a SLIDE
- Uses gravity and momentum
- Rolls outward, then scrolls back slightly
- Baby separates from parent with natural physics (like coming out)

**Baby Position During Slide**:
- Baby (bb) grows continuously throughout animation
- During sliding (s34-s36), baby **STICKS to same relative position** on parent circle
- Like a point on a rolling wheel - baby rotates WITH the parent
- Maintains consistent position relative to parent's center

**Baby Separation (s37-s39)**:
- Movement direction: LEFT
- Parent and baby both move LEFT but at **DIFFERENT SPEEDS**
- Baby moves slower/faster than parent, causing gradual separation
- This speed difference makes the baby naturally "come out"
- Should feel like natural physics - not a sudden pop, but velocity-based separation

---

## Technical Implementation

### Component Structure

```tsx
// src/components/footer-story-animation.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";

// Frame timing configuration
const FRAME_TIMING: Record<number, number> = {
  11: 300,                   // PAUSE: Before parents merge
  17: 300,                   // PAUSE: Before merging with surrogate
  33: 300,                   // PAUSE: Before birth (separation)
  34: 200, 35: 200, 36: 200, 37: 200,  // SLOW: The slide (birth physics)
};

const DEFAULT_DURATION = 100;

// Element positions for each frame (extracted from Figma)
const FRAME_POSITIONS = {
  // Will be populated with exact positions from Figma
};

export function FooterStoryAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Trigger 1 second after scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 100 && !hasTriggered) {
        setTimeout(() => {
          setHasTriggered(true);
          setIsPlaying(true);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  // Pause on footer hover
  const handleFooterEnter = () => setIsPlaying(false);
  const handleFooterLeave = () => setIsPlaying(true);

  // Frame advancement with variable timing
  useEffect(() => {
    if (!isPlaying || currentFrame >= 44) return;

    const duration = FRAME_TIMING[currentFrame] || DEFAULT_DURATION;
    const timer = setTimeout(() => {
      setCurrentFrame(prev => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentFrame]);

  return (
    <div className="story-animation-wrapper">
      <div className="animation-stage">
        {/* Render elements based on currentFrame */}
        {/* Use Framer Motion for physics-based interpolation */}
      </div>

      <footer
        onMouseEnter={handleFooterEnter}
        onMouseLeave={handleFooterLeave}
      >
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

---

## SVG Elements (Exported to /public/animation/)

| File | Element | ViewBox | Type |
|------|---------|---------|------|
| `p.svg` | Parent circle (p, p1, p2) | 80x80 | Outline stroke |
| `s.svg` | Surrogate circle | 102x102 | Outline stroke |
| `b.svg` | Balance line | 34x12 | Line stroke |
| `interest.svg` | Interest circles (pi, si) | 14x14 | Outline stroke |
| `bb.svg` | Baby circle | 25x25 | **Filled** white |

All SVGs use CSS variables for colors:
- Stroke: `var(--stroke-0, white)`
- Fill (bb only): `var(--fill-0, white)`

---

## Next Steps

1. [x] Analyze all 45 frames from Figma
2. [x] Identify when baby (bb) first appears - **Frame s27**
3. [x] Document the complete exit sequence - **Frames s39-s45**
4. [ ] Export SVG elements from Figma
5. [ ] Extract exact positions for each frame
6. [ ] Create physics-based animation component
7. [ ] Implement variable timing for pauses
8. [ ] Add scroll trigger and hover pause
9. [ ] Position above footer with proper layering
10. [ ] Test physics feel and adjust
11. [ ] Mobile adaptation
12. [ ] Commit and push
