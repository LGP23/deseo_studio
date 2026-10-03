import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_SCROLL_HEIGHT } from '../constants/heroConfig';

gsap.registerPlugin(ScrollTrigger);

// ─── Frame configuration ───────────────────────────────────────────────────────
const FRAMES = [
  '/secuencia1_motion.png',
  '/secuencia2_motion.png',
  '/secuencia3_motion.png',
  '/secuencia4_motion.png',
  '/secuencia5_motion.png',
];


// Crossfade half-width in frame-index units.
// 0.12 = very short, clean crossfade; raises toward 0.4 for a longer dissolve.
const FADE_HALF = 0.12;

// ─── Opacity calculator ────────────────────────────────────────────────────────
// Uses continuous frame-index distance so the SUM of all opacities = 1 always.
// No gaps → no flashes.
function frameOpacities(progress) {
  const n  = FRAMES.length;                               // 5
  const fi = Math.max(0, Math.min(n - 1, progress * (n - 1))); // 0..4

  return FRAMES.map((_, i) => {
    const d = Math.abs(fi - i);

    let op;
    if (d <= 0.5 - FADE_HALF) {
      op = 1; // fully inside this frame's zone
    } else if (d < 0.5 + FADE_HALF) {
      // crossfade zone shared with neighbouring frame
      op = 1 - (d - (0.5 - FADE_HALF)) / (2 * FADE_HALF);
    } else {
      op = 0; // outside – neighbour's frame takes over
    }

    return Math.max(0, Math.min(1, op));
  });
}

// ─── Component ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null);
  const frameRefs  = useRef([]);
  const claimRef   = useRef(null);

  const [allLoaded, setAllLoaded] = useState(false);

  // ── Preload all frames before enabling scroll ───────────────────────────────
  useEffect(() => {
    let n = 0;
    const imgs = FRAMES.map((src) => {
      const img     = new Image();
      img.src       = src;
      img.onload    =
      img.onerror   = () => { if (++n === FRAMES.length) setAllLoaded(true); };
      return img;
    });
    return () => imgs.forEach((img) => { img.onload = img.onerror = null; });
  }, []);

  // ── GSAP ScrollTrigger ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!allLoaded) return;

    // Initialise opacities immediately (frame 1 visible, rest hidden)
    frameOpacities(0).forEach((op, i) => {
      const el = frameRefs.current[i];
      if (el) el.style.opacity = op;
    });

    const st = ScrollTrigger.create({
      id      : 'hero-sequence',
      trigger : sectionRef.current,
      start   : 'top top',
      end     : `+=${HERO_SCROLL_HEIGHT}`,
      pin     : true,
      scrub   : 0.5,           // tiny lag for smoothness, still very responsive
      onUpdate(self) {
        const p  = self.progress;
        const ops = frameOpacities(p);

        ops.forEach((op, i) => {
          const el = frameRefs.current[i];
          if (el) el.style.opacity = op;
        });

        // Claim text: visible only at progress 0, fades out immediately on scroll
        if (claimRef.current) {
          const claimOp = p <= 0.01 ? 1 : Math.max(0, 1 - (p - 0.01) / 0.04);
          claimRef.current.style.opacity = claimOp;
        }
      },
    });

    return () => st.kill();
  }, [allLoaded]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── HERO: GSAP pins this element ── */}
      <section
        id="hero"
        ref={sectionRef}
        style={{
          position        : 'relative',
          width           : '100%',
          height          : '100vh',
          backgroundColor : '#dfdfdf',
          overflow        : 'hidden',
        }}
      >
        {/* ── Visual stage – identical container for every frame ── */}
        {/* All 5 PNGs share the exact same position: 100vw wide, vertically centred. */}
        {/* translateY(-50%) is static centering, not animation. */}
        <div
          style={{
            position : 'absolute',
            inset    : 0,
            overflow : 'hidden',
          }}
        >
          {FRAMES.map((src, i) => (
            <img
              key={src}
              ref={(el) => (frameRefs.current[i] = el)}
              src={src}
              alt={`Sequence frame ${i + 1}`}
              draggable={false}
              style={{
                position          : 'absolute',
                top               : '50%',
                left              : 0,
                width             : '100%',
                height            : 'auto',
                transform         : 'translateY(-50%)',
                opacity           : i === 0 ? 1 : 0,
                userSelect        : 'none',
                pointerEvents     : 'none',
                display           : 'block',
                // GPU compositing layer – prevents black-flash on paint
                willChange        : 'opacity',
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>

        {/* ── Claim text – visible only before scroll begins ── */}
        <div
          ref={claimRef}
          style={{
            position       : 'absolute',
            inset          : 0,
            display        : 'flex',
            flexDirection  : 'column',
            alignItems     : 'center',
            justifyContent : 'center',
            zIndex         : 10,
            pointerEvents  : 'none',
            opacity        : 1,
            transition     : 'opacity 0.3s ease',
          }}
        >
          <p
            style={{
              fontFamily   : 'Inter, sans-serif',
              fontWeight   : 700,
              fontSize     : 'clamp(1.2rem, 3vw, 2.4rem)',
              lineHeight   : 1.3,
              color        : '#222323',
              textAlign    : 'center',
              margin       : 0,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            Que te miren está bien.<br />
            Que te <span style={{ fontStyle: 'italic' }}>deseen</span> es otra cosa.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
