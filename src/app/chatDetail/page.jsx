import React, { useEffect, useRef, useState } from 'react';
import './styles.css'; // 스타일 파일 추가
import { Button } from '@mui/material';
import { Router } from 'next/router';
import ChatRoom from './chatRoom/page';
import ChatBlock from './chatBlock/page';
import ChatReport from './chatReport/page';
import ChatCheck from './chatCheck/page';
import { useRouter } from 'next/navigation';

const Page = ({ room_id }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [activePage, setActivePage] = useState('chatRoom');
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

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



  return (
    <div className="chat-detail-page">
      {/* 상단 헤더 */}
      <header className="chat-detail-header">
        <div className="chat-detail-info">
          <div className="chat-detail-photo"><img src='../images/HY_profile2.jpg'/></div>
          <div className="chat-detail-user">닉네임</div>
        </div>
        <div className="chat-detail-actions">
          <Button className="profile-button" sx={{
            color: 'gray',
            ":hover": { background: '#eee', border: 'none' },
            
          }} onClick={toggleProfilePopup} >👤</Button>

          <Button className="options-button" sx={{
            color: 'gray',
            ":hover": { background: '#eee', border: 'none'}
          }} onClick={toggleDropdown}>⋮</Button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="dropdown-menu" style={{ marginBottom: '20px' }}>

              <button onClick={() => {setActivePage('chatReport');  setIsDropdownOpen(false); }}>신고하기</button>
              <button onClick={() => {setActivePage('chatBlock');  setIsDropdownOpen(false); }}>차단하기</button>
            </div>
          )}
          {isProfilePopupOpen && (
            <div ref={profileRef} className="profile-popup" style={{ marginBottom: '20px' }}>
              <button onClick={() => {setActivePage('chatCheck'); setIsProfilePopupOpen(false);}}>안전유저 검사</button>
            </div>
          )}
        </div>
      </header>
      {/* 뒤로가기 버튼 */}
     {activePage !== 'chatRoom' &&(
      <Button
      sx={{
        color: 'black',
        justifyContent:'left',
        border:'1px solid lightgray',
        width:'120px',
        left: '2px',
        marginTop:'2px',
        marginBottom:'10px',
        ":hover": { background: '#eee' }
      }}
      className="chatback-button"
      onClick={() => setActivePage('chatRoom')} // chatRoom으로 이동
    >
      채팅방으로 이동
    </Button>
     )}
     
      {/* 조건부 렌더링 */}
      {activePage === 'chatRoom' && <ChatRoom room_id={room_id} />}
      {activePage === 'chatBlock' && <ChatBlock room_id={room_id} />}
      {activePage === 'chatReport' && <ChatReport room_id={room_id} />}
      {activePage === 'chatCheck' && <ChatCheck room_id={room_id} />}

    </div>
  );
};

export default Page;
