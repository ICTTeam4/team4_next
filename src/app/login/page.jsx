"use client";
import { createTheme, ThemeProvider, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import styles from './login.module.css'; // CSS 모듈 import
import './login.css';

const LoginPage = () => {
  const initUvo = {
    m_id: "",
    m_pw: ""
  };

  const [uvo, setUvo] = useState(initUvo);
  const isBtnChk = !uvo.m_id || !uvo.m_pw;

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

                <button type="button" className={`${styles.snsLoginButton} ${styles.snsLoginButtonNaver}`}>
                  <img src="./images/HY_naverlogo.png" alt="" />
                  네이버로 로그인
                </button>

                <button type="button" className={`${styles.snsLoginButton} ${styles.snsLoginButtonKakao}`}>
                  <img src="./images/HY_kakaologo.png" alt="" />
                  카카오로 로그인
                </button>

                <button type="button" className={`${styles.snsLoginButton} ${styles.snsLoginButtonGoogle}`}>
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
