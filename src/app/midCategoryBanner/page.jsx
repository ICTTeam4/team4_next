import React, { useState } from 'react';
import './midCategoryBanner.css';

// 이미지 객체
const images = {
  outList: [
    { src: 'HJ_car1.jpg', alt: '패딩', title: '패딩' },
    { src: 'HJ_car1.jpg', alt: '코트', title: '코트' },
    { src: 'HJ_car1.jpg', alt: '바람막이', title: '바람막이' },
    { src: 'HJ_car1.jpg', alt: '자켓', title: '자켓' },
    { src: 'HJ_car1.jpg', alt: '가디건', title: '가디건' },
    { src: 'HJ_car1.jpg', alt: '블루종', title: '블루종' },
    { src: 'HJ_car1.jpg', alt: '조끼', title: '조끼' },
    { src: 'HJ_car1.jpg', alt: '아노락', title: '아노락' }
  ],
  topList: [
    { src: 'HJ_car1.jpg', alt: '맨투맨', title: '맨투맨' },
    { src: 'HJ_car1.jpg', alt: '셔츠/블라우스', title: '셔츠/블라우스' },
    { src: 'HJ_car1.jpg', alt: '후드티', title: '후드티' },
    { src: 'HJ_car1.jpg', alt: '니트', title: '니트' },
    { src: 'HJ_car1.jpg', alt: '피케', title: '피케' },
    { src: 'HJ_car1.jpg', alt: '긴팔', title: '긴팔' },
    { src: 'HJ_car1.jpg', alt: '반팔', title: '반팔' },
    { src: 'HJ_car1.jpg', alt: '민소매 티셔츠', title: '민소매 티셔츠' },
    { src: 'HJ_car1.jpg', alt: '원피스', title: '원피스' }
  ],
  bottomList: [
    { src: 'HJ_car1.jpg', alt: '데님', title: '데님' },
    { src: 'HJ_car1.jpg', alt: '코튼', title: '코튼' },
    { src: 'HJ_car1.jpg', alt: '슬랙스', title: '슬랙스' },
    { src: 'HJ_car1.jpg', alt: '트레이닝', title: '트레이닝' },
    { src: 'HJ_car1.jpg', alt: '숏팬츠', title: '숏팬츠' }
  ],
  shoesList: [
    { src: 'HJ_car1.jpg', alt: '운동화', title: '운동화' },
    { src: 'HJ_car1.jpg', alt: '구두', title: '구두' },
    { src: 'HJ_car1.jpg', alt: '워커/부츠', title: '워커/부츠' },
    { src: 'HJ_car1.jpg', alt: '샌들', title: '샌들' },
    { src: 'HJ_car1.jpg', alt: '슬리퍼', title: '슬리퍼' },
    { src: 'HJ_car1.jpg', alt: '하이힐', title: '하이힐' }
  ],
  bagsList: [
    { src: 'HJ_car1.jpg', alt: '백팩', title: '백팩' },
    { src: 'HJ_car1.jpg', alt: '크로스백', title: '크로스백' },
    { src: 'HJ_car1.jpg', alt: '토트백', title: '토트백' },
    { src: 'HJ_car1.jpg', alt: '캐리어', title: '캐리어' },
    { src: 'HJ_car1.jpg', alt: '클러치백', title: '클러치백' }
  ],
  accessoriesList: [
    { src: 'HJ_car1.jpg', alt: '모자', title: '모자' },
    { src: 'HJ_car1.jpg', alt: '양말', title: '양말' },
    { src: 'HJ_car1.jpg', alt: '목도리', title: '목도리' },
    { src: 'HJ_car1.jpg', alt: '안경', title: '안경' },
    { src: 'HJ_car1.jpg', alt: '시계', title: '시계' },
    { src: 'HJ_car1.jpg', alt: '주얼리', title: '주얼리' },
    { src: 'HJ_car1.jpg', alt: '벨트', title: '벨트' },
    { src: 'HJ_car1.jpg', alt: '피어싱', title: '피어싱' }
  ],
  // 추가 이미지들
};

function Page({ category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // images 객체에서 카테고리에 해당하는 배열을 가져오기
  const currentImages = images[category] || [];
  const totalPages = Math.ceil(currentImages.length / itemsPerPage);

  // 현재 페이지에 해당하는 이미지들만 가져오기
  const displayedImages = currentImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="midCategory-container">
      <div className="pagination">
        <button
          className="prev-btn"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <img src="/images/HJ_benner_left.png" alt="왼쪽" />
        </button>
        <div className="image-container">
          {displayedImages.map((image, index) => (
            <div key={index} className="image-item">
              <a>
                <img
                  src={`/images/${image.src}`}
                  alt={image.alt}
                  title={image.title}
                />
              </a>
            </div>
          ))}
        </div>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <img src="/images/HJ_benner_right.png" alt="오른쪽" />
        </button>
      </div>
    </div>
  );
}

export default Page;
