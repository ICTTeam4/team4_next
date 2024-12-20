"use client";
import React, { useState } from "react";
import "./salepage.css";

function Page() {
  const [activeTab, setActiveTab] = useState("전체"); // 현재 활성 탭 상태

  const handleTabClick = (tab) => {
    setActiveTab(tab); // 활성 탭 상태 업데이트
  };

  // 각 탭별 콘텐츠 컴포넌트
  const renderContent = () => {
    switch (activeTab) {
      case "전체":
        return (
          <div className="product-grid">
            <div className="product-border">
              <div className="product-image">
                <img src="/images/HY_cup1.jpg" alt="제품 이미지" />
              </div>
              <div className="product-title">
                <h4>커피잔</h4>
                <p>140,500원</p>
                <h5>4시간 전</h5>
              </div>
            </div>
          </div>
        );
      case "판매중":
        return (
          <div className="product-grid">
            <div className="product-border">
              <div className="product-image">
                <img src="/images/HJ_car2.jpg" alt="제품 이미지" />
              </div>
              <div className="product-title">
                <h4>판매중 상품</h4>
                <p>100,000원</p>
                <h5>2시간 전</h5>
              </div>
            </div>
          </div>
        );
      case "예약중":
        return (
          <div className="product-grid">
            <div className="product-border">
              <div className="product-image">
                <img src="/images/HJ_car1.jpg" alt="제품 이미지" />
              </div>
              <div className="product-title">
                <h4>예약중 상품</h4>
                <p>200,000원</p>
                <h5>1일 전</h5>
              </div>
            </div>
          </div>
        );
      case "판매완료":
        return (
          <div className="product-grid">
            <div className="product-border">
              <div className="product-image">
                <img src="/images/HY_cup1.jpg" alt="제품 이미지" />
              </div>
              <div className="product-title">
                <h4>판매완료 상품</h4>
                <p>300,000원</p>
                <h5>1주일 전</h5>
              </div>
            </div>
          </div>
        );
      case "거래후기":
        return (
          <div className="trade-review">
            <div className="review-item">
              <div className="profile-section">
                <img
                  src="/images/human.jpg"
                  alt="프로필 이미지"
                  className="profile-image2"
                />
              </div>
              <div className="content-section">
                <div className="title-section">
                  <span className="title">후기 제목</span>
                  <span className="rating">⭐️⭐️⭐️⭐️</span>
                </div>
                <div className="review-content">후기 내용</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
          <p style={{ textAlign: "center" }}>프로필 사진</p>
        </div>
      </div>

      <div className="product-select">
        <h3 style={{ textAlign: "left" }}>판매상품</h3>
        <div className="tabs">
          <button onClick={() => handleTabClick("전체")}>전체</button>
          <button onClick={() => handleTabClick("판매중")}>판매중</button>
          <button onClick={() => handleTabClick("예약중")}>예약중</button>
          <button onClick={() => handleTabClick("판매완료")}>판매완료</button>
          <button onClick={() => handleTabClick("거래후기")}>거래후기</button>
        </div>
      </div>

      {renderContent()} {/* 탭을 클릭할 때마다 renderContent()가 호출되어 클릭한 탭 내용 출력함함 */}
    </div>
  );
}

export default Page;
