"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./findpw.css"; // 외부 CSS 파일 임포트

const FindPasswordPage = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    // 페이지 로드 시 포커스를 휴대폰 번호 입력창으로 이동
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 7) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else {
      value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
    }
    setPhone(value);

    // 버튼 활성화 조건 확인
    setIsBtnDisabled(!(value.length === 13 && email));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // 버튼 활성화 조건 확인
    setIsBtnDisabled(!(value && phone.length === 13));
  };

  const handleFindPassword = () => {
    console.log("비밀번호 찾기 실행! 입력한 번호:", phone, "이메일:", email);
    // 실제 로직 추가 가능
  };

  return (
    <div className="background_container">
      <div className="container">
        <div className="paper_card">
          <Typography variant="h4" className="title">
            비밀번호 찾기
          </Typography>
          <hr className="separator" />
          <Typography variant="body2" className="description">
            등록하신 휴대폰 번호와 이메일을 입력하시면, <br />
            휴대폰으로 임시 비밀번호를 전송해 드립니다.
          </Typography>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label className="label">휴대폰 번호</label>
            <TextField
              variant="standard"
              fullWidth
              placeholder="가입하신 휴대폰 번호"
              value={phone}
              onChange={handlePhoneChange}
              inputRef={phoneInputRef}
              className="textField"
            />
            <label className="label">이메일 주소</label>
            <TextField
              variant="standard"
              fullWidth
              placeholder="예) kream@kream.co.kr"
              value={email}
              onChange={handleEmailChange}
              className="textFieldEmail"
            />
            <Button
              variant="contained"
              fullWidth
              disabled={isBtnDisabled}
              onClick={handleFindPassword}
              className={`button ${isBtnDisabled ? "buttonDisabled" : "buttonEnabled"}`}
            >
              문자 발송하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
