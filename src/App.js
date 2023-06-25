import { useEffect, useState } from "react";
import { fireStore, app, authService } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import * as S from "./style";

import Main from "./pages/Main/Main";
import Post from "./pages/Post";
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

  return (
    <BrowserRouter>
      <S.Header>
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
          <S.LoginButton onClick={handleGoogleLogin}>
            Google 로그인
          </S.LoginButton>
        )}
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
