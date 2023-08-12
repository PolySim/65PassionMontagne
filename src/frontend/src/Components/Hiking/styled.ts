import styled from "styled-components";
import { color } from "@/const_style.ts";

export const HikingStyle = styled.section`
  padding: 48px 0;
  width: 100vw;
  background-color: ${color.lightYellow};

  > div {
    width: 80%;
    margin: 0 auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    height: 500px;
    border-radius: 20px;
  }
`;

export const HeaderHikingStyle = styled.div``;
