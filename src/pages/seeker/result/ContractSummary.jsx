import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

export default function ContractSummary() {
  const navigate = useNavigate();

  return (
    <CheckContainer>
      <Header showBack text={"근로계약서 요약"} />
      <Text>축하해</Text>
      <Summary>
        <Section>
          <SectionTitle>근로계약서 요약</SectionTitle>
          <InfoList>
            <InfoRow2 label="근로 시작일">{`2025.08.25`}</InfoRow2>
            <InfoRow2 label="시급">10,000원</InfoRow2>
            <InfoRow2 label="근무지">서울특별시</InfoRow2>
            <InfoRow2 label="근무 시간">월~금 10:00 ~ 15:00</InfoRow2>
            <InfoRow2 label="휴게 시간">1시간</InfoRow2>
            <InfoRow2 label="세부 내용">
              1.0000 <br /> 2.000
            </InfoRow2>
          </InfoList>
        </Section>
      </Summary>

      <Tap>
        <Button
          type={"White"}
          onClick={() => navigate("/homeseeker/profile")}
          text={"처음으로 돌아가기"}
        />
        <Button
          onClick={() => navigate("/homeseeker/profile")}
          text={"근로 확정하기"}
        />
      </Tap>
    </CheckContainer>
  );
}

const CheckContainer = styled.div``;

const Text = styled.div`
  padding: 80px 40px;
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px 0;
`;

const Summary = styled.div`
  border-top: 1px solid #bbb;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 40px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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

const Value = styled.span`
  font-size: 18px;
  white-space: pre-line;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-line;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: start;
`;
