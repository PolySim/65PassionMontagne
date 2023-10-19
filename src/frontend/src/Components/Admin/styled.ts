import styled from "styled-components";
import { color, font } from "@/const_style.ts";
import { HikingResume } from "@/Components/Hiking/styled.ts";

export const AdminStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  min-height: 82vh;
  background-color: ${color.lightYellow};
  padding: 24px 12px 48px;
`;

export const HeaderForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;

  > input[type="text"] {
    width: min(100%, 400px);
    padding: 6px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 36px;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.6);
  }

  > input[type="submit"] {
    margin-top: 24px;
    padding: 6px 12px;
    border-radius: 10px;
    background-color: ${color.melon};
    font-weight: 400;
    cursor: pointer;
    width: min(100%, 150px);
    font-size: 22px;
    border: none;
  }
`;

export const SelectHeader = styled.select`
  margin-top: 24px;
  width: min(100%, 400px);
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  background-color: rgba(255, 255, 255, 0.6);
`;

export const EditStatistical = styled.form`
  padding-bottom: 24px;

  p {
    font-weight: 300;
    margin-bottom: 6px;
  }

  > div:nth-of-type(1) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
  }

  input[type="text"],
  input[type="number"] {
    padding: 6px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
    width: 100px;
  }

  input[type="submit"] {
    margin-top: 12px;
    margin-left: 12px;
    padding: 6px 12px;
    border-radius: 10px;
    background-color: ${color.orange};
    font-weight: 400;
    cursor: pointer;
    width: min(100%, 250px);
    font-size: 16px;
    border: none;
  }
`;

export const EditHikingContent = styled(HikingResume)`
  textarea {
    margin-top: 12px;
    width: 100%;
    min-height: 300px;
    resize: vertical;
    outline: none;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  input[type="submit"] {
    margin-top: 12px;
    margin-left: 12px;
    padding: 6px 12px;
    border-radius: 10px;
    background-color: ${color.orange};
    font-weight: 400;
    cursor: pointer;
    width: min(100%, 250px);
    font-size: 16px;
    border: none;
  }
`;

export const AddFiles = styled.form<{ $gpx?: boolean }>`
  width: 100%;
  margin-top: ${(props) => (props.$gpx ? "24px" : "0")};

  input[type="submit"] {
    margin-top: 12px;
    padding: 3px 12px;
    border-radius: 10px;
    border: none;
    background-color: ${color.melon};
    font-weight: 400;
    font-family: ${font.rubik};
    cursor: pointer;
  }
`;

export const ActionImageHiking = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  border-top: 1px solid white;
  padding: 6px 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;

  > div {
    cursor: ${(props) => (props.$selected ? "default" : "pointer")};
    width: 33px;
    height: 33px;
    border-radius: 7px;
    padding: 6px;
  }

  > div:nth-of-type(1) {
    background-color: ${(props) => (props.$selected ? "#f28b7d" : "#ee6352")};
  }

  > div:nth-of-type(2) {
    background-color: ${(props) => (props.$selected ? "#ffdd99" : "#ffc759")};
  }
`;
