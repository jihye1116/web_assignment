import { useState } from "react";
import { fireStore } from "../firebase";

const Login = () => {
  const [user, setUser] = useState(null);

  // Google 로그인 처리 함수
  const handleGoogleLogin = () => {
    const provider = new fireStore.auth.GoogleAuthProvider();
    fireStore
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log("Google 로그인 실패:", error.message);
      });
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    fireStore
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("로그아웃 실패:", error.message);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>로그인 완료!</h2>
          <p>사용자 이름: {user.displayName}</p>
          <p>이메일: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인</h2>
          <button onClick={handleGoogleLogin}>Google 로그인</button>
        </div>
      )}
    </div>
  );
};

export default Login;
