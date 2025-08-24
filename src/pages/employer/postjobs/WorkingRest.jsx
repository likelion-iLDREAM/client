import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { Icons } from "../../../components/icons/index";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TimeRangePicker from "../../../components/common/TimeRangePicker";
import { IoIosArrowBack } from "react-icons/io";
import Alert_post from "../../../components/employer/Alert_post";

export default function WorkingRest() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  console.log("prevState입니다. ", prevState);

  const handleNext = () => {
    // 휴게시간을 분 단위로 변환
    const restTime = Number(hours) * 60 + Number(minutes);

    // 근무요일을 배열로, 요일 지정이 아니면 빈 배열로
    const workDays = selectedoptions.date ? selectedDays : [];

    // 근무 시작/종료 시간에 ":00" 붙여서 HH:mm:ss 형태로 맞추기
    const workStartTime = workTime.start ? `${workTime.start}:00` : null;
    const workEndTime = workTime.end ? `${workTime.end}:00` : null;

    // workType 결정: date가 선택되어 있으면 "요일 지정", count가 선택되어 있으면 "주 횟수"
    let workType = "";
    if (selectedoptions.date) workType = "요일 지정";
    else if (selectedoptions.count) workType = "주 횟수";

    navigate("/employer/postjobs/jobdescription", {
      state: {
        ...prevState,
        restTime,
        workDays,
        workDaysCount: selectedoptions.count
          ? Number(workDaysCount) || null
          : null,
        workStartTime,
        workEndTime,
        workType,
      },
    });
  };

  const [selectedoptions, setSelectedoptions] = useState({
    date: true,
    count: false,
  });
  const [workTime, setWorkTime] = useState({ start: "09:30", end: "18:00" });
  const [workDaysCount, setWorkDaysCount] = useState("");

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
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>
      {/* <Headersection>
        <HeaderContainer>
          <BackButton
            type="button"
            aria-label="뒤로가기"
            onClick={() => setBackAlertOpen(true)}
          >
            <IoIosArrowBack />
          </BackButton>
          {"새 공고"}
        </HeaderContainer>
      </Headersection> */}
      <Alert_post
        open={backAlertOpen}
        onConfirm={() => {
          setBackAlertOpen(false);
          navigate("/employer");
        }}
        onCancel={() => setBackAlertOpen(false)}
        onClose={() => setBackAlertOpen(false)}
      />
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
              <TimeRangePicker value={workTime} onChange={setWorkTime} />
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
                주{" "}
                <input
                  className="count"
                  value={workDaysCount}
                  onChange={(e) => {
                    // 숫자만 입력 허용 (필요시)
                    const onlyNum = e.target.value.replace(/\D/g, "");
                    setWorkDaysCount(onlyNum);
                  }}
                />{" "}
                회
              </InputCount>
              <TimeRangePicker value={workTime} onChange={setWorkTime} />
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

// 변경: position 추가
const HeaderContainer = styled.div`
  position: relative;
  width: 400px;
  height: 70px;
  background-color: #eaf7f0;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 추가: 뒤로가기 버튼 스타일
const BackButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Headersection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--Foundation-Black-black-5, #d9d9d9);
`;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
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
