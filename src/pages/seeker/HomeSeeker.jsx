import ildream from "../../assets/ildream.svg";
import styled from "styled-components";
import Recommend from "../../components/seeker/home/Recommend";
import TapBar from "../../components/common/TapBar";

export default function HomeSeeker() {
  return (
    <HomeSeekerContainer>
      <HeaderImg />
      <h2>추천 공고</h2>
      <Recommend />
      <Homebar></Homebar>
    </HomeSeekerContainer>
  );
}

const Homebar = styled(TapBar)``;

const HomeSeekerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    padding: 10px 0px;
    width: 330px;
    margin: 10px 0;
    text-align: left;
  }
`;

function HeaderImg() {
  return (
    <HeaderImgContainer>
      <img src={ildream} />
    </HeaderImgContainer>
  );
}
const HeaderImgContainer = styled.div`
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 93px;
    height: 57px;
    flex-shrink: 0;
  }
`;
