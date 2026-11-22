export const easeOutExpo = [0.16, 1, 0.3, 1];

// Detección segura de móvil
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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

