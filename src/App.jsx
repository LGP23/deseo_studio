import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Services from './sections/Services';
import Archive from './sections/Archive';
import DesireContact from './sections/DesireContact';
import Footer from './components/Footer';

function App() {
  // When arriving from /estudio via the "Quiero Deseo" button,
  // sessionStorage carries the scroll target. We must wait for GSAP 
  // to inject the 150vh pin spacer in the Hero before scrolling.
  // Because Hero waits for images to load, this happens asynchronously.
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo');
    if (target) {
      sessionStorage.removeItem('scrollTo');
      
      let attempts = 0;
      
      const tryScroll = () => {
        attempts++;
        const st = ScrollTrigger.getById('hero-sequence');
        
        if (st || attempts > 50) {
          // Once the ScrollTrigger exists (or we time out after ~800ms), 
          // wait one more tick for the DOM update, then scroll.
          setTimeout(() => {
            const el = document.getElementById(target);
            if (el) el.scrollIntoView({ behavior: 'auto' });
          }, 50);
        } else {
          requestAnimationFrame(tryScroll);
        }
      };
      
      tryScroll();
    }
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Archive />
        <DesireContact />
      </main>
      <Footer />
    </>
  );
}

export default App;
