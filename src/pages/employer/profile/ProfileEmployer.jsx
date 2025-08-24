import Header from "../../../components/common/Header";
import TapBar from "../../../components/common/TapBar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { IoPersonCircleOutline } from "react-icons/io5";
import ButtonSmall from "../../../components/common/ButtonSmall";
import { AiOutlineEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Button from "../../../components/common/Button";
import { PiX } from "react-icons/pi";
import { BsAspectRatio } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProfileEmployer() {
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("employer.jobFields") || "[]");
    } catch {
      return [];
    }
  });

  const [name, setName] = useState(() =>
    (sessionStorage.getItem("employer.name") || "").trim()
  );
  const navigate = useNavigate();
  return (
    <>
      <Header text={"내 기업 정보"} />
      <Section>
        <TopCard>
          <Avatar>
            <Icons.Building color="var(--Foundation-Green-Normal)" size={45} />
          </Avatar>
          <TopRight>
            <Name>{name || "고객님"}</Name>
            <TagRow>
              {tags.slice(0, 3).map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </TagRow>
            <EditRow>
              <SmallButton onClick={() => navigate("/employer/profile/edit")}>
                <Icons.UserEdit />내 기업 수정
              </SmallButton>
            </EditRow>
          </TopRight>
        </TopCard>
        <Menu>
          <Submenu onClick={() => navigate("/employer/checkreview")}>
            <div>
              기업 후기<span>{0}회</span>
            </div>
            <Icons.ArrowForward size={24} />
          </Submenu>
          <Submenu onClick={() => navigate("/employer/questionlist")}>
            <div>저장된 추가 질문</div>
            <Icons.ArrowForward size={24} />
          </Submenu>
        </Menu>
      </Section>
      <TapBar initialTab="emp_profile" />
    </>
  );
}
const Section = styled.div`
  padding: 20px;
`;
const TopRight = styled.div`
  flex: 1;
`;
const Name = styled.p`
  margin: 2px 0 6px;
  font-weight: 700;
  font-size: 20px;
`;
const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 10px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
  font-size: 15px;
`;

const EditRow = styled.div`
  margin-top: 10px;
  width: 140px;

  .edit-label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
const ProfileWrapper = styled.div`
  display: flex;
  padding: 20px 10px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-bottom: 1px solid #bfbfbf;
`;

const TopCard = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #bfbfbf;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  color: var(--Foundation-Green-Normal);
  width: 72px;
  align-self: stretch;
  justify-content: center;
`;

const ProfileImage = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  border: 5px solid var(--Foundation-Green-Normal, #2baf66);
  background: var(--Foundation-surface-White, #fff);
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
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
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
  cursor: pointer;
`;

const Submenu = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  border-radius: 7px;
  cursor: pointer;
  background: var(--Foundation-Green-Light, #eaf7f0);
  div {
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

  span {
    align-self: stretch;
    color: var(--Foundation-Green-Normal, #2baf66);
  }
`;

const Text = styled.div``;

const Menu = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 19px;
  flex: 1 0 0;
  align-self: stretch;
`;
