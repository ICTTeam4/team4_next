"use client";
import { usePathname, useSearchParams } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageBuy.css';
import { useEffect, useState } from 'react';

function Page(props) {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || '전체';
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // 구매 내역 데이터 상태
    const [purchases, setPurchases] = useState([
        {
            id: 1,
            name: "상품 이름",
            price: "80,000원",
            description: "판매자이름/택배거래",
            item_image: "/images/JH_itemImg.png",
            order_date: "2023/12/01",
            status: "진행 중",
        },
        {
            id: 2,
            name: "상품 이름",
            price: "100,000원",
            description: "판매자이름/직거래",
            item_image: "/images/JH_itemImg2.png",
            order_date: "2023/11/25",
            status: "구매 완료",
        },
    ]);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    const handleModalOpen = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const getFilteredPurchases = () => {
        if (activeTab === '전체') {
            return purchases;
        } else {
            return purchases.filter(purchase => purchase.status === activeTab);
        }
    };

    const filteredPurchases = getFilteredPurchases();

    return (

        <div className='myPageBuy'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_purchase'>
                        <div className='content_title'>
                            <div className='title'>
                                <h3>구매 내역</h3>
                            </div>
                        </div>
                        {/* 타이틀 끝 */}
                        <div className='purchase_list history'>
                            <div>
                                <div className='history'>
                                    <div className='purchase_list_tab divider detail_tab'>
                                        {/* '전체' 탭 */}
                                        <div className={`tab_item ${activeTab === '전체' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('전체')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>전체</dt>
                                                    <dd className='count'>{purchases.length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        {/* '진행 중' 탭 */}
                                        <div className={`tab_item ${activeTab === '진행 중' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('진행 중')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>진행 중</dt>
                                                    <dd className='count'>{purchases.filter(p => p.status === '진행 중').length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                        <div className={`tab_item ${activeTab === '구매 완료' ? 'tab_on' : ''}`}
                                            onClick={() => handleTabClick('구매 완료')}>
                                            <a href="#" className='tab_link'>
                                                <dl className='tab_box'>
                                                    <dt className='title'>구매 완료</dt>
                                                    <dd className='count'>{purchases.filter(p => p.status === '구매 완료').length}</dd>
                                                </dl>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 구매 내역 리스트 */}
                        <div>
                            <div>
                                <div>
                                    {filteredPurchases.length > 0 ? (
                                        filteredPurchases.map(item => (
                                            <div key={item.id} className='purchase_list_display_item' style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                <a href="#">
                                                    <div className='purchase_list_product'>
                                                        <div className='list_item_img_wrap'>
                                                            <img alt="product_img" src={item.item_image} className='list_item_img' style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                        </div>
                                                        <div className='list_item_title_wrap'>
                                                            <p className='list_item_price'>{item.price}</p>
                                                            <p className='list_item_title'>{item.name}</p>
                                                            <p className='list_item_description'>
                                                                <span>{item.description}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className='list_item_status'>
                                                    <div className='list_item_column column_secondary'>
                                                        <p className='text-lookup secondary_title display_paragraph'
                                                            style={{ color: "rgba(34, 34, 34, 0.5)" }}>{item.order_date}</p>
                                                    </div>
                                                    <div className='list_item_column column_last'>
                                                        <p className='text-lookup last_title display_paragraph'
                                                            style={{ color: "rgb(34, 34, 34)" }}>{item.status}</p>
                                                        {/* '진행 중' 상태일 때만 '구매 확정' 버튼 표시 */}
                                                        {item.status === '진행 중' && (
                                                            <a className='text-lookup last_description display_paragraph action_named_action confirm_purchase' style={{ color: "red", cursor: "pointer" }}
                                                                onClick={handleModalOpen}
                                                            >구매 확정</a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className='nothing_at_all'>해당 카테고리에 해당하는 구매 내역이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* 모달 */}
                        {isModalOpen && (
                            <div className='layer lg'>
                                <div className='layer-background' onClick={handleModalClose}></div>
                                <div className='layer_container'>
                                    <div className="layer_header">
                                        <h2 className="title">구매 확정</h2>
                                    </div>
                                    <div className='layer_content'>
                                        <div className='size_list_area'>

                                            <h5>Saint Kream에서는 구매확정을 하는 즉시, 확정 취소가 불가능해요.<br /><br /></h5>

                                            <p className="description_text">
                                                확정 뒤 3일 후 상품 판매 대금이 판매자에게 정산되고 난 후에는 상품을 취소 및 반품 요청을 할 수 없어요.<br /><br /><br />

                                                혹시 판매자가 배송 전 구매확정을 요청했나요?<br /><br />

                                                배송완료 이전에 판매자가 구매확정을 요청하는 거래는 사기 위험이 높아요.<br />

                                                이런 행위를 하는 판매자를 만났다면 1:1 문의를 통해 신고를 접수해 주세요.<br /><br />
                                            </p>
                                            <p className='Fraud_Prevention'>사기 피해 방지를 위해 반드시 상품을 수령한 후<br /> 상품 상태를 확인 후에 구매확정 해주세요.<br /> </p>
                                        </div>
                                        <div className="layer_btn">
                                            <button className="btn solid medium" onClick={handleModalClose}>확인</button>
                                            <button className="btn solid_cancel medium" onClick={handleModalClose}>취소</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Page;