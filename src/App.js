import { useEffect } from "react";
import { fireStore, app } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Post from "./pages/Post";
import Write from "./pages/Write";

function App() {
  useEffect(() => {
    console.log(fireStore);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
