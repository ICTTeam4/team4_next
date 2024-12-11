import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  style={{ textAlign: "center" }}>
      <header>
      <Link href={"/Register"}>회원가입</Link>
      </header>
        {children}
      <footer>
        푸터를 넣어주세요!
      </footer>
      </body>
    </html>
  );
}
