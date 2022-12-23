import React, { useEffect, FC } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Inicio from "./pages/Inicio/Inicio";
import Home from "./pages/Home";
import Community from "./pages/Community";
import TimeLine from "./pages/TimeLine";
import Message from "./pages/Message";
import { PrivateRoute } from "./redux/authentication/Authentication";
import EditPost from "./pages/EditPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastre-se" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/post/:profileId/:id"
        element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/rede"
        element={
          <PrivateRoute>
            <TimeLine />
          </PrivateRoute>
        }
      />
      <Route
        path="/comunidade"
        element={
          <PrivateRoute>
            <Community />
          </PrivateRoute>
        }
      />
      <Route
        path="/mensagem/:id"
        element={
          <PrivateRoute>
            <Message />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
