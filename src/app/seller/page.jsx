"use client";
import React from 'react';
import "./seller.css";
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const handleSalePageClick = () => {
    router.push("/salepage"); // 버튼 클릭시 이동함
  };

  const handleTradeReviewClick = () => {
    router.push("/tradereview"); 
  };

  const handleSellerClick = () => {
    router.push("/seller"); 
  };
  const handleOnsaleClick = () => {
    router.push("/Onsale"); 
  };
  const handleReservationsClick = () => {
    router.push("/reservations"); 
  };


  
  return (
    <div className="sell-profile">
      <div className="profile-header">
        <div className="profile-info">
          <div className="name-1">
            <h2>Saint Kream</h2>
            <p>응답률 | 5분 안에 응답</p>
          </div>
          <div className="rating-reviews-box">
            <div className="rating">
              <span>평점 </span>
              <div className="score">4.5</div>
            </div>
            <div className="vertical-divider"></div>
            <div className="reviews">
              <span>거래후기</span>
              <div className="score">120</div>
            </div>
          </div>
        </div>
        <div className="profile-image">
          <img src="/images/YB_human.jpg" alt="프로필 이미지" />
          <p>프로필 사진</p>
        </div>
      </div>

      <div className="product-select">
        <h3 style={{ textAlign: 'left' }}>판매상품</h3>
        <div className="tabs">
          <button onClick={handleSalePageClick}>전체</button>
          <button onClick={handleSellerClick}>판매중</button>
          <button onClick={handleReservationsClick}>예약중</button>
          <button onClick={handleOnsaleClick}>판매완료</button>
          <button onClick={handleTradeReviewClick}>거래후기</button>
        </div>

        <div className="product-grid">
          <div className="product-border">
            <div className="product-image">
              <img src="/images/flower.jpg" alt="제품 이미지" />
            </div>
            <div className="product-title">
              <h4>커피잔</h4>
              <p>140,500원</p>
              <h5>4시간 전</h5>
            </div>
          </div>
          {/* <div className="product-border">
            <div className="product-image">
              <img src="/images/coffee-blue.jpg" alt="제품 이미지" />
            </div>
            <div className="product-title">
              <h4>제목</h4>
              <p>가격</p>
              <h5>4시간 전</h5>
            </div>
          </div>
          <div className="product-border">
            <div className="product-image">
              <img src="/images/image-placeholder.jpg" alt="제품 이미지" />
            </div>
            <div className="product-title">
              <h4>제목</h4>
              <p>가격</p>
              <h5>4시간 전</h5>
            </div>
          </div> */}
          {/* <div className="product-border">
            <div className="product-image">
              <img src="/images/image-placeholder.jpg" alt="제품 이미지" />
            </div>
            <div className="product-title">
              <h4>제목</h4>
              <p>가격</p>
              <h5>4시간 전</h5>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Page;