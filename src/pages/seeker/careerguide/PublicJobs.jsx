import styled from "styled-components";
import Header from "../../../components/common/Header";
import Guide from "../../../components/seeker/Guide";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { useEffect, useMemo, useState } from "react";

export default function PublicJobs() {
  const [onlyLocal, setOnlyLocal] = useState(false);

  // 세션에서 주소/구 정보 불러오기
  const extractGu = (addr) => {
    if (!addr) return "";
    const m = addr.match(/([가-힣]+구)/); // 예: "서울특별시 마포구 연남동" -> "마포구"
    return m ? m[1] : "";
  };

  const [address, setAddress] = useState(
    () => sessionStorage.getItem("signup.address") || ""
  );
  const [userGu, setUserGu] = useState(() => extractGu(address));

  useEffect(() => {
    const sync = () => {
      const a = sessionStorage.getItem("signup.address") || "";
      setAddress(a);
      setUserGu(extractGu(a));
    };
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  // 공고 목록 (구 정보 포함)
  const JOBS = [
    {
      title: "마포구청 구인공고",
      gu: "마포구",
      onClick: () =>
        window.open(
          "https://www.mapo.go.kr/site/main/board/recruit/list",
          "_blank",
          "noopener,noreferrer"
        ),
    },
    {
      title: "은평구청 구인공고",
      gu: "은평구",
      onClick: () =>
        window.open(
          "https://www.ep.go.kr/www/selectEminwonList.do?key=748&notAncmtSeCode=02&pageUnit=10&searchCnd=all&searchKrwd=&pageIndex=1",
          "_blank",
          "noopener,noreferrer"
        ),
    },
    {
      title: "서대문구청 구인공고",
      gu: "서대문구",
      onClick: () =>
        window.open(
          "https://www.sdm.go.kr/genre/economic/jobinfo/jobs.do",
          "_blank",
          "noopener,noreferrer"
        ),
    },
  ];

  const list = useMemo(() => {
    if (!onlyLocal) return JOBS;
    if (!userGu) return []; // 주소에 구 정보가 없으면 필터 시 빈 목록
    return JOBS.filter((j) => j.gu === userGu);
  }, [onlyLocal, userGu]);

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
        {onlyLocal && (
          <Hint>
            현재 지역: <b>{userGu || "미설정"}</b>
          </Hint>
        )}
      </FilterBar>

      <List>
        {list.length === 0 ? (
          <Empty>
            {onlyLocal ? (
              address ? (
                userGu ? (
                  <>내 지역({userGu})에 해당하는 공고가 아직 없어요.</>
                ) : (
                  <>주소에서 구 정보를 찾지 못했어요. (예: “마포구”)</>
                )
              ) : (
                <>주소를 먼저 설정해 주세요. (회원가입 &gt; 주소)</>
              )
            ) : (
              <>표시할 공고가 없어요.</>
            )}
          </Empty>
        ) : (
          list.map((item) => (
            <Guide key={item.title} title={item.title} onClick={item.onClick} />
          ))
        )}
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
  display: flex;
  align-items: center;
  gap: 10px;
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

const Hint = styled.span`
  font-size: 14px;
  color: var(--Foundation-Black-black-7, #8c8c8c);
`;

const Empty = styled.div`
  padding: 8px 2px;
  font-size: 25px;
  color: var(--Foundation-Black-black-7, #8c8c8c);
`;
