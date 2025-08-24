// components/seeker/quickapply/Voice.jsx
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { FiMic } from "react-icons/fi";
import { IoInformationCircle } from "react-icons/io5";
import { useState } from "react";

export default function Voice({
  value = "",
  onChange = () => {},
  placeholder = "이곳에 질문에 대한 답변을 남겨주세요.",
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [supportMsg, setSupportMsg] = useState("");
  const recognitionRef = useRef(null);
  const keepAliveRef = useRef(false);
  const valueRef = useRef(value);

  // 외부 value 변화 추적해 onresult에서 이어붙일 때 사용
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupportMsg(
        "이 브라우저에서는 음성 인식을 지원하지 않습니다. (Chrome/Edge 권장)"
      );
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "ko-KR";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const transcript = res[0].transcript.trim();
        if (res.isFinal) finalText += transcript + " ";
      }
      if (finalText) {
        const next =
          (valueRef.current ? `${valueRef.current} ` : "") + finalText;
        onChange(next.trim());
      }
    };

    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setSupportMsg(
          "마이크 권한이 필요합니다. 브라우저 설정에서 허용해주세요."
        );
      } else if (e.error !== "no-speech") {
        setSupportMsg(`음성 인식 오류: ${e.error}`);
      }
      keepAliveRef.current = false;
      setIsRecording(false);
    };

    rec.onend = () => {
      if (keepAliveRef.current) {
        try {
          rec.start();
        } catch {}
      }
    };

    recognitionRef.current = rec;
    return () => {
      try {
        rec.stop();
      } catch {}
      recognitionRef.current = null;
      keepAliveRef.current = false;
    };
  }, [onChange]);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    setSupportMsg("");
    keepAliveRef.current = true;
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch {}
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    keepAliveRef.current = false;
    try {
      recognitionRef.current.stop();
    } catch {}
    setIsRecording(false);
  };

  const toggle = () => {
    if (!recognitionRef.current) {
      return setSupportMsg(
        "이 브라우저에서는 음성 인식을 지원하지 않습니다. (Chrome/Edge 권장)"
      );
    }
    isRecording ? stopRecording() : startRecording();
  };

  return (
    <Container>
      <AnswerArea>
        <AnswerTextarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <MicSection>
          <MicButton
            type="button"
            aria-pressed={isRecording}
            onClick={toggle}
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
            받아 적어드릴게요!
          </InfoText>
        </InfoBanner>

        {supportMsg && <SupportMsg>{supportMsg}</SupportMsg>}
      </AnswerArea>
    </Container>
  );
}

const Container = styled.div``;

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

const SupportMsg = styled.p`
  margin: 8px 0 0;
  color: #d92d20;
  font-size: 14px;
  font-weight: 600;
`;

const AnswerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
`;
