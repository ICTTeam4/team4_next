import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
function CustomPage({nextButton,setNextButton}) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const router = useRouter(); // 페이지 이동을 위한 history 객체 사용

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const getButtonStyles = (payment) => {
    const defaultStyles = {
      color: '#000',
      bgcolor: '#f0f0f0',
      '&:hover': { bgcolor: '#e0e0e0' },
    };
 useEffect(() => {
    // 네이버페이 JavaScript SDK 로드
    const script = document.createElement('script');
    script.src = 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js';
    script.async = true;
    script.onload = () => {
      // 네이버페이 객체 생성
      window.oPay = window.Naver.Pay.create({
        mode: 'development', // development or production
        clientId: 'HN3GGCMDdTgGUfl0kFCo', // ClientId
        chainId: 'VG5DTmJWRk1BaDZ' // ChainId
      });
    };
    document.body.appendChild(script);
  }, []);
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

   // 결제 프로세스 실행 함수
   const executePayment = () => {
    if (!selectedPayment) return; // 결제 수단이 선택되지 않았다면 아무 행동도 취하지 않음

    switch (selectedPayment) {
      case '카카오페이':
        console.log('카카오페이로 결제를 진행합니다.');
        // setNextButton(3)
        break;
      case '네이버페이':
        console.log('네이버페이로 결제를 진행합니다.');
        // setNextButton(4)
         // 네이버페이 결제창 호출
    if (window.oPay) {
      window.oPay.open({
        merchantPayKey: '20241205TwZ68b',
        productName: '전하윤 배채우기',
        productCount: '1',
        totalPayAmount: '290000',
        taxScopeAmount: '290000',
        taxExScopeAmount: '0',
        returnUrl: 'http://localhost:3000/naverPay/success'
      });
    } else {
      console.error('Naver Pay is not initialized.');
    }
        break;
      case '토스페이':
        console.log('토스페이로 결제를 진행합니다.');
        // setNextButton(5)
        break;
      default:
        console.error('지원하지 않는 결제 수단입니다.');
        break;
    }
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
        onClick={executePayment} // 결제 실행 함수 연결
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
