import styled, { keyframes } from "styled-components";
import { color, font } from "@/const_style.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const HikingStyle = styled.section`
  padding: 48px 0;
  width: 100vw;
  background-color: ${color.lightYellow};
  border-top: 1px solid ${color.greenLight};

  > div {
    width: 80%;
    margin: 0 auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    height: 500px;
    border-radius: 20px;
  }
`;

export const HeaderHikingStyle = styled.div<{
  $main_image: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;

  padding: 24px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  width: 100%;
  height: 350px;
  background-image: ${(props) =>
    `url(${API_KEY}/hiking/getImage/${props.$main_image})`};
  background-size: cover;
  background-position: center;

  color: white;

  > h3 {
    z-index: 10;
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  > p {
    z-index: 10;
    margin-top: 6px;
    font-size: 20px;
    font-family: ${font.m2};
  }

  > p:nth-of-type(1) {
    font-weight: 400;
    font-size: 18px;
  }

  > p:nth-of-type(2) {
    text-decoration: underline;
  }

  > div:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const favoriteAnimationHover = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  40% {
    stroke-dashoffset: 70px;
  }
  80% {
    stroke-dashoffset: 140px;
    fill: transparent;
  }
  100% {
    stroke-dashoffset: 140px;
    fill: ${color.greenLight};
  }
`;

export const StarFavorite = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  right: 30px;
  bottom: 75px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;

  &:hover path {
    animation: ${favoriteAnimationHover} 1s linear forwards;
    animation-duration: ${(props) => (props.$isSelected ? "0s" : "1s")};
  }

  > svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => (props.$isSelected ? color.greenLight : "transparent")};
  }

  > svg > path {
    stroke: ${color.greenLight};
    stroke-dasharray: 70px;
    stroke-dashoffset: 0;
  }
`;
