"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageAddressInfo.css';
import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

function Page(props) {
    const pathname = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
    const [editingAddressId, setEditingAddressId] = useState(null); // 수정할 주소 ID

    // 새 주소 추가 모달 내 입력 필드 상태 관리
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddressInput] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [isChecked, setIsChecked] = useState(false);


    // 기본 배송지 상태 (ID로 구분)
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "홍길동",
            phone: "01012345678",
            zipcode: "(12345)",
            address: "서울 동대문구 전농로땡땡길 12-34 (휘경동)",
            detailAddress: "123호",
            isDefault: true, // 기본 배송지
        },
        {
            id: 2,
            name: "둘리",
            phone: "01012345678",
            zipcode: "(56789)",
            address: "서울 서대문구 땡땡로12길 34-56 (땡땡동)",
            detailAddress: "789호",
            isDefault: false,
        },
    ]);


    // 전화번호 포맷팅 함수
    const formatPhoneNumber = (콜) => {
        if (!phone) return '';
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0,11); // 숫자만, 11자리까지
        if(!value.startsWith('010')){
            value = '010' + value.slice(3,11); // 맨 앞 자리가 "010"이 아니면 "010"으로 대체
        }
        setPhone(value);
    };


    // 모든 필드 채워졌는지 확인하는 유효성 로직
    const isFormValid = (name?.trim() || "") !== "" &&
        (phone?.trim() || "") !== "" &&
        (zipcode?.trim() || "") !== "" &&
        (address?.trim() || "") !== "" &&
        (detailAddress?.trim() || "") !== "";

    const handleSetDefault = (id) => {
        setAddresses((prev) =>
            prev.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
    };

    // 모달 열기 핸들러 (수정/추가 구분)
    const handleModalOpen = (address = null) => {
        if (address) {
            // 수정모드
            setIsEditing(true);
            setEditingAddressId(address.id);
            setName(address.name);
            setPhone(address.phone);
            setZipcode(address.zipcode);
            setAddressInput(address.address);
            setDetailAddress(address.detailAddress || "");
            setIsChecked(address.isDefault);
        } else {
            // 추가모드
            setIsEditing(false);
            setEditingAddressId(null);
            setName("");
            setPhone("");
            setZipcode("");
            setAddressInput("");
            setDetailAddress("");
            setIsChecked(false);
        }
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // 모달 닫기
        setIsEditing(false);
        setEditingAddressId(null);
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

        if (isEditing && editingAddressId !== null) {
            // 수정로직
            setAddresses((prev) =>
                prev.map((addr) =>
                    addr.id === editingAddressId
                        ? {
                            ...addr,
                            name,
                            phone,
                            zipcode,
                            address,
                            detailAddress,
                            isDefault: isChecked,
                        }
                        : addr
                )
            );
        } else {
            // 추가 로직
            const newId = addresses.length > 0 ? Math.max(...addresses.map(addr => addr.id)) + 1 : 1;
            setAddresses([
                ...addresses,
                {
                    id: newId,
                    name,
                    phone,
                    zipcode,
                    address,
                    detailAddress,
                    isDefault: isChecked,
                },
            ]);
        }
        // 기본 배송지 설정 : isChecked가 true인 경우
        if (isChecked) {
            handleSetDefault(isEditing ? editingAddressId : Math.max(...addresses.map(a => a.id)) + 1);
        }

        handleModalClose();
    };

    // 삭제 핸들러
    const handleDelete = (id) => {
        if (confirm("정말 이 주소를 삭제하시겠습니까?")) {
            const isDefault = addresses.find(addr => addr.id === id)?.isDefault;
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));

            // 기본 배송지가 삭제된 경우 다른 주소를 기본 배송지로 설정
            if (isDefault && addresses.length > 1) {
                const newDefault = addresses.find(addr => addr.id !== id);
                if (newDefault) {
                    handleSetDefault(newDefault.id);
                }
            }
        }
    };

    // 다음 우편번호 팝업 호출 함수
    const sample4_execDaumPostcode = () => {
        if (!daum?.Postcode) {
            alert('우편번호 스크립트가 아직 로드되지 않았습니다.');
            return;
        }
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                const roadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ',' + `${data.buildingName}` : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== '') {
                    extraRoadAddr = `(${extraRoadAddr})`;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                setZipcode(data.zonecode);
                setAddressInput(roadAddr + extraRoadAddr);


                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                if (roadAddr !== '') {
                    setAddressInput(roadAddr + extraRoadAddr);
                }
            }
        }).open();
    }

    return (
        <>
            {/* Daum 우편번호 스크립트 로드 */}
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy='afterInteractive'
            />
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
                                                    <h2 className="title">{isEditing ? "주소 수정" : "새 주소 추가"}</h2>
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
                                                                        onChange={handlePhoneChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="input_box" >
                                                                <h4 className="input_title">우편번호</h4>
                                                                <div className="input_item">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="우편 번호를 검색하세요"
                                                                        id="sample4_postcode"
                                                                        readOnly
                                                                        autoComplete="off"
                                                                        className="input_txt text_fill"
                                                                        value={zipcode}
                                                                        onChange={(e) => setZipcode(e.target.value)}
                                                                        onFocus={(e) => e.target.blur()}
                                                                    />
                                                                    <input
                                                                        type="button"
                                                                        className="btn_input btn_zipcode outline small"
                                                                        onClick={sample4_execDaumPostcode}
                                                                        value="우편번호"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="input_box" >
                                                                <h4 className="input_title">주소</h4>
                                                                <div className="input_item">
                                                                    <input type="text"
                                                                        placeholder="우편 번호 검색 후, 자동입력 됩니다"
                                                                        id="sample4_roadAddress"
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
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="ico-close icon sprite-icons">
                                                                            <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="ico-close icon sprite-icons">
                                                                            <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
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
                                    {addresses.filter(addr => addr.isDefault).map((item) => (
                                        <div
                                            key={item.id}
                                            className={`my_item is_active`}
                                            default-mark="기본 배송지"
                                        >
                                            <div className="info_bind">
                                                <div className="address_info">
                                                    <div className="name_box">
                                                        <span className="name">{item.name}</span>
                                                        <span className="mark">기본 배송지</span>
                                                    </div>
                                                    <p className="phone">
                                                        {formatPhoneNumber(item.phone)}
                                                    </p>
                                                    <div className="address_box">
                                                        <span className="zipcode">{item.zipcode}</span>
                                                        <span className="address">{item.address}</span>
                                                        {item.detailAddress && (
                                                            <span className='detail-address'>{item.detailAddress}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn_bind">
                                                <a
                                                    href="#"
                                                    className="btn outlinegrey small"
                                                    onClick={(e) => { e.preventDefault(); handleModalOpen(item); }}>
                                                    수정
                                                </a>
                                                <a
                                                    href="#"
                                                    className="btn outlinegrey small"
                                                    onClick={(e) => { e.preventDefault(); handleDelete(item.id); }}>

                                                    삭제
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* 나머지 배송지 */}
                                <div className="other">
                                    {addresses.filter(addr => !addr.isDefault).map((item) => (
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
                                                        <p className="phone">{formatPhoneNumber(item.phone)}</p>
                                                        <div className="address_box">
                                                            <span className="zipcode">{item.zipcode}</span>
                                                            <span className="address">{item.address}</span>
                                                            {item.detailAddress && (
                                                                <span className="detail-address">{item.detailAddress}</span>
                                                            )}
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
                                                    <a href="#"
                                                        className="btn outlinegrey small"
                                                        onClick={(e) => { e.preventDefault(); handleModalOpen(item); }}>
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
        </>
    );
}

export default Page;