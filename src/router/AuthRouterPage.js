import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "src/pages/auth/SignIn";

export default function AuthRouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="*" element={<SignInPage />} exact />
      </Routes>
    </BrowserRouter>
  );
}
