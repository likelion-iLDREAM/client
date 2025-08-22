import styled from "styled-components";
import Header from "../../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useState } from "react";

export default function ReviewTag() {
  const navigate = useNavigate();
  const TAGS = [
    "승진기회가 열려있어요",
    "유연근무",
    "교대근무",
    "텃세가 심해요",
    "교육제공",
    "근무환경이 쾌적해요",
    "엄격해요",
    "위생이 안좋아요",
  ];
  const [selected, setSelected] = useState([]);
  const toggleTag = (label) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );

  return (
    <ReviewContainer>
      <Header text={"고용주 후기 작성"} showBack />
      <Section>
        <p>
          해당되는 특징이 있다면
          <br />
          선택해주세요!
        </p>
      </Section>
      <TagGrid>
        {TAGS.map((label) => (
          <Tag
            key={label}
            type="button"
            onClick={() => toggleTag(label)}
            $active={selected.includes(label)}
          >
            {label}
          </Tag>
        ))}
      </TagGrid>
      <Tap>
        <Button
          onClick={() => navigate("/homeseeker/review/tag")}
          text={"작성하기"}
        />
      </Tap>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div``;

const Section = styled.div`
  padding: 20px 40px;
  p {
    font-size: 25px;
  }
`;

const Tap = styled.div`
  border-top: 1px solid #bbb;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagGrid = styled.div`
  padding: 0 32px;
  margin: 12px 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 10px;
`;

const Tag = styled.button`
  background-color: #fff;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Green-Darker, #0f3d24);
  padding: 10px 12px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
`;
