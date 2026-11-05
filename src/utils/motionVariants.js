export const easeOutExpo = [0.16, 1, 0.3, 1];

export const viewportConfig = {
  once: true,
  amount: 0.1,
};

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const headerVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const fadeLeftVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeRightVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

