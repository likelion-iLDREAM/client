import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeRangePicker from "../../../components/common/TimeRangePicker";

export default function WorkingRest() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("../JobDescription");
  };
  const [selectedoptions, setSelectedoptions] = useState({
    date: true,
    count: false,
  });

  const toggleOption = (key) => {
    setSelectedoptions((prev) => {
      const isSelected = prev[key];

      if (isSelected) {
        // 클릭한 게 이미 선택된 상태라면 -> 해제 -> 모두 해제 상태
        return {};
      } else {
        // 클릭한 게 선택 안 된 상태라면 -> 그 옵션만 선택
        return { [key]: !prev[key] };
      }
    });
  };

  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");

  const hourOptions = Array.from({ length: 13 }, (_, i) => i.toString()); // 0~12
  const minuteOptions = ["0", "15", "30", "45"];
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const specials = [
    { label: "평일", days: ["월", "화", "수", "목", "금"] },
    { label: "주말", days: ["토", "일"] },
    { label: "월수금", days: ["월", "수", "금"] },
    { label: "화목토", days: ["화", "목", "토"] },
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  const isSpecialSelected = (index) =>
    specials[index].days.every((day) => selectedDays.includes(day));

  const toggleSpecial = (index) => {
    const specialDays = specials[index].days;

    setSelectedDays((prev) => {
      if (isSpecialSelected(index)) {
        // 이미 선택된 special이면 해제
        return prev.filter((d) => !specialDays.includes(d));
      } else {
        let newDays = [...prev];
        if (specials[index].label === "평일") {
          // 평일 선택 시 월수금, 화목토 요일 제거
          newDays = newDays.filter(
            (d) =>
              !specials
                .find((s) => ["월수금", "화목토"].includes(s.label))
                .days.includes(d)
          );
        }
        if (["월수금", "화목토"].includes(specials[index].label)) {
          // 월수금, 화목토 선택 시 평일 요일 제거
          newDays = newDays.filter(
            (d) => !specials.find((s) => s.label === "평일").days.includes(d)
          );
        }
        // 선택된 special days 추가
        specialDays.forEach((d) => {
          if (!newDays.includes(d)) newDays.push(d);
        });
        return [...new Set(newDays)];
      }
    });
  };

  // 일반 요일 개별 토글
  const toggleDay = (d) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((v) => v !== d) : [...prev, d]
    );
  };

  const dateDisabled = !selectedoptions.date;
  const countDisabled = !selectedoptions.count;

  return (
    <>
      <Header text="새공고" />
      <ApplyWrapper>
        <ProgressBar value={"62.5"} max={"100"} />
        <Question>
          근무 시간과 <br /> 휴게 시간을 <br /> 알려주세요.
        </Question>
        <OptionsWrapper>
          근무 시간
          <div style={{ opacity: dateDisabled ? 0.5 : 1 }}>
            <Selectdate onClick={() => toggleOption("date")}>
              {selectedoptions.date ? (
                <Icons.CheckboxActive
                  color="var(--Foundation-Green-Normal)"
                  size={32}
                />
              ) : (
                <Icons.CheckboxInactive
                  color="var(--Foundation-Green-Normal)"
                  size={32}
                />
              )}
              요일 지정하기
            </Selectdate>
            <SubWrappter
              style={{ pointerEvents: dateDisabled ? "none" : "auto" }}
            >
              <DaySelectorWrapper>
                <Row>
                  {days.map((d) => (
                    <CircleButton
                      key={d}
                      selected={selectedDays.includes(d)}
                      onClick={() => toggleDay(d)}
                    >
                      {d}
                    </CircleButton>
                  ))}
                </Row>
                <Row>
                  {specials.map((s, i) => (
                    <RectButton
                      key={s.label}
                      selected={isSpecialSelected(i)}
                      onClick={() => toggleSpecial(i)}
                    >
                      {s.label}
                    </RectButton>
                  ))}
                </Row>
              </DaySelectorWrapper>
              <TimeRangePicker />
            </SubWrappter>
          </div>
          <CountWrapper style={{ opacity: countDisabled ? 0.5 : 1 }}>
            <Selectcount onClick={() => toggleOption("count")}>
              {selectedoptions.count ? (
                <Icons.CheckboxActive
                  color="var(--Foundation-Green-Normal)"
                  size={32}
                />
              ) : (
                <Icons.CheckboxInactive
                  color="var(--Foundation-Green-Normal)"
                  size={32}
                />
              )}
              주 횟수
            </Selectcount>
            <SubWrappter
              style={{ pointerEvents: countDisabled ? "none" : "auto" }}
            >
              <InputCount>
                주 <input className="count"></input>회
              </InputCount>
              <TimeRangePicker />
            </SubWrappter>
          </CountWrapper>
          {/* </Working> */}
          휴게 시간
          <Rest>
            <select value={hours} onChange={(e) => setHours(e.target.value)}>
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            시간
            <select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            분
          </Rest>
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
  gap: 25px;
  align-self: stretch;
  font-size: 20px;
  font-weight: 700;
`;

const Footer = styled.div`
  background-color: White;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Selectdate = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const Selectcount = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background-color: transparent;
  font-size: 20px;
`;

const Rest = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;

  select {
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 7px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    border: none;

    &:focus {
      outline: none;
      border: none;
    }
  }
`;

const InputCount = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  font-weight: 400;
  input {
    width: 10px;
    display: flex;
    border-radius: 7px;
    background: var(--Foundation-Green-Light, #eaf7f0);
    border: none;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const SubWrappter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 30px;
`;

const DaySelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin: 4px 0;
`;

const CircleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ selected }) =>
    selected
      ? "var(--Foundation-Green-Normal)"
      : "var(--Foundation-Green-Light)"};
  color: ${({ selected }) =>
    selected
      ? "var(--Foundation-Green-Light)"
      : "var(--Foundation-Green-Normal)"};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
`;

const RectButton = styled.button`
  border-radius: 12px;
  border: none;
  background: ${({ selected }) =>
    selected
      ? "var(--Foundation-Green-Normal)"
      : "var(--Foundation-Green-Light)"};
  color: ${({ selected }) =>
    selected
      ? "var(--Foundation-Green-Light)"
      : "var(--Foundation-Green-Normal)"};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
