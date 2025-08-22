import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./styles/color.css";
import HomeSeeker from "./pages/Seeker/HomeSeeker";
import LoginStart from "./pages/auth/login/LoginStart";
import Opt from "./pages/auth/login/Opt";
import Phonenum from "./pages/auth/login/Phonenum";
import SelectRole from "./pages/auth/signup/SelectRole";
import * as Employer from "./index.js";

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
        element: <SelectRole />,
      },
      {path: "/employer",
        children: [
          {
          path: "",
          element : <Employer.HomeEmployer />,
          },
          {
          path: "checkreview",
          element : <Employer.CheckReview />,
          },
          {
          path: "questionlist",
          element : <Employer.QuestionList />,
          },
          {
          path: "postjobs",
          children : [
            {
              path : "",
              element : <Employer.ApplyMethod />,
            },
            {
              path : "TitleCategory",
              element : <Employer.TitleCategory/>,
            },
            {
              path : "PayLocation",
              element : <Employer.PayLocation/>,
            },
            {
              path : "RequirementType",
              element : <Employer.RequirementType/>,
            },
            {
              path : "WorkingRest",
              element : <Employer.WorkingRest/>,
            },
            {
              path : "JobDescription",
              element : <Employer.JobDescription/>,
            },
            {
              path : "AddQuestions",
              element : <Employer.AddQuestions/>,
            },
            {
              path : "PostComplete",
              element : <Employer.PostComplete/>,
            },
          ],
          },
          {
          path: "profile",
          children : [
              {
                path : "",
                element : <Employer.ProfileEmployer />,
              },
              {
                path : "Edit",
                element : <Employer.ProfileEmployerEdit/>,
              },
            ],
          },
          {
          path: "seekerlist",
          children : [
            {
              path : "",
              element : <Employer.FinalAccept />,
            },
            {
              path : "Resume",
              element : <Employer.Resume/>,
            },
            {
              path : "seekerlist",
              element : <Employer.SeekerList/>,
            },
            {
              path : "WriteContract",
              element : <Employer.WriteContract/>,
            },
          ],
          },
          {
          path: "singupemployer",
          children : [
            {
              path : "",
              element : <Employer.InfoEmployer />,
            },
            {
              path : "hiringfields",
              element : <Employer.HiringFields/>,
            },
            {
              path : "singupendemployer",
              element : <Employer.SignupEndEmployer/>,
            },
          ],
          },
      ],},
    ],
    
  },
]);

export default router;
