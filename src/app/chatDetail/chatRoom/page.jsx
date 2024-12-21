import React, { useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Videocam from '@mui/icons-material/Videocam';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Page = ({ room_id, host_id }) => {
  const previewRef = useRef(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, text: 'gdgd', sender: 'user', read: true, timestamp: '오후 5:27' },
    { id: 2, text: '안녕하세요! asdfasdffasdfdsafasdfsadfsdafsdafsdafsadfdsafasdfasdfsdfasdfasdfasfdasdfsdfasdfsaffdssdfasdfsfdsafasdfdsfsafasfsffs11111', sender: 'other', read: false, timestamp: '오후 5:29' },
    { id: 3, text: '안녕하세요!', sender: 'user', read: false, timestamp: '오후 5:29' },
    { id: 4, text: '안녕하세요!', sender: 'other', read: false, timestamp: '오후 5:29' },
    { id: 3, text: '안녕하세요!', sender: 'user', read: false, timestamp: '오후 5:29' },
    { id: 4, text: '안녕하세요!', sender: 'other', read: false, timestamp: '오후 5:29' },
    { id: 3, text: '안녕하세요!', sender: 'user', read: false, timestamp: '오후 5:29' },
    { id: 4, text: '안녕하세요!', sender: 'other', read: false, timestamp: '오후 5:29' }
  ]);

  const sendMessage = () => {
    console.log("메시지 전송:", message);
    setMessage('');
    setPreviewUrls([]);  // Clear previews when message is sent
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
          <h3>8,000원</h3>
          <p>찻잔 세트 싸게 팝니다</p>
        </div>
      </section>
  {/* 파일 미리보기 플로팅 */}
  {previewUrls.length > 0 && (
        <div style={{ width:'580px',
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
   <main className="chat-messages" style={{ paddingTop: previewUrls.length > 0 ? '120px' : '20px', maxHeight: '70%', overflowY: 'auto' }}>
        {messages.map(msg => (
          <Card
            key={msg.id}
            variant="outlined"
            style={{
              margin: '10px',
              backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#ffffff',
              marginLeft: msg.sender === 'user' ? 'auto' : '10px',
              marginRight: msg.sender === 'user' ? '10px' : 'auto',
              maxWidth: '70%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <CardContent style={{ wordWrap: 'break-word' }}>
              <Typography variant="body2" component="p" style={{ color: 'black' }}>
                {msg.text}
              </Typography>
              <Typography color="textSecondary" style={{ fontSize: '14px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.timestamp} {msg.read && msg.sender === 'user' ? <Check style={{ fontSize: 'small' }} /> : ''}
              </Typography>
            </CardContent>
          </Card>
        ))}
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
