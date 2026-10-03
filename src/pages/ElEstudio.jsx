import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import StudioSection02 from '../sections/StudioSection02';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 01 — TODO EMPEZÓ CON UNA ATRACCIÓN
// ==========================================
const Chapter01 = () => {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '15vh', paddingBottom: '10vh' }}>
      <div className="container">
        
        {/* PAGE IDENTIFIER */}
        <div style={{ marginBottom: '15vh' }}>
          <span style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.01em' }}>El </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2.4rem' }}>studio</span>
        </div>
        
        {/* H1 */}
        <h1 style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            TODO EMPEZÓ
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1, color: 'var(--deep-cherry)' }}>
            CON UNA ATRACCIÓN.
          </span>
        </h1>

        {/* Small identifier before next section */}
        <div style={{ marginTop: '20vh', opacity: 0.5 }}>
          <p style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '0.1em' }}>ALEJANDRA ↔ OLGA</p>
        </div>

      </div>
    </section>
  );
};


// ==========================================
// 03 — DOS POLOS
// ==========================================
const Chapter03 = () => {
  const sectionRef = useRef(null);
  const dotLeft = useRef(null);
  const dotRight = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%', // Enough distance for a slow, intentional movement
        pin: true,
        scrub: true,
      }
    });

    // Move dots towards center
    tl.to(dotLeft.current, { x: '30vw', ease: 'none' }, 0);
    tl.to(dotRight.current, { x: '-30vw', ease: 'none' }, 0);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <p style={{ position: 'absolute', top: '15%', fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '0.1em', opacity: 0.5 }}>DOS POLOS.</p>
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 15vw', position: 'relative', zIndex: 2 }}>
        <div ref={dotLeft} style={{ width: 'clamp(30px, 4vw, 50px)', height: 'clamp(30px, 4vw, 50px)', borderRadius: '50%', backgroundColor: 'var(--deep-cherry)' }} />
        <div ref={dotRight} style={{ width: 'clamp(30px, 4vw, 50px)', height: 'clamp(30px, 4vw, 50px)', borderRadius: '50%', backgroundColor: 'var(--deep-cherry)' }} />
      </div>

      <p style={{ position: 'absolute', bottom: '15%', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>UNA MISMA DIRECCIÓN.</p>
      
    </section>
  );
};


// ==========================================
// 04 — INTERSECTION / SYMBOL
// ==========================================
const Chapter04 = () => {
  const sectionRef = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: true,
      }
    });

    // Phase 1: EL CENTRO visible → fades out
    tl.to(text1.current, { opacity: 0, duration: 1, ease: 'power1.inOut' }, 0.5);
    // Phase 2: ES DESEO. fades in
    tl.to(text2.current, { opacity: 1, duration: 1, ease: 'power1.inOut' });
    // Phase 2 breathing
    tl.to({}, { duration: 0.5 });
    // Phase 2 → fades out
    tl.to(text2.current, { opacity: 0, duration: 1, ease: 'power1.inOut' });
    // Phase 3: caption fades in
    tl.to(text3.current, { opacity: 1, duration: 1, ease: 'power1.inOut' });
    // Breathing room before unpin
    tl.to({}, { duration: 1 });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#dfdfdf',
        /* Full-bleed breakout */
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        zIndex: 1,
        isolation: 'isolate',
      }}>
        
        {/* Blurred full-bleed background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-30px',
            backgroundImage: 'url(/logo.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.18,
            filter: 'blur(22px)',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        
        {/*
          The central intersection of the DESEO symbol is exactly at the 
          horizontal center. The white vesica/eye space sits at vertical 
          center of the image. We place our text absolutely at the center.
        */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '300px',
          height: '120px',
        }}>
          
          <div ref={text1} style={{ position: 'absolute', textAlign: 'center', width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
              margin: 0,
              lineHeight: 1.2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--black)',
            }}>
              EL CENTRO<br/>NO ES UN HUECO.
            </p>
          </div>
          
          <div ref={text2} style={{ position: 'absolute', textAlign: 'center', width: '100%', opacity: 0 }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              margin: 0,
              color: 'var(--black)',
              lineHeight: 1,
            }}>
              ES DESEO.
            </p>
          </div>
          
          <div ref={text3} style={{ position: 'absolute', textAlign: 'center', width: '280px', opacity: 0 }}>
            <p style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.4,
              color: 'var(--black)',
            }}>
              Dos formas distintas que se encuentran<br/>y crean algo nuevo.
            </p>
          </div>

        </div>
      </section>

      {/* Symbol explanation copy — static 2 columns */}
      <SymbolCopySection />
    </>
  );
};

