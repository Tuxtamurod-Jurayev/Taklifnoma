import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateDetail from "./pages/TemplateDetail";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";

import Editor from "./editor/Editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC PAGES
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/templates"
          element={<Templates />}
        />

        <Route
          path="/templates/:id"
          element={<TemplateDetail />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =========================
            EDITOR
        ========================== */}

        <Route
          path="/editor/:templateId"
          element={<Editor />}
        />

        {/* =========================
            FALLBACK
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;