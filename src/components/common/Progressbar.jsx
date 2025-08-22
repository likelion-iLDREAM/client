import styled from "styled-components";

export default function ProgressBar({ value = 0, max = 100 }) {
  const percent = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));

  return (
    <BarContainer
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <BarFill style={{ width: `${percent}%` }} />
    </BarContainer>
  );
}

const BarContainer = styled.div`
  width: 319px;
  height: 23px;
  background-color: #eaf7f0;
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 30px;
`;

const BarFill = styled.div`
  height: 100%;
  width: 0%;
  background-color: #2baf66;
  border-radius: inherit;
  transition: width 0.35s ease;
`;