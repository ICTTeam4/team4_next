"use client";
import { usePathname } from 'next/navigation';
import MyPageSideNav from '../components/MyPageSideNav';
import './myPageAccountInfo.css';
import { useState } from 'react';
import Select from 'react-select';
import { noOptionsMessageCSS } from 'react-select';

function Page(props) {
    const pathname = usePathname();
    const [defaultId, setDefaultId] = useState(1); // 기본 정산 계좌 아이디디
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 정산 계좌 목록 (ID로 구분)
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            bankName: "카카오뱅크",
            accountNumber: "3333000000000",
            accountHolderName: "홍길동",
        },
        {
            id: 2,
            bankName: "우리은행",
            accountNumber: "1002000000000",
            accountHolderName: "둘리",
        },
    ]);

    // 새 계좌 추가 모달 내 입력 필드 값 상태 관리
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");

    // 모달창 기본 계좌 체크 박스 상태
    const [isChecked, setIsChecked] = useState(false);

    // 은행 목록 (예시)
    const bankOptions = [
        { value: "카카오뱅크", label: "카카오뱅크" },
        { value: "우리은행", label: "우리은행" },
        { value: "국민은행", label: "국민은행" },
        { value: "신한은행", label: "신한은행" },
        { value: "하나은행", label: "하나은행" },
        { value: "IBK기업은행", label: "IBK기업은행" },
        { value: "NH농협은행", label: "NH농협은행" },
        { value: "토스뱅크", label: "토스뱅크" },
    ];


    const noArrowComponents = {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
    };

    // react-select 커스텀 스타일
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: "100%",
            fontSize: "14px",
            fontFamily: "inherit", // 상위 폰트 상속
        }),
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? "1px solid #222" : "1px solid #ebebeb",
            borderRadius: "8px",
            boxShadow: "none",      // 파란색 그림자 제거
            outline: "none",        // 포커스 outline 제거
            minHeight: "42px",
            "&:hover": {
                border: "1px solid #ccc",
            },
            // 내부를 flex로 만들어서 세로 중앙 정렬 쉽게
            display: "flex",
            alignItems: "center",
        }),
        valueContainer: (provided) => ({
            ...provided,
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // 가로 중앙 정렬
            padding: "0 12px",
        }),
        placeholder: (provided) => ({
            ...provided,
            textAlign: "center", // 가로 방향 중앙
            margin: 0,
            color: "rgba(34,34,34,0.5)",
        }),
        singleValue: (provided) => ({
            ...provided,
            textAlign: "center", // 선택된 값도 중앙 정렬
            margin: 0,
            color: "#222",
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: "4px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            zIndex: 9999, // 모달 등 위에 오도록
        }),
        option: (provided, state) => ({
            ...provided,
            padding: "10px 12px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: state.isSelected
                ? "#f7f7f7"
                : state.isFocused
                    ? "#fafafa"
                    : "#fff",
            color: "#222",
        }),
    };

    // 모달창 안 모든 필드 채워졌는지 확인하는 유효성 로직
    const isFormValid =
        bankName.trim() !== "" &&
        accountNumber.trim() != "" &&
        accountHolderName.trim() !== "";

    const handleSetDefaultAccount = (id) => {
        setAccounts((prev) => {
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
        setBankName("");
        setAccountNumber("");
        setAccountHolderName("");
        setIsChecked(false);
    };

    // 새 계좌 저장 로직
    const handleSave = () => {
        if (!isFormValid) return;

        // 여기에 저장 서버 다녀오는 로직 추가

        handleModalClose();
    }

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
                                <div className='btn btn_add'>
                                    <span className='btn_txt' onClick={handleModalOpen}>
                                        + 새 계좌 추가
                                    </span>
                                </div>

                                {isModalOpen && (
                                    <div className="layer_delivery layer lg">
                                        {/* 모달 배경경 */}
                                        <div className="layer-background" onClick={handleModalClose}></div>

                                        <div className="layer_container">
                                            <a href="#" className="btn_layer_close">
                                                <div onClick={handleModalClose}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 384 512"
                                                        className="ico-close icon sprite-icons"
                                                    >
                                                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                                    </svg>
                                                </div>
                                            </a>

                                            <div className="layer_header">
                                                <h2 className="title"> 새 계좌 추가 </h2>
                                            </div>

                                            <div className="layer_content">
                                                <div className="delivery_bind">
                                                    <div className="delivery_input">
                                                        <div className="input_box first">
                                                            <h4 className="input_title">은행명</h4>
                                                            <div className="input_item">
                                                                <Select
                                                                    placeholder="은행을 선택하세요"
                                                                    options={bankOptions}
                                                                    value={
                                                                        bankOptions.find(
                                                                            (option) => option.value === bankName
                                                                        ) || null
                                                                    }
                                                                    onChange={(selected) =>
                                                                        setBankName(selected.value)
                                                                    }
                                                                    styles={customStyles}
                                                                    isSearchable={false} // 검색 비활성화
                                                                    components={noArrowComponents}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="input_box" >
                                                            <h4 className="input_title">계좌번호</h4>
                                                            <div className="input_item">
                                                                <input
                                                                    type="tel"
                                                                    placeholder="- 없이 입력"
                                                                    autoComplete="off"
                                                                    className="input_txt text_fill"
                                                                    value={accountNumber}
                                                                    onChange={(e) => setAccountNumber(e.target.value)}
                                                                />
                                                            </div>
                                                            <p className="input_error">정확한 계좌 번호를 입력해주세요.</p>
                                                        </div>

                                                        <div className="input_box" >
                                                            <h4 className="input_title">예금주</h4>
                                                            <div className="input_item">
                                                                <input
                                                                    type="text"
                                                                    placeholder='예금주명을 정확히 입력하세요.'
                                                                    autoComplete="off"
                                                                    className="input_txt text_fill"
                                                                    value={accountHolderName}
                                                                    onChange={(e) => setAccountHolderName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="delivery_check">
                                                        <div className="checkbox_item last">
                                                            <input
                                                                id="check1"
                                                                type="checkbox"
                                                                name=""
                                                                className="blind"
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
                                                                <span className="label_txt">기본 정산 계좌로 설정</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="v-portal" style={{ display: "none" }}></div>

                                                <div className="layer_btn">
                                                    <button
                                                        type="button"
                                                        href="#"
                                                        className="btn_input btn_delete outlinegrey medium"
                                                        onClick={handleModalClose}>
                                                        취소
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={!isFormValid}
                                                        className={`btn_input btn_save solid medium ${isFormValid ? '' : 'disabled'} `}
                                                        onClick={handleSave}
                                                    >
                                                        저장하기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 기본 정산 계좌 */}
                        <div className='my_list'>
                            <div className='basic'>
                                {accounts.slice(0, 1).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`my_item ${defaultId === item.id ? "is_active" : ""}`}
                                        default-mark="기본 정산 계좌"
                                    >
                                        <div className="info_bind">
                                            <div className="address_info">
                                                <div className="name_box">
                                                    <span className="name">{item.bankName}</span>
                                                    <span className="mark">기본 정산 계좌</span>
                                                </div>
                                                <p className="phone">
                                                    {item.accountNumber.split("-").map((part, index) => (
                                                        <span key={index}>
                                                            {part}
                                                            {index < 2 && <span className=""></span>}
                                                        </span>
                                                    ))}
                                                </p>
                                                <div className="address_box">
                                                    <span className="zipcode">{item.accountHolderName}</span>
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
                                {accounts.slice(1).map((item) => (
                                    <div
                                        key={item.id}
                                        className="other_list"
                                    >
                                        <div className={`my_item`}>
                                            <div className="info_bind">
                                                <div className="address_info">
                                                    <div className="name_box">
                                                        <span className="name">{item.bankName}</span>
                                                    </div>
                                                    <p className="phone">
                                                        {item.accountNumber.split("-").map((part, index) => (
                                                            <span key={index}>
                                                                {part}
                                                                {index < 2 && <span className=""></span>}
                                                            </span>
                                                        ))}
                                                    </p>
                                                    <div className="address_box">
                                                        <span className="zipcode">{item.accountHolderName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn_bind">
                                                <a
                                                    href="#"
                                                    className="btn outlinegrey small"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSetDefaultAccount(item.id);
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