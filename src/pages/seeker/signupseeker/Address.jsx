import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";

export default function Address() {
  return (
    <AddressContainer>
      <Header text={"회원가입"} />
      <ProgressBar value={"60"} max={"100"} />
      <h2 className="Text1">
        주소와
        <br />
        희망 근무지역을
        <br />
        선택해주세요.
      </h2>
      <Section />
      <div className="Bottom">
        <Button text={"다음"} type={"White"} />
      </div>
    </AddressContainer>
  );
}

const AddressContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .Text1 {
    margin-left: 45px;
    margin-right: auto;
  }
  > .Bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    padding: 10px;
  }
`;

function Section() {
  return (
    <SectionContainer>
      <p className="p">주소입력</p>
      <SectionInfo>
        <Enter text={"아이콘으로 주소 검색하기"} />
        <Enter text={"상세 주소"} />
      </SectionInfo>
    </SectionContainer>
  );
}

const SectionInfo = styled.div``;

const SectionContainer = styled.div`
  padding-top: 80px;
  padding-bottom: 261px;
  > .p {
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin: 0;
  }
`;
