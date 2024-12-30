"use client";
import { Button, TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

// zustand store 호출
import useAuthStore from "../../../store/authStore";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const LOCAL_API_BASE_URL = "http://localhost:8080";
  const API_URL = `${LOCAL_API_BASE_URL}/members/login`;
  const router = useRouter(); // useRouter 초기화
  const { login } = useAuthStore(); // zustand login 함수 가져오기


  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 처리
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 요청 처리 -- 토큰 안된 상태. 일반로그인
  const handleLogin = async () => {
    setIsLoading(true); // 로딩 상태 활성화
    try {
      const response = await axios.post(API_URL, credentials); // API 호출
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // JWT 토큰 저장
        alert("일반회원 로그인 성공!");
        login(response.data.data, response.data.token); // Zustand에 사용자 정보 저장
        router.push("/"); // 리디렉션
      } else {
        alert(response.data.message); // 실패 메시지 표시
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

   //로그아웃 처리  -- 현재 안되는거같음..
    const handleLogout = () => {
     localStorage.removeItem("token"); // 토큰 제거
     setIsLoggedIn(false); // 상태 업데이트
    alert("로그아웃되었습니다.");
     window.location.reload(); // 페이지 리로드 또는 라우팅
   };  

// URL 쿼리 파라미터에서 토큰 확인 후 처리
useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  if (token && username && email && name) {
    alert("로그인 성공");
    // 사용자 정보 생성
    const user = {
      username, email, name

    };
    
    login(user, token); // Zustand 상태에 저장
    router.push("/"); // 홈으로 이동
  }
}, [login, router]);


  // 이메일 입력 필드에 대한 참조 생성
  const emailInputRef = useRef(null);

  useEffect(() => {
    // 페이지 로드 시 이메일 입력 필드에 포커스
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // 네이버 로그인
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver";
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
  };

  // 구글 로그인
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src="./images/HY_logo.png"
        alt="Logo"
        style={{ width: "300px", marginBottom: "40px", marginTop: "10px" }}
      />

      <form
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            width: "400px",
            textAlign: "left",
          }}
        >
          이메일 주소
        </label>
        <TextField
          variant="standard"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          type="text"
          placeholder="예) ict@ict.com"
          inputRef={emailInputRef}
          style={{
            width: "400px",
            marginTop: "0px",
            marginBottom: "20px",
            border: "none",
            borderBottom: "1px solid gray",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />

        <label
          style={{
            marginBottom: "20px",
            fontSize: "14px",
            width: "400px",
            textAlign: "left",
          }}
        >
          비밀번호
        </label>
        <TextField
          variant="standard"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          style={{
            width: "400px",
            marginTop: "0px",
            marginBottom: "20px",
            border: "none",
            borderBottom: "1px solid gray",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />

        {/* 로그인 버튼 */}
        <Button
          fullWidth
          variant="contained"
          disabled={!credentials.email || !credentials.password || isLoading}
          onClick={handleLogin}
          style={{
            width: "400px",
            padding: "10px",
            backgroundColor:
              !credentials.email || !credentials.password || isLoading
                ? "lightgray"
                : "#000",
            marginTop: "20px",
            color: "white",
            borderRadius: "5px",
            cursor:
              !credentials.email || !credentials.password || isLoading
                ? "not-allowed"
                : "pointer",
            marginBottom: "20px",
          }}
        >
          {isLoading ? "로그인 중..." : "로그인 버튼"}
        </Button>

        <div
          style={{
            justifyContent: "space-between",
            margin: "10px",
            marginBottom: "40px",
            fontSize: "12px",
            width: "400px",
            display: "flex",
          }}
        >
          <a href="/register" style={{ color: "black" }}>
            회원가입
          </a>
          <a>|</a>
          <a href="/findid" style={{ color: "black" }}>
            아이디 찾기
          </a>
          <a>|</a>
          <a href="/findpw" style={{ color: "black" }}>
            비밀번호 찾기
          </a>
        </div>
        <Button
          type="button"
          onClick={handleNaverLogin}
          style={{
            width: "400px",
            border: "1px solid lightgray",
            backgroundColor: "#fff",
            marginBottom: "10px",
            color: "black",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "110px",
          }}
        >
          <img
            src="./images/HY_naverlogo.png"
            style={{ width: "40px" }}
            alt=""
          />
          네이버로 로그인
        </Button>
        <Button
          type="button"
          onClick={handleKakaoLogin}
          style={{
            width: "400px",
            padding: "10px",
            border: "1px solid lightgray",
            backgroundColor: "#fff",
            marginBottom: "10px",
            color: "black",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "115px",
          }}
        >
          <img
            src="./images/HY_kakaologo.png"
            style={{ width: "30px", paddingLeft: "2px" }}
            alt=""
          />
          카카오로 로그인
        </Button>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            width: "400px",
            padding: "10px",
            border: "1px solid lightgray",
            backgroundColor: "#fff",
            marginBottom: "10px",
            color: "black",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "120px",
          }}
        >
          <img
            src="./images/HY_googlelogo.png"
            style={{ width: "30px", paddingLeft: "2px" }}
            alt=""
          />
          구글로 로그인
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;