import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import Button from "../../../components/common/Button";
import Voice from "../../../components/seeker/quickapply/Voice";
import Choice from "../../../components/seeker/quickapply/Choice";

export default function Question() {
  return (
    <QuickApplyEndContainer>
      <Header text={"간편 지원"} showBack />
      <Section>
        <Content>
          <Name>
            <Employername text={"구인업체명"} />
            <EmployerTitle region={"서울"} title={"일로오세요"} />
          </Name>
          <p>간편 지원중이에요.</p>
        </Content>
        <End>
          <p>
            추가 질문이 있어요! <br />
          </p>
          <br />
          <p></p>
        </End>
        <QuestionBox>
          <Voice />
          <Choice />
        </QuestionBox>
      </Section>
      <Tap>
        <Button type={"White"} text={"다음"} />
      </Tap>
    </QuickApplyEndContainer>
  );
}

const QuickApplyEndContainer = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 20px;
`;

const Content = styled.div`
  padding: 10px 10px;
  > p {
    font-size: 30px;
    margin: 0;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  p {
    margin: 0;
    font-weight: 400;
  }
`;

const End = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 0 10px;

  p {
    font-size: 30px;
    font-weight: 700;
    margin: 0 0;
    white-space: pre-line;
    overflow-wrap: anywhere;
    word-break: break-word;
    white-space: pre-line;
  }
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  gap: 10px 0;
`;

const QuestionBox = styled.div``;
