import styled from "styled-components";
import Header from "../../../components/common/Header";
import ildream from "../../../assets/ildream.svg";
import Guide from "../../../components/seeker/Guide";
import { useNavigate } from "react-router-dom";
import TapBarSeeker from "../../../components/common/TapBarSeeker";

export default function CareerGuide() {
  const navigate = useNavigate();

  return (
    <GuideContainer>
      <Header>
        <Logo src={ildream} alt="일드림" />
      </Header>
      <p>취업 길잡이</p>
      <List>
        <Guide
          title="포스기 사용법"
          onClick={() => navigate("/homeseeker/guide/pos")}
        />
        <Guide
          title="관공서 구인 공고"
          onClick={() => navigate("/homeseeker/guide/gov")}
        />
      </List>
      <Homebar></Homebar>
    </GuideContainer>
  );
}

const Homebar = styled(TapBarSeeker)``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const GuideContainer = styled.div`
  p {
    margin: 0;
    padding: 20px 20px 0px 20px;
    font-size: 30px;
    font-weight: 700;
  }
`;

const Logo = styled.img`
  width: 93px;
  height: 57px;
  flex-shrink: 0;
`;
