import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import {
  containerStagger,
  cardVariants,
  headerVariants,
  viewportConfig,
} from '../../utils/motionVariants';
import './Gallery.css';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'sesiones', label: 'Sesiones' },
  { id: 'videos', label: 'Videos' },
  { id: 'corporativo', label: 'Corporativo' }
];

const images = [
  { id: 1, category: 'bodas', title: 'Boda en el Jardín', gradient: 'linear-gradient(135deg, #2c1810, #4a2c20)' },
  { id: 2, category: 'bodas', title: 'Ceremonia al Atardecer', gradient: 'linear-gradient(135deg, #1a1520, #3a2540)' },
  { id: 3, category: 'eventos', title: 'Gala Corporativa', gradient: 'linear-gradient(135deg, #101820, #203040)' },
  // { id: 4, category: 'sesiones', title: 'Retrato Artístico', gradient: 'linear-gradient(135deg, #1a1a10, #303020)' },
  // { id: 5, category: 'videos', title: 'Videoclip Musical', gradient: 'linear-gradient(135deg, #200a1a, #401030)' },
  // { id: 6, category: 'corporativo', title: 'Evento Empresarial', gradient: 'linear-gradient(135deg, #0a1520, #152535)' },
  // { id: 7, category: 'bodas', title: 'Recepción Elegante', gradient: 'linear-gradient(135deg, #201510, #402a20)' },
  // { id: 8, category: 'sesiones', title: 'Sesión Exterior', gradient: 'linear-gradient(135deg, #101a10, #203020)' },
  // { id: 9, category: 'eventos', title: 'Fiesta de 15 Años', gradient: 'linear-gradient(135deg, #1a1025, #2a1840)' },
  // { id: 10, category: 'videos', title: 'Documental Corto', gradient: 'linear-gradient(135deg, #151515, #2a2a2a)' },
  // { id: 11, category: 'corporativo', title: 'Conferencia Anual', gradient: 'linear-gradient(135deg, #0f1a20, #1a2a35)' },
  // { id: 12, category: 'sesiones', title: 'Fotografía de Producto', gradient: 'linear-gradient(135deg, #1a1510, #2a2520)' }
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeFilter === 'todos'
    ? images
    : images.filter(img => img.category === activeFilter);

  const navigateImage = useCallback((direction) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex]);
  }, [selectedImage, filteredImages]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage]);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__container">
        <SectionTitle
          title="Nuestro Trabajo"
          subtitle="Una muestra de lo que hacemos con pasión"
        />

        <motion.div
          className="gallery__filters"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={headerVariants}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`gallery__filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="gallery__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={containerStagger}
        >
          {filteredImages.map(image => (
            <motion.div
              key={image.id}
              layout
              variants={cardVariants}
              className="gallery__item"
              onClick={() => setSelectedImage(image)}
            >
              <div
                className="gallery__image"
                style={{ background: image.gradient }}
              >
                {image.title}
              </div>
              <div className="gallery__overlay">
                <span>{image.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="lightbox__backdrop"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              className="lightbox__content"
              style={{ background: selectedImage.gradient }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {selectedImage.title}
              <button
                className="lightbox__close"
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar"
              >
                ✕
              </button>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => navigateImage('prev')}
                aria-label="Anterior"
              >
                ◀
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={() => navigateImage('next')}
                aria-label="Siguiente"
              >
                ▶
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
