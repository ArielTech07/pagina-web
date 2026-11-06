import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import {
  easeOutExpo,
  headerVariants,
  viewportConfig,
} from "../../utils/motionVariants";
import "./Gallery.css";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "bodas", label: "Bodas" },
  { id: "eventos", label: "Eventos" },
  { id: "sesiones", label: "Sesiones" },
  { id: "videos", label: "Videos" },
  { id: "corporativo", label: "Corporativo" },
];

const itemAnim = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: easeOutExpo },
  },
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const filteredImages =
    activeFilter === "todos"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const navigateImage = useCallback(
    (direction) => {
      if (!selectedImage) return;
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage.id,
      );
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % filteredImages.length
          : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[newIndex]);
    },
    [selectedImage, filteredImages],
  );

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    fetch(`${API_URL}/public/galeria`)
      .then((res) => res.json())
      .then((data) => {
        const adaptadas = data.map((item) => ({
          id: item.id,
          category: item.categoria,
          src: item.imageUrl,
          title: item.categoria.toUpperCase(),
          subtitle: "JudeFilms",
        }));
        setImages(adaptadas);
      })
      .catch((err) => console.error("Error al cargar galería:", err));
  }, []);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery__container">
        <SectionTitle
          title="Nuestro Trabajo"
          subtitle="Una muestra de lo que hacemos con pasión"
        />

        {/* Filtros de Categoría */}
        <motion.div
          className="gallery__filters"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={headerVariants}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`gallery__filter-btn ${activeFilter === cat.id ? "active" : ""}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cuadrícula de Galería con animación fluida en filtros */}
        <div className="gallery__grid-wrapper">
          <motion.div className="gallery__grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  variants={itemAnim}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="gallery__item"
                  onClick={() => setSelectedImage(image)}
                >
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.title}
                      className="gallery__image-tag"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="gallery__image"
                      style={{ background: image.gradient }}
                    >
                      <div className="gallery__image-placeholder">
                        <svg
                          className="gallery__image-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        <span className="gallery__image-title-preview">
                          {image.title}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="gallery__overlay">
                    <span className="gallery__overlay-category">
                      {image.category}
                    </span>
                    <h4 className="gallery__overlay-title">{image.title}</h4>
                    {image.subtitle && (
                      <span className="gallery__overlay-sub">
                        {image.subtitle}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="gallery__empty">
              <p>Próximamente más proyectos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
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
              style={{ background: selectedImage.gradient || "#111111" }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {selectedImage.src ? (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="lightbox__img"
                />
              ) : (
                <div className="lightbox__info-panel">
                  <span className="lightbox__tag">
                    {selectedImage.category}
                  </span>
                  <h3 className="lightbox__title">{selectedImage.title}</h3>
                  {selectedImage.subtitle && (
                    <p className="lightbox__subtitle">
                      {selectedImage.subtitle}
                    </p>
                  )}
                </div>
              )}

              <button
                className="lightbox__close"
                onClick={() => setSelectedImage(null)}
                aria-label="Cerrar visor"
              >
                ✕
              </button>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => navigateImage("prev")}
                aria-label="Foto anterior"
              >
                ◀
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={() => navigateImage("next")}
                aria-label="Foto siguiente"
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
