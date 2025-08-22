import Header from "../../components/common/Header";
import TapBar from "../../components/common/TapBar";
import styled from "styled-components";
import {Icons } from "../../components/icons/index";

const tags = [
  { label: "사장님이 친절해요", sentiment: "positive" },
  { label: "복지가 좋아요", sentiment: "positive" },
  { label: "급여가 정확해요", sentiment: "positive" },
  { label: "엄격한 편이에요", sentiment: "negative" },
  { label: "텃세가 없어요", sentiment: "positive" },
  // ...더 많은 태그 데이터
];

// 예시 데이터
const interpersonal = [
  { label: "사장님 친절도", sentiment: "positive", text: "좋아요👍" },
  { label: "동료 친절도", sentiment: "negative", text: "개선이 필요해요🥲" },
];

const work = [
  { label: "업무 강도", sentiment: "positive", text: "좋아요👍" },
  { label: "업무 명확성", sentiment: "negative", text: "개선이 필요해요🥲" },
];

const environment = [
  { label: "급여일 준수", sentiment: "positive", text: "좋아요👍" },
  { label: "휴게시간 준수", sentiment: "negative", text: "개선이 필요해요🥲" },
  { label: "시급 수준", sentiment: "positive", text: "좋아요👍" },
  { label: "복지 수준", sentiment: "negative", text: "개선이 필요해요🥲" },
  { label: "재근무 의사", sentiment: "positive", text: "좋아요👍" },

];

export default function CheckReview(){
    const topTags = tags.slice(0, 5);

    return (
    <>
        <Header text="기업 후기"/>
        <ProfileWrapper>
            <ProfileImage><Icons.Building color="var(--Foundation-Green-Normal)" size={55} /></ProfileImage>
            <ContentWrapper>
                <SubWrapper style={{fontWeight:"700"}}>{"기업명"}</SubWrapper>
                <SubWrapper style={{fontWeight:"700"}}>{"대표자명"} <div>{"강길동"}</div></SubWrapper>     
            </ContentWrapper>
            
        </ProfileWrapper>
        <CategoryWrapper>
            구인분야
        </CategoryWrapper>
        <Review>
            <div>기업 후기 <span className="count">{0}회</span></div>
            <TagContainer>
            {topTags.map((tag, idx) => (
                <Tag
                key={idx}
                $positive={tag.sentiment === "positive"}
                >
                #{tag.label}
                </Tag>
            ))}
            </TagContainer>
            <SectionTitle>대인 관계</SectionTitle>
            <div className="sectionlist">{interpersonal.map((item, idx) => (
                <Row key={idx}>
                <Label>{item.label}</Label>
                <EvalTag $positive={item.sentiment === "positive"}>
                    {item.text}
                </EvalTag>
                </Row>
            ))}</div>
            <SectionTitle>업무 특성</SectionTitle>
            <div className="sectionlist">{work.map((item, idx) => (
                <Row key={idx}>
                <Label>{item.label}</Label>
                <EvalTag $positive={item.sentiment === "positive"}>
                    {item.text}
                </EvalTag>
                </Row>
            ))}</div>
            <SectionTitle>근무 환경</SectionTitle>
            <div className="sectionlist">{environment.map((item, idx) => (
                <Row key={idx}>
                <Label>{item.label}</Label>
                <EvalTag $positive={item.sentiment === "positive"}>
                    {item.text}
                </EvalTag>
                </Row>
            ))}</div>
        </Review>
        <TapBar/>
    </>
    )
}

const ProfileWrapper = styled.div`
display: flex;
padding: 20px 10px;
align-items: center;
gap: 20px;
align-self: stretch;
`;

const ProfileImage = styled.div`
display: flex;
width: 60px;
height: 60px;
padding: 10px;
justify-content: center;
align-items: center;
border-radius: 1000px;
border: 5px solid var(--Foundation-Green-Normal, #2BAF66);
background: var(--Foundation-surface-White, #FFF);
`;

const ContentWrapper = styled.div`
display: flex;
width: 220px;
flex-direction: column;
align-items: flex-start;
gap: 8px;
`;

const SubWrapper = styled.div`
display: flex;
gap : 5px;
font-size : 20px;

div{
font-weight : 400;
}
`;

const CategoryWrapper = styled.div`
display: flex;
padding: 20px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 5px;
align-self: stretch;
font-size: 20px;
font-weight: 700;
border-bottom: 1px solid #BFBFBF;
`;

const SmallButton = styled.button`
display: flex;
padding: 5px 10px;
align-items: center;
gap: 5px;
border-radius: 7px;
background: var(--Foundation-Green-Normal, #2BAF66);
border : none;
color: var(--Foundation-surface-White, #FFF);
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Submenu = styled.div`
display: flex;
padding: 10px 20px;
align-items: center;
gap: 15px;
align-self: stretch;
border-radius: 7px;
background: var(--Foundation-Green-Light, #EAF7F0);
div{
display: flex;
flex-direction: column;
justify-content: center;
gap: 10px;
flex: 1 0 0;
align-self: stretch;
color: #000;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
height: 78px;

}

span{
    align-self: stretch;
    color: var(--Foundation-Green-Normal, #2BAF66);
}
`;


const Review = styled.div`
display: flex;
padding: 20px;
flex-direction: column;
justify-content: flex-end;
align-items: flex-start;
gap: 15px;
align-self: stretch;
font-size: 20px;
font-weight: 700;

.subcategory {
font-size:18px;
flex-direction : column;
gap : 10px;
span {
    display: flex;
    font-weight : 400;
    // display: flex;
}
}
.count {
    color: #666;
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.sectionlist {
    gap : 20px;
}

`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
display: flex;
padding: 3px 10px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 7px;
border: 1px solid ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
background: ${({ $positive }) => ($positive ? "#EAF7F0" : "#FFF3F3")};
color: ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
font-size: 15px;
font-weight: 700;

  
`;


const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  `;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
`;

const Label = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  min-width: 110px;
`;

const EvalTag = styled.span`
display: flex;
padding: 3px 10px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 7px;
border: 1px solid ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
background: ${({ $positive }) => ($positive ? "#EAF7F0" : "#FFF3F3")};
color: ${({ $positive }) => ($positive ? "#23c163" : "#FF5858")};
font-size: 12px;
font-weight: 700;
`;
