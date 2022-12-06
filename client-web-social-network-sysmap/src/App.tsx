import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "../src/Pages/Login/index";
import "./App.css";
import SignUp from "./Pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
