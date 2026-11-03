import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import {
  fadeLeftVariants,
  fadeRightVariants,
  viewportConfig,
} from '../../utils/motionVariants';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="contact">
      <SectionTitle
        title="Contáctanos"
        subtitle="¿Listo para crear algo increíble? Hablemos"
      />

      <div className="contact__content">
        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeLeftVariants}
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="contact__select-wrapper">
            <select
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Seleccionar servicio...
              </option>
              <option value="eventos">Video para Eventos</option>
              <option value="fotografia">Fotografía Profesional</option>
              <option value="bodas">Cobertura de Bodas</option>
              <option value="musicales">Videos Musicales</option>
              <option value="corporativos">Eventos Corporativos</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact__submit">
            ENVIAR MENSAJE
          </button>
        </motion.form>

        <motion.div
          className="contact__info"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeRightVariants}
        >
          <h3>Información de Contacto</h3>

          <div className="contact__info-item">
            <span>📧</span>
            <p>info@judefilms.com</p>
          </div>
          <div className="contact__info-item">
            <span>📱</span>
            <p>+XX XXXX-XXXX</p>
          </div>
          <div className="contact__info-item">
            <span>📍</span>
            <p>Tu Ciudad, País</p>
          </div>

          <div className="contact__divider" />

          <h4>Síguenos</h4>
          <div className="contact__socials">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
