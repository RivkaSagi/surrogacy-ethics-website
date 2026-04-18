# Footer Animation Plan

## Logo Symbolism

The logo represents the surrogacy journey with meaningful elements:

| Element | Symbol | Role in Animation |
|---------|--------|-------------------|
| **Big circle** | Surrogate mother | Grows during formation, shrinks during separation |
| **Upper circle** | Parents | Starts as TWO circles, merges to ONE, splits back to TWO |
| **Small filled circle** | Baby | Appears at connection, grows throughout, continues growing after exit |
| **Balance line + small circles** | Equal rights | Represents the balance of rights in this shared journey |

---

## V2 Logo Specifications (Base for Animation)

**ViewBox:** `20 28 270 158`

| Element | Position | Radius | Notes |
|---------|----------|--------|-------|
| **Surrogate (Big circle)** | cx=127, cy=120 | r=60 | Grows/shrinks during animation |
| **Parent (Upper circle)** | cx=176, cy=73 | r=39 | Splits into 2 circles, merges back |
| **Baby (Filled dot)** | cx=157.9, cy=99.9 | r=7 | At intersection, grows throughout |
| **Balance line** | (28, 103) → (287, 180) | - | Diagonal line |
| **Balance left circle** | cx=44.5, cy=92.3 | r=6 | Stroked circle |
| **Balance right circle** | cx=280, cy=163 | r=6 | Stroked circle (just above line) |
| **Pivot point** | (180, 148) | - | Where line crosses surrogate circle |

---

## Animation Flow (Scroll-Driven)

### Phase 1: ENTRY (0-15% scroll)
**Elements entering from left with irregular bouncing rhythm**

- [ ] Two parent circles bounce in (staggered, organic timing)
- [ ] Surrogate circle bounces in separately
- [ ] Balance line with its two small end circles enters
- [ ] All elements bounce on the "ground" (line above copyright)
- [ ] Rhythm is NOT constant - varies like playful balls

**Technical notes:**
- Use varying spring tensions for different elements
- Stagger delays with non-linear timing
- Elements start off-screen left (x: -100%)

---

### Phase 2: CONNECTION (15-35% scroll)
**Circles come together, baby appears**

- [ ] Two parent circles move toward each other
- [ ] Parent circles MERGE into single upper circle
- [ ] Surrogate circle moves to connect with merged parent circle
- [ ] **Intersection area NOW exists** (overlap between surrogate & parent)
- [ ] Baby (small filled circle) APPEARS at the parent circle
- [ ] Baby rolls along parent circle edge toward the NEW intersection area
- [ ] Baby grows slightly as it rolls

**Technical notes:**
- Parent merge: scale two circles down while scaling one up at center
- Surrogate connects BEFORE baby appears
- Intersection area is created by the overlap of the two circles
- Baby appears with opacity: 0 → 1 and scale: 0 → small
- Rolling: animate position along circular arc path (only after intersection exists)

---

### Phase 3: FORMATION & GROWTH (35-50% scroll)
**Logo takes shape**

- [ ] Baby settles at intersection point (between circles)
- [ ] Surrogate circle GROWS to full logo size
- [ ] Baby grows to logo-appropriate size
- [ ] Balance line attaches at pivot point (where line crosses surrogate circle)
- [ ] Complete logo is now formed

**Technical notes:**
- Surrogate scale: 0.7 → 1.0
- Baby scale: reaches its "logo size"
- Balance line connects with smooth transition

---

### Phase 4: BALANCE DANCE (50-65% scroll)
**Weeble movement representing equal rights**

- [ ] Entire logo assembly does weeble motion (tilt left-right)
- [ ] Balance line rotates around pivot point
- [ ] Motion is organic, breathing-like
- [ ] Represents the balance of rights in surrogacy journey

**Technical notes:**
- Rotation: -15deg → +15deg → -10deg → +10deg → 0
- Easing: ease-in-out with varying durations
- Subtle scale breathing effect

---

### Phase 5: SEPARATION (65-85% scroll)
**Elements begin to part**

- [ ] Balance line detaches and moves away
- [ ] Baby rolls BACK toward parent circle (along surrogate edge)
- [ ] Baby continues to parent circle
- [ ] Baby rolls OUT of parent circle (exits the formation)
- [ ] Baby continues GROWING (representing child growing up)
- [ ] Surrogate circle SHRINKS back to smaller size
- [ ] Parent circle SPLITS back into TWO separate circles

