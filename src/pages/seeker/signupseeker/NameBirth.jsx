// pages/terms/NameBirth.jsx
import styled from "styled-components";
import Header from "../../../components/common/Header";
import ProgressBar from "../../../components/common/Progressbar";
import Enter from "../../../components/common/Enter";
import Button from "../../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NameBirth() {
  const navigate = useNavigate();
  return (
    <NameBirthContainer>
      <Header text={"회원가입"} />
      <Info>
        <ProgressBar value={"40"} max={"100"} />
        <h2 className="Text1">
          이름과
          <br />
          주민등록번호 앞 7자리를
          <br />
          입력해주세요.
        </h2>

        <Section />
      </Info>

      <div className="Bottom">
        <Button
          text={"다음"}
          type={"White"}
          onClick={() => navigate("/terms/address")}
        />
      </div>
    </NameBirthContainer>
  );
}

const Info = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 40px;
`;

const NameBirthContainer = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .Text1 {
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    padding: 30px 30px;
    margin: 0;
  }

  > .Bottom {
    margin-top: 99px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
`;

function Section() {
  // 이름 세션 저장 (Enter.jsx 수정 없이)
  const [name, setName] = useState(
    () => sessionStorage.getItem("signup.name") || ""
  );
  const sectionRootRef = useRef(null);

  useEffect(() => {
    const nameInput = sectionRootRef.current?.querySelector("input.Input_name");
    if (!nameInput) return;
    if (name && nameInput.value !== name) nameInput.value = name;
    const onInput = (e) => {
      const v = e.target.value;
      setName(v);
      sessionStorage.setItem("signup.name", v);
    };
    nameInput.addEventListener("input", onInput);
    return () => nameInput.removeEventListener("input", onInput);
  }, [name]);

  // 주민등록번호 → 생년월일/성별 계산
  const [ridFront, setRidFront] = useState("");
  const [ridBack1, setRidBack1] = useState("");
  const [phone] = useState("010-2345-6789");
  const back1Ref = useRef(null);

  const onChangeRidFront = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setRidFront(onlyDigits);
    if (onlyDigits.length === 6) back1Ref.current?.focus();
  };
  const onChangeRidBack1 = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 1);
    setRidBack1(onlyDigits);
  };

  useEffect(() => {
    const computeBirthGender = (front6, back1) => {
      if (front6.length !== 6 || back1.length !== 1) return null;
      const yy = parseInt(front6.slice(0, 2), 10);
      const mm = front6.slice(2, 4);
      const dd = front6.slice(4, 6);
      const g = parseInt(back1, 10);
      let century = 1900;
      if ([1, 2, 5, 6].includes(g)) century = 1900;
      else if ([3, 4, 7, 8].includes(g)) century = 2000;
      else if ([9, 0].includes(g)) century = 1800;
      const year = century + yy;
      const gender = g % 2 === 1 ? "남성" : "여성";
      const birth = `${year}.${mm}.${dd}`;
      return { birth, gender };
    };

    const res = computeBirthGender(ridFront, ridBack1);
    if (res) {
      sessionStorage.setItem("signup.birth", res.birth);
      sessionStorage.setItem("signup.gender", res.gender);
      sessionStorage.setItem("signup.ridFront", ridFront);
      sessionStorage.setItem("signup.ridBack1", ridBack1);
    }
  }, [ridFront, ridBack1]);

  return (
    <SectionContainer ref={sectionRootRef}>
      <div className="Field">
        <div className="Label">이름</div>
        <Enter type={"name"} text={"이름을 입력해주세요."} />
      </div>

      <div className="Field">
        <div className="Label">주민등록번호 앞 7자리</div>
        <div className="RidRow">
          <input
            className="Rid6"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="주민등록번호"
            value={ridFront}
            onChange={onChangeRidFront}
            maxLength={6}
          />
          <span className="Dash">-</span>
          <input
            className="Rid1"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="_ * * * * * *"
            value={ridBack1}
            onChange={onChangeRidBack1}
            maxLength={1}
            ref={back1Ref}
          />
        </div>
      </div>

      <div className="Field">
        <div className="Label">전화번호</div>
        <input className="Phone" value={phone} disabled readOnly />
      </div>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;

  .Field {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .Label {
    color: #0f3d24;
    font-size: 20px;
    font-weight: 400;
  }

  .RidRow {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    column-gap: 8px;
    align-items: center;
    width: 100%;
  }

  .Dash {
    color: #8c8c8c;
    font-size: 20px;
    user-select: none;
  }

  .Rid6,
  .Rid1,
  .Phone {
    height: 44px;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
    padding: 10px 12px;
    font-size: 18px;
    color: #1f1f1f;
    outline: none;
    box-sizing: border-box;
  }

  .Rid6::placeholder,
  .Rid1::placeholder {
    color: #bfbfbf;
  }

  .Rid6 {
    width: 100%;
    min-width: 0;
  }

  .Rid1 {
    width: 100%;
    letter-spacing: 2px;
  }

  .Phone {
    width: 100%;
    background: #e9e9e9;
    color: #6a6a6a;
    cursor: not-allowed;
  }

  > .Birth {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  }
  > .Birth > input {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
    color: var(--Foundation-Black-black-6, #bfbfbf);
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:focus {
      outline: none;
    }
  }
`;
