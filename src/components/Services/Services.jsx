import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import {
  containerStagger,
  cardVariants,
  fadeLeftVariants,
  fadeRightVariants,
  viewportConfig,
  easeOutExpo,
} from '../../utils/motionVariants';
import './Services.css';

const generalServices = [
  {
    icon: '🎬',
    title: 'Video ',
    featured: false,
    tag: 'Producción',
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum consectetur recusandae voluptatum quae! Voluptates mollitia earum illo temporibus quis fugiat fuga, consequuntur, illum beatae facere exercitationem nisi harum voluptatibus at!"
  },
  {
    icon: '📸',
    title: 'Fotografía Profesional',
    featured: false,
    tag: 'Foto Estudio & Eventos',
    description: 'Registro fotográfico nítido y expresivo. Edición y revelado digital minucioso para prensa, catálogos, memorias y redes.'
  },
  {
    icon: '💍',
    title: 'Bodas & Eventos Sociales',
    featured: false,
    tag: 'Social',
    description: 'Documentación emotiva y espontánea de tus momentos más significativos con discreción y un acabado estético perdurable.'
  }
];

const corporateProjects = [
  {
    id: 1,
    tag: 'SEGUTEK',
    title: 'EMPRESA DONDE SE TRABAJOOO',
    client: 'Evento Corporativo',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum consectetur recusandae voluptatum quae! Voluptates mollitia earum illo temporibus quis fugiat fuga, consequuntur, illum beatae facere exercitationem nisi harum',
    deliverables: [
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit',
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit'
    ],
    // Puedes reemplazar esta URL por tu video local <video src="..." /> o enlace de YouTube
    image: 'https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/555676807_24976448855319457_6176242583676901540_n.jpg?stp=dst-jpg_tt6&cstp=mx808x808&ctp=s808x808&_nc_cat=103&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=M46Th2_-VbMQ7kNvwHN0yM3&_nc_oc=AdqVkvrGgK2lvvG8b-EsT9cC_zr7xajrJW058Y4o8VNS5Qau9DVydbaoiCELBSzti9o&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=SybY6oHdZkcV14xsPu7pdw&_nc_ss=7b2a8&oh=00_AQS_WxS0MPui6GWXSzxIuSUsAecPaaotxqg0pivIsw-dfA&oe=6AF17CF0',
    videoLabel: 'Reel Corporativo 4K',
    duration: '02:15 min'
  }
];

const Services = () => {
  const [activeProject, setActiveProject] = useState(corporateProjects[0]);

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
            Convertimos las convenciones, galas y conferencias de tu empresa en piezas visuales de alta gama que comunican liderazgo y prestigio.
          </p>

          {/* Selector de Casos de Éxito Corporativos */}
          <div className="corporate-showcase__tabs">
            {corporateProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`corporate-showcase__tab-btn ${
                  activeProject.id === project.id ? 'active' : ''
                }`}
                onClick={() => setActiveProject(project)}
              >
                {project.tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenedor Video a la Izquierda + Descripción a la Derecha */}
        <div className="corporate-showcase__body">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className="corporate-showcase__grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              {/* LADO IZQUIERDO: Video / Media Player Mockup */}
              <motion.div
                className="corporate-showcase__media-wrapper"
                variants={fadeLeftVariants}
              >
                <div className="corporate-showcase__media-frame">
                  {/* Imagen generada/placeholder (lista para ser reemplazada por tu etiqueta <video>) */}
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="corporate-showcase__media-img"
                    loading="lazy"
                  />

                  {/* NOTA PARA EL USUARIO:
                      Para usar tu propio video, puedes reemplazar la etiqueta <img> de arriba por:
                      <video 
                        src="/tu-video.mp4" 
                        controls 
                        className="corporate-showcase__video"
                        poster={activeProject.image}
                      />
                  */}

                  {/* Overlay Cinematográfico con Botón Play y Badges */}
                  <div className="corporate-showcase__media-overlay">
                    <div className="corporate-showcase__play-btn-wrapper">
                      <div className="corporate-showcase__play-btn" aria-label="Reproducir reel">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="corporate-showcase__play-icon">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="corporate-showcase__play-text">Reel de Demostración</span>
                    </div>

                    <div className="corporate-showcase__media-meta">
                      <span className="corporate-showcase__media-quality">4K UHD</span>
                      <span className="corporate-showcase__media-duration">{activeProject.duration}</span>
                    </div>
                  </div>
                </div>

                <p className="corporate-showcase__media-caption">
                  ▲ Vista previa de producción corporativa realizada por <strong>JudeFilms</strong>
                </p>
              </motion.div>

              {/* LADO DERECHO: Ficha Técnica y Descripción de lo que se hizo */}
              <motion.div
                className="corporate-showcase__info"
                variants={fadeRightVariants}
              >
                <div className="corporate-showcase__client-tag">
                  {activeProject.client}
                </div>
                <h4 className="corporate-showcase__title">
                  {activeProject.title}
                </h4>

                <p className="corporate-showcase__desc">
                  {activeProject.description}
                </p>

                <div className="corporate-showcase__features">
                  <span className="corporate-showcase__features-label">
                    LO QUE INCLUYÓ ESTE PROYECTO:
                  </span>
                  <ul className="corporate-showcase__features-list">
                    {activeProject.deliverables.map((item, idx) => (
                      <li key={idx} className="corporate-showcase__features-item">
                        <span className="corporate-showcase__check-icon">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── CUADRÍCULA DE SERVICIOS GENERALES ── */}
      <div className="services__general-section">
        <div className="services__general-header">
          <span className="services__general-badge">PORTAFOLIO INTEGRAL</span>
          <h4 className="services__general-title">Otros Servicios Disponibles</h4>
        </div>

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={containerStagger}
        >
          {generalServices.map((service, index) => (
            <motion.div
              className={`service-card ${service.featured ? 'service-card--featured' : ''}`}
              key={index}
              variants={cardVariants}
            >
              <div className="service-card__top">
                <span className="service-card__icon">{service.icon}</span>
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
