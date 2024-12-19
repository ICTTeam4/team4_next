import React, { useState } from 'react';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';

function CustomPage({nextButton}) {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const getButtonStyles = (payment) => {
    const defaultStyles = {
      color: '#000',
      bgcolor: '#f0f0f0',
      '&:hover': { bgcolor: '#e0e0e0' },
    };

    if (selectedPayment === payment) {
      switch (payment) {
        case '카카오페이':
          return { bgcolor: '#FFE812', color: '#000', '&:hover': { bgcolor: '#FFD700' } };
        case '네이버페이':
          return { bgcolor: '#03C75A', color: '#fff', '&:hover': { bgcolor: '#02B45F' } };
        case '토스페이':
          return { bgcolor: '#1B64F2', color: '#fff', '&:hover': { bgcolor: '#1657C9' } };
        default:
          return defaultStyles;
      }
    }
    return defaultStyles;
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, margin: 'auto', bgcolor: '#fff' }}>
      {/* 제목  나중에 여기서 나온 nextButton 변수값으로  직거래, 택배거래 구분필요함*/}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>  
        {nextButton === 1 ? "택배거래로 구매" : nextButton === 2 ? ("직거래로 구매") : null }
      </Typography>
      
      {/* 판매 정보 */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="left">
          <Grid item xs={4}>
            <Box
              sx={{
                width: '60px',
                height: '60px',
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              판매 이미지
            </Box>
          </Grid>
          <Grid item xs={7} >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              판매 제목
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              17,000 원
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 결제 수단 */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2,  height:'400px'}}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
          결제 수단
        </Typography>
        <Grid container spacing={1} justifyContent="left">
          {['카카오페이', '네이버페이', '토스페이'].map((payment) => (
            <Grid item xs={5.5} key={payment}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handlePaymentSelect(payment)}
                sx={{
                  ...getButtonStyles(payment),
                  boxShadow: 'none',
                  transition: 'none',
                }}
              >
                {payment}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* 최종 결제 금액 */}
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              최종 결제 금액
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">17,000 원</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* 다음 버튼 */}
      <Button
        variant="contained"
        fullWidth
        disabled={!selectedPayment}
        sx={{
          height: '56px',
          fontWeight: 'bold',
          bgcolor: selectedPayment ? '#000' : '#ccc',
          color: selectedPayment ? '#fff' : '#888',
          border: 'none',
          '&:hover': {
            bgcolor: selectedPayment ? '#111' : '#ccc',
          },
        }}
      >
        다음
      </Button>
    </Box>
  );
}

export default CustomPage;
