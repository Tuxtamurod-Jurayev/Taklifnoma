import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MyTaklifHome from "./pages/MyTaklifHome";
import MyTaklifCreate from "./pages/MyTaklifCreate";
import MyTaklifPricing from "./pages/MyTaklifPricing";
import MyTaklifMusics from "./pages/MyTaklifMusics";
import MyTaklifFaq from "./pages/MyTaklifFaq";
import MyTaklifContact from "./pages/MyTaklifContact";
import MyTaklifInvitationView from "./pages/MyTaklifInvitation";
import MyTaklifWishes from "./pages/MyTaklifWishes";
import MyTaklifCPanel from "./pages/MyTaklifCPanel";

import { recordSiteVisit, syncWithSupabase } from "./data/mytaklifData";

function AppContent() {
  useEffect(() => {
    recordSiteVisit();
    syncWithSupabase();
  }, []);

  return (
    <Routes>
      {/* MYTAKLIF.UZ CORE ROUTES */}
      <Route path="/" element={<MyTaklifHome />} />
      <Route path="/create" element={<MyTaklifCreate />} />
      <Route path="/pricing" element={<MyTaklifPricing />} />
      <Route path="/musics" element={<MyTaklifMusics />} />
      <Route path="/faq" element={<MyTaklifFaq />} />
      <Route path="/contact" element={<MyTaklifContact />} />

      {/* INVITATION & WISHES */}
      <Route path="/t/:slug" element={<MyTaklifInvitationView />} />
      <Route path="/t/:slug/tilaklar" element={<MyTaklifWishes />} />

      {/* ADMIN CONTROL PANEL */}
      <Route path="/cpanel" element={<MyTaklifCPanel />} />

      {/* COMPATIBILITY REDIRECTS */}
      <Route path="/admin" element={<Navigate to="/cpanel" replace />} />
      <Route path="/templates" element={<Navigate to="/create" replace />} />
      <Route path="/dashboard" element={<Navigate to="/cpanel" replace />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;