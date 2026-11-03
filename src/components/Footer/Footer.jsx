import { motion } from 'framer-motion';
import {
  containerStagger,
  headerVariants,
  viewportConfig,
} from '../../utils/motionVariants';
import './Footer.css';

const Footer = () => {
  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Nosotros', href: '#team' },
    { label: 'Servicios', href: '#services' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Contacto', href: '#contact' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'WhatsApp', href: '#' },
  ];

  return (
    <footer className="footer">
      <motion.div
        className="footer__content"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerStagger}
      >
        <motion.div className="footer__brand" variants={headerVariants}>
          <h3>JUDEFILMS</h3>
          <p>Producción Audiovisual Profesional</p>
        </motion.div>

        <motion.div className="footer__links" variants={headerVariants}>
          <h4>Enlaces</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="footer__social" variants={headerVariants}>
          <h4>Redes Sociales</h4>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <div className="footer__bottom">
        <p>© 2026 JudeFilms. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
