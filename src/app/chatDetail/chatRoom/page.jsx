import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Videocam from '@mui/icons-material/Videocam';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as StompJs from '@stomp/stompjs'; // 추가: STOMP WebSocket 라이브러리
import SockJS from 'sockjs-client'; // 추가: SockJS WebSocket 폴리필..??
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Page = ({ room_id, host_id }) => {
  const previewRef = useRef(null); //사진,동영상 미리보기 플로팅 상태관리
  const [message, setMessage] = useState(''); //입력창  처음엔 비어있음. 
  const messagesEndRef = useRef(null); // 추가: 메시지 끝부분 참조
  const [files, setFiles] = useState([]);   //미리보기..?  아직  실제업로드 구현 안됨 ( 12-21 기준)
  const [previewUrls, setPreviewUrls] = useState([]);    //파일 관련미리보기쪽임...  
  // 추가: WebSocket 클라이언트 초기화
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([  // 임의로 메세지 더미 넣어둠.    

    { id: 1, message: 'gdgd', name: 'user', read: true, timestamp: '오후 5:27' },
    { id: 2, message: '안녕하세요! ', name: 'other', read: false, timestamp: '오후 5:29' },
    { id: 3, message: '안녕하세요!', name: 'user', read: false, timestamp: '오후 5:29' },
    { id: 4, message: '안녕하세요!', name: 'other', read: false, timestamp: '오후 5:29' }
  ]);
  const userName = "user"; // 추가: 사용자 이름 설정 임의값.
  const roomId = "erer"



  useEffect(() => { 
    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket'); // 서버 WebSocket 엔드포인트
    const client = new StompJs.Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000, // 하트비트 수신 주기
      heartbeatOutgoing: 4000, // 하트비트 송신 주기
    });

    client.onConnect = () => {
      console.log('WebSocket Connected');
      console.log("연결됨!");
      // 메시지 수신 구독
      client.subscribe(`/topic/chat/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]); // 수신된 메시지 추가
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP Error', frame.headers['message'], frame.body);
    };

    client.activate(); // WebSocket 활성화
    setStompClient(client);

    // 컴포넌트 언마운트 시 WebSocket 종료
    return () => {
      client.deactivate();
    };
  }, []);

  // 메시지 전송 함수 수정
  const sendMessage = () => {

    const newMessage = {
      name: userName, // 사용자 이름
      message: message, // 입력 메시지
    };

    // WebSocket을 통해 서버로 메시지 전송
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/chat/${roomId}`, // 서버 MessageMapping 경로
        body: JSON.stringify(newMessage),
      });
    }

    setMessage(''); // 입력 필드 초기화
    setPreviewUrls([]);
  };


  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(currentFiles => [...currentFiles, ...newFiles]);
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(currentUrls => [...currentUrls, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 추가: 메시지 추가 시 채팅창 스크롤 자동 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollPreviews = (direction) => {
    if (previewRef.current) {
      const { scrollLeft, clientWidth } = previewRef.current;
      const newScrollPosition = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      previewRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };
  return (
    <div className="chat-room-page">
      {/* 상품 정보 */}
      <section className="product-info">
        <div className="product-photo"><img src='../images/HY_cup1.jpg' /></div>
        <div className="product-details">
          <h4>8,000원</h4>
          <p>찻잔 세트 싸게 팝니다</p>
        </div>
      </section>
      {/* 파일 미리보기 플로팅 */}
      {previewUrls.length > 0 && (
        <div style={{
          width: '580px',
          position: 'fixed', bottom: 100, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0)', // 반투명 배경
          zIndex: 1000, padding: '5px 10px'
        }}>
          <IconButton onClick={() => scrollPreviews('left')}><ArrowBackIosIcon /></IconButton>
          <div ref={previewRef} style={{
            overflowX: 'hidden', display: 'flex', whiteSpace: 'nowrap', flex: '1',
          }}>
            {previewUrls.map((url, index) => (
              <Card key={index} style={{ minWidth: '100px', margin: '0 5px' }}>
                <CardMedia
                  component={files[index].type.startsWith('video/') ? 'video' : 'img'}
                  src={url}
                  alt="Preview"
                  controls={files[index].type.startsWith('video/')}
                  style={{ height: '100px' }}
                />
              </Card>
            ))}
          </div>
          <IconButton onClick={() => scrollPreviews('right')}><ArrowForwardIosIcon /></IconButton>
        </div>
      )}

      {/* 메시지 창 */}
      <main
        className="chat-messages"
        style={{
          paddingBottom: '50px',
          paddingTop: previewUrls.length > 0 ? '20px' : '20px',
          maxHeight: 'calc(100vh - 250px)', // 화면 높이에 따라 동적 높이 설정. 그냥 px로 정하면  모니터마다 다름, %로 하면 계속 밑으로 늘어나서 안보임...
          overflowY: 'auto', // 스크롤바 활성화
        }}
      >
        {messages.map((msg, index) => (

          <Box
            key={index}
            sx={{
              margin: '10px',
             
              marginLeft: msg.name === 'user' ? 'auto' : '10px',
              marginRight: msg.name === 'user' ? '10px' : 'auto',
              maxWidth: { xs: '100%', sm: '70%' },
              alignSelf: msg.name === 'user' ? 'flex-end' : 'flex-start',
              // border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '8px', // 더 부드러운 테두리
              padding: '8px', // 박스 안쪽 여백
              marginBottom: '20px', // 메시지 간의 간격
            }}
          >
            <Paper elevation={6} style={{ padding: '12px', backgroundColor: msg.name === 'user' ? '#f1f1ea' : '#ebf0f5'}} sx={{
              padding: '10px',
              backgroundColor: msg.name === 'user' ? '#e0f7fa' : '#ffffff', // Paper에도 배경색 적용
              borderRadius: '4px', // Paper의 모서리도 둥글게
            }}>
              <Typography
                variant="body2"
                component="p"
                style={{
                  color: 'black',
                  wordWrap: 'break-word', // 긴 텍스트 처리
                  lineHeight: '1.5', // 텍스트 가독성 향상
                }}
              >
                {msg.message || 'No message'}
              </Typography>
              <Typography
                color="textSecondary"
                style={{
                  fontSize: '14px',
                  textAlign: msg.name === 'user' ? 'right' : 'left',
                  marginTop: '8px', // 텍스트와 타임스탬프 간 간격
                }}
              >
                {msg.timestamp || ''}{' '}
                {msg.read && msg.name === 'user' ? (
                  <Check style={{ fontSize: 'small' }} />
                ) : (
                  ''
                )}
              </Typography>
            </Paper>
          </Box>
        ))}
        {/* 추가: 스크롤을 위한 마지막 메시지 참조 */}
        <div ref={messagesEndRef} />
      </main>
      {/* 입력 창 */}
      <footer className="chat-input">
        <div className="input-left">
          <input
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="black" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            <IconButton color="black" aria-label="upload video" component="span">
              <Videocam />
            </IconButton>
          </label>
          <button className="emoji-button">😊</button>
          <input
            type="text"
            placeholder="메시지를 입력해 주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
          />
        </div>
        <div className="input-right">
          <button className="send-button" onClick={sendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="-2 -4 30 30"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg></button>
        </div>
      </footer>

    </div>
  );
};

export default Page;
