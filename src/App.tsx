import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ExamPage } from "./pages/ExamPage";
import { HomePage } from "./pages/HomePage";
import { ResultsPage } from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exam/:id" element={<ExamPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
