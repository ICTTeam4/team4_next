"use client";
import React from "react";
import "./tradereview.css";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleSalePageClick = () => {
    router.push("/salepage"); // "판매중" 버튼 클릭 시 이동
  };

  const handleTradeReviewClick = () => {
    router.push("/tradereview"); // "거래후기" 버튼 클릭 시 이동
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


  const reviews = [
    {
      profileImage: "/images/profile1.jpg", // 프로필 이미지 경로
      title: "판매 제목 1",
      rating: "⭐️⭐️⭐️⭐️⭐️",
      content: "후기 내용 1"
    },
    {
      profileImage: "/images/profile2.jpg",
      title: "판매 제목 2",
      rating: "⭐️⭐️⭐️⭐️",
      content: "후기 내용 2"
    },
    {
      profileImage: "/images/profile3.jpg",
      title: "판매 제목 3",
      rating: "⭐️⭐️⭐️",
      content: "후기 내용 3"
    }
  ];

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
          <img src="/images/YB_human.jpg" alt="제품 이미지" />
          <p>프로필 사진</p>
        </div>
      </div>

      <div className="product-select">
        <h3 style={{ textAlign: "left" }}>판매상품</h3>
        <div className="tabs">
        <button onClick={handleSalePageClick}>전체</button>
          <button onClick={handleSellerClick}>판매중</button>
          <button onClick={handleReservationsClick}>예약중</button>
          <button onClick={handleOnsaleClick}>판매완료</button>
          <button onClick={handleTradeReviewClick}>거래후기</button>
        </div>
      </div>

      <div className="trade-review">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="profile-section">
            <img
              src="/images/human.jpg"
              alt="프로필 이미지"
              className="profile-image2"
            />
          </div>
          <div className="content-section">
            <div className="title-section">
              <span className="title">{review.title}</span>
              <span className="rating">{review.rating}</span>
            </div>
            <div className="review-content">{review.content}</div>
          </div>
        </div>
      ))}
    </div>

    </div>




  );
}

export default Page;