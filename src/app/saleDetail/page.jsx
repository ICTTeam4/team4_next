"use client"
import React, { useState } from 'react';
import "./saleDetail.css"
import Image from 'next/image';
import { Button } from '@mui/material';
import SalesImgSlider from '@/app/salesImgSlider/page'
function page(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const openPanel = () => {
    setIsOpen(true);
  }

  const closePanel = () => {
    setIsOpen(false);
  }

  const openMap = () => {
    setIsMapOpen(true);
  }
  const closeMap = () => {
    setIsMapOpen(false);
  }


  return (
    <>
      <div className="container">
        <div className="imgBox">
          <div className="images" > <SalesImgSlider/> </div>
        </div>
        <div className="tradeInfoMenu">
          <div className="category">홈▶카테고리1▶카테고리2</div>
          <div className="salesInfo">
            <div className="itemName">
              <div className="item"> <span className='infoTitle'>물품이름</span> </div>


              <Image src="/images/David_share.png"  width={50} height={50}  className="share"/>
              

            </div>
            <div className="itemPrice"><span className='infoTitle priceInfo'>가격</span></div>
            <div className="detailData">게시일 조회수 채팅 수 찜수</div>

          </div>
          <div className="tradeInfo">
            <div> 제품상태 <br /> <span className='tradeTitle'>중고</span></div>
            <div>거래방식 <br /> <span className='tradeTitle'>직거래</span></div>
            <div>배송비 <br /> <span className='tradeTitle'>포함</span></div>
            <div>안전거래 <br /> <span className='tradeTitle'>사용</span></div>
          </div>
          <div id="interaction-area">
            <Image src="/images/David_bookmark-white.png" width={30} height={30} className="bookmark" id="bookmark" />
            <div className="purchase" onClick={openPanel}>구매하기</div>
            <div className="chatting" onClick={openPanel}>채팅하기</div>
          </div>
          <div className="tradeArea" onClick={openMap}>⊙ 마장동 직거래 위치 제안하기</div>
        </div>
        <div className="salesDescription">
          <div className="sellerInfo">
          <span className='infoTitle'>상품 정보</span>
          </div>
          
          <hr />
          <div></div>
        </div>
        <div className="sellerInfo">
          <div className='sellerHeader'>
          <span className='infoTitle'>판매자 정보</span>   <Image src="/images/David_arrow.png" className='navigation' width="30" height="30"/>
          </div>
          <hr />
          <div className="sellerContainer">


            <div className="sellerProfile">
              <div className="sellerNickname">판매자 닉네임</div> <div className="sellerImg"></div>
            </div>
            <div className="sellerData">
              <div>안전거래 수 <br /> <span className='tradeTitle'>2</span></div>
              <div>거래 후기 수 <br /> <span className='tradeTitle'>10</span></div>
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
        {
          isMapOpen && (
            <div className='mapModal' onClick={closeMap}>
              <div className='mapWindow' onClick={(e) => e.stopPropagation()}>지도</div>
            </div>
          )
        }

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