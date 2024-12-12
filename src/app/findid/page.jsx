"use client";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

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
    <div style={{ textAlign: "center", padding: "50px 20px" }}>
      <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "10px" }}>
        이메일 아이디 찾기
      </Typography>
      <hr style={{ border: "none", borderTop: "2px solid #000", margin: "10px auto 20px", width: "400px" }} />
      <Typography variant="body2" style={{ color: "#555", marginBottom: "30px" }}>
        가입 시 등록한 휴대폰 번호를 입력하면 <br />
        이메일 주소의 일부를 알려드립니다.
      </Typography>
      <form style={{ display: "inline-block", textAlign: "left", width: "300px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
          휴대폰 번호
        </label>
        <TextField
          variant="standard"
          fullWidth
          placeholder="가입하신 휴대폰 번호"
          value={phone}
          onChange={handlePhoneChange}
          inputRef={phoneInputRef}
          style={{
            marginBottom: "30px",
          }}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={isBtnDisabled}
          onClick={handleFindEmail}
          style={{
            padding: "10px",
            backgroundColor: isBtnDisabled ? "lightgray" : "#000",
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          이메일 아이디 찾기
        </Button>
      </form>
    </div>
  );
};

export default FindEmailPage;
