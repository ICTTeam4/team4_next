"use client";
import React, { useState } from "react";
import "./registration.css";
import axios from "axios";

function ProductPage() {
  const [images, setImages] = useState([]);
  const [isDeliveryTransaction, setIsDeliveryTransaction] = useState();
  const [isInPersonTransaction, setIsInPersonTransaction] = useState();
  const [uploadImages, setuploadImages] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedSmallCategory, setSelectedSmallCategory] = useState('');
  const [isBigCategoryDropdownActive, setIsBigCategoryDropdownActive] = useState(false); // 대분류 드롭다운 상태
  const [isSmallCategoryDropdownActive, setIsSmallCategoryDropdownActive] = useState(false); // 소분류 드롭다운 상태

    // 대분류에 따른 소분류 목록
    const categories = {
      '아우터': ['패딩', '코트', '바람막이', '자켓', '가디건', '블루종', '조끼', '아노락'],
      '상의': ['맨투맨', '셔츠/블라우스', '후드티', '니트', '피케', '긴팔', '반팔', '민소매 티셔츠', '원피스'],
      '하의': ['데님', '코튼', '슬랙스', '트레이닝', '숏'],
      '신발': ['운동화', '구두', '워커/부츠', '샌들', '슬리퍼', '하이힐'],
      '가방': ['백팩', '크로스백', '토트백', '캐리어', '클러치백'],
      '패션잡화': ['모자', '양말', '목도리', '안경', '시계', '주얼리', '벨트', '피어싱']
    };
  
    const toggleBigCategoryDropdown = () => {
      setIsBigCategoryDropdownActive(!isBigCategoryDropdownActive);
    };
  
    const toggleSmallCategoryDropdown = () => {
      setIsSmallCategoryDropdownActive(!isSmallCategoryDropdownActive);
    };
  
    const selectCategory = (category) => {
      setSelectedCategory(category);
      setIsBigCategoryDropdownActive(false); // 대분류 드롭다운 닫기
      setIsSmallCategoryDropdownActive(false); // 소분류 드롭다운 초기화
    };
  
    const selectSmallCategory = (smallCategory) => {
      setSelectedSmallCategory(smallCategory);
      setIsSmallCategoryDropdownActive(false); // 소분류 드롭다운 닫기
    };

  
  const [formData, setFormData] = useState({
    member_id: '1',
    selling_area_id: '',
    title: '',
    sell_price: '',
    description: '',
    is_direct: false,
    is_delivery: false
});
// const handleCheckChange = (event) => {
//   const { name, checked } = event.target; // name: 체크박스 이름, checked: 체크 여부
//   let tinyInt = 0;
//   if (checked) {
//     tinyInt = 1;
//   }
//   setFormData({
//     ...formData, // 기존 상태 유지
//     [name]: tinyInt, // 변경된 체크 상태 업데이트
//   });
// };

  const convertDataURLToFile = async (dataURL, fileName) => {
    const response = await axios.get(dataURL,{
      responseType : "blob",
    });
    const blob = response.data;
    const imgFile =new File([blob],fileName,{type:blob.type});
    return imgFile;
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
    data.append("sup_category", selectedCategory);
    data.append("sub_category", selectedSmallCategory);
    data.append("is_direct", isInPersonTransaction);
    data.append("is_delivery", isDeliveryTransaction);
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
          <span className="camera-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
            <path d="M20 4h-3.2l-1.2-2h-6.4l-1.2 2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2h16c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.89-2-1.99-2z" fill="none" stroke="gray" stroke-width="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="gray" stroke-width="2" />
          </svg>
          </span>
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
            <img
              src={images[selectedImageIndex]}
              alt={`Selected ${selectedImageIndex}`}
              className="modal-image"
            />
          </div>
        </div>
      )}

      <input type="text" className="product-name" placeholder="상품명" name="title" value={formData.title} onChange={handleChange} />

      <div className="category-drop">
        <div className="button-container">
          <button className="big_category_btn" onClick={toggleBigCategoryDropdown}>
            {selectedCategory}
          </button>
          
          <ul className={`drop_down ${isBigCategoryDropdownActive ? 'active' : ''}`}>
            <li className="drop_list" onClick={() => selectCategory("아우터")}>아우터</li>
            <li className="drop_list" onClick={() => selectCategory("상의")}>상의</li>
            <li className="drop_list" onClick={() => selectCategory("하의")}>하의</li>
            <li className="drop_list" onClick={() => selectCategory("신발")}>신발</li>
            <li className="drop_list" onClick={() => selectCategory("가방")}>가방</li>
            <li className="drop_list" onClick={() => selectCategory("패션잡화")}>패션잡화</li>
          </ul>
        </div>
        <a style={{color:'white', width:'30px'}}>.....</a>
        {selectedCategory !== '카테고리' && (
          <div className="button-container">
            <button className="small_category_btn" onClick={toggleSmallCategoryDropdown}>
              {selectedSmallCategory || '소분류'}
            </button>

            {categories[selectedCategory] && categories[selectedCategory].length > 0 && (
              <ul className={`drop_down2 ${isSmallCategoryDropdownActive ? 'active' : ''}`}>
                {categories[selectedCategory].map((item, index) => (
                  <li key={index} className="drop_list2" onClick={() => selectSmallCategory(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
   
      <input type="text" className="price" placeholder="가격" onChange={handleChange} value={formData.sell_price} name="sell_price" />
      <textarea className="product-explain" placeholder="상품 설명" onChange={handleChange} value={formData.description} name="description" ></textarea>
      <p style={{ textAlign: "left" }}>  *  선호하는 직거래 위치</p>
      <div className="location">
        <input type="text" placeholder="  우편 번호를 입력하세요" onChange={handleChange} value={formData.selling_area_id} name="selling_area_id"  />
        <button className="postal-info">우편번호</button>
      </div>
      <ul style={{ padding: '0px' }}>
        <li>
          <div className="trade-check" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id="check1-delivery"
              type="checkbox"
              name=""
              className="blind"
              checked={isDeliveryTransaction}
              onChange={(e) => setIsDeliveryTransaction(e.target.checked)}
            />
            <label htmlFor="check1-delivery" className="check_label" style={{ maxHeight: '30px', display: 'flex', alignItems: 'center' }}>
              {isDeliveryTransaction ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="ico-close icon sprite-icons"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="ico-uncheck icon sprite-icons"
                >
                  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z" />
                </svg>
              )}
              <span className="label_txt" style={{ marginLeft: '8px' }}>택배거래</span>
            </label>
          </div>
        </li>
        <li>
          <div className="trade-check" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id="check1-inperson"
              type="checkbox"
              name=""
              className="blind"
              checked={isInPersonTransaction}
              onChange={(e) => setIsInPersonTransaction(e.target.checked)}
            />
            <label htmlFor="check1-inperson" className="check_label" style={{ maxHeight: '30px', display: 'flex', alignItems: 'center' }}>
              {isInPersonTransaction ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="ico-close icon sprite-icons"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="ico-uncheck icon sprite-icons"
                >
                  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z" />
                </svg>
              )}
              <span className="label_txt" style={{ marginLeft: '8px' }}>직거래</span>
            </label>
          </div>
        </li>
      </ul>
      <button className="register-button" onClick={handleSubmit}>등 록</button>
    </div>
  );
}

export default ProductPage;