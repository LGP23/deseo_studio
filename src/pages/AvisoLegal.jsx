import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const introText = `Este sitio web, accesible a través de dseoestudio.es, corresponde al proyecto creativo desarrollado bajo el nombre comercial DESEO Studio por Olga Prieto Leira y Alejandra Villegas Galeiras, con localización en 15570 Narón, A Coruña, España, y correo electrónico de contacto info@dseoestudio.es.`;

const content = `
1. FINALIDAD DEL SITIO WEB

El sitio tiene como finalidad presentar DESEO Studio, sus servicios creativos y profesionales, proyectos y contenidos, así como permitir que personas y negocios interesados puedan ponerse en contacto con nosotras.


2. USO DEL SITIO

Las personas usuarias se comprometen a utilizar este sitio web de forma lícita y a no realizar actuaciones que puedan impedir su correcto funcionamiento, comprometer su seguridad o vulnerar derechos de terceros.


3. PROPIEDAD INTELECTUAL

Salvo que se indique lo contrario, los textos, diseños, identidad visual, elementos gráficos, fotografías, vídeos, composiciones y demás contenidos originales presentes en este sitio pertenecen a sus respectivas titulares o se utilizan contando con los derechos o autorizaciones correspondientes.

No está permitida su reproducción, distribución, transformación o utilización con fines comerciales sin la autorización correspondiente, salvo en los casos permitidos legalmente.


4. ENLACES EXTERNOS

Este sitio puede contener enlaces a páginas o servicios de terceros.

DESEO Studio no controla necesariamente sus contenidos, disponibilidad o políticas, por lo que cada servicio externo será responsable de sus propias condiciones.


5. RESPONSABILIDAD

Procuramos que la información publicada sea correcta y se mantenga actualizada.

No obstante, no podemos garantizar la inexistencia absoluta de errores, interrupciones técnicas o incidencias derivadas de servicios de terceros.


6. PROTECCIÓN DE DATOS

El tratamiento de los datos personales obtenidos a través de este sitio se explica detalladamente en nuestra Política de privacidad.


7. CONTACTO

Para cualquier consulta relacionada con este sitio web puedes escribir a:

info@dseoestudio.es
`.trim();

const formatContent = (text) => {
  const blocks = text.split('\n\n\n');
  
  return blocks.map((block, idx) => {
    const lines = block.split('\n');
    const header = lines[0];
    const bodyText = lines.slice(1).join('\n').trim();
    
    // Convert paragraphs
    const paragraphs = bodyText.split('\n\n').map((p, pIdx) => {
      // Process lines for bullet points
      const pLines = p.split('\n').map((l, lIdx) => {
        if (l.startsWith('info@dseoestudio.es')) {
          return <React.Fragment key={lIdx}><a href="mailto:info@dseoestudio.es" style={{ textDecoration: 'underline' }}>info@dseoestudio.es</a><br/></React.Fragment>;
        }
        
        // Handle "Política de privacidad" link
        if (l.includes('Política de privacidad')) {
          const parts = l.split('Política de privacidad');
          return (
            <React.Fragment key={lIdx}>
              {parts[0]}
              <a href="/politica-de-privacidad" style={{ textDecoration: 'underline' }}>Política de privacidad</a>
              {parts[1]}<br/>
            </React.Fragment>
          );
        }
        
        return <React.Fragment key={lIdx}>{l}<br/></React.Fragment>;
      });
      return <p key={pIdx} style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>{pLines}</p>;
    });
    
    return (
      <section key={idx} style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
          {header}
        </h2>
        <div style={{ fontFamily: 'var(--font-title)', fontWeight: 400, fontSize: '1rem', color: 'var(--black)' }}>
          {paragraphs}
        </div>
      </section>
    );
  });
};

const AvisoLegal = () => {
  useEffect(() => {
    document.title = "Aviso legal | DESEO Studio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Consulta la información legal relativa al sitio web de DESEO Studio, su titularidad, uso y condiciones generales.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Consulta la información legal relativa al sitio web de DESEO Studio, su titularidad, uso y condiciones generales.";
      document.head.appendChild(meta);
    }
    window.scrollTo(0, 0);
  }, []);
  
  const formattedIntro = () => {
    const parts1 = introText.split('dseoestudio.es');
    const intro1 = (
      <>
        {parts1[0]}
        <a href="/" style={{ textDecoration: 'underline' }}>dseoestudio.es</a>
        {parts1[1].split('info@dseoestudio.es')[0]}
        <a href="mailto:info@dseoestudio.es" style={{ textDecoration: 'underline' }}>info@dseoestudio.es</a>.
      </>
    );
    return intro1;
  };

  return (
    <div style={{ backgroundColor: '#dfdfdf', color: 'var(--black)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      
      <main style={{ flex: 1, padding: 'var(--space-xxl) var(--padding-x) var(--space-xl)', display: 'flex', justifyContent: 'center' }}>
        <article style={{ width: '100%', maxWidth: '800px' }}>
          
          <header style={{ marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-title)', 
              fontWeight: 800, 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}>
              AVISO<br/>LEGAL
            </h1>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', opacity: 0.6 }}>
              Última actualización: octubre de 2026
            </p>
          </header>

          <div className="legal-content">
            <p style={{ fontFamily: 'var(--font-title)', fontWeight: 400, fontSize: '1rem', color: 'var(--black)', marginBottom: '4rem', lineHeight: 1.6 }}>
              {formattedIntro()}
            </p>
            {formatContent(content)}
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AvisoLegal;
