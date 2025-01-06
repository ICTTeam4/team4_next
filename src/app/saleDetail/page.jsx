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
import ReactDOMServer from "react-dom/server";
import CustomOverlay from "../components/CustomOverlay";
import WeatherSection from '../components/WeatherSection';

const saleDetail = () => {
  const searchParams = useSearchParams();
  // 상태 관리
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  // 모달, 슬라이드 패널 등
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookMarkOpen, setIsBookMarkOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [payButtonLevel, setPayButtonLevel] = useState(0);  // 결제 단계 관리
  const [latitude, setLatitude] = useState(null); // 날씨용
  const [longitude, setLongitude] = useState(null); // 날씨용


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

  3.// 판매고객 조회
  useEffect(() => {
  const getSellerData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`http://localhost:8080/members/getpostmemberdetail?pwr_id=${id}`);
      setSellerData(response.data.data);
      console.log("주문고객 데이터 조회 완료:", response.data.data);
    } catch (error) {
      console.error("주문고객 데이터 조회 실패:", error);
      setError("주문고객 데이터 조회에 실패했습니다.");
    }
  }
  getSellerData();

}, [id]);

  // 휘주 지도 내용 시작
  useEffect(() => {
    if (isMapOpen && id) {
      const fetchLocationAndRenderMap = async () => {
        try {
          // 판매자 위치 데이터 요청
          const sellerResponse = await axios.get(`http://localhost:8080/api/salespost/itemone?id=${id}`);
          const { latitude, longitude } = sellerResponse.data.data;
          console.log("판매자 위치 데이터:", latitude, longitude);

          // 따릉이 데이터 요청
          const ddrResponse = await axios.get(`http://localhost:8080/api/saleslocationmap/ddrlocationinfo`);
          const ddrLocations = ddrResponse.data.data;
          console.log("따릉이 데이터:", ddrLocations);

          // 세탁소 데이터 요청
          const laundryResponse = await axios.get(`http://localhost:8080/api/saleslocationmap/laundrylocationinfo`);
          const laundryLocations = laundryResponse.data.data;
          console.log("세탁소 데이터:", laundryLocations);
          // 필요한 데이터만 추출하여 보기 좋게 출력
          laundryLocations.forEach((laundry) => {
            console.log(`세탁소 이름: ${laundry.laundry_name}, 위도: ${laundry.laundry_lat}, 경도: ${laundry.laundry_lng}`);
          });

          // 지도 렌더링
          renderKakaoMap(latitude, longitude, ddrLocations, laundryLocations);
        } catch (err) {
          console.error("Error fetching location or map data:", err);
        }
      };

      fetchLocationAndRenderMap();
    }
  }, [isMapOpen]);

  // 카카오맵 렌더링 함수
  const renderKakaoMap = (latitude, longitude, ddrLocations = [], laundryLocations = []) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=a60d0171befab6f49a92b0b129300f7c&autoload=false`;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          // center: new kakao.maps.LatLng(37.555945, 126.972317),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        // 현재 열려 있는 InfoWindow를 추적
        let activeInfoWindow = null;

        // 판매자 마커
        const sellerMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latitude, longitude),
          map,
        });

        // CustomOverlay DOM 노드 생성
        const overlayContainer = document.createElement("div");
        overlayContainer.style = `
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  text-align: center;
  transform: translateY(-65px);
