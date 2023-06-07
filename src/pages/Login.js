import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { signInWithPopup } from "firebase/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../firebase"; // Replace with your Firebase configuration

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        alert("로그인에 성공했습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log("Google 로그인 실패:", error.message);
      });
  };

  const handleLogout = () => {
    firebase
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
