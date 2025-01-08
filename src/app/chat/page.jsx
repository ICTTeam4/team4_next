"use client"
import React, { useEffect, useState } from 'react';
import './styles.css'; // 스타일 파일을 import합니다.
import Page from '../chatDetail/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useAuthStore from '../../../store/authStore';
import axios from 'axios';
const Chat = ({ isOpen, closeChat, initialRoomId, initialhostId, messages }) => {
  const [isChatDetailOpen, setChatDetailOpen] = useState(false); // 채팅디테일 사이드바 상태관리 
  const { user } = useAuthStore();
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const LOCAL_API_BASE_URL = "http://localhost:8080";
  // `chats2`를 chats로 설정
  const [chats, setChats] = useState(messages); // messages를 chats로 초기화




  console.log("지금부턴챗목록입니다", messages);
  // 중복 room_id 제거: 최신 항목만 유지
  const uniqueChats = Array.isArray(chats)
  ? chats.reduce((acc, chat) => {
      const existingChat = acc.find((c) => c.room_id === chat.room_id);
      if (!existingChat || new Date(existingChat.created_at) < new Date(chat.created_at)) {
        return acc.filter((c) => c.room_id !== chat.room_id).concat(chat);
      }
      return acc;
    }, [])
  : [];



  useEffect(() => {
    if (chats.length === 0 && !loading) {
      setLoading(true);
    } else if (chats.length > 0 && loading) {
      setLoading(false);
    }
  }, [chats, loading]);
  // 안정화위해서 2차 체크
  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      setChats(messages);
    }
  }, [messages]);

  // 초기 room_id가 있을 경우 바로 채팅 디테일 열기
  useEffect(() => {
    if (initialRoomId) {
      setSelectedChat({ room_id: initialRoomId, host_id: initialhostId, messages:messages });
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

  // 선택된 room_id에 해당하는 메시지 필터링
  const filteredMessages = selectedChat
  ? chats.filter((chat) => chat.room_id === selectedChat.room_id)
  : [];




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
        {loading ? (
          <p>채팅방 목록을 불러오는 중...</p>
        ) : uniqueChats.length > 0 ? (
          uniqueChats.map((chat) => (
            <button
              key={chat.room_id}
              className="chat-item"
              onClick={() => toggleChatDetail(chat)}
            >
              <div className="chat-item2" style={{ width: "548px", border: "none" }}>
                <div className="chat-profile-photo">
                  <img src="../images/HY_profile2.jpg" alt="프로필" />
                </div>
                <div className="chat-details">
                  <span className="chat-name">{chat.member_id || "알 수 없음"}</span>
                  <span className="chat-date">{chat.created_at || "날짜 없음"}</span>
                  <div className="chat-message">{chat.content || "메시지 없음"}</div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>채팅방이 없습니다.</p>
        )}
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
            <Page room_id={selectedChat.room_id} host_id={selectedChat.host_id} closeChat={closeChat} closeDetail={closeChatDetail} messages={filteredMessages} />
          </div>
        </div>
      )}

    </div>
  );
}

export default Chat;
