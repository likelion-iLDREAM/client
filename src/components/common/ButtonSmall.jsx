import styled from "styled-components";

export default function ButtonSmall({ text, type, onClick }) {
  return (
    <ButtonSmallContainer>
      <button onClick={onClick} className={`ButtonSmall ButtonSmall_${type}`}>
        {text}
      </button>
    </ButtonSmallContainer>
  );
}

const ButtonSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .ButtonSmall {
    background-color: var(--Foundation-Green-Normal);
    cursor: pointer;
    border: none;
    border-radius: 7px;
    padding: 10px 20px;
    text-wrap: nowrap;
    color: white;
    display: flex;
    height: 45px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    font-weight: 700;
    font-size: 18px;
    width: 100%;
  }

  > .ButtonSmall_White {
    background-color: white;
    cursor: pointer;
    border: none;
    border-radius: 7px;
    border: 1px solid var(--Foundation-Green-Normal);
    text-wrap: nowrap;
    color: var(--Foundation-Green-Normal);
    display: flex;
    height: 45px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    font-weight: 700;
    font-size: 18px;
    width: 100%;
  }
`;
