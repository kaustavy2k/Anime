import React, { Component, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
const Anime = React.lazy(() => import("./Pages/Anime"));

function App() {
  function ProtectedRoute({ element: Component }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? Component : <Navigate to="/login" />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<Home />}></ProtectedRoute>}
          />
          <Route
            path="/anime/:id"
            element={<ProtectedRoute element={<Anime />}></ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
