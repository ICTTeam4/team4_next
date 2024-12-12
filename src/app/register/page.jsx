"use client"
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Terms from './Terms';
import MarketingPolicy from './MarketingPolicy';
import PrivacyPolicy from './PrivacyPolicy';

const RegisterPage = () => {

  const initUser = {
    nickname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };

  const [user, setUser] = useState(initUser);
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    optionalPrivacy: false,
    optionalMarketing: false
  });

  const isRegisterDisabled = !user.nickname || !user.email || !user.phone || !user.password || user.password !== user.confirmPassword || !agreements.age || !agreements.terms || !agreements.privacy;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 3) {
      value = value;
    } else if (value.length <= 7) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else {
      value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
    }
    setUser(prev => ({ ...prev, phone: value }));
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      setAgreements({
        all: checked,
        age: checked,
        terms: checked,
        privacy: checked,
        optionalPrivacy: checked,
        optionalMarketing: checked
      });
    } else {
      setAgreements(prev => ({
        ...prev,
        [name]: checked,
        all: false
      }));
    }
  };

  const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
  const [openMarketingPolicy, setOpenMarketingPolicy] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);


  return (
    <div>
      여기는 회원가입입니다.
    </div>
  );
}

export default page;