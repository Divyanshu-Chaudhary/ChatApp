import "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import ChatPage from "../Components/ChatPage";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default AppRoute;
