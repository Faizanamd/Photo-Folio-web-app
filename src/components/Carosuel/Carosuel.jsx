
import React, { useState, useEffect } from 'react';
import styles from './carosuel.module.css';

function Carosuel({ imageList, selectedImage, onClose, setSelectedImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = imageList.findIndex((img) => img.id === selectedImage.id);
    setCurrentIndex(index >= 0 ? index : 0);
  }, [selectedImage, imageList]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  };

  const handleClose = () => {
    setSelectedImage(false)
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.carouselBox}>
        <button className={styles.leftButton} onClick={handlePrev}>
        &lt;
        </button>
        <img src={imageList[currentIndex]?.imageurl} alt={imageList[currentIndex]?.title} />
        <button className={styles.rightButton} onClick={handleNext}>
        &gt;
        </button>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Carosuel;
