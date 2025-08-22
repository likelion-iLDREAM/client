import { useState } from "react";
import styled from "styled-components";

export default function TimeRangePicker() {
  const [startHour, setStartHour] = useState("0");
  const [startMinute, setStartMinute] = useState("0");
  const [endHour, setEndHour] = useState("0");
  const [endMinute, setEndMinute] = useState("0");

  const hours = Array.from({ length: 24 }, (_, i) => i.toString());
  const minutes = ["0", "15", "30", "45"];

  return (
    <TimeRangeWrapper>
      <TimeSelectWrapper>
        <select
          value={startHour}
          onChange={(e) => setStartHour(e.target.value)}
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>
        :
        <select
          value={startMinute}
          onChange={(e) => setStartMinute(e.target.value)}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m.padStart(2, "0")}
            </option>
          ))}
        </select>
      </TimeSelectWrapper>

      <span>~</span>

      <TimeSelectWrapper>
        <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.padStart(2, "0")}
            </option>
          ))}
        </select>
        :
        <select
          value={endMinute}
          onChange={(e) => setEndMinute(e.target.value)}
        >
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
