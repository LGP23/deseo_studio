import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Element refs
  const text1Ref = useRef(null);
  const text2PrefixRef = useRef(null);
  const textStayRef = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // 400vh of scroll distance
          pin: true,
          scrub: true, // 1:1 relationship with scroll
          onUpdate: (self) => {
            setProgress(Math.round(self.progress * 100));
          }
        }
      });

      // Initial state setups
      // Hide all elements except the first one
      gsap.set([text2PrefixRef.current, textStayRef.current, text3Ref.current, text4Ref.current, text5Ref.current], { autoAlpha: 0 });
      
      // Set distinct initial Y positions to avoid overlap
      // textStayRef is at y: 0 (center)
      // text2PrefixRef is at y: -80 (above center)
      gsap.set(text2PrefixRef.current, { y: -80 });
      gsap.set(text3Ref.current, { y: 80 });
      gsap.set(text4Ref.current, { y: 140 });
      gsap.set(text5Ref.current, { y: 200 });

      // STATE 01 (0% -> 15%)
      // HAY NEGOCIOS QUE VES holds, then fades out
      tl.to(text1Ref.current, { autoAlpha: 0, duration: 15 }, 10); // fades out between 10-25 timeline units

      // STATE 02 (15% -> 35%)
      // Transition to Y NEGOCIOS QUE SE TE QUEDAN
      tl.to([text2PrefixRef.current, textStayRef.current], { autoAlpha: 1, duration: 10 }, 20);
      // "Y NEGOCIOS QUE" fades out, "SE TE QUEDAN." remains
      tl.to(text2PrefixRef.current, { autoAlpha: 0, duration: 5 }, 35);

      // STATE 03 (35% -> 55%)
      // QUE TE MIREN appears, and SE TE QUEDAN transitions to black
      tl.to(text3Ref.current, { autoAlpha: 1, duration: 10 }, 40);
      tl.to(textStayRef.current, { color: "var(--black)", duration: 10 }, 40);

      // STATE 04 (55% -> 75%)
      // QUE CONECTEN appears
      tl.to(text4Ref.current, { autoAlpha: 1, duration: 10 }, 60);

      // STATE 05 (75% -> 90%)
      // QUE VUELVAN appears
      tl.to(text5Ref.current, { autoAlpha: 1, duration: 10 }, 80);

      // STATE 06 (90% -> 100%)
      // Reorganize slightly for final composition
      tl.to(textStayRef.current, { y: -40, duration: 10 }, 90);
      tl.to(text3Ref.current, { y: 60, duration: 10 }, 90);
      tl.to(text4Ref.current, { y: 120, duration: 10 }, 90);
      tl.to(text5Ref.current, { y: 180, duration: 10 }, 90);

      // Add a dummy tween to the very end to stretch the timeline out fully
      tl.to({}, { duration: 10 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="filosofia" 
      ref={sectionRef}
      style={{ 
        height: '100vh', // Real physical height on screen when pinned
        position: 'relative',
        backgroundColor: 'var(--milk)'
      }}
    >
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        
        {/* STATE 01 */}
        <div ref={text1Ref} style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
          <h2 className="font-title text-black" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            HAY NEGOCIOS QUE VES.
          </h2>
        </div>

        {/* STATE 02 PREFIX */}
        <div ref={text2PrefixRef} style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
          <h2 className="font-title text-black" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Y NEGOCIOS QUE
          </h2>
        </div>

        {/* PERSISTENT TEXT */}
        <div ref={textStayRef} style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'var(--deep-cherry)' }}>
          <h2 className="font-body" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.02em' }}>
            SE TE QUEDAN.
          </h2>
        </div>

        {/* THE 3 QUE's */}
        <div ref={text3Ref} style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'var(--black)' }}>
          <h3 className="font-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, letterSpacing: '0.02em' }}>
            QUE TE MIREN.
          </h3>
        </div>
        
        <div ref={text4Ref} style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'var(--black)' }}>
          <h3 className="font-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, letterSpacing: '0.02em' }}>
            QUE CONECTEN.
          </h3>
        </div>

        <div ref={text5Ref} style={{ position: 'absolute', width: '100%', textAlign: 'center', color: 'var(--black)' }}>
          <h3 className="font-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 500, letterSpacing: '0.02em' }}>
            QUE VUELVAN.
          </h3>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
