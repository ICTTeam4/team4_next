"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageAddressInfo.css';
import { useState } from 'react';

function Page(props) {
    const pathname = usePathname();

    // 기본 배송지 상태 (ID로 구분)
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "홍길동",
            phone: "010-1234-5678",
            zipcode: "(12345)",
            address: "서울 동대문구 전농로땡땡길 12-34 (휘경동) 123호",
        },
        {
            id: 2,
            name: "둘리",
            phone: "010-1234-5678",
            zipcode: "(56789)",
            address: "서울 서대문구 땡땡로12길 34-56 (땡땡동) 789호",
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

        <div className='myPageAddressInfo'>
            <div className='container my lg'>
                <MyPageSideNav currentPath={pathname} />
                <div className='content_area my-page-content'>
                    <div className='my_addressbook'>
                        <div className='content_title'>
                            <div className='main_title'>
                                <h3>주소록</h3>
                            </div>
                            <div className='btn_box'>
                                <a href="#" className='btn btn_add'>
                                    <span className='btn_txt'>+ 새 배송지 추가</span>
                                </a>
                            </div>
                        </div>
                        {/* 기본 배송지 */}
                        <div className='my_list'>
                            <div className='basic'>
                                {addresses.slice(0, 1).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`my_item ${defaultId === item.id ? "is_active" : ""}`}
                                        default-mark="기본 배송지"
                                    >
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="name">{item.name}</span>
                                                    <span className="mark">기본 배송지</span>
                                                </div>
                                                <p className="phone">
                                                    {item.phone.split("-").map((part, index) => (
                                                        <span key={index}>
                                                            {part}
                                                            {index < 2 && <span className="hyphen"></span>}
                                                        </span>
                                                    ))}
                                                </p>
                                                <div className="address_box">
                                                    <span className="zipcode">{item.zipcode}</span>
                                                    <span className="address">{item.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn_bind">
                                            <a href="#" className="btn outlinegrey small">
                                                수정
                                            </a>
                                            <a href="#" className="btn outlinegrey small">
                                                삭제
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 나머지 배송지 */}
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
                                                            <span className="name">{item.name}</span>
                                                        </div>
                                                        <p className="phone">
                                                            {item.phone.split("-").map((part, index) => (
                                                                <span key={index}>
                                                                    {part}
                                                                    {index < 2 && <span className="hyphen"></span>}
                                                                </span>
                                                            ))}
                                                        </p>
                                                        <div className="address_box">
                                                            <span className="zipcode">{item.zipcode}</span>
                                                            <span className="address">{item.address}</span>
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
                                                        기본 배송지
                                                    </a>
                                                    <a href="#" className="btn outlinegrey small">
                                                        수정
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