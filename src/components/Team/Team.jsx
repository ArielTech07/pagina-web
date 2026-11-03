import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import {
  fadeLeftVariants,
  fadeRightVariants,
  viewportConfig,
} from '../../utils/motionVariants';
import './Team.css';

const Team = () => {
  return (
    <section id="team" className="team">
      <SectionTitle title="Quiénes Somos" subtitle="El equipo detrás de cada toma" />

      <div className="team__container">
        {/* Lado izquierdo: Foto de los dos juntos */}
        <motion.div
          className="team__photo-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeLeftVariants}
        >
          <div className="team__photo-frame">
            <img
              src="https://img.magnific.com/foto-gratis/feliz-pareja-jovenes-enamorados-pie-aislados_171337-19519.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Equipo JudeFilms"
            />
            <div className="team__photo-placeholder">
              <div className="team__photo-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="team__camera-svg"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span className="team__photo-label">Foto de los Integrantes</span>
              <span className="team__photo-sublabel">JudeFilms Crew</span>
            </div>
          </div>
          <div className="team__photo-backdrop"></div>
        </motion.div>

        {/* Lado derecho: Información y descripción estilo Serxo González */}
        <motion.div
          className="team__info-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeRightVariants}
        >
          <span className="team__greeting">Hola, somos JudeFilms</span>
          <h3 className="team__role-title">
            Producción Audiovisual & Fotografía Profesional
          </h3>

          <p className="team__bio">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem amet quas voluptate reiciendis unde et tenetur repellendus suscipit voluptatem expedita enim, illo molestiae delectus hic accusamus voluptatibus, quaerat aspernatur qui!
          </p>

          <div className="team__specialties">
            <span>BODAS</span>
            <span className="team__sep">—</span>
            <span>EVENTOS</span>
            <span className="team__sep">—</span>
            <span>SESIONES</span>
            <span className="team__sep">—</span>
            <span>Quinceañeros</span>
          </div>

          <p className="team__bio-second">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptatibus maiores similique libero officia blanditiis, voluptates eos. Vitae nisi ullam molestiae expedita autem voluptate, obcaecati dignissimos ex corporis numquam eligendi.
          </p>

          <div className="team__action">
            <a href="#contact" className="team__cta-btn">
              Contactar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
