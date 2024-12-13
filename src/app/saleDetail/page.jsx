"use client"
import React, { useState } from 'react';
import "./saleDetail.css"
import Image from 'next/image';
import { Button } from '@mui/material';

function page(props) {

  const [isOpen, setIsOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  }

  const closePanel = () => {
    setIsOpen(false);
  }
  return (
    <>
      <div className="container">
        <div className="imgBox">
          <div className="images"> <div className="navleft"> &#10092;</div> <div className="navright">&#10093;</div></div>
        </div>
        <div className="tradeInfoMenu">
          <div className="category">홈▶카테고리1▶카테고리2</div>
          <div className="salesInfo">
            <div className="itemName">
              <div className="item">물품이름</div>


              <div className="share">공유하기 버튼</div>

            </div>
            <div className="itemPrice">가격</div>
            <div className="detailData">게시일 조회수 채팅 수 찜수</div>

          </div>
          <div className="tradeInfo">
            <div>제품상태</div>
            <div>거래방식</div>
            <div>배송비</div>
            <div>안전거래</div>
          </div>
          <div id="interaction-area">
            <Image src="/bookmark-white.png" width={30} height={30} className="bookmark" id="bookmark"/>
            <Button className="purchase" onClick={openPanel}>구매하기</Button>
            <Button className="chatting" onClick={openPanel}>채팅하기</Button>

          </div>
          <div className="tradeArea">⊙ 마장동 직거래 위치 제안하기</div>
        </div>
        <div className="salesDescription">
          상품 정보
          <hr />
          <div></div>
        </div>
        <div className="sellerInfo">

          <span>판매자 정보</span>   <span className="sellernavright"> ▶ </span>

          <hr />
          <div className="sellerContainer">


            <div className="sellerProfile">
              <div className="sellerNickname">판매자 닉네임</div> <div className="sellerImg"></div>
            </div>
            <div className="sellerData">
              <div>안전거래 수</div>
              <div>거래 후기 수</div>
            </div>
            <div className="sellerRecent">
              <div className="sellerGoods">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
              </div>
              <div className="sellerGoods">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
              </div>
              <div className="sellerGoods">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
              </div>
            </div>

          </div>

        </div>
        <div className="relatedGoods">
          <div className="relatedGoodsOne">
            <div className="relatedGoodsImg"></div>
            <div className="relatedGoodsTitle">제목</div>
            <div className="relatedGoodsPrice">가격</div>
          </div>
          <div className="relatedGoodsOne">
            <div className="relatedGoodsImg"></div>
            <div className="relatedGoodsTitle">제목</div>
            <div className="relatedGoodsPrice">가격</div>
          </div>
          <div className="relatedGoodsOne">
            <div className="relatedGoodsImg"></div>
            <div className="relatedGoodsTitle">제목</div>
            <div className="relatedGoodsPrice">가격</div>
          </div>
          <div className="relatedGoodsOne">
            <div className="relatedGoodsImg"></div>
            <div className="relatedGoodsTitle">제목</div>
            <div className="relatedGoodsPrice">가격</div>
          </div>
          <div className="relatedGoodsOne">
            <div className="relatedGoodsImg"></div>
            <div className="relatedGoodsTitle">제목</div>
            <div className="relatedGoodsPrice">가격</div>
          </div>
          
        </div>

        {/* 어두운 오버레이 */}
        {isOpen && <div id="overlay" className="active" onClick={closePanel}></div>}

        {/* 슬라이드 패널 */}
        <div id="slidePanel" className={isOpen ? 'active' : ''}>
          <div className="content">
            <h2>패널 내용</h2>
            <p>여기에 내용을 추가하세요.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;