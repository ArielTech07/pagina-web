import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import { getVideoEmbedUrl } from "../../utils/videoUtils";
import {
  containerStagger,
  cardVariants,
  easeOutExpo,
  viewportConfig,
  headerVariants,
} from "../../utils/motionVariants";
import "./Services.css";

const generalServices = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="service-card__svg"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    ),
    title: "Producción de Video",
    featured: false,
    tag: "Video & Edición",
    description:
      "Grabamos y editamos videos para redes sociales, publicidad y eventos. Cuidamos cada detalle de la imagen y el sonido para que tu mensaje conecte y destaque.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="service-card__svg"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    title: "Fotografía Profesional",
    featured: false,
    tag: "Sesiones & Eventos",
    description:
      "Fotografías nítidas y bien cuidadas para marcas, eventos o retratos personales. Nos enfocamos en tomas naturales con un retoque limpio de alta calidad.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="service-card__svg"
      >
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </svg>
    ),
    title: "Bodas & Eventos Sociales",
    featured: false,
    tag: "Momentos Especiales",
    description:
      "Acompañamos tus fechas más importantes de inicio a fin. Registramos las emociones, risas y detalles espontáneos para que revivas ese día cuando quieras.",
  },
];

const carouselSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 70 : direction < 0 ? -70 : 0,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
      staggerChildren: 0.06,
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -70 : direction < 0 ? 70 : 0,
    opacity: 0,
    scale: 0.985,
    transition: {
      duration: 0.28,
      ease: easeOutExpo,
    },
  }),
};

