"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPagePayOuts.css';
import { useState } from 'react';
import Link from 'next/link';

function Page(props) {
    const pathname = usePathname();

    // 기본 배송지 상태 (ID로 구분)
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            bank_name: "카카오뱅크",
            account_number: "3333096133333",
            account_holder_name: "전영빈",
        },
    ]);

    const [defaultId, setDefaultId] = useState(1);

    return (

        <div className='myPagePayOuts'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_addressbook'>
                        <div className='content_title'>
                            <div className='main_title'>
                                <h3>정산 내역</h3>
                            </div>
                        </div>
                        {/* 기본 정산 계좌 */}
                        <div className='my_list'>
                            <div className='basic'>
                                {addresses.slice(0, 1).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`my_item ${defaultId === item.id ? "is_active" : ""}`}
                                        default-mark="기본 정산 계좌"
                                    >
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="mark" style={{display: "block"}}>기본 정산 계좌</span>
                                                    <span className="name">{item.bank_name}</span>
                                                </div>
                                                <p className="phone">
                                                    {item.account_number.split("-").map((part, index) => (
                                                        <span key={index}>
                                                            {part}
                                                            {index < 2 && <span className=""></span>}
                                                        </span>
                                                    ))}
                                                </p>
                                                <div className="address_box">
                                                    <span className="zipcode">{item.account_holder_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn_bind">
                                            <Link href="/myPageAccountInfo" className="btn outlinegrey small">
                                                변경하기
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="saved-product">
                            <div>
                                <div>
                                    <div>
                                        <div className="my_interest">
                                            <div className="content-header">
                                                <h4 className="group_title">2024년 12월</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <div>
                                                        <a href="#" className="purchase_list_display_item" style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                            <div className="purchase_list_product">
                                                                <div className="list_item_img_wrap">
                                                                    <img alt="product_img" className="list_item_img" src="/images/JH_itemImg.png" style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                                </div>
                                                                <div className="list_item_title_wrap">
                                                                    <p className="list_item_price">상품 이름</p>
                                                                    <p className="list_item_description">
                                                                        <span>카카오뱅크 3333000000000</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="list_item_status">
                                                                <div className="list_item_column column_secondary">
                                                                </div>
                                                                <div className="list_item_column column_last">
                                                                    <p className="text-lookup last_title display_paragraph" style={{ color: "rgb(34, 34, 34)" }}>80,000원</p>
                                                                    <p className="before_purchase_confirmation">12.18 입금 완료</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="#" className="purchase_list_display_item" style={{ backgroundColor: "rgb(255, 255, 255)" }}>
                                                            <div className="purchase_list_product">
                                                                <div className="list_item_img_wrap">
                                                                    <img alt="product_img" className="list_item_img" src="/images/JH_itemImg2.png" style={{ backgroundColor: "rgb(244, 244, 244)" }} />
                                                                </div>
                                                                <div className="list_item_title_wrap">
                                                                    <p className="list_item_price">상품 이름</p>
                                                                    <p className="list_item_description">
                                                                        <span>카카오뱅크 3333000000000</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="list_item_status">
                                                                <div className="list_item_column column_secondary">
                                                                </div>
                                                                <div className="list_item_column column_last">
                                                                    <p className="text-lookup last_title display_paragraph" style={{ color: "rgb(34, 34, 34)" }}>600,000원</p>
                                                                    <p className="before_purchase_confirmation">12.18 입금 완료</p>
                                                                </div>
                                                            </div>
                                                        </a>
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
        </div>
    );
}

export default Page;