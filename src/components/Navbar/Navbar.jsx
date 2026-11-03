import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo } from '../../utils/motionVariants';
import logoJude from '../../assets/logo_jude.png';
import './Navbar.css';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#team' },
  { label: 'Servicios', href: '#services' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Contacto', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueo de scroll en body y html cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <a href="#hero" className="navbar__logo">
            <img src={logoJude} alt="JudeFilms Logo" className="navbar__logo-img" />
          </a>

          {/* Enlaces de escritorio */}
          <nav className="navbar__nav">
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="navbar__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón hamburguesa */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="navbar__hamburger-bar"></span>
            <span className="navbar__hamburger-bar"></span>
            <span className="navbar__hamburger-bar"></span>
          </button>
        </div>
      </header>

      {/* Menú móvil a pantalla completa renderizado en el body para evitar conflictos de stacking context */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="navbar__mobile-overlay"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                {/* Cabecera del menú móvil */}
                <div className="navbar__mobile-header">
                  <img
                    src={logoJude}
                    alt="JudeFilms Logo"
                    className="navbar__mobile-logo"
                  />
                  <button
                    className="navbar__mobile-close"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Cerrar menú"
                  >
                    ✕
                  </button>
                </div>

                {/* Lista de enlaces */}
                <nav className="navbar__mobile-nav">
                  <ul className="navbar__mobile-links">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * index, duration: 0.4 }}
                      >
                        <a
                          href={link.href}
                          className="navbar__mobile-link"
                          onClick={handleLinkClick}
                        >
                          <span className="navbar__mobile-index">0{index + 1}</span>
                          <span className="navbar__mobile-text">{link.label}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Pie del menú móvil */}
                <div className="navbar__mobile-footer">
                  <p className="navbar__mobile-tag">PRODUCCIÓN AUDIOVISUAL</p>
                  <p className="navbar__mobile-contact">info@judefilms.com</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
