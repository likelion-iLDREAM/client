import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import {Icons} from "../../../components/icons/index";
import styled from "styled-components";

export default function ProfileEmployerEdit(){
    return (
    <>
        <Header text="내 기업 수정"/>
                <ProfileWrapper>
                    <ProfileImage><Icons.Building color="var(--Foundation-Green-Normal)" size={55} /></ProfileImage>
                    <SmallButton>
                        <Icons.UserEdit/>내 기업 수정
                        </SmallButton>
                    
                    <ContentWrapper>
                        <SubWrapper style={{fontWeight:"700"}}>{"기업명"}</SubWrapper>
                        <SubWrapper>
                            구인분야
                        </SubWrapper>
                        
                    </ContentWrapper>
                </ProfileWrapper>
                <Menu>
                    <Submenu>
                        기업명
                        <span>기업명입니다.</span>
                    </Submenu>
                    <Submenu>
                        이메일
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Enter text={"000000@gmail.com"}/>
                            <button>인증</button>
                        </div>
                        <span className="alert">인증이 완료되었습니다.</span>
                    </Submenu>
                    <Submenu>
                        대표자명
                        <span>강길동</span>
                    </Submenu>
                    <Submenu>
                        대표자 연락처
                        <EnterWrapper>
                            <input readOnly placeholder="010-1234-5678"/>
                        </EnterWrapper>
                    </Submenu>
                    <Submenu>
                        사업자 등록번호
                        <EnterWrapper>
                            <input readOnly placeholder="000-00-0000"/>
                        </EnterWrapper>
                        <span className="alert">사업자 인증이 완료되었습니다.</span>
                    </Submenu>
                    <Submenu>
                        주소
                        <InputWrapper>
                            <Inputaddress>{"서울특별시 00구 00동 00로 0000"} </Inputaddress>
                            <Icons.Map color="var(--Foundation-Green-Normal)" size={24} cursor={"pointer"} onClick={()=>console.log("주소버튼")}/>
                        </InputWrapper>
                        <Inputtitle placeholder={"000아파트 1004호"}/>    
                    </Submenu>
                    <Submenu>
                        구인분야
                        <div>여기에 구인분야 필터</div>
                        <span className="alert">구인 분야는 최대 3개만 선택 가능합니다.</span>
                    </Submenu>
                </Menu>
                <Footer><Button text="저장하기" type="White"/>
        </Footer>
    </>
    )
}




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

const EnterWrapper = styled.div`

  display: flex;
  width: 294px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background: var(--Foundation-Black-black-5, #D9D9D9);
  margin-top: 10px;

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;
    background: var(--Foundation-Black-black-5, #D9D9D9);
    pointerevent : none;

    &:focus {
      outline: none;
    } 
  }
`;

const Footer = styled.div`
background-color : White;
display: flex;
padding: 10px 0;
flex-direction: column;
align-items: center;
gap: 10px;
`;