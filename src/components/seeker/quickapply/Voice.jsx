import styled from "styled-components";
import { useState } from "react";
import { FiMic } from "react-icons/fi";
import { IoInformationCircle } from "react-icons/io5";

export default function Voice() {
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const questionTitle = "요양보호사 경력이 있으시면 말씀해주세요.";

  const toggleRecord = () => setIsRecording((v) => !v);

  return (
    <Container>
      <Title>{questionTitle}</Title>
      <AnswerArea>
        <AnswerTextarea
          placeholder="이곳에 질문에 대한 답변을 남겨주세요."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <MicSection>
          <MicButton
            type="button"
            aria-pressed={isRecording}
            onClick={toggleRecord}
            $active={isRecording}
          >
            <FiMic size={50} />
          </MicButton>
          <MicLabel>{isRecording ? "녹음 중..." : "녹음하기"}</MicLabel>
        </MicSection>

        <InfoBanner>
          <IoInformationCircle size={25} className="icon" />
          <InfoText>
            상자에 직접 입력하거나 상단의 녹음 버튼을 누르고 말씀해주세요.
            <br />
            저희가 받아 적어드릴게요!
          </InfoText>
        </InfoBanner>
      </AnswerArea>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h2`
  margin: 0 0 12px 0;
  padding: 0 10px;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.35;
  color: #18a058;
`;

const AnswerTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px;
  resize: none;
  outline: none;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 7px;
  border: 1px solid var(--Foundation-Black-black-6, #bfbfbf);
  background: var(--Foundation-surface-White, #fff);

  ::placeholder {
    color: #a7a7a7;
  }
`;

const MicSection = styled.div`
  margin: 20px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MicButton = styled.button`
  width: 92px;
  height: 92px;
  border: none;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#18a058" : "#eaf7f0")};
  color: ${({ $active }) => ($active ? "#fff" : "#18a058")};
  transition: background 0.2s ease, color 0.2s ease, transform 0.05s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const MicLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #18a058;
  letter-spacing: -0.01em;
`;

const InfoBanner = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #eaf7f0;

  .icon {
    fill: var(--Foundation-Green-Normal, #2baf66);
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
  color: #000;
`;

const AnswerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
`;
