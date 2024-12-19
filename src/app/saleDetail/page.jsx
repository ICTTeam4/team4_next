"use client"
import React, { useState } from 'react';
import "./saleDetail.css"
import Image from 'next/image';
import { Button } from '@mui/material';
import SalesImgSlider from '@/app/salesImgSlider/page'
import SalesRelatedSlider from '@/app/saleRelatedSlider/page'
import Link from 'next/link';
import PayPanel from './payPanel/page';
import PayDealPanel from './payDealPanel/page';
function page(props) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookMarkOpen, setIsBookMarkOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [payButtonLevel,setPayButtonLevel] = useState(0);  // 결제 단계 관리 , 

  
  const openBookMark = () => {
    setIsBookMarkOpen(true);
  }
  const closeBookMark = () => {
    setIsBookMarkOpen(false);
  }
  const openAlert = () => {
    setIsAlertOpen(true);
  }
  const closeAlert = () => {
    setIsAlertOpen(false);
   
  }

  const openChatPanel = () => {
    // setIsChatOpen(true); //테스트로 만드신거다 보니  일단 지금은 주석처리했습니다! 실제론 db로직 구현 필요.
    //  후에 db 로직 짤땐 room_id가 있으면 검사하거나, 파라미터에 실제 게시자 id를 넘기거나 추가해줘야함.
      // open-chat 이벤트 발생 시킴 -> 임시 채팅방 id 지정. room_id: 888 ( 999는 임시 관리자 채팅방id.  )
      window.dispatchEvent(new CustomEvent('open-chat', { detail: { room_id: 888, host_id: 123 } }));
  }

  const closeChatPanel = () => {
    setIsChatOpen(false);
    setPayButtonLevel(0);
  }
  const openPayPanel = () => {
    setIsPayOpen(true);
  }

  const closePayPanel = () => {
    setIsPayOpen(false);
    setPayButtonLevel(0); 
   }

  const openMap = () => {
    setIsMapOpen(true);
  }


  const closeMap = () => {
    setIsMapOpen(false);
  }
  const openShare = () => {
    setIsShareOpen(true);
  }
  const closeShare = () => {
    setIsShareOpen(false);
  }
  const noChatTrade = () => {
    closeAlert();
    openPayPanel();
  }
  const chatThenTrade = () => {
    closeAlert();
    openChatPanel();
  }

  


  return (
    <>
      <div className="container">
        <div className="imgBox">
          <div className="images" > <SalesImgSlider/> </div>
        </div>
        <div className="tradeInfoMenu">
          <div className="category">홈 &gt; 카테고리1 &gt; 카테고리2</div>
          <div className="salesInfo">
            <div className="itemName">
              <div className="item"> <span className='infoTitle'>물품이름</span> </div>


              <Image src="/images/David_share.png" onClick={openShare} width={50} height={50}  className="share"/>
              

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
            { isBookMarkOpen ? <Image src="/images/David_bookmark-black.png" onClick={closeBookMark} width={33} height={30} className="bookmark" id="bookmark" /> :
            <Image src="/images/David_bookmark-white.png" onClick={openBookMark} width={30} height={30} className="bookmark" id="bookmark" /> }
            <div className="purchase" onClick={openAlert}>구매하기</div>
            <div className="chatting" onClick={openChatPanel}>채팅하기</div>
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
          <span className='infoTitle'>
            <Link href="/salepage" className='sallerFont'>판매자 정보</Link></span>  
            <Link href="/salepage"> 
            <Image src="/images/David_arrow.png" className='navigation' width="20" height="20"/>
            </Link>
          </div>
          <hr />
          <div className="sellerContainer">

            <div className="sellerProfile">
              
              <div className="sellerNickname">
                <Link href="/salepage" className='sallerFont' style={{marginLeft:'90px'}}>판매자 닉네임</Link>
                </div> 
                <Link href="/salepage">
                <div className="sellerImg" style={{marginRight:'90px'}}></div>
                </Link>
              
            </div>
            <div className="sellerData">
              <div>안전거래 수 <br /> <span className='tradeTitle'>2</span></div>
              <div>거래 후기 수 <br /> <span className='tradeTitle'>10</span></div>
            </div>
            <div className="sellerRecent">
              <div className="sellerGoods">
              <Link href="/saleDetail/test">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
                </Link>
              </div>
              <div className="sellerGoods">
              <Link href="/saleDetail">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
                </Link>
              </div>
              <div className="sellerGoods">
              <Link href="/saleDetail">
                <div className="sellerGoodsImg"></div>
                <div className="sellerGoodsTitle">제목</div>
                <div className="sellerGoodsPrice">가격</div>
                </Link>
              </div>
            </div>

          </div>

        </div>
        <div className="relatedGoods">
          <SalesRelatedSlider/>

        </div>
        {
          isMapOpen && (
            <div className='mapModal' onClick={closeMap}>
              <div className='mapWindow' onClick={(e) => e.stopPropagation()}>지도</div>
            </div>
          )
        }
        {
          isShareOpen && (
            <div className='shareModal' onClick={closeShare}>
              <div className='shareWindow' onClick={(e) => e.stopPropagation()}>
                <div className='shareIcons'>
                <Image className='shareIcon' src="/images/David_instagram.jpeg" alt='instagram' width="80" height="80"/>
                <Image className='shareIcon' src="/images/David_kakaotalk.png" alt='kakaotalk' width="80" height="80"/>
                <div className='shareIcon urlCopy'>URL<br/> 복사</div>
                </div>
            
                <div className='closeShare' onClick={closeShare}>닫기</div>
              </div>
            </div>
          )
        }
        {
          isAlertOpen && (
            <div className='alertModal' onClick={closeAlert}>
              <div className='alertWindow' onClick={(e) => e.stopPropagation()}>잠깐! 판매자와 채팅하셨나요? <br/>
              채팅을 하지 않고 결제하면 취소될 확률이 높아요.<br/> 채팅을 통해 판매자와 소통해 보세요.
              <div className='chatThenTrade' onClick={chatThenTrade}>채팅하고 거래</div>
              <div className='noChatTrade' onClick={noChatTrade}>채팅없이 거래</div>
              </div>
            </div>
          )
        }

        {/* 어두운 오버레이 */}
        {isPayOpen && <div id="overlay" className="active" onClick={closePayPanel}></div>}
        {isChatOpen && <div id="overlay" className="active" onClick={closeChatPanel}></div>}

        {/* 슬라이드 패널 */}
        <div id="slidePanel" className={isPayOpen ? 'active' : ''}>
          {payButtonLevel === 0 ?(
            <PayPanel nextButton={payButtonLevel} setNextButton={setPayButtonLevel}/>
          ) : payButtonLevel === 1 || payButtonLevel === 2 ? (
            <PayDealPanel nextButton={payButtonLevel} setNextButton={setPayButtonLevel}/>
          ) : null
        }
             
          

          현재상태 :  {payButtonLevel}
          
        </div>



        <div id="slidePanel" className={isChatOpen ? 'active' : ''}>
          <div className="content">
            <h2>채팅</h2>
            <p>여기에 내용을 추가하세요.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;