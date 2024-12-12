"use client";

import React from 'react';

const notices = [
  "KREAM 가이드라인에 대한 안내",
  "KREAM 고객센터 이용안내",
  "KREAM 이벤트 참여방법 안내",
  "KREAM 서비스 운영정책 업데이트",
  "KREAM 프로모션 소개",
  "KREAM 제휴 서비스 안내",
  "KREAM 개인정보 처리방침 변경 안내"
];

const NoticesPage = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ color: '#333', borderBottom: '3px solid black', paddingBottom: '10px', textAlign:'left' }}>공지사항</h2>
      <div>
        {notices.map((notice, index) => (
          <div key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            {notice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPage;
