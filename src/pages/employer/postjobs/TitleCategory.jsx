import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import Enter from "../../../components/common/Enter";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../components/icons/index";

export default function TitleCategory() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("../PayLocation");
  };
  // 오늘 날짜 YYYY-MM-DD 형식 구하는 함수
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getTodayDateString());
  const [endDate, setEndDate] = useState("");
  const [selectedoptions, setSelectedoptions] = useState({
    date: true,
    count: false,
  });

  const toggleOption = (key) => {
    setSelectedoptions((prev) => {
      const isSelected = prev[key];

      if (key === "count" && !isSelected) {
        // '채용시 마감' 선택 시 endDate 초기화
        setEndDate("");
      }

      if (isSelected) {
        return {};
      } else {
        return { [key]: !prev[key] };
      }
    });
  };

  return (
    <>
      <Header text="새공고" />
      <ApplyWrapper>
        <ProgressBar value={"25"} max={"100"} />
        <Question>
          공고 제목과 <br />
          구인분야와 <br />
          구인기간을 알려주세요.
        </Question>
        <OptionsWrapper>
          <SubWrapper>
            공고제목
            <Enter text="제목을 입력해주세요" />
          </SubWrapper>
          <SubWrapper>
            구인기간
            <Period>
              <Inputdate
                type="date"
                placeholder="Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              ~
              <Inputdate
                type="date"
                placeholder="Date"
                value={selectedoptions.count ? "" : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={selectedoptions.count} // 채용시마감이 선택되면 비활성화
              />
            </Period>
            <Selectcheckbox onClick={() => toggleOption("count")}>
              {selectedoptions.count ? (
                <Icons.CheckboxActive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              ) : (
                <Icons.CheckboxInactive
                  color="var(--Foundation-Green-Normal)"
                  size={18}
                />
              )}
              채용시 마감
            </Selectcheckbox>
          </SubWrapper>
          <SubWrapper>구인분야</SubWrapper>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}

const ApplyWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 45px;
  flex: 1 0 0;
  align-self: stretch;
  background-color: var(--Foundation-Black-black-1);
`;

const Question = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Inputdate = styled.input`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // align-self: stretch;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);
`;

const Period = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 20px;
`;

const Selectcheckbox = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  font-size: 15px;
`;
