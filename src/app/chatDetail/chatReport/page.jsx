import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup, Button } from '@mui/material';

const ChatReport = ({ room_id }) => {
  return (
    <div className="chat-report-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <FormControl component="fieldset" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormLabel component="legend" sx={{ textAlign: 'center', mb: 2, color: 'black', '&.Mui-focused': { color: 'black' },fontWeight: 'bold' }}>
          신고 사유 선택
        </FormLabel>
        <br/><br/><br/><br/>
        <FormGroup sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left', paddingLeft: '180px' }}>
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
            label="비정상적인 업체로 보임"
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
            label="현금의 비정상적인 언급이 있음"
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
            label="거짓된 거래조건 언급이 있음"
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
            label="정상적인 방법을 언급이 있음"
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} />}
            label="사기관련 조직적 행태로 의심됨"
          />
        </FormGroup>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#d32f2f', // 기본 배경색
            ':hover': {
              bgcolor: '#b71c1c' // 호버 시 배경색
            },
            mt: 2,
            width: '80%'
          }}
        >
          신고하기
        </Button>
      </FormControl>
    </div>
  );
};

export default ChatReport;
