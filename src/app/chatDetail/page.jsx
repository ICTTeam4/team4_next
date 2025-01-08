import React, { useEffect, useRef, useState } from 'react';
import './styles.css'; // 스타일 파일 추가
import { Button } from '@mui/material';
import { Router } from 'next/router';
import ChatRoom from './chatRoom/page';
import ChatBlock from './chatBlock/page';
import ChatReport from './chatReport/page';
import ChatCheck from './chatCheck/page';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../../store/authStore';
import axios from 'axios';

const Page = ({ room_id, host_id,messages: initialMessages, closeChat, closeDetail }) => {
  const {user} = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [activePage, setActivePage] = useState('chatRoom');
  const [messages, setMessages] = useState(initialMessages || []); // 초기 메시지 상태
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

console.log("여긴채팅방입니다",messages);
console.log("현재 채팅방 메시지:", messages);

// 최신 채팅 목록 가져오기 함수
const fetchChatRooms = async () => {
  try {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    console.log("fetchChatRooms 진짜새거로실행");
    const response = await axios.get(`http://localhost:8080/api/chat/roomList`, {
      params: {
        member_id: user?.member_id,
      },
      headers: {
        Authorization: `Bearer ${token}`, // 인증 헤더 추가
        'Cache-Control': 'no-cache', // 캐싱 방지
      },
    });

    console.log("채팅방 목록 데이터 2222:", response.data);

    // 메시지 상태 업데이트
    setMessages(response.data || []); // 데이터 없으면 빈 배열로 초기화
  } catch (error) {
    console.error("채팅방 목록을 불러오는 중 오류 발생:", error);
    setMessages([]); // 오류 발생 시 메시지를 빈 배열로 설정
  }
};

 // room_id가 변경될 때 메시지 가져오기
 useEffect(() => {
  if (room_id) {
    fetchChatRooms();
  }
}, []);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

  };

  const toggleProfilePopup = () => {
    if (isDropdownOpen) setIsDropdownOpen(false); // 드롭다운 팝업 닫기
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);

      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfilePopupOpen(false);

      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("messages 상태 업데이트:", messages);
  }, [messages]);
  

  return (
    <div className="chat-detail-page">
      {/* 상단 헤더 */}
      <header className="chat-detail-header">
        <div className="chat-detail-info">
          <div className="chat-detail-photo"><img src='../images/HY_profile2.jpg' /></div>
          <div className="chat-detail-user">닉네임</div>
        </div>
        <div className="chat-detail-actions">
          <Button className="profile-button" sx={{
            color: 'gray',
            ":hover": { background: '#f5f5f5' }

          }} onClick={toggleProfilePopup} >👤</Button>

          <Button
            className="options-button"
            sx={{
              padding: '8px',
              ":hover": { background: '#f5f5f5' },
            }}
            onClick={toggleDropdown}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="3" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="21" r="2" />
            </svg>
          </Button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="dropdown-menu" style={{ marginBottom: '20px' }}>

              <button onClick={() => { setActivePage('chatReport'); setIsDropdownOpen(false); }} style={{ fontSize: '14px' }}>신고하기</button>
              <button onClick={() => { setActivePage('chatBlock'); setIsDropdownOpen(false); }} style={{ fontSize: '14px' }}>차단하기</button>
            </div>
          )}
          {isProfilePopupOpen && (
            <div ref={profileRef} className="profile-popup" style={{ marginBottom: '20px' }}>
              <button onClick={() => { setActivePage('chatCheck'); setIsProfilePopupOpen(false); }} style={{ fontSize: '14px' }}>안전유저 검사</button>
            </div>
          )}
        </div>
      </header>
      {/* 채팅방이동 버튼 */}
      {activePage !== 'chatRoom' && (
        <Button
          sx={{
            marginLeft:'15px',
            padding:'4px',
            fontWeight:'bold',
            color: 'black',
            justifyContent: 'left',
            width: '85px',
            height: '40px',
            left: '2px',
            marginTop: '2px',
            marginBottom: '10px',
            ":hover": { backgroundColor: '#f5f5f5' }
          }}
          className="chatback-button"
          onClick={() => setActivePage('chatRoom')} // chatRoom으로 이동
        >
          <img src='/images/HJ_chatImg.png' style={{
          height:'25px', marginLeft:'5px', marginRight:'8px'
          }}/>이동
        </Button>
      )}

      {/* 조건부 렌더링 */}
      {activePage === 'chatRoom' && <ChatRoom key={room_id} room_id={room_id} host_id={host_id} messages={messages} />}
      {activePage === 'chatBlock' && <ChatBlock room_id={room_id} host_id={host_id} />}
      {activePage === 'chatReport' && <ChatReport room_id={room_id} host_id={host_id} />}
      {activePage === 'chatCheck' && <ChatCheck room_id={room_id} host_id={host_id} />}

    </div>
  );
};

export default Page;