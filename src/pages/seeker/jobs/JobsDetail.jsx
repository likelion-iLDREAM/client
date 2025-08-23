import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { IoShareSocial } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/seeker/quickapply/Alert";

export default function JobsDetails() {
  const navigate = useNavigate();
  const [callAlertOpen, setCallAlertOpen] = useState(false);
  const companyName = "구인업체명";
  return (
    <JobsContainer>
      <Headersection>
        <Header text={"공고 정보"} showBack />
        <ShareButton type="button" aria-label="공유하기">
          <IoShareSocial />
        </ShareButton>
      </Headersection>

      <Content>
        <Name>
          <Employername text={"구인업체명"} />
          <EmployerTitle region={"서울"} title={"일로오세요"} />
        </Name>
      </Content>

      <Divider />

      <Section>
        <SectionTitle>시급</SectionTitle>
        <InfoList>
          <InfoRow label="시급">10,000원</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>근무 예정지</SectionTitle>
        <InfoList>
          <InfoRow label="시급">서울특별시</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>모집 내용</SectionTitle>
        <InfoList>
          <InfoRow2 label="근무시간">
            {`평일 주 5일\n(오후) 2시 00분 ~ (오후) 5시 00분`}
          </InfoRow2>
          <InfoRow2 label="경력조건">경력무관</InfoRow2>
          <InfoRow2 label="학력">학력무관</InfoRow2>
          <InfoRow2 label="고용형태">시간제 정규직</InfoRow2>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>직무 내용</SectionTitle>
        <InfoList>
          <InfoRow label="시급">
            직무 내용 입니다.직무 내용 입니다.직무 내용 입니다.직무 내용
            입니다.직무 내용 입니다.직무 내용 입니다.직무 내용 입니다.직무 내용
            입니다.
          </InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>제출 마감일</SectionTitle>
        <InfoList>
          <InfoRow label="시급">~ 채용시까지</InfoRow>
        </InfoList>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>채용담당자 정보</SectionTitle>
        <InfoList>
          <InfoRow label="시급">10,000원</InfoRow>
        </InfoList>
      </Section>

      <Tap>
        <ButtonSmall
          type={"White"}
          text={"전화 지원"}
          onClick={() => setCallAlertOpen(true)}
        />
        <ButtonSmall
          text={"간편 지원"}
          onClick={() => navigate("/homeseeker/quickapply")}
        />
      </Tap>
      <Alert
        open={callAlertOpen}
        companyName={companyName}
        onConfirm={() => {
          setCallAlertOpen(false);
        }}
        onCancel={() => setCallAlertOpen(false)}
        onClose={() => setCallAlertOpen(false)}
      />
    </JobsContainer>
  );
}

function InfoRow2({ children, label }) {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{children || "-"}</Value>
    </Row>
  );
}

const Label = styled.span`
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
`;

function InfoRow({ children }) {
  return <Value>{children || "-"}</Value>;
}
const Value = styled.span`
  font-size: 18px;
  white-space: pre-line;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-line;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: start;
`;

const Content = styled.div`
  padding: 10px 20px;
`;

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const JobsContainer = styled.div``;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 20px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
  margin: 0;
`;

const Tap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px 20px;
  border-top: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const ShareButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
  }
`;
