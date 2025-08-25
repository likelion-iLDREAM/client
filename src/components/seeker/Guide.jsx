// Guide.jsx — 전체 교체
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

export default function Guide({ title, onClick, thumbnail }) {
  return (
    <Card type="button" onClick={onClick}>
      <Thumb aria-hidden>
        {thumbnail ? <img src={thumbnail} alt="" /> : null}
      </Thumb>
      <Title>{title}</Title>
      <Arrow>
        <IoIosArrowForward />
      </Arrow>
    </Card>
  );
}

const Card = styled.button`
  display: grid;
  grid-template-columns: 48px 1fr 24px;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 77px;
  padding: 10px;
  border: 0;
  border-radius: 12px;
  background: var(--Foundation-Green-Light, #eaf7f0);
  box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: left;
`;

const Thumb = styled.div``;

const Title = styled.p`
  && {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    word-break: keep-all;
    overflow-wrap: anywhere;
    padding: 20px;
  }
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 30px;
    height: 30px;
  }
`;
