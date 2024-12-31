"use client";
import { usePathname } from "next/navigation";
import MyPageSideNav from "../components/MyPageSideNav";
import "./myPageLoginInfo.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import useAuthStore from "../../../store/authStore";
import axios from "axios";

function Page(props) {
    const pathname = usePathname();
    const { user, login } = useAuthStore(); // Zustand에서 사용자 정보 가져오기
    const [phone, setPhone] = useState(""); // 휴대폰 번호 상태 관리
    const [oldPassword, setOldPassword] = useState(""); // 이전 비밀번호
    const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호
    const [authCode, setAuthCode] = useState(""); // 인증번호 입력값
    const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 인증 완료 여부
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [isActive, setIsActive] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false); // 에러 상태 추가
    const [passwordMessage, setPasswordMessage] = useState(""); // 비밀번호 검증 메시지
    const [showNewPassword, setShowNewPassword] = useState(false); // 새로운 비밀번호 보이기 상태

    const handlePasswordChange = async (value) => {
        setOldPassword(value); // 입력값 상태 업데이트

        if (!value) {
            setPasswordMessage(""); // 초기화
            setIsPasswordError(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/members/check-password", {
                email: user.email,
                oldPassword: value,
            });

            if (response.data) {
                setIsPasswordError(false);
                setPasswordMessage("비밀번호가 확인되었습니다."); // 성공 메시지
            } else {
                setIsPasswordError(true);
                setPasswordMessage("비밀번호가 일치하지 않습니다."); // 에러 메시지
            }
        } catch (error) {
            console.error("비밀번호 확인 오류:", error);
            setIsPasswordError(true);
            setPasswordMessage("서버 오류로 요청이 실패했습니다."); // 서버 오류 메시지
        }
    };

    const toggleSwitch = () => {
        setIsActive(!isActive);
    };

    // 회원 정보 가져오기(폰번)
    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                if (user?.email) {
                    const response = await axios.get(`http://localhost:8080/members/userInfo`, {
                        params: { email: user.email }, // 쿼리 파라미터로 이메일 전달
                    });
                    if (response.data) {
                        setPhone(response.data.tel_no); // 휴대폰 번호 업데이트
                        login({
                            ...user,
                            phone: response.data.tel_no,
                        });
                    }
                }
            } catch (error) {
                console.error("회원 정보를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchMemberInfo();
    }, [user?.email, login]);

    // 휴대폰 번호 형식화 함수
    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 7) {
            value = value.slice(0, 3) + "-" + value.slice(3);
        } else {
            value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
        }
        setPhone(value); // 휴대폰 번호 상태 업데이트
    };

    // 휴대폰 인증 요청
    const handleSendPhoneAuth = async () => {
        if (!phone) {
            alert("휴대전화 번호를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/members/send-phone-auth`, null, {
                params: { phone },
            });
            alert(response.data.message); // 성공 메시지 표시
        } catch (error) {
            console.error("휴대폰 인증 요청 오류:", error);
            alert("휴대폰 인증 요청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 인증번호 확인
    const handleVerifyPhoneAuth = async () => {
        if (!authCode) {
            alert("인증번호를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/members/verify-phone-auth`, null, {
                params: { phone, code: authCode },
            });
            alert(response.data.message);
            setIsPhoneVerified(true); // 인증 성공
        } catch (error) {
            console.error("인증번호 검증 오류:", error);
            alert("인증번호 검증에 실패했습니다. 다시 시도해주세요.");
            setIsPhoneVerified(false); // 인증 실패
        }
    };

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="myPageLoginInfo">
            <div className="container my lg">
                <MyPageSideNav currentPath={pathname} />
                <div className="content_area my-page-content">
                    <div className="my_profile">
                        <div className="content_title border">
                            <div className="main_title">
                                <h3>로그인 정보</h3>
                            </div>
                        </div>
                        {/* 타이틀 끝 */}
                        <div className="profile_info">
                            <div className="profile_group first">
                                <h4 className="group_title">내 계정</h4>
                                <div className="unit">
                                    <h5 className="title">이메일 주소</h5>
                                    <div className="unit_content">
                                        <p className="desc email">{user?.email || "정보 없음"}</p>
                                        <button type="button" className="btn btn_modify outlinegrey small">
                                            변경불가
                                        </button>
                                    </div>
                                </div>

                                <div className="unit">
                                    <h5 className="title">비밀번호</h5>
                                    <div className="unit_content">
                                        <input
                                            type="password"
                                            placeholder="이전 비밀번호"
                                            value={oldPassword}
                                            onChange={(e) => handlePasswordChange(e.target.value)} // 입력 시마다 호출
                                            className={`desc password ${isPasswordError ? "input-error" : ""}`}
                                        />

                                        <div className="unit_content" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <input
                                                type={showNewPassword ? "text" : "password"} // 보이기 상태에 따라 타입 변경
                                                placeholder="새로운 비밀번호"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)} // 새로운 비밀번호 업데이트
                                                className="desc password"
                                                style={{ flex: 1 }} // 입력 필드가 줄 안에서 여유롭게 차지하도록 설정
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)} // 상태 토글
                                                className="btn btn_modify outlinegrey small"
                                                style={{ whiteSpace: "nowrap" }} // 텍스트 줄바꿈 방지
                                            >
                                                {showNewPassword ? "숨기기" : "보기"}
                                            </button>

                                        </div>
                                        <div style={{ alignSelf: "flex-end",marginTop:'50px' }}> {/* 버튼을 오른쪽 정렬 */}
                                            <div style={{ alignSelf: "flex-end" }}> {/* 버튼을 오른쪽 정렬 */}
                                                <button
                                                    type="button"
                                                    className="btn btn_modify outlinegrey small"
                                                    onClick={() => {
                                                        if (newPassword.trim()) {
                                                            const userConfirmed = window.confirm(`새로운 비밀번호: ${newPassword}\n변경하시겠습니까?`);
                                                            if (userConfirmed) {
                                                                // 확인을 눌렀을 때의 동작
                                                                alert("비밀번호가 성공적으로 변경되었습니다.");
                                                            } else {
                                                                // 취소를 눌렀을 때의 동작
                                                                alert("비밀번호 변경이 취소되었습니다.");
                                                            }
                                                        } else {
                                                            alert("새로운 비밀번호를 입력하세요.");
                                                        }
                                                    }}
                                                >
                                                    저장
                                                </button>
                                            </div>
                                         
                                        </div>
                                    </div>
                                       {/* 메시지 표시 */}
                                       {passwordMessage && (
                                                <p
                                                    style={{
                                                        color: isPasswordError ? "red" : "green",
                                                        marginTop: "5px", // 메시지가 입력 필드 바로 아래에 위치
                                                        fontSize: "14px", // 메시지의 글꼴 크기
                                                    }}
                                                >
                                                    {passwordMessage}
                                                </p>
                                            )}
                                </div>
                            </div>
                            <div className="profile_group">
                                <h4 className="group_title">개인 정보</h4>
                                <div className="unit">
                                    <h5 className="title">휴대폰 번호</h5>
                                    <div className="unit_content">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={handlePhoneChange} // 하이픈 추가 처리
                                            className="desc"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn_modify outlinegrey small"
                                            onClick={handleSendPhoneAuth}
                                            disabled={isPhoneVerified} // 인증 완료 시 비활성화
                                        >
                                            인증 요청
                                        </button>
                                    </div>
                                    {/* 인증번호 입력 및 확인 */}
                                    <div className="unit_content" style={{ marginTop: "10px" }}>
                                        <input
                                            type="text"
                                            value={authCode}
                                            onChange={(e) => setAuthCode(e.target.value)}
                                            placeholder="인증번호 입력"
                                            disabled={!phone}
                                            className="desc"
                                        />   <button
                                            type="button"
                                            className="btn btn_modify outlinegrey small"
                                            onClick={handleVerifyPhoneAuth}
                                            disabled={!phone || isPhoneVerified} // 인증 완료 시 비활성화
                                        >
                                            인증 확인
                                        </button>

                                    </div>
                                    {/* 번호 수정 */}
                                    {isPhoneVerified && (
                                        <div className="unit_content" style={{ marginTop: "25px" }}>
                                            <button
                                                type="button"
                                                className="btn btn_modify outlinegrey small"
                                                onClick={() => alert("번호 수정은 추후에 가능합니다.")}
                                            >
                                                번호 수정
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="profile_group">
                                <h4 className="group_title">광고성 정보 수신</h4>
                                <div className="unit unit--toggle" style={{ paddingBottom: "8px" }}>
                                    <div className="unit_content">
                                        <p className="desc my-profile__term-desc">
                                            <span>개인 정보 수집 및 이용 동의</span>
                                            <button type="button" className="btn">
                                                내용보기
                                            </button>
                                        </p>
                                        <div
                                            className={`base-switch ${isActive ? "is-active" : ""}`}
                                            onClick={toggleSwitch}
                                            style={{
                                                "--75b83bce": "#e4e4e4",
                                                "--30d0adec": "#fff",
                                                "--6d656928": "#222222",
                                            }}
                                        >
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/myPageLoginInfoWithdrawal" className="btn_withdrawal">
                                회원 탈퇴
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
