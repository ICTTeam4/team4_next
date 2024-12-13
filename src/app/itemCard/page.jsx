import Image from 'next/image';
import Link from 'next/link';
import './itemCard.css';

const Page = ({ product }) => {
  return (
    <>
    <Link href="/saleDetail">
    <div className="product_card_container">
      <div className='product_img'>
        <img
          src="/images/HJ_car1.jpg"
          alt="판매 아이콘"
          style={{ borderRadius: '12px' }}
        />
      </div>
      <div className='product_info'>
        <div className='info_top'>
          <span className='item_com'>Converse</span>
          <p className='item_title'>Converse x Kike Chuck 70 high black...</p>
        </div>
        <div className='info_bottom'>
          <span className='price_font'>190,000원</span>
          <p className='date_font'>4시간 전</p>
        </div>
      </div>
    </div>
    </Link>
    </>


  );
};

export default Page;