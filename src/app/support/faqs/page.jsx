"use client";

import React from 'react';

const faqs = [
  "의류 거래 시 안전하게 결제하는 방법",
  "상품의 정품 여부를 어떻게 확인할 수 있나요?",
  "배송은 어떻게 진행되나요?",
  "반품 또는 교환 정책은 무엇인가요?",
  "판매자가 된다면 어떤 이점이 있나요?",
  "구매자 보호 프로그램은 무엇인가요?",
  "개인정보 보호는 어떻게 이루어지나요?"
];

const FaqPage = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ color: '#333', borderBottom: '3px solid black', paddingBottom: '10px', textAlign: 'left' }}>자주 묻는 질문</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            {faq}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
