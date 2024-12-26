"use client";
import React, { useState } from "react";
import "./registration.css";
import axios from "axios";

function ProductPage() {
  const [images, setImages] = useState([]);
  const [uploadImages, setuploadImages] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    member_id: '1',
    selling_area_id: '',
    title: '',
    sell_price: '',
    description: '',
    category_id: '',
    is_direct: false,
    is_delivery: false
});
const handleCheckChange = (event) => {
  const { name, checked } = event.target; // name: 체크박스 이름, checked: 체크 여부
  let tinyInt = 0;
  if (checked) {
    tinyInt = 1;
  }
  setFormData({
    ...formData, // 기존 상태 유지
    [name]: tinyInt, // 변경된 체크 상태 업데이트
  });
};

  const convertDataURLToFile = async (dataURL, fileName) => {
    const response =await axios.get(dataURL,{
      responseType : "blob",
    });
    const blob = response.data;
    const imgFile =new File([blob],fileName,{type:blob.type});
    return imgFile
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, // 기존 값 유지
      [name]: value // 변경된 값만 업데이트
    });
  };
  // member_id: '1',
  // selling_area_id: '',
  // title: '',
  // sell_price: '',
  // description: '',
  // category_id: selectedCategory,
  // is_direct: 'false',
  // is_delivery: 'false'
  const handleSubmit = async () => {
    const API_URL = `http://localhost:8080/api/salespost/salesinsert`;
    const data = new FormData();
    data.append("member_id", formData.member_id);
    data.append("selling_area_id", formData.selling_area_id);
    data.append("title", formData.title);
    data.append("sell_price", formData.sell_price);
    data.append("description", formData.description);
    data.append("category_id", selectedCategory);
    data.append("is_direct", formData.is_direct);
    data.append("is_delivery", formData.is_delivery);
    // if (formData.file) {
    //     data.append("file", formData.file);
    // }
    // images.forEach((image, index) => {
    //   data.append("files", image); // 파일 추가
    // });

    if (images.length >= 1) {
      for (let i = 0; i < images.length; i++) {
        const imgFile =await convertDataURLToFile(
          images[i],
          `images_${i}.jpg`
        );
        data.append("files",imgFile);
      }
    }

    try {
        const response = await axios.post(API_URL, data ,
          {
            headers: {
                // Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }
      );
        // if (response.data.success) {
        //     alert(response.data.message);
        //     router.push("/");
        // } else {
        //     alert(response.data.message);
        // }
    } catch (error) {
      // console.error('오류 발생:', error.name);   // 오류 이름
      // console.error('오류 메시지:', error.message); // 오류 메시지
      // console.error('스택 트레이스:', error.stack); // 스택 트레이스
    }
}

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
          // value={}
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

      <input type="text" className="product-name" placeholder="상품명" name="title" value={formData.title} onChange={handleChange} />

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

      <input type="text" className="price" placeholder="가격" name="sell_price" value={formData.sell_price} onChange={handleChange} />

      <textarea className="product-explain" placeholder="상품 설명" name="description" value={formData.description} onChange={handleChange} ></textarea>

      <p style={{ textAlign: "left" }}>선호하는 직거래 위치</p>
      <div className="location">
        <input type="text" placeholder="우편 번호를 입력하세요" name="selling_area_id" value={formData.selling_area_id} onChange={handleChange} />
        <button className="postal-info">우편번호</button>
      </div>

      <div className="trade-check">
        <label>
          <input type="checkbox" name="is_delivery" checked={formData.is_delivery} onChange={handleCheckChange}/>
          <span></span> 택배거래
        </label>
        <label>
          <input type="checkbox" name="is_direct" checked={formData.is_direct} onChange={handleCheckChange}/>
          <span></span> 직거래
        </label>
      </div>

      <button className="register-button" onClick={handleSubmit}>등록</button>
    </div>
  );
}

export default ProductPage;