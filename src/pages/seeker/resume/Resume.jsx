import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Resume() {
  const navigate = useNavigate();

  // 🔹 기본 리스트 없이, 세션에 있으면 불러오고 없으면 []로 시작
  const [workingList, setWorkingList] = useState(() => {
    try {
      const raw = sessionStorage.getItem("resume.list");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 세션과 상태 동기화
  useEffect(() => {
    sessionStorage.setItem("resume.list", JSON.stringify(workingList));
  }, [workingList]);

  // 다른 페이지 갔다가 돌아오면 최신 데이터로 재동기화
  useEffect(() => {
    const sync = () => {
      try {
        const saved = JSON.parse(sessionStorage.getItem("resume.list") || "[]");
        setWorkingList(Array.isArray(saved) ? saved : []);
      } catch {}
    };
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  const togglePublic = (id) => {
    setWorkingList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isPublic: !w.isPublic } : w))
    );
  };

  return (
    <ResumeContainer>
      <Header showBack text={"이력"} />
      <List>
        {/* 🔹 목록이 비어도 '이력 추가하기' 버튼은 항상 보이도록 */}
        <SectionTitle>
          <p>이력</p>
          <button onClick={() => navigate("/homeseeker/resume/add")}>
            이력 추가하기
          </button>
        </SectionTitle>

        {workingList.length === 0 ? (
          <EmptyNotice>
            저장된 이력이 없어요. 이력 추가하기를 눌러 작성해 주세요.
          </EmptyNotice>
        ) : (
          workingList.map((item) => (
            <Card key={item.id}>
              <Info>
                <Infotext>
                  <CardHeader>
                    <CompanyLabel>{item.company || "구인업체명"}</CompanyLabel>
                  </CardHeader>
                  <JobTitle>
                    {item.jobTag && <JobTag>{item.jobTag}</JobTag>}
                    {item.title}
                  </JobTitle>
                  <Address>{item.addr}</Address>
                  <Time>{item.date}</Time>
                </Infotext>
                <OpenClose>
                  <ToggleBadge
                    data-state={item.isPublic ? "public" : "private"}
                    onClick={() => togglePublic(item.id)}
                  >
                    {item.isPublic ? "공개" : "비공개"}
                  </ToggleBadge>
                </OpenClose>
              </Info>
              <TwoCols>
                <Button
                  onClick={() =>
                    navigate("/homeseeker/resume/edit", {
                      state: { id: item.id },
                    })
                  }
                  text={"이력 수정하기"}
                />
              </TwoCols>
            </Card>
          ))
        )}
      </List>
      <Tap>
        <Button
          onClick={() => navigate("/homeseeker/profile")}
          type={"White"}
          text={"저장하기"}
        />
      </Tap>
    </ResumeContainer>
  );
}
const ResumeContainer = styled.div``;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 30px;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 190px;
  font-size: 25px;
  font-weight: 700;
  p {
    margin: 0px;
  }
  button {
    background-color: var(--Foundation-Green-Normal);
    cursor: pointer;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
    color: white;
    display: flex;
    height: 30px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    font-weight: 500;
    font-size: 15px;
    white-space: nowrap;
  }
`;

const EmptyNotice = styled.div`
  padding: 16px 0 8px;
  color: var(--Foundation-Black-black-7, #8c8c8c);
  font-size: 25px;
`;

const Card = styled.div`
  padding: 10px 20px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 7px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  > svg {
    width: 20px;
    height: 20px;
    fill: #000;
  }
`;

const CompanyLabel = styled.span`
  display: inline-block;
  border-radius: 6px;
  font-size: 15px;
  color: #000;
`;

const JobTitle = styled.p`
  margin: 10px 0 10px;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const JobTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 2px;
  border: 1px solid var(--Foundation-Green-Darker, #0f3d24);
  border-radius: 6px;
  background: var(--Foundation-Green-Light, #fff);
  color: var(--Foundation-Green-Darker, #0f3d24);
  font-size: 13px;
  font-weight: 600;

  /* ✅ 태그 내부 줄바꿈 방지 */
  white-space: nowrap;
  flex: 0 0 auto;
`;

const Address = styled.p`
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 400;
  color: #000;
`;

const TwoCols = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex: 1;
  }
`;

const Time = styled.p`
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 400;
  color: #000;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const OpenClose = styled.div`
  /* ✅ 우측 버튼이 줄바꿈/줄갈라짐 없이 고정되도록 */
  flex-shrink: 0;
`;

const ToggleBadge = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid;

  /* ✅ 버튼 텍스트 줄바꿈 방지 */
  white-space: nowrap;

  &[data-state="public"] {
    color: #ff5858;
    background: #fff;
    border: 1px solid #ff5858;
  }

  &[data-state="private"] {
    color: var(--Foundation-Black-black-7, #8c8c8c);
    border: 1px solid var(--Foundation-Black-black-7, #8c8c8c);
    background: var(--Foundation-surface-White, #fff);
  }
`;

const Infotext = styled.div``;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
