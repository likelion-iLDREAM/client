import styled from "styled-components";
import Header from "../../../components/common/Header";
import TextPosGuide from "./TextPosGuide";

export default function PosGuide() {
  return (
    <PosContainer>
      <Header text={"취업 길잡이"} showBack />
      <Section>
        <p>포스기 사용법</p>
        <VideoBox>
          <iframe
            src="https://www.youtube.com/embed/yTgLS_QYIs4?si=5lAhFi-qgTS4boP7"
            title="포스기 사용법"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </VideoBox>
        <TextBox>{TextPosGuide}</TextBox>
      </Section>
    </PosContainer>
  );
}

const PosContainer = styled.div``;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 30px;
  p {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
  }
`;

const VideoBox = styled.div`
  width: 100%;
  height: 233px;
  margin-top: 12px;
  overflow: hidden;
  background: #000;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

const TextBox = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  white-space: pre-line;
  overflow-wrap: anywhere;
  word-break: break-word;
`;
