import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
    persist(
        (set) => ({
            user: null, // 빈 객체로 초기화
            token: null, // JWT 토큰
            isAuthenticated: false, // 로그인 여부

            // 로그인 처리
            login: (user, token) => {
                if (user && token) {
                    console.log("로그인 상태 업데이트:", user, token);
                    set({ user, token, isAuthenticated: true });
                } else {
                    console.error("로그인 데이터가 유효하지 않습니다.");
                }
            },

            // 로그아웃 처리
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });

                // 추가로 로컬 스토리지에서 삭제 (보안 강화)
                localStorage.removeItem("auth-storage");
            },

            // 상태를 초기화하는 기능 추가
            reset: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            searchKeyword: '',
            resetKeyword: () => {
                set({ searchKeyword: '' });
                localStorage.removeItem("auth-storage");
            },
            setKeyword: (word) => {
                set({ searchKeyword: word });
            },
            isNotibarActive: false,
            setIsNotibarActive: () => {
                set((state) => ({ isNotibarActive: !state.isNotibarActive }));
            },
        }),
        {
            name: "auth-storage", // 로컬스토리지 키 이름
            getStorage: () => localStorage, // 로컬스토리지 사용
        }
    )
);

// const useAuthStore = create(
//     persist(
//         (set) => ({
//             user: null, // 초기 상태를 null로 설정
//             token: null, // JWT 토큰
//             isAuthenticated: false, // 로그인 여부

//             // 로그인 처리
//             login: (user, token) => {
//                 if (user && token) {
//                     console.log("로그인 상태 업데이트:", user, token);
//                     set({ user, token, isAuthenticated: true });
//                 } else {
//                     console.error("로그인 데이터가 유효하지 않습니다.");
//                 }
//             },

//             // 로그아웃 처리
//             logout: () => {
//                 set({ user: null, token: null, isAuthenticated: false });
//                 localStorage.removeItem("auth-storage"); // 로컬스토리지 초기화
//             },

//             reset: () => {
//                 set({ user: null, token: null, isAuthenticated: false });
//             },
//         }),
//         {
//             name: "auth-storage", // 로컬스토리지 키 이름
//             getStorage: () => localStorage, // 로컬스토리지 사용
//         }
//     )
// );




export default useAuthStore;