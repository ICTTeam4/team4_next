"use client"
import React, { useEffect, useState } from 'react';
import './styles.css'; // 스타일 파일을 import합니다.
import Page from '../chatDetail/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Chat = ({ isOpen, closeChat, initialRoomId, initialhostId }) => {
  const [isChatDetailOpen, setChatDetailOpen] = useState(false); // 채팅디테일 사이드바 상태관리 
  const [selectedChat, setSelectedChat] = useState(null);
  const LOCAL_API_BASE_URL = "http://localhost:8080";


  // 초기 room_id가 있을 경우 바로 채팅 디테일 열기
  useEffect(() => {
    if (initialRoomId) {
      setSelectedChat({ room_id: initialRoomId, host_id: initialhostId });
      setChatDetailOpen(true);
    }
  }, [initialRoomId, initialhostId]);


  // 채팅 디테일 열기
  const toggleChatDetail = (chat) => {
    setSelectedChat(chat); // 선택된 채팅 설정
    setChatDetailOpen(true); // 팝업 열기
  };

  // 채팅 디테일 닫기
  const closeChatDetail = () => {
    setChatDetailOpen(false); // 팝업 닫기
    setSelectedChat(null); // 선택된 채팅 초기화

  };


  // 채팅 데이터 예시  // last message, last message의 date, 상대는 내가 아닌 상대...? room_id  .. 이미 user.member_id로 확인이 된상태여야함 
  const chats = [
    { room_id: 1, name: "닉네임1", date: "3월 17일", message: "어제 보기로 했던 그 영화 어땠어?" },
    { room_id: 2, name: "닉네임2", date: "3월 3일", message: "시장에 새로운 상품이 출시되었어요, 확인해보세요?" },
    { room_id: 3, name: "닉네임3", date: "1월 29일", message: "3일만에 다시 만나서 반가워요!" },
    { room_id: 4, name: "닉네임4", date: "1월 14일", message: "잘 지내시나요?" },
    { room_id: 5, name: "닉네임5", date: "12월 24일", message: "도착했습니다." },
    { room_id: 6, name: "닉네임6", date: "12월 10일", message: "오늘 회의 일정 알려주세요." },
    { room_id: 7, name: "닉네임7", date: "11월 28일", message: "새로운 프로젝트 관련 문의드립니다." },
    { room_id: 8, name: "닉네임8", date: "11월 12일", message: "즐거운 하루 되세요!" },
    { room_id: 9, name: "닉네임9", date: "10월 25일", message: "언제 다시 뵐 수 있을까요?" },
    { room_id: 10, name: "닉네임10", date: "10월 10일", message: "프로젝트 업데이트 확인 부탁드립니다." },
    { room_id: 11, name: "닉네임11", date: "9월 30일", message: "마감 일정 문의드립니다." },
    { room_id: 12, name: "닉네임12", date: "9월 15일", message: "새로운 기능 추가를 요청드립니다." },
    { room_id: 13, name: "닉네임13", date: "8월 30일", message: "자료가 잘 도착했는지 확인 부탁드립니다." },
    { room_id: 14, name: "닉네임14", date: "8월 12일", message: "잘 지내시죠? 최근 소식 궁금해요." },
    { room_id: 15, name: "닉네임15", date: "7월 25일", message: "문의드린 내용에 대한 답변 부탁드립니다." },
    { room_id: 16, name: "닉네임16", date: "7월 10일", message: "오랜만에 연락드립니다." },
    { room_id: 17, name: "닉네임17", date: "6월 25일", message: "파일 업로드 문제 해결됐나요?" },
    { room_id: 18, name: "닉네임18", date: "6월 10일", message: "기쁜 소식 전합니다." },
    { room_id: 19, name: "닉네임19", date: "5월 30일", message: "다음 주 일정 조율이 필요합니다." },
    { room_id: 20, name: "닉네임20", date: "5월 15일", message: "어제 보낸 이메일 확인 부탁드립니다." },
  ];


  const router = useRouter();



  return (

    <div className="chat-page">
      {/* chatDetail 진입점 오버레이 - 일부러 여기엔 no_more_overlay라고 바꿈(미적용), 추후 2차 어두움 원하면 그냥 overlay로 바꾸기. */}
      {isChatDetailOpen && <div className='chatoverlay2' onClick={closeChatDetail}></div>}
      <div className="chat-header" style={{ alignContent: 'left', textAlign: 'center' }}>

        <button className="close-button" onClick={closeChat}>
          <img src="/images/HJ_close.png" className="close_button" />
        </button>
        <span style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '11px', marginLeft: '15px' }}>채팅</span>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <button
            key={chat.room_id} // key 속성 추가
            className="chat-item"
            onClick={() => toggleChatDetail(chat)} // 클릭 시 채팅 디테일 열기

          >
            <div className="chat-item2" style={{ width: '548px', border: 'none' }}>
              <div className="chat-profile-photo"><img src='../images/HY_profile2.jpg' /></div>
              <div className="chat-details">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-date">{chat.date}</span>
                <div className="chat-message">{chat.message}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 채팅방(Detail) */}
      {isChatDetailOpen && selectedChat && (
        <div className={`chatDetail_sidebar ${isChatDetailOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="chat-detail">
            <Button sx={{
              color: 'black', ":hover": {
                backgroundColor: '#f5f5f5', // 호버 시 배경색을 lightgray로 변경
                border: 'none'
              }
            }} className="close-button" onClick={closeChatDetail} style={{ margin: '0px' }}>
              <ArrowBackIosIcon
                style={{
                  margin: '10px',
                  marginLeft: '15px'
                }}
              />
            </Button>
            <Page room_id={selectedChat.room_id} host_id={selectedChat.host_id} closeChat={closeChat} closeDetail={closeChatDetail} />
          </div>
        </div>
      )}

    </div>
  );
}

export default Chat;
