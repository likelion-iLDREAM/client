import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import styled from "styled-components";
import {Icons} from "../../../components/icons/index";

export default function Resume(){
    return (
    <>
        <Header text="지원자 이력서"/>
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
                                    <input readOnly placeholder="요양보호사 경력이 3년 있습니다."/>
                                </EnterWrapper>
                                <span>2.(준)고령자(50세 이상)을 만족하시나요?</span>
                                <EnterWrapper>
                                    <input readOnly placeholder="네, 올해 만 54세입니다."/>
                                </EnterWrapper>
                                
                            </Submenu>
                            <Submenu>
                                지원자 이력
                                <ItemWrapper>
                               <TextWrapper>
                                <Information>
                                <div>{"업체명"}</div>
                                <div>
                                    <span className="title">{"직무 설명"}</span>
                                </div>
                                <div>{"서울특별시 00구 00로 00로"}</div>
                                <div>{"2020.01 ~ 2021.01 (1년 이상"}</div>
                                </Information>

                                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", gap:"5px"}}>
                                <Filter>♥️돌봄</Filter>
                                </div>
                            </TextWrapper>
                               <TextWrapper>
                                <Information>
                                <div>{"업체명"}</div>
                                <div>
                                    <span className="title">{"직무 설명"}</span>
                                </div>
                                <div>{"서울특별시 00구 00로 00로"}</div>
                                <div>{"2020.01 ~ 2021.01 (1년 이상"}</div>
                                </Information>

                                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", gap:"5px"}}>
                                <Filter>♥️돌봄</Filter>
                                </div>
                            </TextWrapper>
                               <TextWrapper>
                                <Information>
                                <div>{"업체명"}</div>
                                <div>
                                    <span className="title">{"직무 설명"}</span>
                                </div>
                                <div>{"서울특별시 00구 00로 00로"}</div>
                                <div>{"2020.01 ~ 2021.01 (1년 이상)"}</div>
                                </Information>

                                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end", gap:"5px"}}>
                                <Filter>♥️돌봄</Filter>
                                </div>
                            </TextWrapper>
                            </ItemWrapper>
                            </Submenu>
                            
                        </Menu>
        <Footer>
            <Button text="전화 면접하기" type="White"></Button>
        </Footer>
    </>
    )
}


const Footer = styled.div`
background-color : White;
display: flex;
padding: 10px;
flex-direction: column;
align-items: center;
gap: 10px;
`;




const ProfileWrapper = styled.div`
display: flex;
width: 360px;
padding: 20px 10px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
border-bottom: 1px solid #BFBFBF;
`;

const ProfileImage = styled.div`
display: flex;
width: 60px;
height: 60px;
padding: 10px;
justify-content: center;
align-items: center;
border-radius: 1000px;
border: 5px solid var(--Foundation-Green-Normal, #2BAF66);
background: var(--Foundation-surface-White, #FFF);
`;

const ContentWrapper = styled.div`
display: flex;
width: 220px;
flex-direction: column;
align-items: center;
gap: 15px;
`;

const SubWrapper = styled.div`
display: flex;
width: 220px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
align-self: stretch;
color: #000;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const SmallButton = styled.button`
display: flex;
padding: 5px 10px;
align-items: center;
gap: 5px;
border-radius: 7px;
background: var(--Foundation-Green-Normal, #2BAF66);
border : none;
color: var(--Foundation-surface-White, #FFF);
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
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

span{
font-weight: 400;
}

.alert {
color: #FF5858;
font-size: 15px;
}

button {
display: flex;
padding: 0 10px;
align-items: center;
gap: 10px;
border-radius: 6px;
background: var(--Foundation-Green-Light, #EAF7F0);
border : none;
align-self : stretch; 
margin-top: 10px;
cursor : pointer;
}
`;

const Text = styled.div`

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
    border : none;
    
    &:focus {
      outline: none;
    } 
  }
`;


const InputWrapper = styled.div`
display: flex;
padding: 7px;
gap: 10px;
border-radius: 7px;
border: 1px solid var(--Foundation-Black-black-6, #BFBFBF);
background: var(--Foundation-surface-White, #FFF);
width: 100%;   /* 화면 너비(부모) 100%로 채움 */
box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
height : 46px;
align-items:center;
`;

const Inputtitle = styled.input`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #FFF);
  font-size: 1rem;
  border: 1px solid var(--Foundation-Black-black-6, #BFBFBF);
  padding: 10px;
  outline: none;
  flex: 1;
  display: flex;
  width: 100%;   /* 화면 너비(부모) 100%로 채움 */
  box-sizing: border-box; /* 패딩/보더 포함 너비 계산 */
align-self: stretch;
color: var(--Foundation-Black-black-7, #8C8C8C);
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;  
align-items: center;
`;

const Inputaddress = styled.div`
  border-radius: 7px;
  background: var(--Foundation-surface-White, #FFF);
  font-size: 1rem;
  border: none;
  outline: none;
  flex: 1 0 0;
align-self: stretch;
color: var(--Foundation-Black-black-7, #8C8C8C);
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;


const ItemWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
align-self: stretch;
border-radius: 7px;
color : #fff;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;        /* gap 줄임 (기존 10px → 6px) */
  flex: 1 0 0;
  font-weight: 400;
  
  /* 업체명, 주소, 기간 등 일반 텍스트 */
  > div:not(.title) {
    font-family: "Pretendard Variable";
    font-size: 15px;   /* 폰트 사이즈 작게 */
    line-height: normal;
    // color: #222;       /* 선명한 색상 유지 */
    color :#fff;
  }

  /* 직무 설명 (title 클래스) */
  .title {
    font-weight: 700;
    font-size: 20px;   /* 기존 크기 유지 또는 약간 크게 */
    // color: #000;
    color :#fff;
  }
`;

const Filter = styled.div`
display: flex;
padding: 2px 5px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 5px;
border: 1px solid var(--Foundation-surface-White);
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
align-self: stretch;border-radius: 8px;
background: var(--Foundation-Green-Normal, #2BAF66);
`;