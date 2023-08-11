import styled from "styled-components";
import { color, font } from "@/const_style.ts";

export const HomeStyle = styled.section`
  margin-top: 24px;
  width: 100vw;
  height: 80%;
  position: relative;

  > div {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    width: 100%;
    height: 100%;

    > img {
      scroll-snap-align: center;
      min-width: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const Find = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  > h4 {
    font-size: 52px;
    font-family: ${font.rubik};
    font-weight: 500;
    color: ${color.lightYellow};
    //color: white;
    margin-bottom: 24px;
  }

  > div {
    display: flex;
    align-items: center;
    border-radius: 30px;
    padding: 12px 18px;
    outline: none;
    border: 1px solid #ccc;
    width: min(652px, 90%);
    background-color: white;

    > svg {
      margin-right: 6px;
      width: 30px;
      height: 30px;
    }

    > input {
      font-size: 24px;
      font-family: ${font.m2};
      font-weight: 300;
      border: none;
      width: calc(100% - 36px);
      outline: none;

      &::placeholder {
        color: ${color.black};
      }
    }
  }
`;
