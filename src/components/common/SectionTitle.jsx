import { motion } from 'framer-motion';
import { headerVariants, viewportConfig } from '../../utils/motionVariants';
import './SectionTitle.css';

const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    className="section-title"
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    variants={headerVariants}
  >
    <h2>{title}</h2>
    <div className="section-title__line"></div>
    {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
  </motion.div>
);

export default SectionTitle;
