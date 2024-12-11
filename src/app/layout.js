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
        이용약관
      </footer>
      </body>
    </html>
  );
}
