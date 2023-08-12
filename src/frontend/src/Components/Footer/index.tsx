import { FooterStyle } from "@/Components/Footer/styled.ts";

const Footer = () => {
  return (
    <FooterStyle>
      <p>© Copyright - 65 Passion Montagne</p>
      <p>
        Développé et designé par{" "}
        <a href="https://www.simondesdevises.com">Simon Desdevises</a>
      </p>
    </FooterStyle>
  );
};

export default Footer;
