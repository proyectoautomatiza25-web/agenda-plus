import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import SaaSApp from './SaaSApp'
import LoginModal from './components/LoginModal'
import DemoRegistration from './components/DemoRegistration'
import ErrorBoundary from './components/ErrorBoundary'
import { initEmailJS } from './services/emailService'

function App() {
  const [showSaaS, setShowSaaS] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [appError, setAppError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Inicializar EmailJS al cargar la app con error handling
  useEffect(() => {
    try {
      initEmailJS();
      setAppError(null);
    } catch (error) {
      console.error('Error inicializando EmailJS:', error);
      // No bloquear la app si EmailJS falla
      setAppError('Advertencia: Email no disponible por el momento');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const handleAdminClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowSaaS(true);
    setShowLoginModal(false);
    setIsDemoMode(false);
  };

  const handleDemoSuccess = () => {
    setShowSaaS(true);
    setShowDemoModal(false);
    setIsDemoMode(true);
  };

  const handleDemoClick = () => {
    setShowDemoModal(true);
  };

  const handleLogout = () => {
    setShowSaaS(false);
    setIsDemoMode(false);
  };

  // Mostrar pantalla de carga
  if (isInitializing) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <h2>Cargando Agenda Plus...</h2>
      </div>
    );
  }

  // Si estamos en modo SaaS, mostrar la app
  if (showSaaS) {
    return (
      <ErrorBoundary>
        <SaaSApp isDemoMode={isDemoMode} onLogout={handleLogout} />
      </ErrorBoundary>
    );
  }

  // Modo landing page
  return (
    <ErrorBoundary>
      <div className="app">
        {appError && (
          <div style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            ⚠️ {appError}
          </div>
        )}
        <Navbar onAdminClick={handleAdminClick} />
        <Hero onAdminClick={handleAdminClick} onDemoClick={handleDemoClick} />
        <Services />
        <Pricing />
        <WhatsAppButton />
        <Footer />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <DemoRegistration
          isOpen={showDemoModal}
          onClose={() => setShowDemoModal(false)}
          onSuccess={handleDemoSuccess}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
