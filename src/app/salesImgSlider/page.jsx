import React, { useState } from 'react';
import './salesImgSlider.css'

function page(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/images/David_cloth1.jpg", "/images/David_cloth1.jpg", "/images/David_cloth1.jpg"];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 400}px)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index + 1}`} />
        ))}
      </div>
      <div className="arrows">
        <button className="arrow" onClick={handlePrev}>
          &lt;
        </button>
        <button className="arrow" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default page;