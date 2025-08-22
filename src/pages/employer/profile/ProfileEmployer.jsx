import Header from "../../../components/common/Header";
import TapBar from "../../../components/common/TapBar";
import styled from "styled-components";
import {Icons } from "../../../components/icons/index";
import Button from "../../../components/common/Button";
import { PiX } from "react-icons/pi";
import { BsAspectRatio } from "react-icons/bs";

export default function ProfileEmployer(){
    return (
    <>
        <Header Islogo />
        <ProfileWrapper>
            <ProfileImage><Icons.Building color="var(--Foundation-Green-Normal)" size={55} /></ProfileImage>
            <ContentWrapper>
                <SubWrapper style={{fontWeight:"700"}}>{"기업명"}</SubWrapper>
                <SubWrapper>
                    구인분야
                </SubWrapper>
                <SmallButton>
                <Icons.UserEdit/>내 기업 수정
                </SmallButton>
            </ContentWrapper>
        </ProfileWrapper>
        <Menu>
            <Submenu>
                <div>기업 후기<span>{0}회</span></div>
                <Icons.ArrowForward size={24}/>
            </Submenu>
            <Submenu>
                <div>저장된 추가 질문</div>
                <Icons.ArrowForward size={24}/>
            </Submenu>
        </Menu>
        <TapBar/>
    </>
    )
}

const ProfileWrapper = styled.div`
display: flex;
padding: 20px 10px;
align-items: center;
gap: 20px;
align-self: stretch;
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
align-items: flex-start;
gap: 8px;
`;

const SubWrapper = styled.div`
display: flex;
flex-direction : column;
gap : 5px;
font-size : 20px;
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
padding: 10px 20px;
align-items: center;
gap: 15px;
align-self: stretch;
border-radius: 7px;
background: var(--Foundation-Green-Light, #EAF7F0);
div{
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
flex: 1 0 0;
align-self: stretch;
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
height: 78px;

}

span{
    align-self: stretch;
    color: var(--Foundation-Green-Normal, #2BAF66);
}
`;

const Text = styled.div`

`;

const Menu = styled.div`
display: flex;
padding: 20px;
flex-direction: column;
align-items: flex-start;
gap: 19px;
flex: 1 0 0;
align-self: stretch;
`;