**Technical notes:**
- Baby path: intersection → along surrogate → to parent → out of parent → exit
- Baby scale continues increasing even after exiting circles
- Surrogate scale: 1.0 → 0.7
- Parent split: one circle becomes two with smooth animation

---

### Phase 6: PLAYFUL EXIT (85-100% scroll)
**All elements leave with connected playfulness**

- [ ] Elements bounce away from each other
- [ ] They interact/play while exiting (occasional touches/bounces)
- [ ] Rhythm varies - organic, not mechanical
- [ ] **Desktop**: elements exit to the LEFT
- [ ] **Mobile**: elements exit to the RIGHT
- [ ] Baby is now visibly LARGER than when it appeared

**Technical notes:**
- Use spring physics for bouncy exits
- Random-ish delays between elements
- Check `window.innerWidth` for direction
- Elements end off-screen

---

## Technical Implementation Strategy

### Library Choice: **Framer Motion**

Reasons:
- Native React integration
- `useScroll` + `useTransform` for scroll-driven animation
- Spring physics built-in
- Good performance with `will-change` optimization

### Key Framer Motion Features to Use:

```tsx
// Scroll tracking
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"]
});

// Transform scroll progress to animation values
const parentX = useTransform(scrollYProgress, [0, 0.15], [-200, 0]);
const babyScale = useTransform(scrollYProgress, [0.2, 1], [0.3, 1.5]);

// Spring for bouncy effects
const springConfig = { stiffness: 300, damping: 20 };
```

### SVG Structure (based on v2 logo):

```jsx
<svg viewBox="20 28 270 158">
  <!-- Ground line (static - above copyright) -->
  <line id="ground" x1="20" y1="186" x2="290" y2="186" stroke="black" strokeWidth="2" />

  <!-- Surrogate mother - big circle -->
  <motion.circle id="surrogate" cx="127" cy="120" r="60" />

  <!-- Parents - starts as two, merges to one -->
  <motion.g id="parents">
    <motion.circle id="parent-1" cx="156" cy="73" r="39" /> {/* left parent */}
    <motion.circle id="parent-2" cx="196" cy="73" r="39" /> {/* right parent */}
    <motion.circle id="parent-merged" cx="176" cy="73" r="39" /> {/* merged */}
  </motion.g>

  <!-- Baby - appears during connection -->
  <motion.circle id="baby" cx="157.9" cy="99.9" r="7" fill="black" />

  <!-- Balance scale -->
  <motion.g id="balance">
    <motion.line x1="28" y1="103" x2="287" y2="180" />
    <motion.circle id="balance-left" cx="44.5" cy="92.3" r="6" />
    <motion.circle id="balance-right" cx="280" cy="163" r="6" />
  </motion.g>
</svg>
```

### File Structure:

```
src/components/v3/
├── footer-animation.tsx    # Main animation component
├── contact-section.tsx     # Updated to include animation
└── animation-paths.ts      # SVG path calculations for rolling
```

---

## Animation Easing & Timing

To achieve **non-constant rhythm**:

| Element | Entry Delay | Spring Stiffness | Spring Damping |
|---------|-------------|------------------|----------------|
| Parent 1 | 0ms | 400 | 25 |
| Parent 2 | 150ms | 350 | 22 |
| Surrogate | 300ms | 300 | 20 |
| Balance line | 450ms | 280 | 18 |

Different spring configs create natural, varied bouncing.

---

## Responsive Behavior

```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Exit direction
const exitX = isMobile ? 200 : -200; // right for mobile, left for desktop
```

---

## Next Steps

1. [ ] Review and approve this plan
2. [ ] Install framer-motion
3. [ ] Create basic component structure
4. [ ] Implement Phase 1 (Entry) and test
5. [ ] Implement Phase 2-3 (Connection & Formation)
6. [ ] Implement Phase 4 (Balance dance)
7. [ ] Implement Phase 5-6 (Separation & Exit)
8. [ ] Fine-tune timing and rhythm
9. [ ] Test responsive behavior
10. [ ] Commit and push
