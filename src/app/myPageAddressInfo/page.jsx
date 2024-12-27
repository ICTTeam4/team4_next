"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageAddressInfo.css';
import { useState } from 'react';
import Link from 'next/link';

function Page(props) {
    const pathname = usePathname();
    const [defaultId, setDefaultId] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

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

    // 새 주소 추가 모달 내 입력 필드 상태 관리
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddressInput] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    // 모든 필드 채워졌는지 확인하는 유효성 로직
    const isFormValid = name.trim() !== "" && phone.trim() !== "" && zipcode.trim() !== "" 
    && address.trim() !== "" && detailAddress.trim() !== "";

    const handleSetDefault = (id) => {
        setAddresses((prev) => {
            const selected = prev.find((item) => item.id === id); // 선택된 주소 찾기
            const others = prev.filter((item) => item.id !== id); // 나머지 주소들
            return [selected, ...others]; // 선택된 주소를 맨 위로 배치
        });
        setDefaultId(id); // 기본 배송지 ID 업데이트
    };

    const handleModalOpen = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
        // 모달 닫힐 때 입력값 초기화 (필요 시)
        setName("");
        setPhone("");
        setZipcode("");
        setAddressInput("");
        setDetailAddress("");
        setIsChecked(false);
    };

    const handleSave = () => {
        if (!isFormValid) return; 
        // 여기에 저장 로직 추가
        // 예: setAddresses([...addresses, { id: ..., name, phone, zipcode, address, detailAddress }])
        handleModalClose();
    }

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
                                <div className='btn btn_add'>
                                    <span className='btn_txt'
                                        onClick={handleModalOpen}
                                    >+ 새 배송지 추가</span>
                                </div>
                                {isModalOpen && (
                                    <div className="layer_delivery layer lg">
                                        <div className="layer-background" onClick={handleModalClose}>
                                        </div>
                                        <div className="layer_container">
                                            <a href="#" className="btn_layer_close">
                                                <div onClick={handleModalClose}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="ico-close icon sprite-icons">
                                                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                                    </svg>
                                                </div>
                                            </a>
                                            <div className="layer_header">
                                                <h2 className="title"> 새 주소 추가 </h2>
                                            </div>
                                            <div className="layer_content">
                                                <div className="delivery_bind">
                                                    <div className="delivery_input">
                                                        <div className="input_box first" >
                                                            <h4 className="input_title">이름</h4>
                                                            <div className="input_item">
                                                                <input 
                                                                type="text" 
                                                                placeholder="수령인의 이름" 
                                                                autoComplete="off" 
                                                                className="input_txt" 
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                />
                                                            </div>
                                                            <p className="input_error">올바른 이름을 입력해주세요. (2 - 50자)</p>
                                                        </div>
                                                        <div className="input_box" >
                                                            <h4 className="input_title">휴대폰 번호</h4>
                                                            <div className="input_item">
                                                                <input 
                                                                type="tel" 
                                                                placeholder="- 없이 입력" 
                                                                autoComplete="off" 
                                                                className="input_txt text_fill" 
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                />
                                                            </div>
                                                            <p className="input_error">정확한 휴대폰 번호를 입력해주세요.</p>
                                                        </div>
                                                        <div className="input_box" >
                                                            <h4 className="input_title">우편번호</h4>
                                                            <div className="input_item">
                                                                <input
                                                                    type="text"
                                                                    placeholder="우편 번호를 검색하세요"
                                                                    readOnly
                                                                    autoComplete="off"
                                                                    className="input_txt text_fill"
                                                                    value={zipcode}
                                                                    onChange={(e) => setZipcode(e.target.value)}
                                                                    onFocus={(e) => e.target.blur()}
                                                                />
                                                                <a href="#" className="btn_input btn_zipcode outline small" > 우편번호 </a>
                                                            </div>
                                                        </div>
                                                        <div className="input_box" >
                                                            <h4 className="input_title">주소</h4>
                                                            <div className="input_item">
                                                                <input type="text"
                                                                    placeholder="우편 번호 검색 후, 자동입력 됩니다"
                                                                    readOnly
                                                                    autoComplete="off"
                                                                    className="input_txt text_fill"
                                                                    value={address}
                                                                    onChange={(e) => setAddressInput(e.target.value)}
                                                                    onFocus={(e) => e.target.blur()}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="input_box" >
                                                            <h4 className="input_title">상세 주소</h4>
                                                            <div className="input_item">
                                                                <input 
                                                                type="text" 
                                                                placeholder="건물, 아파트, 동/호수 입력" 
                                                                autoComplete="off" 
                                                                className="input_txt text_fill" 
                                                                value={detailAddress}
                                                                onChange={(e) => setDetailAddress(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="delivery_check">
                                                        <div className="checkbox_item last">
                                                            <input id="check1" type="checkbox" name="" className="blind" 
                                                                checked={isChecked}
                                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                            />
                                                            <label htmlFor="check1" className="check_label">
                                                            {isChecked ? (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 448 512"
                                                                        className="ico-close icon sprite-icons"
                                                                    >
                                                                        <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 448 512"
                                                                        className="ico-uncheck icon sprite-icons"
                                                                    >
                                                                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z" />
                                                                    </svg>
                                                                )}
                                                                <span className="label_txt">기본 배송지로 설정</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="v-portal" style={{ display: "none" }}>
                                                </div>
                                                <div className="layer_btn">
                                                    <button 
                                                    type="button"
                                                    className="btn_input btn_delete outlinegrey medium" 
                                                    onClick={handleModalClose}> 취소 </button>
                                                    <button 
                                                    type="button"
                                                    disabled={!isFormValid} 
                                                    className={`btn_input btn_save solid medium ${isFormValid ? '' : 'disabled'} `}
                                                    onClick={handleSave}> 저장하기 </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
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