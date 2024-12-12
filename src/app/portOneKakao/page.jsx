"use client";
import React, { useEffect } from 'react';

function Page(props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 브라우저 환경 확인 후 포트원 스크립트 추가
      const iamportScript = document.createElement('script');
      iamportScript.src = 'https://cdn.iamport.kr/v1/iamport.js';
      iamportScript.async = true;
      document.body.appendChild(iamportScript);

      return () => {
        document.body.removeChild(iamportScript);
      };
    }
  }, []);

  const handlePayment = () => {
    if (typeof window.IMP !== 'undefined') {
      const { IMP } = window; // IMP 객체 가져오기
      IMP.init('imp78441160'); // 가맹점 식별코드 (테스트용: imp12345678)

      const paymentData = {
        pg: 'kakaopay', // 결제 대행사 (예: html5_inicis, kcp, tosspayments 등)
        pay_method: 'card', // 결제 방식 (카드, 계좌이체 등)
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호 (고유값)
        name: '테스트 상품', // 상품 이름
        amount: 1000, // 결제 금액
        buyer_email: 'test@example.com', // 구매자 이메일
        buyer_name: '홍길동', // 구매자 이름
        buyer_tel: '010-1234-5678', // 구매자 전화번호
        buyer_addr: '서울특별시 강남구 역삼동', // 구매자 주소
        buyer_postcode: '123-456', // 구매자 우편번호
      };

      IMP.request_pay(paymentData, (response) => {
        if (response.success) {
          alert('결제가 성공적으로 완료되었습니다.');
          console.log('결제 성공 데이터:', response);
        } else {
          alert(`결제에 실패하였습니다: ${response.error_msg}`);
          console.log('결제 실패 데이터:', response);
        }
      });
    } else {
      alert('포트원 스크립트가 로드되지 않았습니다.');
    }
  };

  return (
    <div>
      <button id="payment" onClick={handlePayment}>
        구매하기
      </button>
    </div>
  );
}

export default Page;
