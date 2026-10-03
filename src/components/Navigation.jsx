import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';
import { HERO_SCROLL_HEIGHT } from '../constants/heroConfig';

gsap.registerPlugin(ScrollTrigger);

// ─── Navigation ────────────────────────────────────────────────────────────────
// Two brand states:
//   STATE 01 — HERO active:   large "DESEO studio" wordmark top-left
//   STATE 02 — Past HERO:     small DESEO symbol (Logo component)
//
// The crossfade is driven by a lightweight ScrollTrigger that tracks
// the HERO boundary using the same HERO_SCROLL_HEIGHT constant.
// No arbitrary scrollY threshold is used.
// ──────────────────────────────────────────────────────────────────────────────

const Navigation = () => {
  const wordmarkRef = useRef(null); // large DESEO studio
  const symbolRef   = useRef(null); // small DESEO symbol

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    const symbol   = symbolRef.current;
    if (!wordmark || !symbol) return;

    // Only run GSAP if the Hero section exists (homepage only)
    if (!document.querySelector('#hero')) {
      // On /estudio and other pages: just show the symbol permanently
      gsap.set(wordmark, { opacity: 0 });
      gsap.set(symbol, { opacity: 1 });
      return;
    }

    // Initial state: hero is active → wordmark visible, symbol hidden
    gsap.set(wordmark, { opacity: 1 });
    gsap.set(symbol,   { opacity: 0 });

    // A lightweight (non-pinning) ScrollTrigger that tracks the hero boundary.
    // start/end matches the hero's pinned scroll range exactly.
    // scrub drives the crossfade directly with scroll progress.
    const tl = gsap.timeline({ paused: true });

    // Crossfade: over the last 30% of hero scroll
    // wordmark fades out, symbol fades in
    tl.to(wordmark, { opacity: 0, duration: 0.3, ease: 'power1.inOut' }, 0.7);
    tl.to(symbol,   { opacity: 1, duration: 0.3, ease: 'power1.inOut' }, 0.7);

    const st = ScrollTrigger.create({
      id      : 'nav-hero-tracker',
      trigger : '#hero',
      start   : 'top top',
      end     : `+=${HERO_SCROLL_HEIGHT}`,
      scrub   : 0.5,           // matches hero scrub for synchronised feel
      animation: tl,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <nav
      style={{
        position : 'fixed',
        top      : 0,
        width    : '100%',
        zIndex   : 100,
        // No background — sits transparently over the hero and the rest
        display  : 'flex',
        alignItems: 'flex-start',
        pointerEvents: 'none', // let clicks through the transparent areas
      }}
    >
      {/* ── Left: brand identity – two states stacked, opacity-swapped ── */}
      <div
        style={{
          position     : 'relative',
          padding      : 'var(--space-sm) var(--padding-x)',
          pointerEvents: 'auto',
        }}
      >
        {/* STATE 01 – large DESEO Studio wordmark (HERO active) */}
        <a
          ref={wordmarkRef}
          href="/#hero"
          aria-label="DESEO Studio – volver al inicio"
          style={{
            display    : 'block',
            textDecoration: 'none',
            lineHeight : 1,
          }}
        >
          {/* DESEO */}
          <span
            style={{
              display      : 'block',
              fontFamily   : 'Inter, sans-serif',
              fontWeight   : 700,
              fontSize     : 'clamp(2.2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color        : '#222323',
              lineHeight   : 0.95,
            }}
          >
            DESEO
          </span>
          {/* studio */}
          <span
            style={{
              display      : 'block',
              fontFamily   : '"Playfair Display", Georgia, serif',
              fontStyle    : 'italic',
              fontWeight   : 400,
              fontSize     : 'clamp(0.85rem, 1.8vw, 1.4rem)',
              letterSpacing: '0.08em',
              color        : '#222323',
              marginTop    : '0.15em',
            }}
          >
            studio
          </span>
        </a>

        {/* STATE 02 – small DESEO symbol (after HERO) */}
        <a
          ref={symbolRef}
          href="/#hero"
          aria-label="DESEO Studio – volver al inicio"
          style={{
            position : 'absolute',
            top      : 'var(--space-sm)',
            left     : 'var(--padding-x)',
            opacity  : 0,
            pointerEvents: 'auto',
          }}
        >
          <Logo />
        </a>
      </div>

      {/* ── Right: navigation links (unchanged) ── */}
      <div
        style={{
          marginLeft   : 'auto',
          padding      : 'var(--space-sm) var(--padding-x)',
          display      : 'flex',
          gap          : 'var(--space-md)',
          fontFamily   : 'Inter, sans-serif',
          fontSize     : '0.9rem',
          alignItems   : 'center',
          pointerEvents: 'auto',
        }}
      >
        <a href="/#filosofia" style={{ color: '#222323', textDecoration: 'none' }}>Filosofía</a>
        <a href="/#servicios" style={{ color: '#222323', textDecoration: 'none' }}>Servicios</a>
        <a href="/#archivo"   style={{ color: '#222323', textDecoration: 'none' }}>Archivo</a>
        <a href="/estudio"    style={{ color: '#222323', textDecoration: 'none' }}>Studio</a>
        <a href="/#contacto"  style={{ color: '#222323', textDecoration: 'none' }}>Quiero Deseo</a>
      </div>
    </nav>
  );
};

export default Navigation;
