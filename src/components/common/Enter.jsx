import styled from "styled-components";

export default function Enter({ type, text }) {
  return (
    <EnterContainer>
      <input className={`Input Input_${type}`} placeholder={text} />
    </EnterContainer>
  );
}

const EnterContainer = styled.div`
  display: flex;
  width: 294px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background-color: #fff;
  margin-top: 10px;

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;

    &:focus {
      outline: none;
    }
  }
`;
