import { useState } from "react";
import styled from "styled-components";

export default function TimeRangePicker({ value, onChange }) {
  // props로부터 시간 문자열 분리: "HH:mm"
  const [startHour, startMinute] = (value?.start || "00:00").split(":");
  const [endHour, endMinute] = (value?.end || "00:00").split(":");
  // console.log(startHour, startMinute, endHour, endMinute);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // option 표시할 때도 문자열로 변환 후 padStart 적용
  {
    hours.map((h) => (
      <option key={h} value={h.toString()}>
        {h.toString().padStart(2, "0")}
      </option>
    ));
  }
  const minutes = ["0", "15", "30", "45"];

  // 시간 변경 핸들러

  // 변경 핸들러 내에서도 padStart 하기 전 문자열화
  const handleStartHourChange = (e) => {
    const val = e.target.value.toString().padStart(2, "0");
    const newStart = `${val}:${startMinute.toString().padStart(2, "0")}`;
    onChange && onChange({ start: newStart, end: value.end });
  };

  const handleStartMinuteChange = (e) => {
    const newStart = `${startHour.padStart(2, "0")}:${e.target.value.padStart(
      2,
      "0"
    )}`;
    onChange && onChange({ start: newStart, end: value.end });
  };

  const handleEndHourChange = (e) => {
    const newEnd = `${e.target.value.padStart(2, "0")}:${endMinute}`;
    onChange && onChange({ start: value.start, end: newEnd });
  };

  const handleEndMinuteChange = (e) => {
    const newEnd = `${endHour.padStart(2, "0")}:${e.target.value.padStart(
      2,
      "0"
    )}`;
    onChange && onChange({ start: value.start, end: newEnd });
  };
  // console.log(startHour, endHour, startMinute, endMinute);
  return (
    <TimeRangeWrapper>
      <TimeSelectWrapper>
        <select value={startHour} onChange={handleStartHourChange}>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>
        :
        <select value={startMinute} onChange={handleStartMinuteChange}>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m.padStart(2, "0")}
            </option>
          ))}
        </select>
      </TimeSelectWrapper>

      <span>~</span>

      <TimeSelectWrapper>
        <select value={endHour} onChange={handleEndHourChange}>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>
        :
        <select value={endMinute} onChange={handleEndMinuteChange}>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m.padStart(2, "0")}
            </option>
          ))}
        </select>
      </TimeSelectWrapper>
    </TimeRangeWrapper>
  );
}

const TimeRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
`;

const TimeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  select {
    height: 40px;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid #bbb;
    background: white;
    font-size: 1rem;
    min-width: 50px;
    text-align: center;
    &:focus {
      outline: none;
      border: 1px solid #bbb;
      box-shadow: none;
    }
  }
`;
