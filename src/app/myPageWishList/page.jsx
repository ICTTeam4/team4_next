"use client";
import { usePathname } from "next/navigation";
import MyPageSideNav from "../components/MyPageSideNav";
import "./myPageWishList.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../../store/authStore";

function Page() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [activeFilter, setActiveFilter] = useState("찜 한 상품"); // 초기 필터 설정
  const [items, setItems] = useState([]);
  const [member_id, setMember_id] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]); // 초기값 빈 배열
  const [totalItems, setTotalItems] = useState(0);

  // 사용자 ID 설정
  useEffect(() => {
    if (user?.member_id) {
      console.log("AuthStore에서 가져온 user:", user);
      setMember_id(user.member_id);
    } else {
      console.log("AuthStore에서 user 정보가 없습니다.");
    }
  }, [user]);

  // 찜 리스트 불러오기
  useEffect(() => {
    if (!user?.member_id) {
      console.log("member_id가 없습니다. 로그인 필요.");
      return;
    }
  
    console.log("member_id 확인:", user.member_id);
  
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/wishlist/list", {
          params: { memberId: user.member_id },
        });
  
        console.log("API 응답 데이터:", response.data);
  
        // 응답 데이터가 배열인지 확인
        const wishlistData = response.data;
        // console.log("Wishlist 응답 데이터:", wishlistData);
        
        if (Array.isArray(wishlistData) && wishlistData.length > 0) {
          const wishlist = wishlistData.map((item) => ({
            ...item,
            category: "찜 한 상품", // 기본 카테고리 추가
          }));
  
          console.log("Wishlist 데이터 (생성 후):", wishlist);
          setItems(wishlist);
        } else {
          console.log("Wishlist 데이터가 비어 있습니다.");
          setItems([]); // 데이터가 없으면 빈 배열로 설정
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
        setItems([]); // 오류 발생 시 빈 배열로 설정
      }
    };
  
    fetchWishlist();
  }, [user?.member_id]);
//     try {
//       // 실제 API 호출 대신 테스트 데이터를 사용
//       const response = {
//         data: {
//           data: [
//             { pwr_id: 76, member_id: '44', created_at: '2025-01-07', fileList: [{ fileName: 'example.png' }] },
//           ],
//         },
//       };

//       console.log("API 응답 데이터 (테스트):", response.data);

//       const wishlist = Array.isArray(response.data?.data)
//         ? response.data.data.map((item) => ({
//             ...item,
//             category: "찜 한 상품", // 기본 카테고리 추가
//           }))
//         : [];

//       console.log("Wishlist 데이터:", wishlist);
//       setItems(wishlist);
//     } catch (error) {
//       console.error("API 요청 실패:", error);
//       setItems([]);
//     }
//   };

//   fetchWishlist();
// }, [user?.member_id]);
  

  // items 업데이트 후 filteredItems 업데이트
  useEffect(() => {
    console.log("items 상태 업데이트:", items);
  
    if (items.length > 0) {
      const filtered = items.filter((item) => item.category === activeFilter);
      console.log("필터링된 데이터:", filtered);
  
      setFilteredItems(filtered);
      setTotalItems(filtered.length);
    } else {
      console.log("items가 비어 있습니다.");
      setFilteredItems([]);
      setTotalItems(0);
    }
  }, [items, activeFilter]);

  // 찜 삭제 처리
  const handleDeleteItem = async (pwr_id) => {
    if (!member_id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.delete("http://localhost:8080/api/wishlist/delete", {
        data: { member_id, pwr_id },
        headers: { "Content-Type": "application/json" },
      });

      setItems((prevItems) => prevItems.filter((item) => item.pwr_id !== pwr_id));
      alert("찜한 상품이 삭제되었습니다.");
    } catch (error) {
      console.error("찜한 상품 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="myPageWishList">
      <div className="container my lg">
        <MyPageSideNav currentPath={pathname} />
        <div className="content_area my-page-content">
          <div className="content_title border">
            <div className="title">
              <h3>관심</h3>
            </div>
          </div>
          <div className="saved-chips-container">
            <div className="filter_chip_group filter_group bubble">
              {["찜 한 상품", "최근 본 상품"].map((filter) => (
                <label key={filter} className="bubble">
                  <input
                    type="radio"
                    className="input blind"
                    value={filter}
                    checked={activeFilter === filter}
                    onChange={() => setActiveFilter(filter)}
                  />
                  <div>
                    <button
                      className={`filter_button line ${
                        activeFilter === filter ? "active" : ""
                      }`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      <p className="text-group">
                        <span className="title">{filter}</span>
                        <span className="num">
                          {items.filter((item) => item.category === filter).length || 0}
                        </span>
                      </p>
                    </button>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="saved-product">
            <div>
              <div>
                <div className="my_interest">
                  <div className="content-header">
                    <div className="total-rows">전체 {totalItems}</div>
                  </div>
                </div>
                <div>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.pwr_id}
                        className="purchase_list_display_item"
                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                      >
                        <a href="#">
                          <div className="purchase_list_product">
                            <div className="list_item_img_wrap">
                              <img
                                alt="product_img"
                                src={`http://localhost:8080/images/${
                                  item.fileList?.[0]?.fileName || "default-image.png"
                                }`}
                                className="list_item_img"
                                style={{ backgroundColor: "rgb(244, 244, 244)" }}
                              />
                            </div>
                            <div className="list_item_title_wrap">
                              <p className="list_item_price">
                                {item.sell_price}원
                              </p>
                              <p className="list_item_title">{item.title}</p>
                            </div>
                          </div>
                        </a>
                        <p
                          className="text-lookup last_description display_paragraph action_named_action wish_delete"
                          onClick={() => handleDeleteItem(item.pwr_id)}
                          style={{ cursor: "pointer" }}
                        >
                          삭제
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>찜한 상품이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
