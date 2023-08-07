import styled from "styled-components";
import { color, font } from "@/const_style.ts";
import { Link } from "react-router-dom";

export const HeaderStyle = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-top: 24px;

  @media screen and (max-width: 450px) {
    padding-top: 12px;
  }
`;

export const MainTitle = styled(Link)`
  color: ${color.greenDark};
  font-family: ${font.bebas};
  letter-spacing: 12px;
  font-size: 60px;
  text-align: center;
  text-decoration: none;

  @media screen and (max-width: 750px) {
    font-size: 48px;
    letter-spacing: 6px;
  }

  @media screen and (max-width: 450px) {
    font-size: 32px;
  }
`;

export const NavBarLaptopStyle = styled.div`
  display: flex;
  justify-content: start;
  position: relative;
  margin-top: 24px;
  padding-left: 48px;
  width: 100vw;

  > div {
    position: relative;

    &:hover > div:nth-of-type(2) {
      display: flex;
    }

    > div:nth-of-type(1) {
      color: ${color.black};
      font-size: 16px;
      transition: color 0.15s ease-in-out;
      font-weight: 400;
    }

    > div:nth-of-type(2) {
      display: none;
      flex-direction: column;
      position: absolute;
      width: max-content;

      &:hover {
        display: flex;
      }
    }
  }
`;

export const Category = styled(Link)`
  text-decoration: none;
  color: ${color.black};
  font-size: 16px;
  transition: color 0.15s ease-in-out;
  font-family: ${font.m2};
  font-weight: 400;
  width: 100%;

  &:hover {
    color: ${color.greenLight};
  }
`;

export const LogInButton = styled.button`
  position: absolute;
  right: 48px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: fit-content;
  height: fit-content;
`;
