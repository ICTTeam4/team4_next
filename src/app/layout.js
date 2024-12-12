"use client"

import Link from "next/link";
import './globals.css'
import { Stack } from "@mui/material";

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body style={{ textAlign: "center" }}>
       <Link href="/"><img src="../images/HY_logo.png" alt="Logo" style={{ width: '300px', marginBottom: '40px' }} /></Link>
        <nav>
          <Stack direction="row" spacing={2} justifyContent="center" >
            <Link href={"/kakaoPay"}>카카오페이 연습</Link>
            <Link href={"/portOneKakao"}>포트원-카카오페이 연습</Link>
            <Link href={"/naverPay"}>네이버페이 연습</Link>
            <Link href={"/tossPay"}>토스페이 연습</Link>
            <Link href={"/login"}>로그인</Link>
            <Link href={"/support"}>고객센터</Link>
          </Stack>
        </nav>
        <hr />
        {children}
        <hr />
      </body>
    </html>
  );
}
