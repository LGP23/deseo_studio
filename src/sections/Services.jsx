import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const servicesData = [
  {
    id: '01',
    title: 'BRAND',
    desc: 'Territorio visual y conceptual de marca.',
    expandedDesc: 'Construimos marcas con una identidad clara, reconocible y coherente. Trabajamos la estrategia de marca, el posicionamiento, la identidad visual, el tono de comunicación y el universo creativo para que cada negocio tenga una personalidad propia y sepa cómo expresarla.',
    alignment: 'flex-start'
  },
  {
    id: '02',
    title: 'CULTURE',
    desc: 'Comunidad, pertenencia y universo alrededor del negocio.',
    expandedDesc: 'Creamos la cultura que hace que una marca deje de ser solo algo que se compra y empiece a ser algo de lo que apetece formar parte. Definimos su universo, contenidos, comunidad y forma de relacionarse con las personas para construir conexión y pertenencia alrededor del negocio.',
    alignment: 'flex-end'
  },
  {
    id: '03',
    title: 'GROWTH',
    desc: 'Crecimiento, captación y conversión con intención.',
    expandedDesc: 'Diseñamos estrategias de marketing y comunicación orientadas a hacer crecer el negocio. Trabajamos la captación de clientes, campañas digitales, contenido, redes sociales y conversión para transformar atención en oportunidades reales de crecimiento.',
    alignment: 'center'
  },
  {
    id: '04',
    title: 'EXPERIENCE',
    desc: 'Lo que ocurre cuando la marca deja de contarse y empieza a vivirse.',
    expandedDesc: 'Diseñamos experiencias de marca que conectan lo digital con lo físico. Trabajamos cada punto de contacto, desde la web y la experiencia digital hasta el espacio, el servicio, los eventos y los pequeños detalles que hacen que alguien quiera volver.',
    alignment: 'flex-start'
  }
];

const Services = () => {
  const [openService, setOpenService] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleService = (id) => {
    setOpenService(prev => prev === id ? null : id);
  };

  const handleCtaClick = (e, title) => {
    e.preventDefault();
    // Dispatch custom event for same-page preselection
    window.dispatchEvent(new CustomEvent('preselectService', { detail: title }));
    // Also set sessionStorage just in case
    sessionStorage.setItem('preselectService', title);
    
    // Smooth scroll to #contacto
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="servicios" className="bg-milk" style={{ padding: 'var(--space-xxl) 0' }}>
      <div className="container">
        <div className="flex flex-col gap-xl">
          {servicesData.map((service) => {
            const isOpen = openService === service.id;

            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: service.alignment,
                  position: 'relative',
                  padding: 'var(--space-lg) 0'
                }}
              >
                <div 
                  className="font-sans text-grey" 
                  style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)', letterSpacing: '0.05em' }}
                >
                  {service.id}
                </div>
                
                {/* Trigger Button */}
                <button
                  onClick={() => toggleService(service.id)}
                  aria-expanded={isOpen}
                  aria-controls={`sect-${service.id}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    textAlign: 'inherit',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25em',
                    color: 'var(--black)',
                    outlineOffset: '8px'
                  }}
                  className="service-trigger"
                >
                  <h3 
                    className="font-sans" 
                    style={{ 
                      fontSize: 'clamp(3rem, 8vw, 7rem)', 
                      lineHeight: 0.9, 
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      margin: 0
                    }}
                  >
                    {service.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    style={{ 
                      fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                      display: 'inline-block',
                      lineHeight: 1,
                      marginTop: '0.1em'
                    }}
                  >
                    ⌄
                  </motion.span>
                </button>

                {/* Subtitle */}
                <p 
                  className="font-serif text-black" 
                  style={{ 
                    maxWidth: '400px', 
                    marginTop: 'var(--space-sm)', 
                    fontSize: '1.25rem',
                    textAlign: service.alignment === 'flex-end' ? 'right' : service.alignment === 'center' ? 'center' : 'left'
                  }}
                >
                  {service.desc}
                </p>

                {/* Expanded Content (always in DOM for SEO) */}
                <motion.div
                  id={`sect-${service.id}`}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{ 
                    height: isOpen ? 'auto' : 0, 
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : (prefersReducedMotion ? 0 : -10)
                  }}
                  transition={{ 
                    duration: prefersReducedMotion ? 0 : 0.4, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  style={{ 
                    overflow: 'hidden',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: service.alignment
                  }}
                >
                  <div 
                    style={{ 
                      paddingTop: 'var(--space-md)', 
                      maxWidth: '550px',
                      textAlign: service.alignment === 'flex-end' ? 'right' : service.alignment === 'center' ? 'center' : 'left'
                    }}
                  >
                    <p 
                      className="font-sans" 
                      style={{ 
                        color: 'var(--black)', 
                        fontSize: '1.1rem', 
                        lineHeight: 1.5,
                        margin: 0,
                        fontWeight: 400
                      }}
                    >
                      {service.expandedDesc}
                    </p>
                    
                    <a 
                      href="#contacto"
                      onClick={(e) => handleCtaClick(e, service.title)}
                      style={{
                        display: 'inline-block',
                        marginTop: '1.5rem',
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--black)',
                        textDecoration: 'none',
                        borderBottom: '2px solid var(--black)',
                        paddingBottom: '0.1em',
                        letterSpacing: '0.02em'
                      }}
                    >
                      QUIERO {service.title} &rarr;
                    </a>
                  </div>
                </motion.div>
                
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        .service-trigger:hover {
          color: var(--deep-cherry) !important;
        }
        .service-trigger:focus-visible {
          outline: 2px solid var(--deep-cherry);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default Services;
