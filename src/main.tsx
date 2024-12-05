import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComicDetail from "./Pages/ComicDetail.tsx";
import ReadingPage from "./Pages/ReadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/comic/:slug" element={<ComicDetail />} />
      <Route path="/comic/:slug/chapter/:chapter" element={<ReadingPage />} />
    </Routes>
  </BrowserRouter>
);
