import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: '001',
    client: 'DESEO',
    year: '2026',
    services: 'BRAND / CULTURE / EXPERIENCE'
  }
];

const Archive = () => {
  return (
    <section id="archivo" className="bg-milk" style={{ padding: 'var(--space-xxl) 0' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: 'var(--space-sm)' }}>
          <h2 className="font-title text-black flex items-center" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span style={{ fontWeight: 700 }}>ARCHIVO</span>
            <span style={{ marginLeft: 'var(--space-lg)', opacity: 0.7 }}>TRABAJOS SELECCIONADOS / 2026</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                padding: 'var(--space-md) 0',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              className="archive-row hover-opacity"
            >
              <div
  className="text-black"
  style={{
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '0.9rem',
    lineHeight: 1.2,
    color: '#222323'
  }}
>
  {project.id}_{project.client}_{project.year}
</div>
              <div className="text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontStyle: 'normal', fontSize: '0.9rem', lineHeight: 1.2, textAlign: 'right', color: '#222323' }}>
                {project.services.replace(/ \//g, '_')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Archive;
