import styled, { keyframes } from "styled-components";
import { color, font } from "@/const_style.ts";
import { Link } from "react-router-dom";

const headerPadding = 24;
const cardPadding = 12;

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: fit-content;
  padding: ${headerPadding}px;

  @media screen and (max-width: 800px) {
    padding: 24px 12px;
  }
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

  @media screen and (max-width: 800px) {
    font-size: 22px;
    letter-spacing: 2px;
    width: fit-content;
  }
`;

export const NavBarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;
  width: max-content;
  height: 100%;
  font-family: ${font.m2};
  font-weight: 600;
`;

export const NavBarPhoneStyle = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: max-content;

  > div:nth-of-type(2) {
    z-index: 1000;
    margin-left: 24px;
    position: relative;
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease-in-out;

    > span {
      position: absolute;
      top: 10px;
      background-color: #000000;
      height: 2px;
      width: 50px;
      transition:
        transform 0.3s ease-out,
        opacity 0.1s ease-out;

      @media screen and (max-width: 300px) {
        width: 30px;
      }
    }

    > span:nth-of-type(1) {
      transform: ${(props) =>
        props.$isOpen ? "translateY(10px) rotate(135deg)" : "translateY(20px)"};
    }

    > span:nth-of-type(2) {
      opacity: ${(props) => (props.$isOpen ? "0" : "1")};
    }

    > span:nth-of-type(3) {
      transform: ${(props) =>
        props.$isOpen
          ? "translateY(10px) rotate(-135deg)"
          : "translateY(10px)"};
    }
  }
`;

export const MenuPhoneStyle = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
`;

export const LinkMenuPhone = styled(Link)<{
  $isFavorite?: boolean;
  $isState?: boolean;
}>`
  font-size: ${(props) => (props.$isState ? "20px" : "24px")};
  font-family: ${font.rubik};
  font-weight: ${(props) => (props.$isState ? "400" : "500")};
  color: ${(props) => (props.$isFavorite ? color.orange : color.black)};
  text-decoration: none;
  margin-top: 24px;
`;

export const CategoriesStyle = styled.div`
  position: relative;
  transform: translateY(6px);
  z-index: 1000;

  &:hover > div:nth-of-type(2) {
    display: flex;
  }

  &:hover > div:nth-of-type(1) {
    padding-left: 50px;
  }

  > div:nth-of-type(1) {
    padding: 0 36px 12px 0;
  }

  > div:nth-of-type(2) {
    display: none;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 10px;
    padding: 18px;
    width: 600px;
  }
`;

export const Category = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${color.black};
  font-size: 16px;
  transition: color 0.15s ease-in-out;
  width: 45%;
  height: 50px;

  > img {
    height: 90%;
  }

  &:hover {
    color: ${color.greenLight};
  }
`;

export const ImageCategory = styled.div`
  position: absolute;
  transform: translateX(90%);
  width: 50%;
  height: 100%;

  > img {
    position: absolute;
    height: 90%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const Favorite = styled(Link)`
  font-size: 16px;
  color: ${color.orange};
  text-decoration: none;
  margin: 0 36px 0 0;
`;

export const ConnectionStyle = styled.div`
  border-left: 1px solid #ccc;
  padding-left: 24px;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
  }
`;

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

  @media screen and (max-width: 1000px) {
    margin-left: 0;
    margin-top: ${(props) => (props.$signIn ? "0" : "12px")};
  }
`;

export const ConnectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
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
  margin: 0 12px;
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

export const HikingStateStyle = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  height: 90%;
  width: 100%;
  opacity: ${(props) => (props.$visible ? 1 : 0)};

  > div {
    cursor: pointer;
    position: relative;
    z-index: 100;
    width: 45%;
    height: 20%;
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(95%);
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const StateName = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${color.melon};
  text-decoration: none;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const LotOutStyle = styled.div`
  padding: 6px 12px;
  margin-left: 12px;
  border-radius: 12px;
  width: fit-content;
  height: fit-content;
  background-color: ${color.orange};
  color: ${color.lightYellow};
  cursor: pointer;
`;

export const AdminButtonStyle = styled(Link)`
  padding: 6px 12px;
  margin-left: 12px;
  border-radius: 12px;
  width: fit-content;
  height: fit-content;
  color: ${color.lightYellow};
  cursor: pointer;
  background-color: ${color.greenLight};
  text-decoration: none;
`;