const slideItemVariants = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const Services = () => {
  const [projects, setProjects] = useState([]);
  const [[activeIndex, direction], setSlideState] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(true);

  const activeProject = projects[activeIndex] || null;

  const paginate = useCallback(
    (newDirection) => {
      if (projects.length <= 1) return;
      setSlideState(([prevIndex]) => {
        const nextIndex =
          (prevIndex + newDirection + projects.length) % projects.length;
        return [nextIndex, newDirection];
      });
    },
    [projects.length],
  );

  const goToIndex = useCallback(
    (targetIndex) => {
      setSlideState(([prevIndex]) => {
        if (targetIndex === prevIndex) return [prevIndex, 0];
        const newDirection = targetIndex > prevIndex ? 1 : -1;
        return [targetIndex, newDirection];
      });
    },
    [],
  );

  const handleDragEnd = useCallback(
    (_event, info) => {
      if (projects.length <= 1) return;
      const { offset, velocity } = info;
      if (offset.x < -50 || velocity.x < -320) {
        paginate(1);
      } else if (offset.x > 50 || velocity.x > 320) {
        paginate(-1);
      }
    },
    [projects.length, paginate],
  );

  // Cargar proyectos de video y casos corporativos dinámicos desde el backend
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

    fetch(`${API_URL}/public/galeria/videos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener la lista de videos");
        }
        return res.json();
      })
      .then((data) => {
        const videoItems = Array.isArray(data) ? data : [];
        if (videoItems.length > 0) {
          const mapped = videoItems.map((item) => ({
            id: item.id,
            tag: item.empresa || item.titulo || "PROYECTO",
            title: item.titulo || "Evento Corporativo",
            client: item.empresa
              ? `Evento Corporativo • ${item.empresa}`
              : "Evento Corporativo",
            description: item.descripcion || "- Producción JudeFilms",
            image:
              item.imageUrl || item.clienteAvatarUrl || "/client-avatar.jpg",
            videoUrl: item.videoUrl || "",
            duration: "4K UHD",
            testimonial:
              item.clienteNombre || item.clienteComentario
                ? {
                    clientName: item.clienteNombre || "Cliente JudeFilms",
                    clientRole: item.clienteCargo || "Director General",
                    clientCompany: item.empresa || "",
                    clientImage:
                      item.clienteAvatarUrl ||
                      item.imageUrl ||
                      "/client-avatar.jpg",
                    quote: item.clienteComentario || "",
                  }
                : null,
          }));
          setProjects(mapped);
          setSlideState([0, 0]);
        } else {
          setProjects([]);
          setSlideState([0, 0]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar casos corporativos:", err);
        setProjects([]);
        setSlideState([0, 0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="services" className="services">
      {/* Título de la Sección */}
      <SectionTitle
        title="Nuestros Servicios"
        subtitle="Especialistas en producciones audiovisuales con estándares de alta calidad"
      />

      {/* ── SECCIÓN DESTACADA: ENFOQUE EN EVENTOS CORPORATIVOS ── */}
      <div className="corporate-showcase">
        <motion.div
          className="corporate-showcase__header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={cardVariants}
        >
          <h3 className="corporate-showcase__heading">
            Producción Audiovisual para Eventos Corporativos
          </h3>
          <p className="corporate-showcase__subheading">
            Convertimos las convenciones, galas y conferencias de tu empresa en
            piezas visuales de alta gama que comunican liderazgo y prestigio.
          </p>

          {/* Selector de Casos de Éxito Corporativos (solo si hay proyectos) */}
          {projects.length > 0 && (
            <div className="corporate-showcase__tabs">
              {projects.map((project, idx) => (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`corporate-showcase__tab-btn ${
                    activeIndex === idx ? "active" : ""
                  }`}
                  onClick={() => goToIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.tag}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Galería Desplazable: Video + Información con Flechas y Swipe Táctil */}
        {projects.length > 0 && activeProject ? (
          <motion.div
            className="corporate-showcase__carousel"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={cardVariants}
          >
            <div className="corporate-showcase__stage">
              {projects.length > 1 && (
                <>
                  <motion.button
                    type="button"
                    className="corporate-showcase__arrow corporate-showcase__arrow--prev"
                    onClick={() => paginate(-1)}
                    aria-label="Evento anterior"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </motion.button>

                  <motion.button
                    type="button"
                    className="corporate-showcase__arrow corporate-showcase__arrow--next"
                    onClick={() => paginate(1)}
                    aria-label="Siguiente evento"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.button>
                </>
              )}

              <div className="corporate-showcase__viewport">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={activeProject.id}
                    className={`corporate-showcase__grid ${
                      projects.length > 1 ? "is-draggable" : ""
                    }`}
                    custom={direction}
                    variants={carouselSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={projects.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    dragDirectionLock
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    style={{ touchAction: "pan-y" }}
                  >
                    {/* LADO IZQUIERDO / PRINCIPAL EN MÓVIL: Video Player */}
                    <motion.div
                      className="corporate-showcase__media-wrapper"
                      variants={slideItemVariants}
                    >
                      <div className="corporate-showcase__media-frame">
                        {activeProject?.videoUrl ? (
                          <div className="corporate-showcase__video-embed-container">
                            <iframe
                              src={getVideoEmbedUrl(activeProject.videoUrl)}
                              title={activeProject.title || "Video corporativo"}
                              className="corporate-showcase__video-iframe"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="corporate-showcase__media-placeholder">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="corporate-showcase__placeholder-icon"
                            >
                              <polygon points="23 7 16 12 23 17 23 7" />
                              <rect
                                x="1"
                                y="5"
                                width="15"
                                height="14"
                                rx="2"
                                ry="2"
                              />
                            </svg>
                            <span>Video no disponible</span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* LADO DERECHO: Ficha Técnica y Descripción */}
                    <motion.div
                      className="corporate-showcase__info"
                      variants={slideItemVariants}
                    >
                      <motion.div
                        className="corporate-showcase__client-tag"
                        variants={slideItemVariants}
                      >
                        {activeProject.client}
                      </motion.div>

                      <motion.h4
                        className="corporate-showcase__title"
                        variants={slideItemVariants}
                      >
                        {activeProject.title}
                      </motion.h4>

                      <motion.p
                        className="corporate-showcase__desc"
                        variants={slideItemVariants}
                      >
                        {activeProject.description}
                      </motion.p>

                      {/* ── Testimonial del Cliente ── */}
                      {activeProject.testimonial && (
                        <motion.div
                          className="corporate-showcase__testimonial"
                          variants={slideItemVariants}
                          whileHover={{ y: -3 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="corporate-showcase__testimonial-top">
                            {/* Imagen del cliente en círculo */}
                            <motion.div
                              className="corporate-showcase__testimonial-avatar-wrapper"
                              initial={{ scale: 0.85, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.45, delay: 0.1 }}
                            >
                              <img
                                src={activeProject.testimonial.clientImage}
                                alt={activeProject.testimonial.clientName}
                                className="corporate-showcase__testimonial-avatar"
                                loading="lazy"
                              />
                            </motion.div>

                            {/* Nombre y Cargo con la barra de acento vertical */}
                            <div className="corporate-showcase__testimonial-author">
                              <div className="corporate-showcase__testimonial-bar" />
                              <div className="corporate-showcase__testimonial-info">
                                <h5 className="corporate-showcase__testimonial-name">
                                  {activeProject.testimonial.clientName}
                                </h5>
                                <p className="corporate-showcase__testimonial-role">
                                  {activeProject.testimonial.clientRole}
                                  {activeProject.testimonial.clientCompany && (
                                    <span className="corporate-showcase__testimonial-company">
                                      {", "}
                                      {activeProject.testimonial.clientCompany}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Mensaje testimonial con comillas estilizadas */}
                          <div className="corporate-showcase__testimonial-quote-box">
                            <span
                              className="corporate-showcase__quote-mark corporate-showcase__quote-mark--start"
                              aria-hidden="true"
                            >
                              “
                            </span>
                            <p className="corporate-showcase__testimonial-quote">
                              {activeProject.testimonial.quote}
                            </p>
                            <span
                              className="corporate-showcase__quote-mark corporate-showcase__quote-mark--end"
                              aria-hidden="true"
                            >
                              ”
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Indicadores inferiores (Puntos + Contador + Hint de swipe móvil) */}
            {projects.length > 1 && (
              <div className="corporate-showcase__controls">
                <div className="corporate-showcase__pagination">
                  <div className="corporate-showcase__dots">
                    {projects.map((project, idx) => (
                      <button
                        key={project.id}
                        type="button"
                        className={`corporate-showcase__dot ${
                          activeIndex === idx ? "active" : ""
                        }`}
                        onClick={() => goToIndex(idx)}
                        aria-label={`Ir al evento ${idx + 1}: ${project.tag}`}
                        aria-current={activeIndex === idx ? "true" : undefined}
                      />
                    ))}
                  </div>
                  <span className="corporate-showcase__counter">
                    {activeIndex + 1} / {projects.length}
                  </span>
                </div>
              </div>
            )}

            {projects.length > 1 && (
              <p className="corporate-showcase__swipe-hint" aria-hidden="true">
                Desliza o usa las flechas para explorar más eventos
              </p>
            )}
          </motion.div>
        ) : !isLoading && projects.length === 0 ? (
          <div className="corporate-showcase__empty">
            <p>Próximamente más proyectos corporativos destacados.</p>
          </div>
        ) : null}
      </div>

      {/* ── CUADRÍCULA DE SERVICIOS GENERALES ── */}
      <div className="services__general-section">
        <motion.div
          className="services__general-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={headerVariants}
        >
          <span className="services__general-badge">PORTAFOLIO INTEGRAL</span>
          <h4 className="services__general-title">
            Otros Servicios Disponibles
          </h4>
        </motion.div>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={containerStagger}
        >
          {generalServices.map((service, index) => (
            <motion.div
              className={`service-card ${service.featured ? "service-card--featured" : ""}`}
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <div className="service-card__top">
                <motion.span
                  className="service-card__icon"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                </motion.span>
                {service.featured && (
                  <span className="service-card__tag">{service.tag}</span>
                )}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
