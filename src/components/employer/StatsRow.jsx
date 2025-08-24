import React from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function StatsRow({ totalApplicants, genderCounts, barData }) {
  const value = totalApplicants; // 원형 차트 값
  const maxValue = totalApplicants;
  const maxBarValue = barData.reduce((acc, cur) => acc + cur.value, 0);
  console.log(
    `statsrow 남성 : ${genderCounts["남성"]} 여성 : ${genderCounts["여성"]}`
  );
  return (
    <Wrapper>
      <CircleStats>
        <RoundStat>
          <CircularProgressbar
            value={genderCounts["여성"]}
            maxValue={maxValue}
            //   text={`총 지원자\n${value}명`}
            strokeWidth={15}
            styles={buildStyles({
              textSize: "15px",
              pathColor: "#e54e21",
              trailColor: "#3B96FF",
              textColor: "#000",
              strokeLinecap: "square",
              position: "relative",
            })}
          ></CircularProgressbar>
          <span>
            총 지원자 <br /> {value}명
          </span>
        </RoundStat>
        <StatLegend>
          <div>
            <LegendDot color="#3B96FF" /> 남성{" "}
            {Math.round((genderCounts["남성"] / value) * 100) || 0}% (
            {genderCounts["남성"] || 0}명)
          </div>
          <div>
            <LegendDot color="#e54e21" /> 여성{" "}
            {Math.round((genderCounts["여성"] / value) * 100) || 0}% (
            {genderCounts["여성"] || 0}명)
          </div>
        </StatLegend>
      </CircleStats>
      <BarChart>
        {barData.map((item) => {
          const heightPx = (item.value / maxBarValue) * 100;
          return (
            <BarItem key={item.label}>
              <BarValue>{item.value}명</BarValue>
              <Bar style={{ height: `${heightPx}px` }} />
              <BarLabel>{item.label}</BarLabel>
            </BarItem>
          );
        })}
      </BarChart>
    </Wrapper>
  );
}

// 스타일

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 20px 0;
`;

const RoundStat = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  position: relative;
  span {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -40%);
  }
`;

const StatLabel = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 700;
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 100px;
  width: 100%; /* 너비 자동 조절 */
`;

const BarItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bar = styled.div`
  width: 18px;
  background-color: #23c163;
  border-radius: 5px 5px 0 0;
  transition: height 0.3s ease;
  min-height: 4px;
`;

const BarLabel = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: #222;
`;

const StatLegend = styled.div`
  margin-top: 6px;
  font-size: 14px;
  color: #888;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 120px;
`;

const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background: ${({ color }) => color};
  margin-right: 4px;
`;

const CircleStats = styled.div`
  width: 120px;
`;

const BarValue = styled.div`
  margin-bottom: 4px;
  font-size: 12px;
  color: #222;
  text-align: center;
  user-select: none;
`;
