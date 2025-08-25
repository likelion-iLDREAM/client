import styled from "styled-components";
import Header from "../../../components/common/Header";
import { BsBuilding } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const serverUrl = import.meta.env.VITE_ILDREAM_URL;
export default function SelectRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state || {}; // 값 받기
  return (
    <SelectRoleContainer>
      <Header text={"회원가입"} />
      <div className="Text1">
        <div>회원 정보가 없어</div>
        <div>회원가입을 진행할게요.</div>
      </div>
      <div className="Text2">
        <div>어떤 용도로</div>
        <div>사용하시나요?</div>
      </div>

      <div className="Select">
        <div
          className="select1"
          onClick={async () => {
            try {
              const token = await getToken(phone, "EMPLOYER");
              // sessionStorage.setItem("authToken", token);
              navigate("/signupemployer", { state: { token } });
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <BsBuilding size="100" color="#0F3D24" />
          <div className="text1">기업</div>
          <div>구인공고를 올리고 싶어요</div>
        </div>
        <div
          className="select2"
          onClick={async () => {
            try {
              await getToken(phone, "WORKER");
            } catch (e) {
              console.error(e);
            }
            navigate("/terms/namebirth");
          }}
        >
          <IoPeople size="100" color="#0F3D24" />
          <div className="text2">구직자</div>
          <div>원하는 기업에 취직하고 싶어요</div>
        </div>
      </div>
    </SelectRoleContainer>
  );
}

async function getToken(phone, role) {
  try {
    const response = await fetch(`${serverUrl}/auth/signup-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        userType: role,
      }), // 임의 값 222222
    });
    console.log(await response.json());
    const data = await response.json();
    return await data.data.signupToken;
  } catch (e) {
    throw new Error(e);
  }
}

const SelectRoleContainer = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100dvh;
  margin-bottom: 200px;
  > .Text1 {
    font-size: 25px;
    font-weight: 700;
    margin-top: 30px;
    margin-left: 20px;
  }
  > .Text2 {
    font-size: 25px;
    font-weight: 700;
    margin-top: 30px;
    margin-left: 20px;
    margin-bottom: 15px;
  }
  > .Select {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  > .Select > .select1 {
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    border: 1px solid var(--Foundation-Green-Normal, #2baf66);
    font-size: 15px;
    cursor: pointer;
  }
  > .Select > .select1 > .text1 {
    font-size: 30px;
    font-weight: 700;
  }
  > .Select > .select2 {
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    border: 1px solid var(--Foundation-Green-Normal, #2baf66);
    cursor: pointer;
  }
  > .Select > .select2 > .text2 {
    font-size: 30px;
    font-weight: 700;
  }
  > .Bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    padding: 10px;
  }
`;
