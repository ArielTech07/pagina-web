import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import {
  containerStagger,
  cardVariants,
  viewportConfig,
} from '../../utils/motionVariants';
import './Services.css';

const services = [
  {
    icon: '🎬',
    title: 'Video para Eventos',
    description: 'Capturamos cada momento de tu evento con equipos de última generación y una narrativa cinematográfica que cuenta tu historia.'
  },
  {
    icon: '📸',
    title: 'Fotografía Profesional',
    description: 'Sesiones fotográficas que capturan la esencia y emoción de cada instante con un estilo artístico y profesional.'
  },
  {
    icon: '💍',
    title: 'Cobertura de Bodas',
    description: 'Tu día más especial merece ser recordado para siempre. Foto y video con un enfoque íntimo y emotivo.'
  },
  {
    icon: '🏢',
    title: 'Eventos Corporativos',
    description: 'Cobertura profesional para empresas. Conferencias, lanzamientos, capacitaciones y eventos institucionales.'
  }
];

const Services = () => {
  return (
    <section id="services" className="services">
      <SectionTitle
        title="Nuestros Servicios"
        subtitle="Ofrecemos soluciones audiovisuales completas para cada momento especial"
      />
      <motion.div
        className="services__grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerStagger}
      >
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            variants={cardVariants}
          >
            <span className="service-card__icon">{service.icon}</span>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
