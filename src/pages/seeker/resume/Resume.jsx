import styled from "styled-components";
import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Resume() {
  const navigate = useNavigate();
  const [workingList, setWorkingList] = useState([
    {
      id: 1,
      company: "구인업체명",
      title: "[지역] 구인공고명",
      addr: "서울특별시 00구 00로 000",
      date: "2020.01 ~ 2021.01 (1년 이상)",
      isPublic: true,
    },
  ]);

  const togglePublic = (id) => {
    setWorkingList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isPublic: !w.isPublic } : w))
    );
  };

  return (
    <ResumeContainer>
      <Header showBack text={"이력"} />
      <List>
        {workingList.length > 0 && (
          <>
            <SectionTitle>
              <p>이력</p>
              <button onClick={() => navigate("/homeseeker/resume/add")}>
                이력 추가하기
              </button>
            </SectionTitle>
            {workingList.map((item) => (
              <Card key={item.id}>
                <Info>
                  <Infotext>
                    <CardHeader>
                      <CompanyLabel>구인업체명</CompanyLabel>
                    </CardHeader>
                    <JobTitle>{item.title}</JobTitle>
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
                    onClick={() => navigate("/homeseeker/resume/edit")}
                    text={"이력 수정하기"}
                  />
                </TwoCols>
              </Card>
            ))}

            {workingList.map((item) => (
              <Card key={item.id}>
                <Info>
                  <Infotext>
                    <CardHeader>
                      <CompanyLabel>구인업체명</CompanyLabel>
                    </CardHeader>
                    <JobTitle>{item.title}</JobTitle>
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
                    onClick={() => navigate("/homeseeker/resume/edit")}
                    text={"이력 수정하기"}
                  />
                </TwoCols>
              </Card>
            ))}

            {workingList.map((item) => (
              <Card key={item.id}>
                <Info>
                  <Infotext>
                    <CardHeader>
                      <CompanyLabel>구인업체명</CompanyLabel>
                    </CardHeader>
                    <JobTitle>{item.title}</JobTitle>
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
                    onClick={() => navigate("/homeseeker/resume/edit")}
                    text={"이력 수정하기"}
                  />
                </TwoCols>
              </Card>
            ))}
          </>
        )}
      </List>
      <Tap>
        <Button
          onClick={() => navigate("/homeseeker/review/tag")}
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
  gap: 200px;
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
    font-size: 15p;
  }
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

const OpenClose = styled.div``;

const ToggleBadge = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  border: 1px solid;

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
