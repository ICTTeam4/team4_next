import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main className="main-content">{children}</main>
      </body>  
    </html>
  );
}
