import ildream from "../../../assets/ildream.svg";
import styled from "styled-components";
import TapBarSeeker from "../../../components/common/TapBarSeeker";
import JobList from "../../../components/seeker/jobs/JobList";
import Search from "../../../components/seeker/jobs/Search";

export default function Jobs() {
  return (
    <JobsContainer>
      <HeaderImg />
      <Search />
      <List>
        <JobList />
        <JobList />
      </List>

      <Homebar></Homebar>
    </JobsContainer>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  gap: 16px;
`;

const Homebar = styled(TapBarSeeker)``;

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
