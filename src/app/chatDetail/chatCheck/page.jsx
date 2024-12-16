import React from 'react';
import './styles.css'; // 스타일 시트 경로가 정확한지 확인하세요.

const ChatCheck = ({ room_id }) => {
  return (
    <div className="chat-check-container">
      <div className="chat-check-header">
        상담번호코드 1234 회원({room_id})의 신고이력 : 0 건
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div className="chat-check-body">
        <p className="left-align">거래 사기가 99%는 선입금에서 발생합니다.<br />
        Saint Kream 페이와 함께라면 더이상 불안한 마음으로<br /> 거래하지 않아도 돼요.</p>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <p className="right-align">거래 물품을 안전하게 받을때까지 Saint Kream 에서<br />
        결제액을 안전하게 보관했다가,<br />구매 확정 후 3일 이내에 정산해 드려요.</p>
      </div>
    </div>
  );
};

export default ChatCheck;
