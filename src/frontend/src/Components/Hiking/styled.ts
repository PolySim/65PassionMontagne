import styled, { keyframes } from "styled-components";
import { color, font } from "@/const_style.ts";
import { MapContainer } from "react-leaflet";

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

    @media screen and (max-width: 768px) {
      width: 95%;
    }
  }
`;

export const HeaderHikingStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;

  padding: 24px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  width: 100%;
  height: 350px;
  background-color: gray;
  background-size: cover;
  background-position: center;

  color: white;

  > h3 {
    z-index: 10;
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 12px;
    padding-right: 45px;
    word-break: break-word;
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

export const BackgroundImageHeader = styled.div<{ image_position: number }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${(props) => `50% ${props.image_position}%`};
    user-select: none;
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
  right: 24px;
  bottom: 92px;
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

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const HikingDescription = styled.div`
  width: 65%;
  padding: 24px 0;

  @media screen and (max-width: 1000px) {
    width: 95%;
  }
`;

export const StatisticalHiking = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 24px;

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
    border-bottom: 2px solid ${color.greenDark};
    color: ${color.greenDark};
    width: min-content;
    margin-left: 24px;
  }

  p,
  textarea {
    border-top: 1px solid #ccc;
    line-height: 24px;
    padding-top: 12px;
    margin-bottom: 24px;
  }
`;

export const DownloadHiking = styled.div`
  margin-top: 48px;
  width: 100%;
  font-weight: 300;
  border-top: 1px solid #ccc;

  > h5 {
    margin-top: 24px;
    font-size: 16px;
    margin-left: 24px;
    color: ${color.greenDark};
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-weight: 400;

    > a {
      margin-top: 36px;
      color: black;
      text-decoration: none;
      padding: 12px 28px;
      background-color: ${color.orange};
      border-radius: 15px;
      width: 240px;
    }

    > div {
      margin-top: 36px;
      padding: 12px 28px;
      background-color: ${color.greenLight};
      color: ${color.lightYellow};
      border-radius: 15px;
      width: 240px;
      text-align: center;
      cursor: pointer;
    }
  }
`;

export const LocationHiking = styled.div`
  width: 35%;
  height: max-content;
  border-left: 1px solid #ccc;
  margin-left: 24px;
  padding: 24px 0 48px 24px;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    border: none;
    margin-left: 0;
    padding-left: 0;
  }
`;

export const Map = styled(MapContainer)`
  width: 100%;
  aspect-ratio: 16/9;
  outline: none;
  border-radius: 10px;
  z-index: 0;
  margin-bottom: 24px;
`;

export const ImageHiking = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  margin: 24px 0;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Comments = styled.div`
  width: 100%;
`;

export const CommentStyle = styled.div`
  width: 100%;
  margin-top: 24px;
  border-top: 1px solid #ccc;
  padding-top: 12px;
  padding-left: 3px;

  > div:nth-of-type(1) {
    display: flex;
  }

  > div:nth-of-type(2) {
    margin-top: 12px;
    font-weight: 300;
    line-height: 20px;
  }
`;

export const ImageUser = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > p:nth-of-type(2) {
    margin-top: 3px;
    font-weight: 300;
    font-size: 12px;
  }
`;

export const WriteCommentStyle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 12px;

  > input {
    width: 80%;
    padding: 6px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
  }

  > div {
    padding: 6px 12px;
    border-radius: 10px;
    background-color: ${color.melon};
    font-weight: 400;
    cursor: pointer;
  }
`;

export const FullScreenImageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  > svg:nth-of-type(1) {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    stroke: white;
    cursor: pointer;
  }

  > svg:nth-of-type(2) {
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: pointer;
    left: 20px;
    stroke: white;
  }

  > svg:nth-of-type(3) {
    position: absolute;
    width: 50px;
    height: 50px;
    stroke: white;
    right: 20px;
    cursor: pointer;
  }

  > div {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-y: scroll;
    width: 100%;
    height: 100%;

    > div {
      scroll-snap-align: center;
      min-width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
