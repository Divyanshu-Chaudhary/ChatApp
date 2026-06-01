import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoute from "./Route/AppRoute";
// import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./Context/ChatContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <ChatProvider>
      <AppRoute />
    </ChatProvider>
  </BrowserRouter>,
);
