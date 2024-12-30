"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./findid.css"; // 외부 CSS 파일 임포트

const FindEmailPage = () => {
  const [phone, setPhone] = useState("");
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
    setIsBtnDisabled(value.length < 13); // 13자리가 되어야 버튼 활성화
  };

  const handleFindEmail = () => {
    console.log("이메일 아이디 찾기 실행! 입력한 번호:", phone);
    // 실제 로직 추가 가능
  };

  return (
    <div className="background_container">
      <div className="container">
        <div className="paper_card">
      <Typography variant="h4" className="title">
        이메일 아이디 찾기
      </Typography>
      <hr className="separator" />
      <Typography variant="body2" className="description">
        등록하신 휴대폰 번호를 입력하면 <br />
        이메일 주소의 일부를 알려드립니다.
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
        <Button
          variant="contained"
          fullWidth
          disabled={isBtnDisabled}
          onClick={handleFindEmail}
          className={`button ${isBtnDisabled ? "buttonDisabled" : "buttonEnabled"}`}
        >
          이메일 아이디 찾기
        </Button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default FindEmailPage;
