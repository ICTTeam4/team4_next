"use client";
import React, { useEffect, useState } from 'react';
import "./saleDetail.css";
import Image from 'next/image';
import SalesImgSlider from './salesImgSlider/page';
import SalesRelatedSlider from './saleRelatedSlider/page';
import Link from 'next/link';
import PayPanel from './payPanel/page';
import PayDealPanel from './payDealPanel/page';
import KakaoPay from '../payments/kakaoPay/page';
import NaverPay from '../payments/naverPay/page';
import TossPay from '../payments/tossPay/page';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import useAuthStore from '../../../store/authStore';

const saleDetail = () => {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  // 상태 관리
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 모달, 슬라이드 패널 등
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookMarkOpen, setIsBookMarkOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [payButtonLevel, setPayButtonLevel] = useState(0);  // 결제 단계 관리
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading,setChatLoading] = useState(true);
  // URL 파라미터 (id)
  const id = searchParams.get("id");
  // API 경로
  const API_URL = `http://localhost:8080/api/salespost/upviewcount`;
  useEffect(() => {
    console.log(">>> useEffect 실행됨");
    if (!id) return;
    const getData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        // (1) 서버에서 데이터 가져오기
        const response = await axios.get(`http://localhost:8080/api/salespost/itemone?id=${id}`);
        console.log(response);
        const data = response.data.data;
        console.log(data);
        setDetail(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    getData();

  }, [id]);

  // 2. 뷰 카운트 요청
  useEffect(() => {
    // 서버 사이드 렌더링 방지
    if (typeof window === 'undefined') return;
    if (!id) return;

    // localStorage에서 "이미 뷰 카운트를 올린 적이 있는지" 체크
    const viewCountKey = `viewCountUpdated_${id}`;
    const alreadyUpdated = localStorage.getItem(viewCountKey);

    if (!alreadyUpdated) {
      // 아직 한 번도 안 올렸으면 -> POST 요청
      axios.post(API_URL, { id }, {
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          localStorage.setItem(viewCountKey, "true");
          console.log("뷰 카운트 증가 완료");
        })
        .catch((err) => {
          console.error("뷰 카운트 증가 오류:", err);
        });
    }
  }, [id]);

  // 휘주 지도 내용 시작
  useEffect(() => {
    if (isMapOpen) {
      // 카카오맵 SDK 로드
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a60d0171befab6f49a92b0b129300f7c&autoload=false`;
      script.onload = () => {
        kakao.maps.load(() => {
          // 맵을 생성할 위치
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 기본 좌표 (서울)
            level: 3, // 지도 확대 레벨
          };
          // 지도 생성
          const map = new kakao.maps.Map(container, options);
          // 마커 추가
          const markerPosition = new kakao.maps.LatLng(37.5665, 126.9780); // 마커 위치
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          // customOverlay 추가
          const customOverlay = new kakao.maps.CustomOverlay({
            position: markerPosition, // 오버레이 위치
            content: `
                        <div style="
                          position: relative; 
                          display: flex; 
                          justify-content: center; 
                          align-items: center; 
                          flex-direction: column; 
                          width: auto; 
                          padding: 10px 15px; 
                          border: 0px solid #888; 
                          border-radius: 8px; 
                          background-color: white; 
                          box-shadow: 0px 2px 4px rgba(0.5, 0.5, 0.5, 0.5); 
                          font-size: 13px; 
                          text-align: center; 
                          transform: translateY(-65px); /* 마커 위로 위치 조정 */
                        ">
                          <div>판매자 기본 거래 위치</div>
                          <div 
                            style="
                              position: absolute; 
                              top: 1px; 
                              right: 1px; 
                              cursor: pointer; 
                              font-size: 8px; 
                              color: black; 
                              font-weight: bold;"
                            onclick="closeCustomOverlay()">✖</div>
                          <!-- 말풍선 꼬리 -->
                          <div style="
                            position: absolute; 
                            bottom: -10px; 
                            left: 50%; 
                            transform: translateX(-50%); 
                            width: 0; 
                            height: 0; 
                            border-left: 10px solid transparent; 
                            border-right: 10px solid transparent; 
                            border-top: 10px solid white; 

                          "></div>
                        </div>
                      `,
            map: map, // 오버레이를 지도에 추가
          });
          // 닫기 버튼 클릭 시 오버레이 닫기
          window.closeCustomOverlay = () => {
            customOverlay.setMap(null);
          };
          // 마커 클릭 시 customOverlay 열기
          kakao.maps.event.addListener(marker, 'click', () => {
            customOverlay.setMap(map); // 오버레이 지도에 표시
          });
        });
      };
      document.head.appendChild(script);
    }
  }, [isMapOpen]); // isMapOpen이 true가 될 때 실행
  // 휘주 지도 내용 끝



  // 로딩/에러 처리
  if (loading) return <div>로딩 중...</div>;
  
  if (error) return <div>오류 발생: {error}</div>;
  if (!detail) return <div>데이터가 없습니다.</div>;

  // 날짜 포맷팅 함수
  function formatTimeAgo(created_at) {
    const createdTime = new Date(created_at); // `created_at` 문자열을 Date 객체로 변환
    const now = new Date(); // 현재 시간
    const diff = Math.floor((now - createdTime) / 1000); // 초 단위 시간 차이

    if (diff < 60) {
      return `${diff}초 전`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}분 전`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days}일 전`;
    }
  }

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

  const openChatPanel = async () => {
    // API URL
    const CHAT_API_URL = "http://localhost:8080/api/chat/room";

    if (!user || !detail) {
      console.error("유저 정보 또는 상세 정보가 없습니다.");
      return;
    }
  
    try {
      console.log("하윤서치채팅준비용",user.member_id,detail.pwr_id)
        // LocalStorage에서 토큰 가져오기
        const token = localStorage.getItem("token");
      // API 요청
      const response = await axios.get(CHAT_API_URL, {
        params: {
          buyer_id: user.member_id,
          pwr_id: detail.pwr_id,
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      // 요청 성공 시 room_id 받아오기 (새로 생성되는경우에도 받아옴.  이유는 채팅목록과, 바로 채팅하기 구분하기 위해서 여기서 roomid유무 따짐)
      if (response.data && response.data.success) {
        console.log("채팅메세지000"+JSON.stringify(response.data))
        const roomId = response.data.data[0]?.room_id;
    
        // 이벤트 발생
        window.dispatchEvent(
          new CustomEvent("open-chat2", {
            detail: {
              room_id: roomId,
              host_id: user.member_id,
              messages: response.data.content
            },
          })
        );
  
        console.log("채팅방 열림:", roomId);
      } else {
        console.error("채팅방 생성 실패:", response.data);
      }
    } catch (error) {
      console.error("채팅방 요청 오류:", error);
    }
  };
  

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

  const isBlurNeeded =
    detail.status === '판매완료';
  console.log(detail.status);





  return (
    <>
      <div className="container">
        <div className="imgBox">
          <div className={`images ${isBlurNeeded ? 'blur_image disabled' : ''}`} >
            {/* <SalesImgSlider fileName={encodeURIComponent(detail.fileList[0].fileName)} /> */}
            <SalesImgSlider data={detail} />
          </div>
          {isBlurNeeded && (
            <div className="overlayMessage">
              <p>{detail.status}</p>
            </div>
          )}
        </div>
        <div className="tradeInfoMenu">
          <div className="category">홈 &gt; {detail.sup_category} &gt; {detail.sub_category}</div>
          <div className="salesInfo">
            <div className="itemName">
              <div className="item"> <span className='goodsName' >{detail.title}</span> </div>
              <Image src="/images/David_share.png" onClick={openShare} width={50} height={50} className="share" />
            </div>
            <div className="itemPrice"><span className='infoTitle priceInfo'>{Number(detail.sell_price).toLocaleString()}원</span></div>
            <div className="detailData"><div>{formatTimeAgo(detail.created_at)}</div>
              <div style={{ display: 'flex' }}>
                <div><img style={{ width: "15px", height: "15px", margin: "0px 2px 0px 5px", verticalAlign: "bottom" }} src="/images/JH_saleDetail_view.png" alt="view">
                </img>{detail.view_count}</div>
                <div><img style={{ width: "16px", height: "16px", margin: "0px 2px 0px 5px", verticalAlign: "bottom" }} src="/images/JH_saleDetail_chat.png" alt="view">
                </img>채팅수</div>
                <div><img style={{ width: "16px", height: "16px", margin: "0px 2px 0px 5px", verticalAlign: "bottom" }} src="/images/JH_saleDetail_pick.png" alt="view">
                </img>찜수</div>
              </div>
            </div>




          </div>
          <div className="tradeInfo">
            <div> 제품상태 <br /> <span className='tradeTitle'>중고</span></div>
            <div>거래방식 <br /> <span
              className='tradeTitle'>
              {detail.is_direct === "1" && detail.is_delivery === "1"
                ? "직거래 / 택배거래"
                : detail.is_direct === "1"
                  ? "직거래"
                  : detail.is_delivery === "1"
                    ? "택배거래"
                    : ""}
            </span></div>
            <div>배송비 <br /> <span className='tradeTitle'>포함</span></div>
            <div className='safeDeal'>안전거래 <br /> <span className='tradeTitle'>사용</span></div>
          </div>
          <div id="interaction-area">
            {isBookMarkOpen ? <Image src="/images/David_bookmark-black.png" onClick={closeBookMark} width={33} height={30} className="bookmark" id="bookmark" /> :
              <Image src="/images/David_bookmark-white.png" onClick={openBookMark} width={30} height={30} className="bookmark" id="bookmark" />}
            <div className={`purchase ${isBlurNeeded ? 'disabled' : ''}`}
              onClick={isBlurNeeded ? null : openAlert}>
              구매하기
            </div>
            <div className="chatting" onClick={openChatPanel}>채팅하기</div>
          </div>
          <div
            className={`tradeArea ${isBlurNeeded ? 'disabled' : ''}`}
            onClick={isBlurNeeded ? null : openMap}>
            ⊙ {detail.selling_area_id} 직거래 위치 제안</div>
        </div>
        <div className="salesDescription">
          <div className="descriptionTop">
            <span className='infoTitle'>상품 정보</span>
          </div>
          <div className='descriptionContent'>
            {detail.description}
          </div>
        </div>
        <div className="sellerInfo">
          <div className='sellerHeader'>
            <span className='infoTitle'>
              <Link href="/salepage" className='infoTitle'>판매자 정보</Link></span>
            <Link href="/salepage">
              <Image src="/images/David_arrow.png" className='navigation' width="20" height="20" />
            </Link>
          </div>
          {/* <hr className='hr' /> */}
          <div className="sellerContainer">
            <div className="sellerProfile">
              <div className="sellerNickname">
                <Link href="/salepage" className='sellerFont'>판매자 닉네임</Link>
              </div>
              <Link href="/salepage">
                <div className="sellerImg" ></div>
              </Link>
            </div>
            <div className="sellerData">
              <div>안전거래 수 <br /> <span className='tradeTitle'>2</span></div>
              <div>거래 후기 수 <br /> <span className='tradeTitle'>10</span></div>
            </div>
            {/* <div className="sellerRecent">
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
            </div> */}
          </div>
        </div>
        <div className="relatedGoods">
          <SalesRelatedSlider />
        </div>
        {/* 휘주 지도 수정내용 시작*/}
        {isMapOpen && (
          <div className="mapModal" onClick={closeMap}>
            <div className="mapWindow" onClick={(e) => e.stopPropagation()}>
              {/* 제목 */}
              <div className="modalTitle">판매자 제안장소</div>
              {/* 지도 */}
              <div id="map" style={{ width: '100%', height: '60%' }}></div>
              {/* 날씨 */}
              <div className="weatherSection">
                <div>해당 지역의 일기예보입니다. 거래 날짜 선택시 참고해주세요.</div>
                <div className="weatherForecast">
                  <div className="weatherDay">
                    <span>오늘</span>
                    {/* <img src="/images/sunny.png" alt="오늘 날씨" /> */}
                    ☀️
                  </div>
                  <div className="weatherDay">
                    <span>내일</span>
                    ☀️
                    {/* <img src="/images/sunny.png" alt="내일 날씨" /> */}
                  </div>
                  <div className="weatherDay">
                    <span>2일 뒤</span>
                    ☀️
                    {/* <img src="/images/sunny.png" alt="2일 뒤 날씨" /> */}
                  </div>
                  <div className="weatherDay">
                    <span>3일 뒤</span>
                    ☀️
                    {/* <img src="/images/sunny.png" alt="3일 뒤 날씨" /> */}
                  </div>
                  <div className="weatherDay">
                    <span>4일 뒤</span>
                    ☀️
                    {/* <img src="/images/sunny.png" alt="4일 뒤 날씨" /> */}
                  </div>
                  <div className="weatherDay">
                    <span>5일 뒤</span>
                    ☀️
                    {/* <img src="/images/sunny.png" alt="5일 뒤 날씨" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 휘주 지도 수정내용 끝*/}
        {
          isShareOpen && (
            <div className='shareModal' onClick={closeShare}>
              <div className='shareWindow' onClick={(e) => e.stopPropagation()}>
                <div className='shareIcons'>
                  <Image className='shareIcon' src="/images/David_instagram.jpeg" alt='instagram' width="80" height="80" />
                  <Image className='shareIcon' src="/images/David_kakaotalk.png" alt='kakaotalk' width="80" height="80" />
                  <div className='shareIcon urlCopy'>URL<br /> 복사</div>
                </div>

                <div className='closeShare' onClick={closeShare}>닫기</div>
              </div>
            </div>
          )
        }
        {
          isAlertOpen && (
            <div className='alertModal' onClick={closeAlert}>
              <div className='alertWindow' onClick={(e) => e.stopPropagation()}>잠깐! 판매자와 채팅하셨나요? <br />
                채팅을 하지 않고 결제하면 취소될 확률이 높아요.<br /> 채팅을 통해 판매자와 소통해 보세요.
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
          {payButtonLevel === 0 ? (
            <PayPanel nextButton={payButtonLevel} setNextButton={setPayButtonLevel} data={detail} />
          ) : payButtonLevel === 1 || payButtonLevel === 2 ? (
            <PayDealPanel nextButton={payButtonLevel} setNextButton={setPayButtonLevel} data={detail} />
          ) : null
          }
          현재상태 :  {payButtonLevel}
        </div>
      </div>
    </>
  );
}
export default saleDetail;