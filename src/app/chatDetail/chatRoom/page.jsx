import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Videocam from '@mui/icons-material/Videocam';
const Page = ({ room_id }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    console.log("메시지 전송:", message);
    // 실제 메시지 전송 로직 구현 필요
    setMessage('');  // 메시지 보낸 후 입력 필드 초기화
  };

    // 파일 업로드 핸들러
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      console.log("업로드된 파일:", file);
      // 파일 업로드 로직 구현 필요
    };
  return (
    <div className="chat-room-page">
      {/* 상품 정보 */}
      <section className="product-info">
        <div className="product-photo"><img src='../images/HY_cup1.jpg'/></div>
        <div className="product-details">
          <h3>8,000원</h3>
          <p>찻잔 세트 싸게 팝니다</p>
        </div>
      </section>

      {/* 메시지 창 */}
      <main className="chat-messages">
        <div className="chatDetail-message">
          <p>아기상어1234님이 위치 제안을 하였습니다. 장소를 확인해보세요!</p>
          <p>카카오맵: <a href="#">http://kakaomap.sdsdf.csad</a></p>
          <p>fsafasfasdfasdfasdfasdf.com</p>
          <p>room_id : {room_id}</p>
          <span className="chat-timestamp">오후 5:27</span>
        </div>
      </main>

        {/* 입력 창 */}
        <footer className="chat-input">
        <div className="input-left">
          <input
            accept="image/*,video/*"
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
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
          />
        </div>
        <div className="input-right">
          <button className="send-button" onClick={sendMessage}>⬆</button>
        </div>
      </footer>
    </div>
  );
};

export default Page;
