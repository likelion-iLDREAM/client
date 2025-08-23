import styled from "styled-components";
import { Icons } from "../icons/index";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TapBar({ initialTab = "joblist" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (!initialTab) {
      const p = location.pathname || "";
      if (p.startsWith("/employer/profile")) {
        setActiveTab("emp_profile");
      } else if (p.startsWith("/employer/postjobs")) {
        setActiveTab("add");
      } else if (p.startsWith("/employer") || p === "/homeseeker") {
        setActiveTab("joblist");
      }
    }
  }, [location.pathname, initialTab]);

  return (
    <TapBarContainer>
      <CompTab
        active={activeTab === "joblist"}
        onClick={() => [setActiveTab("joblist"), navigate("/employer")]}
      >
        {activeTab === "joblist" ? (
          <Icons.HomeActive color="var(--Foundation-Green-Normal)" size={24} />
        ) : (
          <Icons.HomeInactive
            color="var(--Foundation-Green-Darker)"
            size={24}
          />
        )}{" "}
        공고 현황
      </CompTab>

      <CompTab
        active={activeTab === "add"}
        onClick={() => [setActiveTab("add"), navigate("/employer/postjobs")]}
      >
        <Icons.Add size={24} />새 공고
      </CompTab>

      <CompTab
        active={activeTab === "emp_profile"}
        onClick={() => [
          setActiveTab("emp_profile"),
          navigate("/employer/profile"),
        ]}
      >
        {activeTab === "emp_profile" ? (
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
