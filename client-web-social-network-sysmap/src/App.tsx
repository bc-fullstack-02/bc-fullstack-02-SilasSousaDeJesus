import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "../src/Pages/Login/index";
import "./App.css";
import SignUp from "./Pages/Signup";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
