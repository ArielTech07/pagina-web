export const easeOutExpo = [0.16, 1, 0.3, 1];

// Detección segura de móvil y soporte táctil
const isMobile =
  typeof window !== 'undefined' &&
  (window.innerWidth <= 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// En móvil configuramos `once: true` para evitar que la barra de Safari/Chrome iOS
// re-dispare las animaciones, pero en PC/Desktop se mantiene `once: false`
// para que las animaciones de ida y vuelta sigan funcionando fluidamente al subir y bajar
export const viewportConfig = {
  once: isMobile,
  amount: 0.15,
  margin: '-20px',
};

export const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 25 : 0 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const fadeRightVariants = {
  hidden: { opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 25 : 0 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

