import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";

export default function WriteContract() {
  return (
    <>
      <Headersection>
        <Header text={"계약서 작성"} showBack />
      </Headersection>
      <Menu>
        <div className="title">
          해당 지원자의
          <br />
          근로계약서를 추가할까요?
        </div>
        <Submenu>
          이름
          <span>홍길동</span>
          생년월일
          <span>1970.01.20</span>
          성별
          <span>남성</span>
          전화번호
          <span>010-2345-6789</span>
          주소
          <span>서울특별시 00구 00동 00로</span>
        </Submenu>
        <Submenu>
          근로계약서 첨부하기
          <div className="addfile">
            추가할 이력서를 여기에 끌어다 놓거나, <br />
            파일 선택 버튼을 선택해주세요.
            <SmallButton>
              <Icons.Upload />
              파일선택
            </SmallButton>
          </div>
        </Submenu>
      </Menu>
      <Footer>
        <Button text="계약서 전달하기" type="White"></Button>
      </Footer>
    </>
  );
}

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Menu = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;

  .title {
    align-self: stretch;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  span {
    font-weight: 400;
  }

  .alert {
    color: #ff5858;
    font-size: 15px;
  }

  .addfile {
    display: flex;
    padding: 15px 10px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px dashed var(--Foundation-Green-Normal, #2baf66);
    color: #000;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
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
`;
