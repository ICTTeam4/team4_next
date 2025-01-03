import Image from 'next/image';
import Link from 'next/link';
import './itemCard.css';

const Page = ({ index, data }) => {
  console.log("ItemCard 데이터:", data);

  
  // 안전한 접근을 위해 fileList와 fileName을 조건부로 처리
  const fileName = data.fileList && data.fileList.length > 0 ? data.fileList[0].fileName : null;


  function formatTimeAgo(created_at) {
    const createdTime = new Date(created_at); // `created_at` 문자열을 Date 객체로 변환
    const now = new Date(); // 현재 시간
    const diff = Math.floor((now - createdTime) / 1000); // 초 단위 시간 차이

    if (diff < 60) {
      return `${diff}초 전`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}분 전`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days}일 전`;
    }
  }
  return (
    <>
      <Link
        prefetch={false}
        href={{
          pathname: "/saleDetail",
          query: {
            id: data.pwr_id,
          },

        }}
      >
        <div className="product_card_container">
          <div className='product_img'>
            <img
              src={`http://localhost:8080/images/${data.fileList[0]?.fileName}`}
              alt="판매 아이콘"
              style={{ borderRadius: '12px' }}
            />

          </div>
          <div className='product_info'>
            <div className='info_top'>
              <span className='item_com'>{data.name}</span>
              <p className='item_title'>{data.title}</p>
            </div>
            <div className='info_bottom'>
              <span className='price_font'>{Number(data.sell_price).toLocaleString()}원</span>
              <p className='date_font'>{formatTimeAgo(data.created_at)}</p>
              
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Page;