import Image from 'next/image';
import Link from 'next/link';
import './itemCard.css';

const Page = ({ index, data }) => {
  // 안전한 접근을 위해 fileList와 fileName을 조건부로 처리
  const fileName = data.fileList && data.fileList.length > 0 ? data.fileList[0].fileName : null;

  return (
    <>
      <Link href="/saleDetail">
        <div className="product_card_container">
          <div className="product_img">
            {fileName ? (
              <img
                src={`http://localhost:8080/images/${fileName}`}
                alt="판매 아이콘"
                style={{ borderRadius: '12px' }}
              />
            ) : (
              <div className="placeholder_image" style={{ borderRadius: '12px', backgroundColor: '#e0e0e0', height: '150px' }}>
                이미지 없음
              </div>
            )}
          </div>
          <div className="product_info">
            <div className="info_top">
              <span className="item_com">{data.name || '이름 없음'}</span>
              <p className="item_title">{data.title || '제목 없음'}</p>
            </div>
            <div className="info_bottom">
              <span className="price_font">{data.sell_price ? `${data.sell_price}원` : '가격 미정'}</span>
              <p className="date_font">{data.created_at || '날짜 없음'}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Page;
