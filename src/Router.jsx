import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import "./styles/color.css";
import HomeSeeker from "./pages/Seeker/HomeSeeker";
import LoginStart from "./pages/auth/login/LoginStart";
import Opt from "./pages/auth/login/Opt";
import Phonenum from "./pages/auth/login/Phonenum";
import SelectRole from "./pages/auth/signup/SelectRole";

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
    ],
  },
]);

export default router;
