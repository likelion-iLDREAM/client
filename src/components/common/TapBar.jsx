import styled from "styled-components";
import {Icons} from '../icons/index';
import {useState} from "react";
export default function TapBar() {
  const [activeTab, setActiveTab] = useState("folder");

  return (
    <TapBarContainer>
      <CompTab active = {activeTab === "folder"} onClick={()=>setActiveTab("folder")}>
      { activeTab === "folder" ? <Icons.FolderActive color="var(--Foundation-Green-Normal)" size={24} /> :
      <Icons.FolderInactive color="var(--Foundation-Green-Darker)" size={24} />} 공고현황</CompTab>
      <CompTab active = {activeTab === "add"} onClick={()=>setActiveTab("add")} ><Icons.Add size={24} />새 공고</CompTab>
      <CompTab active = {activeTab === "emp_profile"} onClick={()=>setActiveTab("emp_profile")} >{activeTab === "emp_profile"
      ? <Icons.PersonActive color="var(--Foundation-Green-Normal)" size={24} /> :
      <Icons.PersonInactive color="var(--Foundation-Green-Darker)" size={24} />} 공고현황</CompTab>
    </TapBarContainer>
  );
}

const TapBarContainer = styled.div`
  display: flex;
  width: 400px;
  height: 70px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: var(--Foundation-Green-Light, #eaf7f0);
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0; /* = width: 100% */
  bottom: 10%;
`;

const CompTab = styled.button`
cursor : pointer;
display: flex;
height: 70px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 5px;
flex: 1 0 0;
// font-size: 12px;
font-weight: 700;
line-height: normal;
border : none;
background-color : transparent;
color: ${({ active }) =>
    active ? "var(--Foundation-Green-Normal, #2BAF66)" : "var(--Foundation-Green-Darker)"};
&:hover{
background-color : #DFF3E8;
}
&:active{

}
`;