import styled from "styled-components";
import { color, font } from "@/const_style.ts";
import { Link } from "react-router-dom";

export const HikesSearchContainer = styled.div`
  position: absolute;
  top: calc(50% + 40px);
  width: min(652px, 90%);
  background-color: white;
  padding-top: 31px;
  border-radius: 0 0 30px 30px;
  max-height: 30vh;
  overflow-y: scroll;
`;

export const HikingSearchResult = styled.div`
  padding: 12px 58px;
  font-family: ${font.m2};
  border-bottom: 1px solid #ccc;
  position: relative;
  text-align: start;

  > p:nth-of-type(1) {
    font-size: 18px;
    color: black;
  }

  > p:nth-of-type(2) {
    margin-top: 3px;
    font-size: 14px;
    color: #656e5e;
  }

  &:hover {
    background-color: ${color.lightYellow};
  }
`;

export const Navigate = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
