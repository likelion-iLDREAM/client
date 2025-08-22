import styled from "styled-components";
import { Icons } from "../icons/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TapBarSeeker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("folder");
  useEffect(() => {
    const p = location.pathname || "";
    if (p.startsWith("/homeseeker/profile")) {
      setActiveTab("seeker_profile");
    } else if (p.startsWith("/homeseeker/guide")) {
      setActiveTab("guide");
    } else if (p.startsWith("/homeseeker/jobs") || p === "/homeseeker") {
      setActiveTab("folder");
    }
  }, [location.pathname]);
  return (
    <TapBarContainer>
      <CompTab
        active={activeTab === "folder"}
        onClick={() => [setActiveTab("folder"), navigate("/homeseeker/jobs")]}
      >
        {activeTab === "folder" ? (
          <Icons.HomeActive color="var(--Foundation-Green-Normal)" size={24} />
        ) : (
          <Icons.HomeInactive
            color="var(--Foundation-Green-Darker)"
            size={24}
          />
        )}{" "}
        채용 공고
      </CompTab>

      <CompTab
        active={activeTab === "guide"}
        onClick={() => [setActiveTab("guide"), navigate("/homeseeker/guide")]}
      >
        {activeTab === "guide" ? (
          <Icons.BookActive color="var(--Foundation-Green-Normal)" size={24} />
        ) : (
          <Icons.BookInactive
            color="var(--Foundation-Green-Darker)"
            size={24}
          />
        )}{" "}
        취업 길잡이
      </CompTab>
      <CompTab
        active={activeTab === "seeker_profile"}
        onClick={() => [
          setActiveTab("seeker_profile"),
          navigate("/homeseeker/profile"),
        ]}
      >
        {activeTab === "seeker_profile" ? (
          <Icons.PersonActive
            color="var(--Foundation-Green-Normal)"
            size={24}
          />
        ) : (
          <Icons.PersonInactive
            color="var(--Foundation-Green-Darker)"
            size={24}
          />
        )}{" "}
        내 정보
      </CompTab>
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
  bottom: 0%;
`;

const CompTab = styled.button`
  cursor: pointer;
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
  border: none;
  background-color: transparent;
  color: ${({ active }) =>
    active
      ? "var(--Foundation-Green-Normal, #2BAF66)"
      : "var(--Foundation-Green-Darker)"};
  &:hover {
    background-color: #dff3e8;
  }
  &:active {
  }
`;
