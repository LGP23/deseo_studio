import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-black text-milk font-sans" style={{ padding: 'var(--space-xl) 0 var(--space-xl)' }}>
      <div className="container flex justify-between items-start" style={{ flexWrap: 'wrap', gap: 'var(--space-xl)' }}>
        
        {/* Columna 1: Logo y Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', minWidth: '200px' }}>
          <a href="/#hero" aria-label="Ir al inicio" style={{ display: 'inline-block', opacity: 0.87 }}>
            <div style={{ filter: 'brightness(0) invert(1)' }}>
              <Logo className="w-12 h-12" />
            </div>
          </a>
          <p style={{ opacity: 0.5, fontSize: '0.85rem' }}>© 2026 DESEO Studio.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'var(--space-sm)' }}>
            <a href="/politica-de-privacidad" className="footer-link" style={{ fontSize: '0.85rem', opacity: 0.6 }}>Política de privacidad</a>
            <a href="/aviso-legal" className="footer-link" style={{ fontSize: '0.85rem', opacity: 0.6 }}>Aviso legal</a>
          </div>
        </div>

        {/* Columna 2: Menú */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', minWidth: '150px' }}>
          <h4 style={{ fontSize: '0.85rem', opacity: 0.5, letterSpacing: '0.05em' }}>MENÚ</h4>
          <a href="/#filosofia" className="footer-link">Filosofía</a>
          <a href="/#servicios" className="footer-link">Servicios</a>
          <a href="/#archivo" className="footer-link">Archivo</a>
          <a href="/estudio" className="footer-link">Studio</a>
          <a href="/#contacto" className="footer-link">Quiero Deseo</a>
        </div>

        {/* Columna 3: Contacto y Redes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', minWidth: '200px' }}>
          <h4 style={{ fontSize: '0.85rem', opacity: 0.5, letterSpacing: '0.05em' }}>CONTACTO</h4>
          
          <a href="mailto:info@deseostudio.es" className="footer-link">info@deseostudio.es</a>
          
          <div style={{ marginTop: 'var(--space-sm)' }}>
            <a 
              href="https://www.instagram.com/deseostudio.es/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="Instagram de DESEO Studio"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link {
          color: var(--milk);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .footer-link:hover {
          opacity: 0.7;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
