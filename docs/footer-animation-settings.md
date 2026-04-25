# Footer Animation Settings

This document contains all the customizable settings for the footer animation.
Update these values when uploading a new animation file.

## Animation File

- **File location**: `/public/footer-animation.json`
- **Original file**: `animation2.json` (910x188 at 60fps)

## Frame Constants (in footer-animation.tsx)

These values are based on the current animation file (`animation2.json`):

```typescript
const LOGO_FRAME_START = 1187; // 19.78 seconds - logo centered (initial frame shown)
const LOGO_FRAME_END = 964;    // 16.07 seconds - end point of second segment
const SECOND_PART_START = 204; // 3.40 seconds - start of second segment
const TOTAL_FRAMES = 1781;     // Total frames in animation (end of first segment)
```

### How to calculate frames from seconds:
```
frame = seconds * 60 (at 60fps)
```

Examples:
- 19.78 seconds = 1187 frames
- 16.07 seconds = 964 frames
- 3.40 seconds = 204 frames

## Playback Settings

| Setting | Current Value | Description |
|---------|--------------|-------------|
| Speed | 1.33x | Playback speed multiplier |
| Initial wait | 1000ms (1 second) | Pause before animation starts playing |
| Opacity | 0.6 (60%) | Matches copyright text opacity |

## Animation Sequence

1. **On page load**: Display logo frame (frame 1187)
2. **When user scrolls to bottom**: Wait 1 second
3. **First segment**: Play from frame 1187 to frame 1781 (end)
4. **Second segment**: Play from frame 204 to frame 964

## Display Settings

| Setting | Current Value |
|---------|--------------|
| Width | 910px |
| Height | 188px |
| Position | Bottom of footer, above copyright line |
| Z-index | 0 (background) |

## URL Parameter

Animation is hidden by default. Add `?animation` to URL to enable:
```
https://www.surrogacyethicsil.org/v2?animation
```

## File Location

Component file: `/src/components/footer-animation.tsx`

## If Uploading a New Animation File

1. Replace `/public/footer-animation.json` with the new file
2. Update the frame constants in `footer-animation.tsx`:
   - `LOGO_FRAME_START` - frame where logo is centered
   - `LOGO_FRAME_END` - end frame of second segment
   - `SECOND_PART_START` - start frame of second segment
   - `TOTAL_FRAMES` - total frames in animation
3. Update width/height in the Lottie style if dimensions changed
4. Adjust speed if needed (`lottie.setSpeed(X)`)
