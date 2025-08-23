import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./styles/color.css";
import LoginStart from "./pages/auth/login/LoginStart";
import Opt from "./pages/auth/login/Opt";
import Phonenum from "./pages/auth/login/Phonenum";
import SelectRole from "./pages/auth/signup/SelectRole";
import Terms from "./pages/auth/signup/Terms";
// Signup
import NameBirth from "./pages/seeker/signupseeker/namebirth";
import Address from "./pages/seeker/signupseeker/address";
import Interests from "./pages/seeker/signupseeker/interests";
import SignupEnd from "./pages/seeker/signupseeker/signupend";
import * as Employer from "./EmployerIndex.js";
import * as Seeker from "./SeekerIndex.js";

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "",
        element: <LoginStart />,
      },
      {
        path: "/phone",
        element: <Phonenum />,
      },
      {
        path: "/opt",
        element: <Opt />,
      },
      {
        path: "/terms",
        children: [
          {
            path: "",
            element: <Terms />,
          },
          {
            path: "selectrole",
            element: <SelectRole />,
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
        // singupemployer --> signupemployer (오타수정),
        // /employer/singupemployer --> /signupemployer (라우터 수정)
        path: "signupemployer",
        children: [
          {
            path: "",
            element: <Employer.InfoEmployer />,
          },
          {
            path: "hiringfields",
            element: <Employer.HiringFields />,
          },
          {
            path: "signupendemployer",
            element: <Employer.SignupEndEmployer />,
          },
        ],
      },
      {
        path: "/homeseeker",
        children: [
          {
            path: "",
            element: <Seeker.Jobs />,
          },
          {
            path: "jobsdetail",
            element: <Seeker.JobsDetails />,
          },
          {
            path: "quickapply",
            children: [
              {
                path: "",
                element: <Seeker.QuickApply />,
              },
              {
                path: "question",
                element: <Seeker.Question />,
              },
              {
                path: "end",
                element: <Seeker.QuickApplyEnd />,
              },
            ],
          },
          {
            path: "guide",
            children: [
              {
                path: "",
                element: <Seeker.CareerGuide />,
              },
              {
                path: "pos",
                element: <Seeker.PosGuide />,
              },
              {
                path: "gov",
                element: <Seeker.PublicJobs />,
              },
              {
                path: "cert",
                element: <Seeker.Certificates />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                path: "",
                element: <Seeker.ProfileSeeker />,
              },
              {
                path: "edit",
                element: <Seeker.ProfileSeekerEdit />,
              },
            ],
          },
          {
            path: "review",
            children: [
              {
                path: "",
                element: <Seeker.ReviewStart />,
              },
              {
                path: "tag",
                element: <Seeker.ReviewTag />,
              },
            ],
          },
          {
            path: "result",
            children: [
              {
                path: "fail",
                element: <Seeker.CheckFail />,
              },
              {
                path: "success",
                element: <Seeker.CheckSuccess />,
              },
              {
                path: "summary",
                element: <Seeker.ContractSummary />,
              },
            ],
          },
          {
            path: "resume",
            children: [
              {
                path: "",
                element: <Seeker.Resume />,
              },
              {
                path: "add",
                element: <Seeker.ResumeAdd />,
              },
              {
                path: "edit",
                element: <Seeker.ResumeEdit />,
              },
            ],
          },
        ],
      },
      {
        path: "/employer",
        children: [
          {
            path: "",
            element: <Employer.HomeEmployer />,
          },
          {
            path: "checkreview",
            element: <Employer.CheckReview />,
          },
          {
            path: "questionlist",
            element: <Employer.QuestionList />,
          },
          {
            path: "postjobs",
            children: [
              {
                path: "",
                element: <Employer.ApplyMethod />,
              },
              {
                path: "TitleCategory",
                element: <Employer.TitleCategory />,
              },
              {
                path: "PayLocation",
                element: <Employer.PayLocation />,
              },
              {
                path: "RequirementType",
                element: <Employer.RequirementType />,
              },
              {
                path: "WorkingRest",
                element: <Employer.WorkingRest />,
              },
              {
                path: "JobDescription",
                element: <Employer.JobDescription />,
              },
              {
                path: "AddQuestions",
                element: <Employer.AddQuestions />,
              },
              {
                path: "PostComplete",
                element: <Employer.PostComplete />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                path: "",
                element: <Employer.ProfileEmployer />,
              },
              {
                path: "Edit",
                element: <Employer.ProfileEmployerEdit />,
              },
            ],
          },
          {
            path: "seekerlist",
            children: [
              {
                path: "",
                element: <Employer.FinalAccept />,
              },
              {
                path: "Resume",
                element: <Employer.Resume />,
              },
              {
                path: "seekerlist",
                element: <Employer.SeekerList />,
              },
              {
                path: "WriteContract",
                element: <Employer.WriteContract />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
