"use client"
import { Button, TextField } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

const LoginPage = () => {

  //텍스트필드 초기화
  const initUvo = {
    m_id: "",
    m_pw: ""
  };

  const [uvo, setUvo] = useState(initUvo);
  const isBtnChk = !uvo.m_id || !uvo.m_pw;

  // 이메일 입력 필드에 대한 참조 생성
  const emailInputRef = useRef(null);

  useEffect(() => {
    // 페이지 로드 시 이메일 입력 필드에 포커스
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  function changeUvo(e) {
    const { name, value } = e.target;
    setUvo(prev => ({
      ...prev, [name]: value
    }));
  }
  function handleKeyDown(e) {
    if (!isBtnChk && e.key === "Enter") {
      // 로그인 버튼 동작 처리
      handleLogin();
    }
  }

  function handleLogin() {
    console.log("로그인 버튼 클릭됨!");
    // 로그인 로직 추가
  }

  return (
    <div style={{ textAlign: 'center' }}>

      <img src="./images/HY_logo.png" alt="Logo" style={{ width: '300px', marginBottom: '40px', marginTop:'10px'}} />

    <form style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  onKeyDown={handleKeyDown}>{ /* 폼 전체에 키 이벤트 추가 */}
        <label style={{ marginBottom: '20px', fontSize: '14px', width: '400px', textAlign: 'left' }}>
          이메일 주소</label>
        <TextField variant="standard"
          name='m_id'
          value={uvo.m_id}
          onChange={changeUvo}
          type="email"
          placeholder="예) ict@ict.com"
          inputRef={emailInputRef} // 참조 연결
          style={{
            width: '400px',
            marginTop: '0px',
            marginBottom: '20px',
            border: 'none',
            borderBottom: '1px solid gray',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
        />

        <label style={{ marginBottom: '20px', fontSize: '14px', width: '400px', textAlign: 'left' }}>
          비밀번호  </label>
        <TextField variant="standard"
          name='m_pw'
          value={uvo.m_pw}
          onChange={changeUvo}
          type="password"
          style={{
            width: '400px',
            marginTop: '0px',
            marginBottom: '20px',
            border: 'none',
            borderBottom: '1px solid gray',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
        />

        <Button
          fullWidth variant='contained'
          disabled={isBtnChk}
          onClick={handleLogin} // 로그인 버튼 클릭 처리
          style={{
            width: '400px',
            padding: '10px',
            backgroundColor: isBtnChk ? 'lightgray' : '#000',
            marginTop: '20px',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          로그인 버튼
        </Button>
        <div style={{ justifyContent: 'space-between', margin: '10px', marginBottom: '40px', fontSize: '12px', width: '400px', display: 'flex' }}>
          <a href="/register" style={{ color: 'black' }}>회원가입</a>
          <a>|</a>
          <a href="/findid" style={{ color: 'black' }}>아이디 찾기</a>
          <a>|</a>
          <a href="/findpw" style={{ color: 'black' }}>비밀번호 찾기</a>
        </div>
        <Button
          type="button"
          style={{
            width: '400px',
            border: '1px solid lightgray',
            backgroundColor: '#fff',
            marginBottom: '10px',
            color: "black",
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // 수직 정렬
            justifyContent: 'flex-start', // 로고는 왼쪽, 텍스트는 중앙
            gap: '110px', // 로고와 텍스트 간격
          }}
        >
          <img src="./images/HY_naverlogo.png" style={{ width: '40px' }} alt="" />
          네이버로 로그인
        </Button>
        <Button
          type="button"
          style={{
            width: '400px',
            padding: '10px',
            border: '1px solid lightgray',
            backgroundColor: '#fff',
            marginBottom: '10px',
            color: "black",
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // 수직 정렬
            justifyContent: 'flex-start', // 로고는 왼쪽, 텍스트는 중앙
            gap: '115px', // 로고와 텍스트 간격
          }}
        >
          <img src="./images/HY_kakaologo.png" style={{ width: '30px', paddingLeft: '2px' }} alt="" />
          카카오로 로그인
        </Button>
        <Button
          type="button"
          style={{
            width: '400px',
            padding: '10px',
            border: '1px solid lightgray',
            backgroundColor: '#fff',
            marginBottom: '10px',
            color: "black",
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center', // 수직 정렬
            justifyContent: 'flex-start', // 로고는 왼쪽, 텍스트는 중앙
            gap: '120px', // 로고와 텍스트 간격
          }}
        >
          <img src="./images/HY_googlelogo.png" style={{ width: '30px', paddingLeft: '2px' }} alt="" />
          구글로 로그인
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
