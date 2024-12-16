import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ChatBlock = ({ room_id }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // 전체 뷰포트 높이 조정
      bgcolor: '#fff' // 배경색
    }}>
      <br/><br/><br/><br/> <br/><br/><br/><br/>
      <Typography variant="h6" sx={{ mb: 2 }}>
        임시방번호:  {room_id} 회원님을 차단하시겠습니까?
      </Typography>
      <Box>
      <br/><br/><br/><br/> <br/><br/><br/><br/>
        <Button variant="contained" sx={{
          bgcolor: '#d32f2f', // 더 어두운 빨강
          ':hover': {
            bgcolor: '#b71c1c' // 호버 시 더욱 어두운 빨강
          },
          mr: 1,
          color: 'white' // 텍스트 색상
        }}>
          예
        </Button>
        <Button variant="outlined" sx={{
          borderColor: 'gray', // 테두리 색상
          color: 'gray', // 텍스트 색상
          ':hover': {
            bgcolor: 'rgba(128, 128, 128, 0.1)' // 호버 시 배경 색상
          }
        }}>
          아니오
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBlock;
