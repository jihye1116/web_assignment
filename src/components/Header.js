import { useEffect, useState } from "react";
import { fireStore, app, authService } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    authService
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(fireStore);
  });

  const [activePage, setActivePage] = useState("recent");

  useEffect(() => {
    console.log(activePage, "???");
  }, [activePage]);

  return (
    <HeaderBox>
      <HeaderTop>
        <div>
          {/* <img src="" alt="로고" /> */}
          <LogoText>로고</LogoText>
        </div>

        {user ? (
          <>
            <User>
              {/* <span>{user.displayName}</span> */}
              <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            </User>
          </>
        ) : (
          <LoginButton onClick={handleGoogleLogin}>로그인</LoginButton>
        )}
      </HeaderTop>
      <HeaderBottom>
        <div style={{ display: "flex" }}>
          <HeaderItem isActive={activePage === "recent"}>
            <Link
              to={`/`}
              onClick={() => {
                setActivePage("recent");
              }}
            >
              최근
            </Link>
          </HeaderItem>
          <HeaderItem isActive={activePage === "popular"}>
            <Link
              to={`/popular`}
              onClick={() => {
                setActivePage("popular");
              }}
            >
              인기
            </Link>
          </HeaderItem>
        </div>

        <Link to={`/write`}>
          <WriteButton>시 쓰기</WriteButton>
        </Link>
      </HeaderBottom>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  background-color: white;
`;

const HeaderTop = styled.div`
  height: 100px;

  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  margin: auto 20%;

  font-family: "GmarketSansTTFMedium";
`;

const HeaderBottom = styled.div`
  margin: auto 20%;
  display: flex;
  font-family: "GmarketSansTTFMedium";

  justify-content: space-between;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderItem = styled.div`
  padding: 15px 25px;
  font-weight: 600;
  font-size: 15px;
  border-bottom: ${(props) => (props.isActive ? "2px solid #0b53e4" : "none")};

  cursor: pointer;
`;

const WriteButton = styled.button`
  align-items: center;
  margin-top: 7px;

  font-family: "GmarketSansTTFMedium";
  background-color: #0b53e4;
  color: white;
  padding: 5px 5px;
  height: 40px;
  width: 80px;
  border: none;
  border-radius: 5px;

  font-weight: 600;
  font-size: 15px;

  cursor: pointer;
`;

const LogoText = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: black;
`;

const LoginButton = styled.button`
  color: black;
  border: none;
  height: 50px;
  font-size: 20px;
  font-weight: 600;

  background-color: inherit;
  cursor: pointer;

  font-family: "GmarketSansTTFMedium";
`;

const User = styled.div`
  color: black;
  font-size: 20px;
  background-color: inherit;
`;
