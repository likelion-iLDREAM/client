import styled from "styled-components";
import Header from "../../../components/common/Header";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { Icons } from "../../../components/icons/index";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TapBarSeeker from "../../../components/common/TapBarSeeker";
import { useState } from "react";
import TapBar from "../../../components/common/TapBar";
// (추후) 별도 리스트 컴포넌트를 만들면 아래 import만 활성화해서 교체하면 됩니다.
// import AppliedJobProgressList from "../../../components/seeker/AppliedJobProgressList";
// import AppliedJobResultList from "../../../components/seeker/AppliedJobResultList";

export default function ProfileSeeker() {
  const [activeTab, setActiveTab] = useState("guide");
  const navigate = useNavigate();
  const hasDraft = true;
  const name = "홍길동";
  const tags = ["돌봄", "식품·옷·환경 가공", "목공·공예·제조"];

  const workingList = [
    {
      id: 1,
      company: "구인업체명",
      title: "[지역] 구인공고명",
      addr: "서울특별시 00구 00로 000",
    },
  ];

  const appliedProgressList = [
    {
      id: 1,
      company: "구인업체명",
      title: "[지역] 구인공고명",
      addr: "서울특별시 00구 00로 000",
    },
  ];

  const appliedResultList = [
    {
      id: 2,
      company: "구인업체명",
      title: "[지역] 구인공고명",
      addr: "서울특별시 00구 00로 000",
    },
  ];

  return (
    <ProfileContainer>
      <Header text={"내 정보"} />
      <Section>
        <TopCard>
          <Avatar>
            <IoPersonCircleOutline size={83} />
          </Avatar>
          <TopRight>
            <Name>{name}</Name>
            <TagRow>
              {tags.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
            <EditRow>
              <SmallButton onClick={() => navigate("./edit")}>
                <Icons.UserEdit />내 정보 수정
              </SmallButton>
            </EditRow>
          </TopRight>
        </TopCard>

        {/* 작성 중 지원서 알림 */}
        {hasDraft && (
          <DraftCard>
            <DraftBody>
              <DraftText>
                <DraftIcon>
                  <AiOutlineEdit size={50} />
                </DraftIcon>
                현재 작성하던 지원서가 있어요! <br />
                계속 진행하시겠어요?
              </DraftText>
              <TwoCols>
                <ButtonSmall type="White" text={"지원 포기하기"} />
                <ButtonSmall text={"지원 계속하기"} />
              </TwoCols>
            </DraftBody>
          </DraftCard>
        )}

        {/* 지원한 공고 */}
        {(appliedProgressList.length > 0 || appliedResultList.length > 0) && (
          <>
            <SectionTitle>지원한 공고</SectionTitle>

            {/* (추후 교체) 진행중 리스트 */}
            {/* <AppliedJobProgressList data={appliedProgressList} /> */}
            {appliedProgressList.map((item) => (
              <Card key={`p-${item.id}`}>
                <CardHeader>
                  <CompanyLabel>구인업체명</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title}</JobTitle>
                <Address>{item.addr}</Address>
                <DisabledButton disabled>채용 진행중</DisabledButton>
              </Card>
            ))}

            {/* (추후 교체) 결과 확인 리스트 */}
            {/* <AppliedJobResultList data={appliedResultList} /> */}
            {appliedResultList.map((item) => (
              <Card key={`r-${item.id}`}>
                <CardHeader>
                  <CompanyLabel>구인업체명</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title}</JobTitle>
                <Address>{item.addr}</Address>
                <SingleButtonRow>
                  <ButtonSmall
                    onClick={() => navigate("/homeseeker/result/fail")}
                    text={"채용 결과 확인하기"}
                  />
                </SingleButtonRow>
              </Card>
            ))}
          </>
        )}

        {/* 진행 중인 근로 */}
        {workingList.length > 0 && (
          <>
            <SectionTitle>진행 중인 근로</SectionTitle>
            {workingList.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CompanyLabel>구인업체명</CompanyLabel>
                  <IoIosArrowForward />
                </CardHeader>
                <JobTitle>{item.title}</JobTitle>
                <Address>{item.addr}</Address>
                <TwoCols>
                  <ButtonSmall
                    onClick={() => navigate("/homeseeker/result/summary")}
                    type="White"
                    text={"계약서 관리"}
                  />
                  <ButtonSmall
                    text={"고용주 후기 작성"}
                    onClick={() => navigate("/homeseeker/review")}
                  />
                </TwoCols>
              </Card>
            ))}
          </>
        )}

        {/* 지원 현황 */}
        <Submenu onClick={() => navigate("/homeseeker/resume")}>
          <div>
            내 이력 확인하기<span>{0}회</span>
          </div>
          <IoIosArrowForward />
        </Submenu>
      </Section>
      <Homebar></Homebar>
    </ProfileContainer>
  );
}

const SmallButton = styled.button`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  gap: 5px;
  border-radius: 7px;
  background: var(--Foundation-Green-Normal, #2baf66);
  color: var(--Foundation-surface-White, #fff);
  font-size: 15px;
  font-weight: 700;
  border: none;
`;

const Homebar = styled(TapBarSeeker)``;

const Section = styled.div`
  padding: 20px 30px;
`;

const SmallButton = styled.button`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  gap: 5px;
  border-radius: 7px;
  background: var(--Foundation-Green-Normal, #2baf66);
  border: none;
  color: var(--Foundation-surface-White, #fff);
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const ProfileContainer = styled.div``;

const TopCard = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #bfbfbf;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  color: var(--Foundation-Green-Normal);
`;

const TopRight = styled.div`
  flex: 1;
`;

const Name = styled.p`
  margin: 2px 0 6px;
  font-weight: 700;
  font-size: 20px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
`;

const EditRow = styled.div`
  margin-top: 10px;
  width: 140px;

  .edit-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const DraftCard = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
  margin-top: 16px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border: 1px solid var(--Foundation-Green-Normal);
  border-radius: 7px;
`;

const DraftIcon = styled.div`
  display: flex;
  align-items: flex-start;
  color: var(--Foundation-Green-Normal);
`;

const DraftBody = styled.div`
  flex: 1;
`;

const DraftText = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin: 0 0 12px;
  font-weight: 600;
  line-height: 1.4;
  font-size: 20px;
`;

const TwoCols = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex: 1;
  }
`;

const SingleButtonRow = styled.div`
  margin-top: 10px;

  > div {
    width: 100%;
  }
`;

const SectionTitle = styled.p`
  margin: 24px 4px 14px;
  font-size: 20px;
  font-weight: 700;
`;

const Card = styled.div`
  padding: 10px 20px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 7px;
  margin-bottom: 14px;
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

const DisabledButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 10px;
  background: var(--Foundation-Black-black-6, #bfbfbf);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;

const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const CountBox = styled.div`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  color: var(--Foundation-Green-Normal, #2baf66);
`;

const Submenu = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  border-radius: 7px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    height: 78px;
  }

  span {
    align-self: stretch;
    color: var(--Foundation-Green-Normal, #2baf66);
  }
`;
