import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import {
  fadeLeftVariants,
  fadeRightVariants,
  viewportConfig,
} from "../../utils/motionVariants";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    servicio: "",
    mensaje: "",
  });

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/judefilmsfotoyvideo/",
    },
    { label: "Facebook", href: "https://www.facebook.com/judefilms" },
    { label: "WhatsApp", href: "https://wa.me/51903277681?text=Hola%20JudeFilms%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = `Hola JudeFilms, mi nombre es ${formData.nombre} (${formData.email}). Me interesa consultar por el servicio de ${formData.servicio || "Producción Audiovisual"}: "${formData.mensaje}"`;
    window.open(`https://wa.me/51903277681?text=${encodeURIComponent(texto)}`, "_blank");
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
              <option value="corporativos">Eventos Corporativos</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            rows="7"
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
            <div className="contact__info-icon-wrapper" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact__info-icon"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <a href="mailto:info@judefilms.com" className="contact__info-link">
              info@judefilms.com
            </a>
          </div>

          <div className="contact__info-item">
            <div className="contact__info-icon-wrapper" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact__info-icon"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <p>+51 903 277 681</p>
          </div>

          <div className="contact__info-item">
            <div className="contact__info-icon-wrapper" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="contact__info-icon"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p>Lima, Perú</p>
          </div>

          <div className="contact__divider" />

          <h4>Síguenos</h4>
          <div className="contact__socials">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
