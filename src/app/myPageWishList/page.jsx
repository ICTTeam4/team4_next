"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageWishList.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();
    const [activeFilter, setActiveFilter] = useState('찜 한 상품'); // 초기 필터 설정


    const [items, setItems] = useState([
        {
            id: 1,
            category: '최근 본 상품', // '찜 한 상품' 또는 '최근 본 상품'
            price: '80,000원',
            title: '상품 이름 ',
            description: '판매자이름 / 10분 전',
            item_img: '/images/JH_itemImg.png',
        },
        {
            id: 2,
            category: '찜 한 상품',
            price: '100,000원',
            title: '상품 이름 ',
            description: '판매자이름 / 5분 전',
            item_img: '/images/JH_itemImg2.png',
        },
        // 추가 아이템...
    ]);

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
    };

    const handleDeleteItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    // 현재 활성화된 필터에 따라 아이템을 필터링
    const filteredItems = items.filter(item => item.category === activeFilter);

    // 현재 필터에 따른 전체 아이템 수
    const totalItems = filteredItems.length;


    return (

        <div className='myPageWishList'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='content_title border'>
                        <div className='title'>
                            <h3>관심</h3>
                        </div>
                    </div>
                    {/* 타이틀 끝 */}


                    <div className='saved-chips-container'>
                        <div className='filter_chip_group filter_group bubble'>
                            {['찜 한 상품', '최근 본 상품'].map(filter => (
                                <label key={filter} className='bubble'>
                                    <input
                                        type="radio"
                                        className='input blind'
                                        value={filter}
                                        checked={activeFilter === filter}
                                        onChange={() => handleFilterClick(filter)}
                                    />
                                    <div>
                                        <button
                                            className={`filter_button line ${activeFilter === filter ? 'active' : ''}`}
                                            onClick={() => handleFilterClick(filter)}
                                        >
                                            <p className='text-group'>
                                                <span className='title'>{filter}</span>
                                                <span className='num'>
                                                    {items.filter(item => item.category === filter).length}
                                                </span>
                                            </p>
                                        </button>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 전체 아이템 수 표시 */}
                    <div className='saved-product'>
                        <div>
                            <div>
                                <div>
                                    <div className='my_interest'>
                                        <div className='content-header'>
                                            <div className='total-rows'>전체 {totalItems}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                <div>
                                                    {/* 필터링된 아이템 목록 */}
                                                    {filteredItems.map(item => (
                                                        <div key={item.id} className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                            <a href="#">
                                                                <div className='purchase_list_product'>
                                                                    <div className='list_item_img_wrap'>
                                                                        <img alt="product_img" src={item.item_img} className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                                    </div>
                                                                    <div className='list_item_title_wrap'>
                                                                        <p className='list_item_price'>{item.price}</p>
                                                                        <p className='list_item_title'>{item.title}</p>
                                                                        <p className='list_item_description'>
                                                                            <span>{item.description}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <p
                                                                className="text-lookup last_description display_paragraph action_named_action wish_delete"
                                                                onClick={() => handleDeleteItem(item.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                삭제
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;