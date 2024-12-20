"use client";
import React, { useState } from "react";
import "./registration.css";

function ProductPage() {
  const [images, setImages] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((results) => {
      setImages((prevImages) => [...prevImages, ...results]);
    });
  };

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownActive(false);
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => {
      if (images.length === 0) return null; // Handle empty images case
      return (prev + 1) % images.length;
    });
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => {
      if (images.length === 0) return null; // Handle empty images case
      return (prev - 1 + images.length) % images.length;
    });
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex > index) {
      setSelectedImageIndex((prev) => prev - 1);
    }
  };

  return (
    
    <div className="product-page">
      {/* <h3 style={{textAlign:'center', fontWeight:'30px'}}>판매등록</h3> */}
      <div className="image-upload">
        
        <label htmlFor="file-input" className="upload-button">
          <span className="camera-icon">📷</span>
          <span className="add-icon">+</span>
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleImageUpload}
          />
      </div>

      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img
              src={image}
              alt={`Uploaded ${index}`}
              className="gallery-thumbnail"
              onClick={() => openImageModal(index)}
            />
            <button className="delete-button" onClick={() => deleteImage(index)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div className="image-modal">
          <div className="modal-overlay" onClick={closeImageModal}></div>
          <div className="modal-content">
            {/* <button className="prev-button" onClick={prevImage}>
              ◀
            </button> */}
            <img
              src={images[selectedImageIndex]}
              alt={`Selected ${selectedImageIndex}`}
              className="modal-image"
            />
            {/* <button className="next-button" onClick={nextImage}>
              ▶
            </button> */}
          </div>
        </div>
      )}

      <input type="text" className="product-name" placeholder="상품명" />

      <div className="category-drop">
        <button onClick={toggleDropdown}>{selectedCategory}</button>
        <ul className={isDropdownActive ? "active" : ""}>
          <li onClick={() => selectCategory("아우터")}>아우터</li>
          <li onClick={() => selectCategory("상의")}>상의</li>
          <li onClick={() => selectCategory("하의")}>하의</li>
          <li onClick={() => selectCategory("신발")}>신발</li>
          <li onClick={() => selectCategory("가방")}>가방</li>
          <li onClick={() => selectCategory("패션잡화")}>패션잡화</li>
        </ul>
      </div>

      <input type="text" className="price" placeholder="가격" />

      <textarea className="product-explain" placeholder="상품 설명"></textarea>

      <p style={{ textAlign: "left" }}>선호하는 직거래 위치</p>
      <div className="location">
        <input type="text" placeholder="우편 번호를 입력하세요" />
        <button className="postal-info">우편번호</button>
      </div>

      <div className="trade-check">
        <label>
          <input type="checkbox" />
          <span></span> 택배거래
        </label>
        <label>
          <input type="checkbox" />
          <span></span> 직거래
        </label>
      </div>

      <button className="register-button">등록</button>
    </div>
  );
}

export default ProductPage;