"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageAccountInfo.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();

    // 기본 배송지 상태 (ID로 구분)
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            bank_name: "카카오뱅크",
            account_number: "3333000000000",
            account_holder_name: "홍길동",
        },
        {
            id: 2,
            bank_name: "우리은행",
            account_number: "1002-000-000000",
            account_holder_name: "둘리",
        },
    ]);

    const [defaultId, setDefaultId] = useState(1);

    const handleSetDefault = (id) => {
        setAddresses((prev) => {
            const selected = prev.find((item) => item.id === id); // 선택된 주소 찾기
            const others = prev.filter((item) => item.id !== id); // 나머지 주소들
            return [selected, ...others]; // 선택된 주소를 맨 위로 배치
        });
        setDefaultId(id); // 기본 배송지 ID 업데이트
    };

    return (

        <div className='myPageAccountInfo'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_addressbook'>
                        <div className='content_title'>
                            <div className='main_title'>
                                <h3>판매 정산 계좌</h3>
                            </div>
                            <div className='btn_box'>
                                <a href="#" className='btn btn_add'>
                                    <span className='btn_txt'>+ 새 계좌 추가</span>
                                </a>
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
                                                    <span className="name">{item.bank_name}</span>
                                                    <span className="mark">기본 정산 계좌</span>
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
                                            <a href="#" className="btn outlinegrey small">
                                                삭제
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 나머지 계좌 */}
                                <div className="other">
                                    {addresses.slice(1).map((item) => (
                                        <div
                                            key={item.id}
                                            className="other_list"
                                        >
                                            <div className={`my_item`}>
                                                <div className="info_bind">
                                                    <div className="address_info">
                                                        <div className="name_box">
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
                                                    <a
                                                        href="#"
                                                        className="btn outlinegrey small"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSetDefault(item.id);
                                                        }}
                                                    >
                                                        기본 정산 계좌
                                                    </a>
                                                    <a href="#" className="btn outlinegrey small">
                                                        삭제
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
}

export default Page;