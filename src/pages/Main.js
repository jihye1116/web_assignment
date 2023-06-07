import { useState } from "react";
import { fireStore, authService } from "../firebase"; // firebase.js 파일의 경로에 맞게 수정하세요.
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Main = () => {
  const [user, setUser] = useState(null);

  // Firebase Google 로그인
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

  // Firebase 로그아웃
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

  return (
    <div>
      {user ? (
        <div>
          <h2>유저 프로필</h2>
          <p>이름: {user.displayName}</p>
          <p>이메일: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Google 로그인</button>
      )}
    </div>
  );
};

export default Main;
