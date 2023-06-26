import { useEffect, useState } from "react";
import { fireStore, app, authService } from "./firebase";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import * as S from "./style";
import GlobalStyle from "./style";

import Main from "./pages/Main/Main";
import Post from "./pages/Post/Post";
import Write from "./pages/Write";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function App() {
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
    <BrowserRouter>
      <GlobalStyle />

      <S.Header>
        <S.HeaderTop>
          <div>
            {/* <img src="" alt="로고" /> */}
            <S.LogoText>로고</S.LogoText>
          </div>

          {user ? (
            <>
              <S.User>
                {/* <span>{user.displayName}</span> */}
                <S.LoginButton onClick={handleLogout}>로그아웃</S.LoginButton>
              </S.User>
            </>
          ) : (
            <S.LoginButton onClick={handleGoogleLogin}>로그인</S.LoginButton>
          )}
        </S.HeaderTop>
        <S.HeaderBottom>
          <S.headerItem isActive={activePage === "recent"}>
            <Link
              to={`/`}
              onClick={() => {
                setActivePage("recent");
              }}
            >
              최근
            </Link>
          </S.headerItem>
          <S.headerItem isActive={activePage === "popular"}>
            <Link
              to={`/write`}
              onClick={() => {
                setActivePage("popular");
              }}
            >
              주간 인기
            </Link>
          </S.headerItem>
        </S.HeaderBottom>
      </S.Header>

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
