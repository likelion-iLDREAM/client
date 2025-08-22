import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./styles/color.css";
import LoginStart from "./pages/auth/login/LoginStart";
import Opt from "./pages/auth/login/Opt";
import Phonenum from "./pages/auth/login/Phonenum";
import SelectRole from "./pages/auth/signup/SelectRole";
import Terms from "./pages/auth/signup/Terms";
import NameBirth from "./pages/seeker/signupseeker/NameBirth";
import Address from "./pages/seeker/signupseeker/Address";
import Interests from "./pages/seeker/signupseeker/Interests";
import SignupEnd from "./pages/seeker/signupseeker/SignupEnd";
import HomeSeeker from "./pages/Seeker/HomeSeeker";
import Jobs from "./pages/seeker/jobs/jobs";
import JobsDetails from "./pages/seeker/jobs/JobsDetail";
import QuickApply from "./pages/seeker/quickapply/QuickApply";
import QuickApplyEnd from "./pages/seeker/quickapply/QuickApplyEnd";
import CareerGuide from "./pages/seeker/careerguide/CareerGuide";
import PosGuide from "./pages/seeker/careerguide/PosGuide";
import PublicJobs from "./pages/seeker/careerguide/PublicJobs";
import Certificates from "./pages/seeker/careerguide/Certificates";
import ProfileSeeker from "./pages/seeker/profile/ProfileSeeker";
import ProfileSeekerEdit from "./pages/seeker/profile/ProfileSeekerEdit";
import ReviewStart from "./pages/seeker/review/ReviewStart";
import ReviewTag from "./pages/seeker/review/ReviewTag";
import CheckFail from "./pages/seeker/result/CheckFail";
import CheckSuccess from "./pages/seeker/result/CheckSuccess";
import ContractSummary from "./pages/seeker/result/ContractSummary";
import Resume from "./pages/seeker/resume/Resume";
import ResumeAdd from "./pages/seeker/resume/ResumeAdd";
import ResumeEdit from "./pages/seeker/resume/ResumeEdit";
import Question from "./pages/seeker/quickapply/Question";

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "",
        element: <LoginStart />,
      },
      {
        path: "/opt",
        element: <Opt />,
      },
      {
        path: "/phone",
        element: <Phonenum />,
      },
      {
        path: "/selectrole",
        children: [
          {
            path: "",
            element: <SelectRole />,
          },
          {
            path: "terms",
            element: <Terms />,
          },
          {
            path: "namebirth",
            element: <NameBirth />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "interest",
            element: <Interests />,
          },
          {
            path: "signend",
            element: <SignupEnd />,
          },
        ],
      },
      {
        path: "/homeseeker",
        children: [
          {
            path: "",
            element: <HomeSeeker />,
          },
          {
            path: "jobs",
            element: <Jobs />,
          },
          {
            path: "jobsdetail",
            element: <JobsDetails />,
          },
          {
            path: "quickapply",
            children: [
              {
                path: "",
                element: <QuickApply />,
              },
              {
                path: "question",
                element: <Question />,
              },
              {
                path: "end",
                element: <QuickApplyEnd />,
              },
            ],
          },
          {
            path: "guide",
            children: [
              {
                path: "",
                element: <CareerGuide />,
              },
              {
                path: "pos",
                element: <PosGuide />,
              },
              {
                path: "gov",
                element: <PublicJobs />,
              },
              {
                path: "cert",
                element: <Certificates />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                path: "",
                element: <ProfileSeeker />,
              },
              {
                path: "edit",
                element: <ProfileSeekerEdit />,
              },
            ],
          },
          {
            path: "review",
            children: [
              {
                path: "",
                element: <ReviewStart />,
              },
              {
                path: "tag",
                element: <ReviewTag />,
              },
            ],
          },
          {
            path: "result",
            children: [
              {
                path: "fail",
                element: <CheckFail />,
              },
              {
                path: "success",
                element: <CheckSuccess />,
              },
              {
                path: "summary",
                element: <ContractSummary />,
              },
            ],
          },
          {
            path: "resume",
            children: [
              {
                path: "",
                element: <Resume />,
              },
              {
                path: "add",
                element: <ResumeAdd />,
              },
              {
                path: "edit",
                element: <ResumeEdit />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
