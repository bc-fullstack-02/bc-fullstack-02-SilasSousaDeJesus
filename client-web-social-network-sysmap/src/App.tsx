import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "../src/Pages/Login/index";
import "./App.css";
import SignUp from "./Pages/Signup";
import Home from "./Pages/Home";
import ProfilePage from "./Pages/ProfilePage";
import Friends from "./Pages/Friends";

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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/friends",
    element: <Friends  />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
