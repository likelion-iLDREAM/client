import Header from "../../../components/common/Header";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/Progressbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert_post from "../../../components/employer/Alert_post";

export default function RequirementType() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state || {};
  console.log("prevState입니다. ", prevState);

  const handleNext = () => {
    navigate("/employer/postjobs/WorkingRest", {
      state: {
        ...prevState, // 이전 단계까지 누적된 데이터 유지
        careerRequirement: selectedCareer === "경력필요", // true/false로 변환 가능
        educationRequirement: selectedEducation || "",
        employmentType: selectedEmployment || "",
      },
    });
  };

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedEmployment, setSelectedEmployment] = useState(null);

  const handleSelect = (groupSetter, value) => {
    groupSetter(value);
  };
  const [backAlertOpen, setBackAlertOpen] = useState(false);

  return (
    <>
      <Headersection>
        <Header text={"지원자 현황"} showBack />
      </Headersection>

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
        <ProgressBar value={"50"} max={"100"} />
        <Question>
          자격 요건과 <br />
          고용형태를 <br />
          알려주세요.
        </Question>
        <OptionsWrapper>
          <Tag>
            <p>경력조건</p>
            <SubWrapper>
              {["신입가능", "경력필요"].map((item) => (
                <Filter
                  key={item}
                  active={selectedCareer === item}
                  onClick={() => handleSelect(setSelectedCareer, item)}
                >
                  {item}
                </Filter>
              ))}
            </SubWrapper>
          </Tag>
          <Tag>
            <p>학력</p>
            <SubWrapper>
              {[
                "무관",
                "고등학교 졸업 이상",
                "학사 이상",
                "석사 이상",
                "박사 이상",
              ].map((item) => (
                <Filter
                  key={item}
                  active={selectedEducation === item}
                  onClick={() => handleSelect(setSelectedEducation, item)}
                >
                  {item}
                </Filter>
              ))}
            </SubWrapper>{" "}
          </Tag>
          <Tag>
            <p>고용형태</p>
            <SubWrapper>
              {[
                "아르바이트",
                "정규직",
                "계약직",
                "파견직",
                "인턴직",
                "교육생",
                "프리랜서",
              ].map((item) => (
                <Filter
                  key={item}
                  active={selectedEmployment === item}
                  onClick={() => handleSelect(setSelectedEmployment, item)}
                >
                  {item}
                </Filter>
              ))}
            </SubWrapper>
          </Tag>
        </OptionsWrapper>
      </ApplyWrapper>
      <Footer>
        <Button text="다음" type="White" onClick={handleNext} />
      </Footer>
    </>
  );
}

const Tag = styled.div`
  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
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
  width: 311px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  font-size: 20px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #d9d9d9;
  padding: 10px;
`;

const SubWrapper = styled.div`
  display: flex;
  width: 294px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 5px;
  flex-wrap: wrap;
`;

const Filter = styled.button`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 7px;
  border: #8d8d8d;
  background: ${({ active }) =>
    active
      ? "var(--Foundation-Green-Normal)"
      : "var(--Foundation-Green-Light)"};
  color: ${({ active }) => (active ? "#FFF" : "8D8D8D")};
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &:hover {
    background: ${({ active }) =>
      active ? "var(--Foundation-Green-Normal)" : "#e1f4e4"};
  }
`;
