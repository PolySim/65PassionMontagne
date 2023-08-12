import styled from "styled-components";
import { color } from "@/const_style.ts";

export const FooterStyle = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70px;

  > p {
    font-size: 12px;
    margin-bottom: 6px;

    > a {
      color: ${color.black};
    }
  }
`;
