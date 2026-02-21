import emailjs from '@emailjs/browser';

// Validación de variables de entorno
const checkEnvVars = () => {
  const missing = [];
  if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  
  if (missing.length > 0) {
    console.warn(`⚠️ Faltan variables de entorno: ${missing.join(', ')}.`);
    console.warn('Detalles: Ve a https://dashboard.emailjs.com/ para obtener tus credenciales');
    return false;
  }
  return true;
};

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'DEMO_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'DEMO_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'DEMO_PUBLIC_KEY'
};

/**
 * Inicializa EmailJS con la clave pública
 * Incluye validación de variables de entorno y manejo de errores
 */
export const initEmailJS = () => {
  try {
    const hasAllVars = checkEnvVars();
    if (!hasAllVars) {
      console.warn('⚠️ EmailJS no completamente configurado. Usando modo DEMO.');
    }
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS inicializado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error inicializando EmailJS:', error);
    // No lanzar error, permitir que la app continúe
    return false;
  }
};

/**
 * Envía email de bienvenida a nuevo usuario demo
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.centerName - Nombre del centro médico
 * @param {string} userData.password - Contraseña temporal
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoWelcomeEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      center_name: userData.centerName,
      temp_password: userData.password,
      demo_days: 14,
      login_url: window.location.origin,
      support_email: 'contacto@automatizasur.cl',
      from_name: 'Agenda Plus - Automatiza Sur',
      reply_to: 'contacto@automatizasur.cl'
    };
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
    
    console.log('✅ Email enviado exitosamente:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Envía email de recordatorio (3 días antes de expirar)
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoReminderEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      days_remaining: userData.daysRemaining,
      upgrade_url: `${window.location.origin}#upgrade`,
      support_email: 'contacto@automatizasur.cl'
    };
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_reminder', // Template ID para recordatorios
      templateParams
    );
    
    console.log('✅ Email de recordatorio enviado:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar recordatorio:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Envía email de expiración de demo
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoExpiredEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      upgrade_url: `${window.location.origin}#upgrade`,
      support_email: 'contacto@automatizasur.cl'
    };
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_expired', // Template ID para expiración
      templateParams
    );
    
    console.log('✅ Email de expiración enviado:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar email de expiración:', error);
    return { success: false, error: error.message };
  }
};

export default {
  initEmailJS,
  sendDemoWelcomeEmail,
  sendDemoReminderEmail,
  sendDemoExpiredEmail
};
