import styled from "styled-components";

export default function FilterTab({ currentTab, setCurrentTab }) {
  const TABS = [
    { label: "지원 완료" },
    { label: "면접 진행" },
    { label: "채용 확정" },
    { label: "최종 합격" },
  ];

  return (
    <TabMenu>
      {TABS.map((tab) => (
        <TabItem
          key={tab.label}
          active={tab.label === currentTab}
          onClick={() => setCurrentTab(tab.label)}
        >
          {tab.label}
        </TabItem>
      ))}
    </TabMenu>
  );
} // TabMenu 스타일
const TabMenu = styled.div`
  display: flex;
  width: 400px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
`;

// TabItem 스타일 (active prop으로 제어)
const TabItem = styled.div`
  flex: 1; /* 한 줄을 다 균등분배! */
  text-align: center; /* 텍스트 중앙정렬 */
  padding: 10px 0 12px 0;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ active }) => (active ? "500" : "400")};
  line-height: normal;
  color: ${({ active }) => (active ? "#222" : "#333")};
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    display: ${({ active }) => (active ? "block" : "none")};
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: #20c997;
    border-radius: 2px;
  }
`;
