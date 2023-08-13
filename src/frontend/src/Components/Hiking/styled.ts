import styled, { keyframes } from "styled-components";
import { color, font } from "@/const_style.ts";
import { MapContainer } from "react-leaflet";

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
    border-radius: 20px;
    background-color: white;
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

export const HikingContent = styled.div`
  display: flex;
  width: 100%;
  padding: 0 24px;
`;

export const HikingDescription = styled.div`
  width: 60%;
  padding: 24px 0;
`;

export const StatisticalHiking = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 24px;
  //border-bottom: 1px solid #ccc;

  > div {
    > p:nth-of-type(1) {
      font-weight: 300;
      margin-bottom: 6px;
    }
  }
`;

export const HikingResume = styled.div`
  margin-top: 24px;
  width: 100%;
  font-weight: 300;

  h5 {
    font-size: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid black;
    width: min-content;
    margin-left: 24px;
  }

  p {
    border-top: 1px solid #ccc;
    padding-top: 12px;
    margin-bottom: 24px;
  }
`;

export const LocationHiking = styled.div`
  width: 40%;
  height: 300px;
  border-left: 1px solid #ccc;
  margin-left: 24px;
  padding: 24px 0 0 24px;
`;

export const Map = styled(MapContainer)`
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 10px;
`;
