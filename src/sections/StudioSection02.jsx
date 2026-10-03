import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wordPairs = [
  { left: 'CREATIVO', right: 'ESTRATEGIA' },
  { left: 'ORDEN', right: 'RUPTURA' },
  { left: 'ESPONTÁNEO', right: 'DIRIGIDO' },
  { left: 'MESSY', right: 'ORDENADO' },
];

const transitionSettings = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1],
};

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: transitionSettings },
  exit: { opacity: 0, y: -12, transition: transitionSettings },
};

const AnimatedBlock = ({ word }) => (
  <div 
    style={{ 
      position: 'relative', 
      width: '100%', 
      height: '80px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden'
    }}
  >
    <AnimatePresence mode="popLayout">
      <motion.div
        key={word}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'absolute', whiteSpace: 'nowrap' }}
      >
        <span 
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', 
            fontFamily: 'var(--font-title)', 
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}
        >
          {word}
        </span>
      </motion.div>
    </AnimatePresence>
  </div>
);

const StudioSection02 = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // New refs for photobooth interaction
  const boothContainerRef = useRef(null);
  const stripRef = useRef(null);
  const finalTextRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (!isVisible) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordPairs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Photobooth GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      if (stripRef.current) gsap.set(stripRef.current, { yPercent: 0 });
      if (finalTextRef.current) gsap.set(finalTextRef.current, { opacity: 1, y: 0 });
      return;
    }

    if (!boothContainerRef.current || !stripRef.current) return;

    // We start the strip fully hidden upward
    gsap.set(stripRef.current, { yPercent: -100, rotation: 0 });
    if (finalTextRef.current) gsap.set(finalTextRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boothContainerRef.current,
        start: "top 60%", // starts animating when top of container hits 60% of viewport
        end: "+=120%", // scroll distance
        scrub: true,
      }
    });

    // 1. Reveal strip downward
    tl.to(stripRef.current, { yPercent: 0, ease: 'none', duration: 1 });
    
    // 2. Final subtle release/drop
    tl.to(stripRef.current, { y: '15px', rotation: 1.5, transformOrigin: 'top center', ease: 'power1.inOut', duration: 0.1 });

    // Text reveal synchronized with strip finishing
    if (finalTextRef.current) {
      tl.to(finalTextRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.85);
    }

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="text-black" style={{ overflow: 'hidden' }}>

      {/* ── FOUNDER PORTRAITS — editorial, asymmetric, names big + rotated ── */}
      <div style={{ position: 'relative', padding: '6vh var(--padding-x) 4vh', overflow: 'hidden' }}>

        {/* ALEJANDRA — left column */}
        <div style={{
          width: '48%',
          position: 'relative',
          marginBottom: '0',
          float: 'left',
        }}>
          {/* Name — huge, slightly rotated, bleeds viewport edge not clipped at container */}
          <p style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 11vw, 11rem)',
            lineHeight: 0.9,
            margin: '0 0 1.5rem -0.05em',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            transform: 'rotate(-2.5deg)',
            transformOrigin: 'left center',
            whiteSpace: 'nowrap',
          }}>
            ALEJANDRA
          </p>
          {/* Portrait — proportionally smaller, vertical ratio */}
          <img
            src="/images/alejandra.jpg"
            alt="Alejandra"
            style={{
              width: '45%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </div>

        {/* OLGA — right column */}
        <div style={{
          width: '48%',
          float: 'right',
          marginTop: '8vh',        /* vertical offset — editorial rhythm */
          textAlign: 'right',
        }}>
          {/* Portrait first */}
          <img
            src="/images/olga.jpg"
            alt="Olga"
            style={{
              width: '45%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'inline-block',
            }}
          />
          {/* Name below portrait, bleeds right */}
          <p style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 11vw, 11rem)',
            lineHeight: 0.9,
            margin: '1.5rem -0.05em 0 auto',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            transform: 'rotate(2deg)',
            transformOrigin: 'right center',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}>
            OLGA
          </p>
        </div>

        {/* clearfix */}
        <div style={{ clear: 'both' }} />

      </div>

      {/* ── NARRATIVE COPY 1 ── */}
      <div className="container">
        <div style={{ padding: 'var(--space-xl) 0', maxWidth: '700px', marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontStyle: 'italic', lineHeight: 1.3, margin: 0 }}>
            DESEO nació de dos personas con formas distintas de mirar un negocio.
          </p>
        </div>
      </div>

      {/* ── TENSIONS / WORD PAIRS ── */}
      <div className="container">
        <div style={{ padding: 'var(--space-xl) 0', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.1)' }}>
              <AnimatedBlock word={wordPairs[index].left} />
            </div>
            <div style={{ flex: 1 }}>
              <AnimatedBlock word={wordPairs[index].right} />
            </div>
          </div>
        </div>
      </div>

      {/* ── NARRATIVE COPY 2 ── */}
      <div className="container">
        <div style={{ padding: 'var(--space-xl) 0', maxWidth: '700px', marginRight: 'auto', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontStyle: 'italic', lineHeight: 1.3, margin: 0 }}>
            Dos maneras de pensar que, en lugar de competir, funcionaban mejor cuando se encontraban.
          </p>
        </div>
      </div>

      {/* ── PHOTO BOOTH / ORIGIN SECTION ── */}
      <div 
        ref={boothContainerRef}
        className="container" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          padding: 'var(--space-xxl) 0 10vh', 
          gap: 'var(--space-xl)',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        {/* LEFT: TEXT */}
        <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', paddingTop: '10vh' }}>
          <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 400, lineHeight: 1.4, margin: 0, paddingRight: '15%' }}>
            Y de esa intersección surgió la idea de crear el estudio en el que nosotras mismas querríamos trabajar.
          </p>
          <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 400, lineHeight: 1.4, margin: 0, paddingLeft: '8%', paddingRight: '5%' }}>
            Uno que no llegase a los negocios desde fuera, hiciese su parte y se fuese.
          </p>
          
          <div ref={finalTextRef} style={{ marginTop: '15vh' }}>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              Queríamos entrar, entenderlos y construir con ellos.
            </p>
          </div>
        </div>

        {/* RIGHT: PHOTO BOOTH */}
        <div style={{ flex: '1 1 40%', minWidth: '300px', position: 'relative' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px', margin: '0 auto' }}>
            
            {/* The Output Module */}
            <div style={{ 
              position: 'relative', 
              zIndex: 10, 
              backgroundColor: 'var(--deep-cherry)', 
              height: '40px', 
              borderRadius: '4px',
              boxShadow: '0 10px 20px -5px rgba(0,0,0,0.3), inset 0 -4px 10px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '2px'
            }}>
              {/* Actual slit */}
              <div style={{ width: '92%', height: '4px', backgroundColor: '#0a0a0a', borderRadius: '4px' }}></div>
            </div>

            {/* The Photo Strip Mask */}
            <div style={{ 
              position: 'relative',
              width: '85%',
              margin: '0 auto',
              overflow: 'hidden',
              marginTop: '-2px', // hide strictly behind slit
              zIndex: 5
            }}>
              {/* Extra wrapper to ensure max height doesn't clip emerging */}
              <div style={{ paddingBottom: '30px' }}>
                <img 
                  ref={stripRef}
                  src="/images/photobooth.jpg" 
                  alt="DESEO Origin Photobooth" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                    willChange: 'transform' // Performance opt
                  }} 
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </section>
  );
};

export default StudioSection02;
