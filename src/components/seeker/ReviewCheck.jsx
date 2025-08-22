// components/seeker/ReviewCheck.jsx — 컴포넌트 전체 교체
import styled from "styled-components";
import { useState } from "react";
import PropertyActive from "../../assets/PropertyActive.svg";
import PropertyInactive from "../../assets/PropertyInactive.svg";

export default function ReviewCheck({
  question = "",
  options = ["불친절해요", "보통이에요", "친절해요"],
  defaultValue = null,
  onChange,
}) {
  const [selected, setSelected] = useState(
    defaultValue ?? Math.floor((options?.length ?? 3) / 2)
  );
  const handle = (idx) => {
    setSelected(idx);
    onChange && onChange(idx);
  };

  return (
    <Wrap>
      {question ? <Title>{question}</Title> : null}
      <Icons>
        {options.map((_, idx) => (
          <Btn
            key={idx}
            type="button"
            onClick={() => handle(idx)}
            aria-pressed={selected === idx}
          >
            <Img
              src={selected === idx ? PropertyActive : PropertyInactive}
              alt=""
              draggable="false"
            />
          </Btn>
        ))}
      </Icons>
      <Options>
        {options.map((label, idx) => (
          <Lbl key={idx}>{label}</Lbl>
        ))}
      </Options>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 12px 0;
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 13px;
  font-weight: 700;
  font-size: 2px;
`;

const Icons = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1px;
  padding: 0 40px;
  margin-top: 6px;

  &::before {
    content: "";
    position: absolute;
    left: 40px;
    right: 40px;
    top: 18px;
    height: 2px;
    background: #e5e7eb;
  }
`;

const Btn = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  line-height: 0;
  position: relative;
  z-index: 1;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
  display: block;
`;

const Lbl = styled.span`
  font-size: 15px;
  color: var(--Foundation-Black-black-13, #000);
  white-space: nowrap;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0px;
  padding: 0px 8px;
  margin-top: 8px;
`;
