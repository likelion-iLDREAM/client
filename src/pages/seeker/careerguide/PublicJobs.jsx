import styled from "styled-components";
import Header from "../../../components/common/Header";
import Guide from "../../../components/seeker/Guide";
import { IoCheckboxOutline } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";
import { useState } from "react";

export default function PublicJobs() {
  const [onlyLocal, setOnlyLocal] = useState(false);

  return (
    <PublicContainer>
      <Header text={"취업 길잡이"} showBack />
      <Section>
        <p>관공서 구인 공고</p>
      </Section>
      <FilterBar>
        <CheckButton type="button" onClick={() => setOnlyLocal((v) => !v)}>
          {onlyLocal ? <IoCheckbox /> : <IoCheckboxOutline />}
          <span>내 지역만 보기</span>
        </CheckButton>
      </FilterBar>

      <List>
        <Guide
          title="마포구청 구인공고"
          onClick={() =>
            window.open(
              "https://www.mapo.go.kr/site/main/board/recruit/list",
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <Guide
          title="은평구청 구인공고"
          onClick={() =>
            window.open(
              "https://www.ep.go.kr/www/selectEminwonList.do?key=748&notAncmtSeCode=02&pageUnit=10&searchCnd=all&searchKrwd=&pageIndex=1",
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <Guide
          title="서대문구청 구인공고"
          onClick={() =>
            window.open(
              "https://www.sdm.go.kr/genre/economic/jobinfo/jobs.do",
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
      </List>
    </PublicContainer>
  );
}

const PublicContainer = styled.div``;

const Section = styled.div`
  padding: 20px 20px 0 20px;
  p {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 20px 20px 20px;
`;

const FilterBar = styled.div`
  padding: 20px 20px 0px 20px;
`;

const CheckButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  padding: 4px 0;
  cursor: pointer;
  color: inherit;
  font-size: 20px;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 0.75px;
    stroke: var(--Foundation-Green-Darker, #0f3d24);
    fill: #2baf66;
  }
`;
