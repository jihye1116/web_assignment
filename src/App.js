import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import * as S from "./style";
import GlobalStyle from "./style";

import Main from "./pages/Main";
import Post from "./pages/Post";
import Write from "./pages/Write";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
