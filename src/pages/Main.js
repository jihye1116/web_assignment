import { useEffect, useState } from "react";
import { db, authService } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

    console.log(posts);
  }, []);

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

  return (
    <div>
      {user ? (
        <>
          <div>
            <h2>유저 프로필</h2>
            <p>이름: {user.displayName}</p>
            <p>이메일: {user.email}</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </>
      ) : (
        <button onClick={handleGoogleLogin}>Google 로그인</button>
      )}
      <div>
        <h1>글 목록</h1>
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
