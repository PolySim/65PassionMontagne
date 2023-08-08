import styled, { keyframes } from "styled-components";
import { color, font } from "@/const_style.ts";
import { Link } from "react-router-dom";

const headerPadding = 24;
const cardPadding = 12;

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: fit-content;
  padding: ${headerPadding}px;
`;

export const MainTitle = styled(Link)`
  color: ${color.greenDark};
  font-family: ${font.bebas};
  letter-spacing: 3px;
  font-size: 24px;
  text-align: center;
  width: 223px;
  height: 100%;
  text-decoration: none;
`;

export const NavBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;
  width: calc(100vw - ${2 * headerPadding + 223}px);
  height: 100%;
  font-family: ${font.m2};
  font-weight: 600;
`;

export const CategoriesStyle = styled.div`
  position: relative;

  &:hover > div:nth-of-type(2) {
    display: flex;
  }

  > div:nth-of-type(1) {
  }

  > div:nth-of-type(2) {
    display: none;
    flex-direction: column;
    position: absolute;
  }
`;

export const Category = styled(Link)`
  text-decoration: none;
  color: ${color.black};
  font-size: 16px;
  transition: color 0.15s ease-in-out;
  width: 100%;

  &:hover {
    color: ${color.greenLight};
  }
`;

export const Favorite = styled(Link)`
  font-size: 16px;
  color: ${color.orange};
  text-decoration: none;
  margin: 0 48px 0 36px;
`;

export const ConnectionStyle = styled.div``;

export const LogInButton = styled.button<{ $signIn: boolean }>`
  padding: 6px 12px;
  margin-left: 12px;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.$signIn ? color.greenLight : color.greenDark};
  background-color: ${(props) => (props.$signIn ? "white" : color.greenLight)};
  color: ${(props) => (props.$signIn ? color.greenLight : "white")};
  cursor: pointer;
`;

export const ConnectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(17, 21, 24, 0.45);
`;

const apparitionCard = keyframes`
  from {
    transform: scale(50%);
  }
  to {
    transform: scale(100%);
  }
`;

export const ConnectionCardStyle = styled.div`
  position: relative;
  height: max-content;
  width: max-content;
  border-radius: 20px;
  background-color: white;
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  padding: 12px 0 0;
  animation: ${apparitionCard} 0.3s ease-in-out;
`;

export const ConnectionHeader = styled.div`
  width: 100%;
  padding: 0 ${cardPadding}px;

  > div:nth-of-type(1) {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #eee;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1 {
      font-family: ${font.bebas};
      letter-spacing: 8px;
      font-size: 48px;
    }

    h4 {
      margin-top: 6px;
      color: ${color.gray};
      font-weight: 300;
      padding: 0 12px;
    }
  }
`;

export const SignInFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  width: 100%;

  input {
    width: calc(100% - ${cardPadding * 4}px);
    border-radius: 10px;
    height: 46px;
    padding: 0 14px;
    margin-bottom: 12px;
    font-size: 15px;
    border: 1px solid #ddd;
    transition: border-color 0.1s ease-in-out;

    &:hover {
      border-color: #bbb;
    }

    &:focus {
      outline: 1px solid ${color.greenLight};
    }
  }

  input[type="submit"] {
    cursor: pointer;
    background-color: ${color.greenDark};
    color: ${color.orange};
    font-family: ${font.m2};
    font-weight: 600;
    font-size: 22px;
    letter-spacing: 2px;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: ${color.greenLight};
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${cardPadding}px ${cardPadding}px 0;
    border-top: 1px solid #ddd;
    width: 100%;

    > p {
      font-size: 14px;
      margin-bottom: ${cardPadding}px;
      font-weight: 300;

      > span {
        cursor: pointer;
        color: ${color.greenLight};
        font-weight: 400;
      }
    }
  }
`;
