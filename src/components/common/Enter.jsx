import styled from "styled-components";
// value, onChange props 추가
export default function Enter({ type, text, value, onChange }) {
  return (
    <EnterContainer>
      <input
        className={`Input Input_${type}`}
        placeholder={text}
        value={value}
        onChange={onChange}
      />
    </EnterContainer>
  );
}

const EnterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #bfbfbf;
  background-color: #fff;
  margin-top: 10px;
  padding: 0;

  > input::placeholder {
    text-align: start;
  }

  > input {
    border: none;
    font-size: 20px;
    font-weight: 400;
    width: 90%; /* 가로 꽉 채우기 */

    &:focus {
      outline: none;
    }
  }

  /* =========================
     추가: 좌우 패딩 제거 옵션
     사용법) <Enter type="NoPad" ... />
     ========================= */
  > input.Input_NoPad {
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
    box-sizing: border-box;
    background: transparent;
  }
`;
