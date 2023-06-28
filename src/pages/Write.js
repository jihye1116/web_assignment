import React, { useState } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useNavigate } from "react-router";

const FormContainer = styled.form`
  margin: 0 20%;
`;

const TitleInput = styled.input`
  padding: 15px;
  width: 100%;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;

  font-family: "GmarketSansTTFBold";
`;

const EditorContainer = styled.div`
  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 4px 4px 0 0;
    background-color: #f5f5f5;
  }

  .ql-container {
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;

    min-height: 400px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #0b53e4;
  color: #fff;

  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  border-radius: 5px;
  font-family: "GmarketSansTTFMedium";
`;

const CancelButton = styled.button`
  padding: 10px;

  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  border-radius: 5px;

  font-family: "GmarketSansTTFMedium";
`;

const SaveButton = styled.button`
  padding: 10px;
  background-color: #ffc107;

  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        throw new Error("로그인되어 있지 않습니다.");
      }

      const postRef = doc(collection(db, "posts"));
      const postData = {
        title,
        content,
        author: currentUser.displayName,
        rating,
        timestamp: serverTimestamp(),
      };

      await setDoc(postRef, postData);

      setTitle("");
      setContent("");
      setRating(0);
      navigate("/");
    } catch (error) {
      console.error("글 등록 중 오류가 발생했습니다.", error);
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 동작
    setTitle("");
    setContent("");
    setRating(0);
  };

  const handleSave = () => {
    // 임시 저장 버튼 클릭 시 동작
    // 필요한 로직 추가
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TitleInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <EditorContainer>
        <ReactQuill value={content} onChange={setContent} placeholder="내용" />
      </EditorContainer>
      <ButtonContainer>
        <div>
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>
          {/* <SaveButton type="button" onClick={handleSave}>
            임시저장
          </SaveButton> */}
        </div>
        <SubmitButton type="submit">글 등록</SubmitButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default PostForm;
