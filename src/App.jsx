import "./App.css";
import { RouterProvider, Routes, Route, Link } from "react-router-dom";
import router from "./Router.jsx";
import Button from "./components/common/Button";
import "./styles/color.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
