import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import Alert from "../quickapply/Alert";
import { useState } from "react";

export default function Recommend() {
  const [callAlertOpen, setCallAlertOpen] = useState(false);
  const companyName = "구인업체명";
  return (
    <RecommendContainer>
      <div>
        <Section12>
          <div className="Section1">
            <div className="Text1">구인업체명</div>
            <div className="Title">[지역] 구인공고명</div>
            <div className="Address">서울 특별시 00로 00구 000</div>
          </div>
          <Arrow />
        </Section12>
        <Section3>
          <div className="Tag">~채용시마감</div>
          <div className="Tag">학력무관</div>
          <div className="Tag">돌봄</div>
        </Section3>
        <Section4>
          <div className="Contents">
            <h3>시급</h3>
            10,000원
          </div>
          <div className="Contents">
            <h3>근무시간</h3>
            평일 월~금 <br />
            (오후) 2시 00분 ~ (오후) 5시 00분
          </div>
          <div className="Contents">
            <h3>고용형태</h3>
            시간제 정규직
          </div>
        </Section4>
      </div>
      <div>
        <div className="Tip">
          <p>➡️오른쪽으로 넘겨서 다른 채용을 확인할 수 있어요!</p>
          <p>⬅️왼쪽으로 넘기면 이전 공고를 확인할 수 있어요!</p>
        </div>
        <Apply>
          <button className="Call" onClick={() => setCallAlertOpen(true)}>
            전화 지원
          </button>
          <button className="Simple">간편 지원</button>
        </Apply>
      </div>
      <Alert
        open={callAlertOpen}
        companyName={companyName}
        onConfirm={() => {
          setCallAlertOpen(false);
        }}
        onCancel={() => setCallAlertOpen(false)}
        onClose={() => setCallAlertOpen(false)}
      />
    </RecommendContainer>
  );
}

const Apply = styled.div`
  display: flex;
  padding: 10px;
  margin: 5px 0 5px 0;
  gap: 10px;
  > .Call {
    background-color: white;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Green-Normal);
    padding: 10px 20px;
    text-wrap: nowrap;
    color: var(--Foundation-Green-Normal);
    display: flex;
    width: 140px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
  > .Simple {
    background-color: var(--Foundation-Green-Normal);
    cursor: pointer;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
    text-wrap: nowrap;
    color: white;
    display: flex;
    width: 140px;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 20px;
  }
`;

const Section4 = styled.div`
  padding: 10px;
  h3 {
    margin: 0 0 10px;
  }
  > .Contents {
    margin: 0 0 10px;
  }
`;

const Section3 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px 10px 0 10px;
  margin-bottom: 5px;
  > .Tag {
    padding: 0 5px 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 31px;
    background-color: #fff;
    border-radius: 8px;
  }
`;

const Arrow = styled(IoIosArrowForward)`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  width: 25px;
  height: 25px;
  margin-top: 10px;
`;

const Section12 = styled.div`
  display: flex;
  justify-content: row;
  align-items: baseline;
  > .Section1 {
    display: flex;
    padding: 0 10px 0 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    margin-top: 10px;
  }
  > .Section1 > .Text1 {
    font-size: 18px;
  }
  > .Section1 > .Title {
    font-weight: 700;
    font-size: 25px;
  }
  > .Section1 > .Address {
    font-size: 18px;
  }
`;

const RecommendContainer = styled.div`
  width: 330px;
  height: 573px;
  background-color: var(--Foundation-Green-Light, #eaf7f0);
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .Tip {
    margin: 0px 0px 0px 0px;
    font-size: 15px;
  }
  .Tip p {
    margin: 2px 0;
  }
`;