`;

        overlayContainer.innerHTML = `
  <div>판매자 기본 거래 위치</div>
  <div style="
    position: absolute;
    top: 1px;
    right: 1px;
    cursor: pointer;
    font-size: 8px;
    color: black;
    font-weight: bold;
  "></div>
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
`;

        // 닫기 버튼 이벤트 추가
        overlayContainer.querySelector("div:nth-child(2)").onclick = () => {
          if (activeOverlay) {
            activeOverlay.setMap(null);
            activeOverlay = null;
          }
        };

        // Kakao CustomOverlay 생성
        const sellerOverlay = new kakao.maps.CustomOverlay({
          content: overlayContainer,
          position: sellerMarker.getPosition(),
          yAnchor: 0.3, // 오버레이 위치 조정
          map: map, // 초기부터 표시
        });

        // 마커 클릭 이벤트 등록
        kakao.maps.event.addListener(sellerMarker, "click", () => {
          if (activeOverlay) activeOverlay.setMap(null); // 기존 오버레이 닫기
          sellerOverlay.setMap(map); // 현재 오버레이 열기
          activeOverlay = sellerOverlay;
        });


        const greenCircleMarkerData =
          "data:image/svg+xml;base64," +
          btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <circle cx="7" cy="7" r="7" fill="green" />
          </svg>`
          );
        // 카카오 지도 MarkerImage 설정
        const greenCircleMarkerImage = new kakao.maps.MarkerImage(
          greenCircleMarkerData,           // 이미지 소스 (Base64 SVG)
          new kakao.maps.Size(20, 20),     // 표시될 크기
          {
            offset: new kakao.maps.Point(8, 8), // 마커의 중심좌표(옵션)
          }
        );

        // 따릉이 마커 찍기
        if (Array.isArray(ddrLocations)) {
          ddrLocations.forEach((ddrLocation) => {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(ddrLocation.ddr_lat, ddrLocation.ddr_lng),
              map,
              image: greenCircleMarkerImage, // 여기만 바꾸면 됨
            });

            const infoContent = `
    <div style="padding:10px; background-color:white; border:2px solid black; width: 150px; height: 80px;">
      <strong>따릉이 정류장</strong><br>
      이름: ${ddrLocation.ddr_addr_detail}<br>
    </div>`;
            const infowindow = new kakao.maps.InfoWindow({ content: infoContent });

            kakao.maps.event.addListener(marker, "click", () => {
              // 이미 열린 InfoWindow가 있다면 닫기
              if (activeInfoWindow === infowindow) {
                infowindow.close();
                activeInfoWindow = null;
              } else {
                if (activeInfoWindow) activeInfoWindow.close();
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
              }
            });
          });
        }

        const whiteCircleMarkerData =
          "data:image/svg+xml;base64," +
          btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <circle cx="7" cy="7" r="4" stroke="black" stroke-width="2" fill="white" />
          </svg>`
          );

        // 카카오 지도 MarkerImage 설정
        const whiteCircleMarkerImage = new kakao.maps.MarkerImage(
          whiteCircleMarkerData,           // 이미지 소스 (Base64 SVG)
          new kakao.maps.Size(20, 20),     // 표시될 크기
          {
            offset: new kakao.maps.Point(8, 8), // 마커의 중심좌표(옵션)
          }
        );

        // 세탁소 마커 찍기
        if (Array.isArray(laundryLocations)) {
          laundryLocations.forEach((laundryLocation) => {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(
                laundryLocation.laundry_lat,
                laundryLocation.laundry_lng
              ),
              map,
              image: whiteCircleMarkerImage, // 여기만 바꾸면 됨
            });

            const infoContent = `
    <div style="padding:10px; background-color:white; border:2px solid black; width: 150px; height: 80px;">
      <strong>세탁소</strong><br>
      이름: ${laundryLocation.laundry_name}<br>
    </div>`;
            const infowindow = new kakao.maps.InfoWindow({ content: infoContent });

            kakao.maps.event.addListener(marker, "click", () => {
              if (activeInfoWindow === infowindow) {
                infowindow.close();
                activeInfoWindow = null;
              } else {
                if (activeInfoWindow) activeInfoWindow.close();
                infowindow.open(map, marker);
                activeInfoWindow = infowindow;
              }
            });
          });
        }
      });
    };
    document.head.appendChild(script);
  };

  // 휘주 지도 끝
  // 휘주 날씨 시작

  useEffect(() => {
    if (detail) {
      setLatitude(detail.latitude); // 판매자의 위도 정보
      setLongitude(detail.longitude); // 판매자의 경도 정보
    }
  }, [detail]);
  // 휘주 날씨 끝


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

  const openChatPanel = () => {
    // setIsChatOpen(true); //테스트로 만드신거다 보니  일단 지금은 주석처리했습니다! 실제론 db로직 구현 필요.
    // 후에 db 로직 짤땐 room_id가 있으면 검사하거나, 파라미터에 실제 게시자 id를 넘기거나 추가해줘야함.
    // open-chat 이벤트 발생 시킴 -> 임시 채팅방 id 지정. room_id: 888 ( 999는 임시 관리자 채팅방id.  )
    // axios.get(url,
    //   params: {
    //    "buyer_id": member_id
    //    "pwr_id": pwr_id
    //     })
    // if data.success {setRoomId}
    //   else : 오류가 났습니다.
    // setHost_id(member_id)
    axios.get(API_URL, { id }, {
      headers: { "Content-Type": "application/json" },
    })
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
            <div
            style={{borderRight: "none"}}
            >배송비 <br /> <span 
            className='tradeTitle'
            
            >포함</span></div>
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
                <Link href="/salepage" className='sellerFont'>{sellerData?.nickname || '로딩 중...'}</Link>
              </div>
              <Link href="/salepage">
                <div className="sellerImg" ></div>
              </Link>
            </div>
            <div className="sellerData">
              <div>안전거래 수 <br /> <span className='tradeTitle'>2</span></div>
              <div>거래 후기 수 <br /> <span className='tradeTitle'>10</span></div>
            </div>
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
              <WeatherSection latitude={latitude} longitude={longitude} />
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
export default saleDetail;