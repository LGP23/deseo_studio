import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const content = `
1. ¿QUIÉN ES RESPONSABLE DEL TRATAMIENTO DE TUS DATOS?

Los datos personales recogidos a través de este sitio web serán tratados conjuntamente en el marco de la actividad desarrollada bajo el nombre comercial DESEO Studio por:

Olga Prieto Leira
Alejandra Villegas Galeiras

Nombre comercial: DESEO Studio
Localización: 15570 Narón, A Coruña, España
Correo electrónico: info@dseoestudio.es
Sitio web: dseoestudio.es


2. ¿QUÉ DATOS RECOGEMOS?

A través del formulario de contacto QUIERO DESEO podemos recoger los siguientes datos:

Nombre y apellidos, nombre del negocio o marca, número de teléfono cuando decidas proporcionarlo, correo electrónico, tipo de proyecto, servicios en los que estás interesado y cualquier información que voluntariamente incluyas en el campo destinado a explicar tu proyecto o necesidades.

Te recomendamos no incluir en los campos de texto información especialmente sensible que no sea necesaria para valorar tu solicitud.


3. ¿PARA QUÉ UTILIZAMOS TUS DATOS?

Utilizamos los datos que nos facilitas para:

• recibir y gestionar tu solicitud de contacto;
• comunicarnos contigo;
• conocer y valorar el proyecto que nos planteas;
• preparar, cuando proceda, una posible propuesta de servicios;
• gestionar las comunicaciones previas necesarias para una posible relación profesional.

Los datos obtenidos mediante este formulario no se incorporarán automáticamente a newsletters ni se utilizarán para enviarte comunicaciones promocionales ajenas a tu solicitud.


4. BASE JURÍDICA

El tratamiento se realizará sobre la base jurídica que resulte aplicable a la solicitud realizada por la persona interesada y a las actuaciones precontractuales que, en su caso, esta solicite.

Cuando un tratamiento adicional requiera consentimiento, este se solicitará de manera específica y separada.


5. ¿DURANTE CUÁNTO TIEMPO CONSERVAMOS TUS DATOS?

Los datos se conservarán durante el tiempo necesario para atender y gestionar tu solicitud y, cuando se inicie una relación profesional, durante el tiempo necesario para gestionarla y cumplir las obligaciones legales aplicables.

Cuando los datos dejen de ser necesarios para las finalidades para las que fueron recogidos, serán eliminados o, cuando corresponda legalmente, conservados debidamente bloqueados durante los plazos exigibles.


6. ¿DÓNDE SE ALMACENAN LOS DATOS?

Las solicitudes realizadas mediante QUIERO DESEO se gestionan utilizando servicios tecnológicos de Google, actualmente Google Forms y Google Sheets, que utilizamos para recibir, organizar y gestionar la información facilitada.

El uso de proveedores tecnológicos puede implicar tratamientos realizados por terceros que actúan como proveedores o encargados del tratamiento conforme a las condiciones y garantías que resulten aplicables.


7. ¿COMPARTIMOS TUS DATOS?

No venderemos tus datos personales ni los cederemos a terceros para sus propios fines comerciales.

Podrán tener acceso a determinada información aquellos proveedores tecnológicos que sean necesarios para prestar y gestionar nuestros servicios, así como organismos o autoridades públicas cuando exista una obligación legal.


8. TRANSFERENCIAS INTERNACIONALES

Algunos proveedores tecnológicos utilizados para prestar nuestros servicios pueden operar internacionalmente.

Cuando un tratamiento implique una transferencia internacional de datos, esta deberá realizarse utilizando los mecanismos y garantías previstos por la normativa aplicable.


9. TUS DERECHOS

Puedes ejercer, cuando correspondan, tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos personales.

Para ejercerlos puedes escribir a:

info@dseoestudio.es

Indica en tu solicitud qué derecho deseas ejercer e incluye la información necesaria para que podamos identificar correctamente la solicitud.

También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que el tratamiento de tus datos personales no se ajusta a la normativa.


10. SEGURIDAD

Adoptaremos medidas técnicas y organizativas apropiadas para proteger los datos personales frente a accesos no autorizados, pérdida, alteración, divulgación o destrucción, teniendo en cuenta la naturaleza de la información tratada y los riesgos existentes.


11. CAMBIOS EN ESTA POLÍTICA

Esta Política de privacidad podrá actualizarse cuando cambien nuestros tratamientos de datos, los servicios utilizados, nuestra situación jurídica o la normativa aplicable.

La versión publicada en esta página será la vigente en cada momento.
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
        if (l.startsWith('Sitio web: dseoestudio.es')) {
          return <React.Fragment key={lIdx}>Sitio web: <a href="/" style={{ textDecoration: 'underline' }}>dseoestudio.es</a><br/></React.Fragment>;
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

const PoliticaPrivacidad = () => {
  useEffect(() => {
    document.title = "Política de privacidad | DESEO Studio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Consulta la Política de privacidad de DESEO Studio y cómo tratamos los datos personales facilitados a través de nuestra web.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Consulta la Política de privacidad de DESEO Studio y cómo tratamos los datos personales facilitados a través de nuestra web.";
      document.head.appendChild(meta);
    }
    window.scrollTo(0, 0);
  }, []);

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
              POLÍTICA DE<br/>PRIVACIDAD
            </h1>
            <p style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', opacity: 0.6 }}>
              Última actualización: octubre de 2026
            </p>
          </header>

          <div className="legal-content">
            {formatContent(content)}
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
