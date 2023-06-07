import { useEffect } from "react";
import { fireStore, app } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Post from "./pages/Post";

function App() {
  useEffect(() => {
    console.log(fireStore);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/post/:id" component={<Post />}></Route>
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
