import Image from 'next/image';
import Link from 'next/link';
import './itemCard.css';

const Page = ({ data }) => {
  return (
    <>
    <Link href="/saleDetail">
    <div className="product_card_container">
      <div className='product_img'>
        <img
          src={`http://localhost:8080/images/${data.fileList[0].fileName}`}
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
          <span className='price_font'>{data.sell_price}원</span>
          <p className='date_font'>{data.created_at}</p>
        </div>
      </div>
    </div>
    </Link>
    </>


  );
};

export default Page;