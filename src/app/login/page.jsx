"use client";
import { createTheme, ThemeProvider, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import styles from './login.module.css'; // CSS 모듈 import
import './login.css';


// zustand store 호출
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/navigation';

const LoginPage = () => {



  const LOCAL_API_BASE_URL = 'http://localhost:8080/';
  const API_URL = `${LOCAL_API_BASE_URL}/login/login`;
  const router = useRouter(); // useRouter 초기화
  const { login } = useAuthStore(); // zustand login 함수 가져오기 

  //텍스트필드 초기화
  const initUvo = {
    m_id: "",
    m_pw: ""
  };

  const [uvo, setUvo] = useState(initUvo);
  const isBtnChk = !uvo.m_id || !uvo.m_pw;

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

  function changeUvo(e) {
    const { name, value } = e.target;
    setUvo(prev => ({
      ...prev, [name]: value
    }));
  }

  function goServer(params) {
    axios.post(API_URL, uvo)
      .then(response => {
        const data = response.data;
        if (data.success) {
          alert(data.message);
          login(data.data, data.token);
          router.push('/');
        } else {
          alert(data.message);
          setUvo(initUvo);
        }
      });
  }

  // 이메일 입력 필드에 대한 참조 생성
  const emailInputRef = useRef(null);

  useEffect(() => {
    // 상태 초기화 및 포커스 설정
    setUvo(initUvo);
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  function changeUvo(e) {
    const { name, value } = e.target;
    setUvo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleKeyDown(e) {
    if (!isBtnChk && e.key === "Enter") {
      handleLogin();
    }
  }

  function handleLogin() {
    console.log("로그인 버튼 클릭됨!");
    // 로그인 로직 추가
  }

  if (!uvo) {
    return <div>로딩 중...</div>; // 상태 초기화 중 로딩 표시
  }

// TextField 커스텀
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottom: '2px solid #ccc', // 비활성 상태의 border
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #000000', // 호버 상태의 border
          },
          '& .MuiInput-underline:after': {
            borderBottom: '3px solid #000000', // 포커스 상태의 border
          },
        },
      },
    },
  },
});
  //네이버 로그인
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
    <div className="background_container">
      <div className="all_container">
        <div className="paper_card">
          <div className={styles.container}>
            <div className={styles.maxwidth_contain}>
              <img src="./images/HY_logo.png" alt="Logo" className={styles.logo} />
              <form className={styles.formContainer} onKeyDown={handleKeyDown}>
                <label className={styles.label}>이메일 주소</label>
                <ThemeProvider  theme={theme}>
                <TextField
                  variant="standard"
                  name="m_id"
                  value={uvo.m_id}
                  onChange={changeUvo}
                  type="email"
                  placeholder="예) ict@ict.com"
                  inputRef={emailInputRef}
                  className={styles.textField}
                />
                </ThemeProvider>
                <label className={styles.label}>비밀번호</label>
                <ThemeProvider  theme={theme}>
                <TextField
                  variant="standard"
                  name="m_pw"
                  value={uvo.m_pw}
                  onChange={changeUvo}
                  type="password"
                  className={styles.textField}
                />
                </ThemeProvider>

                <button
                  fullWidth
                  variant="contained"
                  disabled={isBtnChk}
                  onClick={handleLogin}
                  className={isBtnChk ? `${styles.loginButton} ${styles.loginButtonDisabled}` : styles.loginButton}
                >
                  로그인 버튼
                </button>

                <div className={styles.linkContainer}>
                  <a href="/register" className={styles.link}>회원가입</a>
                  <a>|</a>
                  <a href="/findid" className={styles.link}>아이디 찾기</a>
                  <a>|</a>
                  <a href="/findpw" className={styles.link}>비밀번호 찾기</a>
                </div>
                <button 
                type="button" 
                className={`${styles.snsLoginButton} ${styles.snsLoginButtonNaver}`}
                onClick={handleNaverLogin} // 클릭 시 로그인 처리 함수 호출
                >
                  <img src="./images/HY_naverlogo.png" alt="" />
                  네이버로 로그인
                </button>

                <button 
                type="button" 
                className={`${styles.snsLoginButton} ${styles.snsLoginButtonKakao}`}
                onClick={handleKakaoLogin} // 클릭 시 로그인 처리 함수 호출
                >
                  <img src="./images/HY_kakaologo.png" alt="" />
                  카카오로 로그인
                </button>

                <button type="button" className={`${styles.snsLoginButton} ${styles.snsLoginButtonGoogle}`}
                onClick={handleGoogleLogin} // 클릭 시 로그인 처리 함수 호출
                >
                  <img src="./images/HY_googlelogo.png" alt="" />
                  구글로 로그인
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LoginPage;
