import styled from "styled-components";
import { color } from "@/const_style.ts";

export const AdminStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  min-height: 82vh;
  background-color: ${color.lightYellow};
  padding: 24px 0 48px;
`;

export const AdminCategory = styled.div`
  width: 300px;
  height: fit-content;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(105%);
  }

  > div {
  }
`;
