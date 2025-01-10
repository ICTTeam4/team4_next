'use client';
import React, { useState, useEffect } from 'react';
import styles from './notifications.module.css';
import './notifications.module.css';
import './notifications.css';
import useAuthStore from '../../../store/authStore';
import axios from 'axios';

const Page = ({ props }) => {
  const { isNotibarActive, setIsNotibarActive } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [number, setNumber] = useState(1);
  const handleToggleNotibar = () => {
    setIsNotibarActive(); // 상태 토글
  };
  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/api/connect/99");
    sse.addEventListener('connect', (e) => {
      const { data: receivedConnectData } = e;
      console.log('connect알림 정보 받기: ', receivedConnectData);  // "connected!"
    });
    sse.addEventListener('update', (e) => {
      const receivedConnectData = JSON.parse(e.data); // 데이터를 JSON 객체로 변환
      console.log('update알림 정보 받기: ', receivedConnectData); // 변환된 객체 출력

      const oneNoti = {
        pwr_id: receivedConnectData.pwr_id,
        member_id: receivedConnectData.member_id,
        is_read: receivedConnectData.is_read,
        type: receivedConnectData.type
      };

      setNotifications((prev) => [
        ...prev, // 이전 알림들을 유지
        oneNoti // 새 알림 추가z
      ]);

      
    });
    // sse.onmessage = function(event) {
    //   console.log("메세지 가져오는지 확인:"+event.data); // 서버로부터 받은 데이터 (SSE 이벤트)
    // };
  }, [])

  useEffect(()=>{
    console.log("notifications"+ JSON.stringify(notifications)); // 업데이트된 알림 개수
  },[notifications])
  useEffect(() => {
    sendMessage();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await axios(`http://localhost:8080/api/broadcast/99?message=${encodeURIComponent("클릭했음!-------------------")}`, {
        method: 'GET'
      });
    } catch (error) {
      console.error('Error:', error);
      console.log('Error sending message.catch');
    }
  };
  const plus = () => {
    setNumber(number + 1);
    console.log(number);
  }

  return (

    <div>
      {/* 레이어 배경 */}
      <div
        onClick={handleToggleNotibar}
        className={`${isNotibarActive ? styles.notiLayerBackground : ''}`}></div>

      {/* 필터 섹션 */}
      <div className={`${styles.notiSections} ${isNotibarActive ? styles.active : ''}`} >
        <div className={styles.notiContent} style={{ paddingBottom: '5px' }}>
          <div className="noti_title_container">
            <button className='exit_noti_btn' onClick={handleToggleNotibar}>
              <img src="/images/HJ_close.png" className="noti_close_button" />
            </button>
            <div className="noti_title">
              <h2><p>알림</p> <button onClick={sendMessage} >메시지</button><button onClick={plus} >+</button> </h2>
            </div>
          </div>
        </div>
        <div className="noti_filter_section">
          <div className="noti_section_top"></div>
          <hr style={{ border: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
          <div>
            {/* 카테고리 버튼 */}
            <ul className="noti_big_category_container">
              <li className="noti_big_category">
                <button className='noti_button'>전체</button>
                <button className='noti_button'>거래</button>
                <button className='noti_button'>관심</button>
                <button className='noti_button'>판매</button>
              </li>
            </ul>
          </div>
          <div className={styles.filterContent}>
            <div className="noti_title_container" style={{ height: '20px' }}>
              <div className="noti_section_top">
                <p>지난 알림</p>
              </div>
            </div>
          </div>
          {/* 알림 카드 시작 */}
          <div className="noti_section">
            <div className="noti_section_top">

              { notifications ? notifications.map((item) => { return <div>
              <div className='noti_one_block'>
                <table>
                  <tbody>
                    <tr><th></th><th></th><th></th></tr>
                    <tr><td></td><td>pwr_id : {item.pwr_id} </td><td></td></tr>
                    <tr>
                      <td><img src='/images/HJ_notice_img.png' /></td>
                      <td style={{ width: '180px' }}>내용이 들어갑니다</td>
                      <td style={{ width: '90px' }}><img src='/images/HJ_car1.jpg' /></td>
                    </tr>
                    <tr><td></td><td>2시간 전</td><td></td></tr>
                  </tbody>
                </table>
              </div>
              <hr style={{ border: '1px', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0px' }} />
              </div>
              }): <div>ddd</div>  
            }
            
            </div>
          </div>
          {/* 알림 카드 끝 */}
        </div>
      </div>
    </div>
  );
};

export default Page;
