import styled from "styled-components";
import Header from "../../../components/common/Header";
import Employername from "../../../components/employer/Employername";
import EmployerTitle from "../../../components/employer/EmployTitle";
import Button from "../../../components/common/Button";

export default function QuickApplyEnd() {
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
            서류 결과는 00일 안에 <br />
            발표될 예정이에요!
          </p>
          <br />
          <p>
            000님의 새로운 출발을 <br />
            응원할게요!
          </p>
        </End>
      </Section>
      <Tap>
        <Button type={"White"} text={"다른 공고 확인하기"} />
        <Button text={"지원한 내역 확인하기"} />
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
