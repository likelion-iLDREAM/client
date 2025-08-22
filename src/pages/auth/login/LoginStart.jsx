import styled from "styled-components";
import Button from "../../../components/common/Button";
import ildreamText from "../../../assets/ildreamText.svg";
import "../../../styles/color.css";
import { useNavigate } from "react-router-dom";

export default function LoginStart() {
  const navigate = useNavigate();
  return (
    <LoginContainer>
      <div className="Logo">
        <img src={ildreamText} />
      </div>
      <div className="Bottom">
        <Button
          text={"전화번호로 시작하기"}
          onClick={() => navigate("/phone")}
        />
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: #ebf8ed;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .Bottom {
    margin-top: 213px;
    margin-bottom: 35px;
  }
  > .Logo {
    img {
      width: 255px;
      height: 215px;
    }
    margin-top: 40%;
  }
`;
