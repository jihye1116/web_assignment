import { styled } from "styled-components";

export const FakeHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  height: 100px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
