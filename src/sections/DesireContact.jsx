import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesireContact = () => {
  const [step, setStep] = useState(0); // 0 = Intro, 1-5 = Form, 6 = Outro
  
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    projectType: "",
    services: [],
    desiredChange: ""
  });

  React.useEffect(() => {
    // Check initial session storage just in case we arrive from another page later
    const preselect = sessionStorage.getItem('preselectService');
    if (preselect) {
      setFormData(prev => ({ ...prev, services: [preselect] }));
      sessionStorage.removeItem('preselectService');
    }

    // Listen for custom events from the same page (e.g. Services section)
    const handleEvent = (e) => {
      if (e.detail) {
        setFormData(prev => {
          // Add the service if it's not already in the array
          const newServices = prev.services.includes(e.detail) 
            ? prev.services 
            : [...prev.services, e.detail];
          return { ...prev, services: newServices };
        });
      }
    };
    window.addEventListener('preselectService', handleEvent);
    return () => window.removeEventListener('preselectService', handleEvent);
  }, []);
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const prevStep = () => {
    setErrorMsg("");
    setSubmitError(false);
    setStep(s => Math.max(s - 1, 1));
  };

  const submitForm = async () => {
    // Validate
    if (!formData.name.trim() || !formData.business.trim() || !formData.email.trim() || !formData.projectType || formData.services.length === 0) {
      setErrorMsg("Por favor, completa todos los campos requeridos (nombre, negocio, email, proyecto y al menos un servicio).");
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("El email no parece ser válido.");
      return;
    }

    // Validate phone loosely if provided
    if (formData.phone.trim()) {
      const phoneRegex = /^[+\d\s().-]{7,20}$/;
      if (!phoneRegex.test(formData.phone)) {
        setErrorMsg("El número de teléfono parece incorrecto.");
        return;
      }
    }

    setErrorMsg("");
    setIsSubmitting(true);
    setSubmitError(false);

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSczSqlETmbNLTwlH8B-1GaGdfGF0cc5aMzj5fY0NFImuKqevA/formResponse";
    
    const formBody = new URLSearchParams();
    formBody.append("entry.548500793", formData.name);
    formBody.append("entry.1361582844", formData.business);
    if (formData.phone.trim()) formBody.append("entry.2032506249", formData.phone.trim());
    formBody.append("entry.513252555", formData.email.trim());
    
    if (formData.projectType === 'Algo difícil de explicar') {
      formBody.append("entry.321366766", "__other_option__");
      formBody.append("entry.321366766.other_option_response", "Algo difícil de explicar");
    } else {
      formBody.append("entry.321366766", formData.projectType);
    }
    
    if (formData.desiredChange.trim()) formBody.append("entry.2130996171", formData.desiredChange.trim());
    
    formData.services.forEach(service => {
      formBody.append("entry.1604109079", service);
    });

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody.toString()
      });
      // no-cors means we won't get a real response status, assuming success if no throw
      setIsSubmitting(false);
      setStep(6);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(true);
    }
  };

  const handleNext = () => {
    if (step === 5) {
      if (!isSubmitting) submitForm();
    } else {
      setStep(s => Math.min(s + 1, 6));
      setErrorMsg("");
    }
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div 
            key="step-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center text-center"
            style={{ height: '60vh' }}
          >
            <p className="font-sans text-cherry" style={{ marginBottom: 'var(--space-sm)', letterSpacing: '0.05em' }}>
              HAS LLEGADO HASTA AQUÍ.
            </p>
            <h2 className="font-title text-black" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', lineHeight: 0.9, letterSpacing: '-0.02em', fontWeight: 500 }}>
              QUIERO<br />DESEO
            </h2>
            <button 
              onClick={() => setStep(1)}
              className="font-sans bg-cherry text-milk"
              style={{ marginTop: 'var(--space-md)', padding: '1rem 3rem', borderRadius: '50px', fontSize: '1rem' }}
            >
              Comenzar
            </button>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-title font-bold text-black" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', letterSpacing: '-0.02em' }}>¿QUIÉN ERES?</h3>
            <div className="flex flex-col gap-md">
              <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="contact-input" />
              <input type="text" placeholder="¿Cómo se llama tu negocio / marca?" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} className="contact-input" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-title font-bold text-black" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', letterSpacing: '-0.02em' }}>¿QUÉ TIENES ENTRE MANOS?</h3>
            <div className="flex flex-col gap-sm">
              {['Una marca', 'Un negocio', 'Una idea', 'Algo difícil de explicar'].map(opt => (
                <label key={opt} className="contact-radio">
                  <input type="radio" name="manos" checked={formData.projectType === opt} onChange={() => setFormData({...formData, projectType: opt})} /> {opt}
                </label>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-title font-bold text-black" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', letterSpacing: '-0.02em' }}>¿DÓNDE NOS NECESITAS?</h3>
            <div className="flex flex-col gap-sm">
              {['BRAND', 'CULTURE', 'GROWTH', 'EXPERIENCE', 'No lo tengo claro'].map(opt => (
                <label key={opt} className="contact-checkbox">
                  <input type="checkbox" checked={formData.services.includes(opt)} onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData(prev => ({
                      ...prev,
                      services: checked ? [...prev.services, opt] : prev.services.filter(s => s !== opt)
                    }));
                  }} /> {opt}
                </label>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-title font-bold text-black" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', letterSpacing: '-0.02em' }}>¿QUÉ QUIERES QUE CAMBIE?</h3>
            <textarea placeholder="Escribe aquí... (Opcional)" value={formData.desiredChange} onChange={e => setFormData({...formData, desiredChange: e.target.value})} className="contact-input" rows="4"></textarea>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="font-title font-bold text-black" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', letterSpacing: '-0.02em' }}>¿CÓMO TE CONTACTAMOS?</h3>
            <div className="flex flex-col gap-md">
              <input type="tel" placeholder="¿Nos pasas tu número? (Opcional)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="contact-input" />
              <input type="email" placeholder="¿O seguimos por mail? (Requerido)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="contact-input" />
            </div>
            
            <p className="font-serif" style={{ marginTop: '2.5rem', fontSize: '1.15rem', fontStyle: 'italic', color: 'rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
              Tus datos, bien cuidados. Usaremos la información que nos facilites para responder a tu solicitud, valorar tu proyecto y ponernos en contacto contigo. Puedes consultar todos los detalles en nuestra <a href="/politica-de-privacidad" style={{ color: 'inherit', textDecoration: 'underline' }}>Política de privacidad</a>.
            </p>
          </motion.div>
        );
      case 6:
        return (
          <motion.div 
            key="step-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center"
            style={{ height: '50vh' }}
          >
            <h2 className="font-title text-cherry" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em', fontWeight: 500 }}>
              Ya has hecho tu parte.<br/>Ahora nos toca a nosotras.
            </h2>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contacto" className="bg-milk text-black relative" style={{ minHeight: '100vh', padding: 'var(--space-xxl) 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        {errorMsg && (
          <p className="font-serif" style={{ color: 'var(--deep-cherry)', marginTop: '1.5rem', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 500 }}>
            {errorMsg}
          </p>
        )}
        
        {submitError && (
          <p className="font-serif" style={{ color: 'var(--deep-cherry)', marginTop: '1.5rem', fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 500 }}>
            Algo no ha salido como debía. Prueba otra vez.
          </p>
        )}

        {step > 0 && step < 6 && (
          <div className="flex justify-between" style={{ marginTop: 'var(--space-xl)' }}>
            <button onClick={prevStep} disabled={isSubmitting} className="font-sans text-cherry font-bold" style={{ padding: '0.5rem 0', opacity: isSubmitting ? 0.5 : 1 }}>← Atrás</button>
            <button onClick={handleNext} disabled={isSubmitting} className="font-sans text-black" style={{ padding: '0.5rem 2rem', border: '1px solid var(--black)', borderRadius: '50px', opacity: isSubmitting ? 0.5 : 1 }}>
              {isSubmitting ? 'Enviando...' : (step === 5 ? 'Enviar' : 'Siguiente →')}
            </button>
          </div>
        )}
      </div>
      
      {/* Global styles for contact inputs just for this section */}
      <style>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.3);
          color: var(--black);
          padding: 1rem 0;
          font-family: var(--font-title);
          font-size: 1.25rem;
          outline: none;
        }
        .contact-input::placeholder {
          color: rgba(0,0,0,0.4);
        }
        .contact-input:focus {
          border-bottom-color: var(--black);
        }
        .contact-radio, .contact-checkbox {
          font-family: var(--font-title);
          font-size: 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .contact-radio input[type="radio"], .contact-checkbox input[type="checkbox"] {
          accent-color: var(--deep-cherry);
          width: 1.2rem;
          height: 1.2rem;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default DesireContact;
