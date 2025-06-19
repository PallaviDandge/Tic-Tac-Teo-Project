// src/Routes.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./component/logIn/logIn";
import SignIn from "./component/signIn/signIn";
import Game from "./component/game/game";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route
            path="/login"
            element={<LogIn onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/signin"
            element={
              <SignIn
                onAuthSuccess={() => {
                  // After sign up success → go to login
                  window.location.href = "/login";
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/game" />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;
