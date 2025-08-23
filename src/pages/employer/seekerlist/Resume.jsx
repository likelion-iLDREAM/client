import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const navigate = useNavigate("");
  const handleBack = () => {
    navigate("/employer/seekerlist/seekerlist"); //navigate("/employer/seekerlist/seekerlist/${joblist.id}");
  };
  const savedCategory = "♥️돌봄"; // 예: 따로 저장해둔 정보
  const currentFilter = ["♥️돌봄", "돌봄", "돌봄"]; // 예: 필터 안 내용
  return (
    <>
      <Headersection>
        <HeaderContainer>
          <BackButton type="button" aria-label="뒤로가기" onClick={handleBack}>
            <IoIosArrowBack />
          </BackButton>
          {"지원자 현황"}
        </HeaderContainer>
      </Headersection>
      {/* <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection> */}
      <Menu>
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
          추가질문
          <span>1. 요양보호사 경력이 있으시면 말씀해주세요.</span>
          <EnterWrapper>
            <input readOnly placeholder="요양보호사 경력이 3년 있습니다." />
          </EnterWrapper>
          <span>2.(준)고령자(50세 이상)을 만족하시나요?</span>
          <EnterWrapper>
            <input readOnly placeholder="네, 올해 만 54세입니다." />
          </EnterWrapper>
        </Submenu>
        <Submenu>
          지원자 이력
          <ItemWrapper>
            <TextWrapper isCategoryMatch={savedCategory === currentFilter[0]}>
              <span className="Information">
                <div>{"업체명"}</div>
                <div>
                  <span className="title">{"직무 설명"}</span>
                </div>
                <div>{"서울특별시 00구 00로 00로"}</div>
                <div>{"2020.01 ~ 2021.01 (1년 이상"}</div>
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "5px",
                }}
              >
                <Filter>{currentFilter[0]}</Filter>
              </div>
            </TextWrapper>
            <TextWrapper isCategoryMatch={savedCategory === currentFilter[1]}>
              <span className="Information">
                <div>{"업체명"}</div>
                <div>
                  <span className="title">{"직무 설명"}</span>
                </div>
                <div>{"서울특별시 00구 00로 00로"}</div>
                <div>{"2020.01 ~ 2021.01 (1년 이상"}</div>
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "5px",
                }}
              >
                <Filter>{currentFilter[1]}</Filter>
              </div>
            </TextWrapper>
            <TextWrapper isCategoryMatch={savedCategory === currentFilter[2]}>
              <span className="Information">
                <div>{"업체명"}</div>
                <div>
                  <span className="title">{"직무 설명"}</span>
                </div>
                <div>{"서울특별시 00구 00로 00로"}</div>
                <div>{"2020.01 ~ 2021.01 (1년 이상)"}</div>
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "5px",
                }}
              >
                <Filter>{currentFilter[2]}</Filter>
              </div>
            </TextWrapper>
          </ItemWrapper>
        </Submenu>
      </Menu>
      <Footer>
        <Button text="전화 면접하기" type="White"></Button>
      </Footer>
    </>
  );
}

// 변경: position 추가
const HeaderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 추가: 뒤로가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 12px;
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

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
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

  button {
    display: flex;
    padding: 0 10px;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    border: none;
    align-self: stretch;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
`;

const EnterWrapper = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  border: 1px solid #000;

  > input {
    flex: 1 0 0;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 7px;
  color: #fff;
`;

const Filter = styled.div`
  display: flex;
  padding: 2px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: ${(props) =>
    props.isCategoryMatch
      ? "1px solid var(--Foundation-Green-Normal, #fff)"
      : "1px solid var(--Foundation-Black-black-13, #000)"};
  // border: 1px solid var(--Foundation-surface-White);
  background: var(--Foundation-Green-Light);
  color: var(--Foundation-Black-black-13, #000);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
`;

const TextWrapper = styled.div`
  display: flex;
  padding: 15px 20px;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
  border-radius: 8px;
  // background: var(--Foundation-Green-Normal, #2baf66);
  background: ${(props) =>
    props.isCategoryMatch
      ? "var(--Foundation-Green-Normal, #2baf66)"
      : "var(--Foundation-Green-Light, #EAF7F0)"};

  .Information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px; /* gap 줄임 (기존 10px → 6px) */
    flex: 1 0 0;
    font-weight: 400;

    /* 업체명, 주소, 기간 등 일반 텍스트 */
    > div:not(.title) {
      font-family: "Pretendard Variable";
      font-size: 15px; /* 폰트 사이즈 작게 */
      line-height: normal;
      color: ${(props) =>
        props.isCategoryMatch
          ? "#fff"
          : "var(--Foundation-Black-black-13, #000)"};
    }

    /* 직무 설명 (title 클래스) */
    .title {
      font-weight: 700;
      font-size: 20px; /* 기존 크기 유지 또는 약간 크게 */
      // color: #fff;
    }
  }
`;
