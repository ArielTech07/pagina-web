import { motion } from 'framer-motion';
import {
  easeOutExpo,
  viewportConfig,
  containerStagger,
} from '../../utils/motionVariants';
import './Hero.css';

const heroItemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__overlay"></div>

      <motion.div
        className="hero__content"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerStagger}
      >
        <motion.h1 className="hero__title" variants={heroItemVariants}>
          JUDEFILMS
        </motion.h1>

        <motion.div className="hero__line" variants={heroItemVariants} />

        <motion.p className="hero__tagline" variants={heroItemVariants}>
          Producción Audiovisual Profesional
        </motion.p>

        <motion.p className="hero__disciplines" variants={heroItemVariants}>
          Foto • Video • Eventos
        </motion.p>

        <motion.div className="hero__cta-wrapper" variants={heroItemVariants}>
          <a href="#gallery" className="hero__cta">
            Ver Nuestro Trabajo
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator chevron */}
      <motion.a
        href="#team"
        className="hero__scroll-indicator"
        aria-label="Ir a la siguiente sección"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
      </motion.a>
    </section>
  );
};

export default Hero;
