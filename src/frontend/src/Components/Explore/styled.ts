import styled from "styled-components";
import { color, font } from "@/const_style.ts";
import { Link } from "react-router-dom";

export const ExploreStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  min-height: 82vh;
  background-color: ${color.lightYellow};
  padding: 48px;
`;

export const HikingExploreCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: fit-content;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  transition: transform 0.2s ease-in-out;
  margin-top: 24px;

  &:hover {
    transform: scale(105%);
  }

  > div {
    width: 100%;
    height: 240px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > p {
    font-family: ${font.bebas};
    letter-spacing: 3px;
    font-size: 22px;
    color: ${color.greenDark};
    width: 100%;
    text-align: center;
    margin-top: 24px;
  }
`;

export const ButtonExploreTopo = styled(Link)`
  margin: 24px 0 48px;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: ${color.orange};
  color: white;
  font-size: 22px;
`;
