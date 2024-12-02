import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ComicDetail from "./Pages/ComicDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/comic/:slug" element={<ComicDetail />} />
    </Routes>
  </BrowserRouter>
);
