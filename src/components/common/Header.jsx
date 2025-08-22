import styled from "styled-components";
import ildream from "../../assets/ildream.svg"

export default function Header({ Islogo, text }) {
  return <HeaderContainer> {Islogo ? (
        <img src={ildream} alt="logo" width="97" />
      ) : (
        text
      )}</HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