// ─── SymbolCopySection ────────────────────────────────────────────────────────
// Static 2-column layout as requested.
// Left: 3 paragraphs of text.
// Right: 1 concluding sentence.
// ─────────────────────────────────────────────────────────────────────────────

const SymbolCopySection = () => {
  return (
    <section style={{ padding: 'var(--space-xxl) 0 var(--space-md) 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-xxl)',
            alignItems: 'center',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              flex: '1 1 400px',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-lg)',
              textAlign: 'left'
            }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontStyle: 'italic', lineHeight: 1.3, margin: 0 }}>
              Nuestro símbolo nace de la misma idea que el estudio.
            </p>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.5, margin: 0 }}>
              Representa nuestra forma de trabajar juntas, pero también la relación que buscamos con cada cliente.
            </p>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.5, margin: 0 }}>
              No queremos estar a un lado y el negocio al otro.
            </p>
          </div>

          {/* Right Column */}
          <div
            style={{
              flex: '1 1 300px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'left'
            }}
          >
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
              Queremos encontrarnos en medio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 05 — ESTO ES DESEO
// ==========================================
const Chapter05 = () => {
  return (
    <section style={{ padding: 'var(--space-md) 0 var(--space-xxl) 0' }}>
      <div className="container">
        

        
        {/* Copy */}
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
            ESTO ES DESEO.
          </h2>
          
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontStyle: 'italic', lineHeight: 1.3, margin: 0 }}>
            DESEO es un estudio creativo de estrategia, branding, comunicación y experiencia de marca.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.5, margin: 0 }}>
              Trabajamos con negocios que quieren construir algo con personalidad, intención y una forma propia de estar en el mundo.
            </p>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', lineHeight: 1.5, margin: 0 }}>
              Nos involucramos en los proyectos desde dentro, combinando estrategia y creatividad para convertir ideas en marcas, experiencias y comunicación que tengan sentido para el negocio y para las personas que hay al otro lado.
            </p>
          </div>

          <div style={{ marginTop: 'var(--space-md)' }}>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2, margin: 0 }}>
              No queremos ser un proveedor más.<br/>
              Queremos ser una parte valiosa de lo que estás construyendo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};




// ==========================================
// 06 — FINAL / THE NEXT POLE
// ==========================================
const Chapter06 = () => {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    // Add ScrollTrigger to change nav text and logo color when this black section hits the top
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60px", // height of nav approx
      end: "bottom top",
      onEnter: () => {
        gsap.to('nav a, nav span', { color: '#dfdfdf', duration: 0.3 });
        gsap.to('nav img', { filter: 'brightness(0) invert(1) opacity(0.8)', duration: 0.3 });
      },
      onLeaveBack: () => {
        gsap.to('nav a, nav span', { color: '#222323', duration: 0.3 });
        gsap.to('nav img', { filter: 'none', duration: 0.3 });
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--black)', color: 'var(--milk)', padding: 'var(--space-xxl) 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Metadata */}
        <p style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', letterSpacing: '0.1em', opacity: 0.5, margin: 0 }}>
          DESEO / GALICIA / 2026
        </p>
        
        {/* Top Statement */}
        <div style={{ paddingTop: '15vh' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 700, lineHeight: 1, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            SIEMPRE<br/>SEREMOS DOS.
          </h2>
        </div>
        
        {/* Bottom CTA */}
        <div style={{ paddingTop: '30vh', paddingBottom: '10vh' }}>
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              sessionStorage.setItem('scrollTo', 'contacto');
              window.location.href = '/';
            }}
            style={{ 
              display: 'inline-block', 
              fontFamily: 'var(--font-title)', 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              fontWeight: 700,
              color: '#dfdfdf', 
              textDecoration: 'none', 
              borderBottom: '4px solid #dfdfdf', 
              paddingBottom: '0.1em',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              cursor: 'pointer'
            }}
          >
            QUIERO DESEO &rarr;
          </a>
        </div>
        
      </div>
    </section>
  );
};


// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const ElEstudio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#dfdfdf', color: 'var(--black)' }}>
      <Navigation />
      
      <main>
        <Chapter01 />
        <StudioSection02 />
        <Chapter03 />
        <Chapter04 />
        <Chapter05 />
        <Chapter06 />
      </main>
      
      <Footer />
    </div>
  );
};

export default ElEstudio;
