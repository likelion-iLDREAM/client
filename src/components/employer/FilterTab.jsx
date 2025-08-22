import styled from "styled-components";
import { useState } from "react";

const TABS = [
  { label: "채용 중 공고", value: "OPEN" },
  { label: "마감된 공고", value: "CLOSED" },
];

export default function FilterTab({ onChange }) {
  const [selected, setSelected] = useState(0);

  const handleClick = (idx) => {
    setSelected(idx);
    if (onChange) {
      onChange(TABS[idx].value);
    }
  };
  return (
    <TabMenu>
      {TABS.map((tab, idx) => (
        <TabItem
          key={tab.label}
          active={selected === idx}
          onClick={() => handleClick(idx)}
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
