import { useState } from "react";
import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function HiringFields() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/employer/singupemployer/signupendemployer");
  };

  return (
    <>
      <Header text={"회원가입"} />
      <InterestContainer>
        <ProgressBar value={"80"} max={"100"} />
        <h2 className="Text1">
          구인분야 최대 3가지를
          <br />
          선택해주세요.
        </h2>
        <Section />
      </InterestContainer>
      <Footer>
        <Button text={"다음"} type={"White"} onClick={handleNext} />
      </Footer>
    </>
  );
}

const InterestContainer = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  gap: 30px;
  flex: 1 0 0;
  align-self: stretch;

  > .Text1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    align-self: stretch;
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

function Section() {
  const [selected, setSelected] = useState(new Set());

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3) return next;
        next.add(id);
      }
      return next;
    });
  };

  const rows = [
    [
      { id: 1, label: "🌱농사·원예·어업" },
      { id: 2, label: "🚚운전·배달" },
    ],
    [
      { id: 3, label: "🥬식품·옷·환경 가공" },
      { id: 4, label: "📄사무·금융" },
    ],
    [
      { id: 5, label: "🛒판매" },
      { id: 6, label: "❤️돌봄" },
      { id: 7, label: "🧹청소·미화" },
    ],
    [
      { id: 8, label: "🍲음식·서비스" },
      { id: 9, label: "🪚목공·공예·제조" },
    ],
    [
      { id: 10, label: "🎨문화·연구·기술" },
      { id: 11, label: "🏗️건설·시설 관리" },
    ],
    [
      { id: 12, label: "🔌전기·전자 수리" },
      { id: 13, label: "⚙️기계·금속 제작·수리" },
    ],
  ];

  return (
    <SectionContainer>
      <p className="p">구인분야</p>

      {rows.map((row, i) => (
        <div className="group" key={i}>
          {row.map((opt) => (
            <IntButton
              key={opt.id}
              text={opt.label}
              selected={selected.has(opt.id)}
              onClick={() => toggle(opt.id)}
            />
          ))}
        </div>
      ))}

      <div className="helper">{selected.size} / 3 선택됨</div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  //   padding-top: 30px;
  //   padding-bottom: 100px;
  //   width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //   gap: 10px;
  align-self: stretch;
  > .p {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }
  > .group {
    display: flex;
    gap: 10px;
  }
  .helper {
    margin-top: 8px;
    font-size: 13px;
    color: var(--Foundation-Black-black-7, #8c8c8c);
  }
`;

function IntButton({ onClick, text, selected }) {
  return (
    <IntButtonContainer>
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`IntButton ${selected ? "IntButton_Select" : ""}`}
      >
        {text}
      </button>
    </IntButtonContainer>
  );
}

const IntButtonContainer = styled.div`
  margin-top: 10px;

  > .IntButton {
    display: flex;
    height: 44px;
    padding: 5px 10px;
    align-items: center;
    border-radius: 7px;
    border: 1.3px solid var(--Foundation-Green-Darker, #0f3d24);
    background-color: #fff;
    color: var(--Foundation-Black-black-13, #000);
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.2px;
    cursor: pointer;
  }

  > .IntButton_Select {
    background-color: var(--Foundation-Green-Light, #eaf7f0);
    border-color: var(--Foundation-Green-Normal, #2baf66);
    color: var(--Foundation-Green-Darker, #0f3d24);
  }
`;
