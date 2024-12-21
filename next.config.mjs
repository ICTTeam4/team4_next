/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  // swcMinify:true,     프론트에서 경로를 요청하면, server로 값이 가게 만드는 파일이라 보면됨.
  async rewrites(){
      return[
        // ,{
        //   // source: "/guestbook/:path*",
        //   // destination: "http://localhost:8080/api/guestbook/:path*",
        // },
      ];
  }
};

export default nextConfig;
