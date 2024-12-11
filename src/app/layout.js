import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  style={{ textAlign: "center" }}>
      <header>
        헤더를 넣어주세요!
      </header>
        {children}
      <footer>
        푸터를 넣어주세요!
      </footer>
      </body>
    </html>
  );
}
