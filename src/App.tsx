import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { recordSiteVisit, syncWithSupabase } from "./data/mytaklifData";

// Lazy-loaded page components for dynamic code-splitting
const MyTaklifHome = lazy(() => import("./pages/MyTaklifHome"));
const MyTaklifCreate = lazy(() => import("./pages/MyTaklifCreate"));
const MyTaklifPricing = lazy(() => import("./pages/MyTaklifPricing"));
const MyTaklifMusics = lazy(() => import("./pages/MyTaklifMusics"));
const MyTaklifFaq = lazy(() => import("./pages/MyTaklifFaq"));
const MyTaklifContact = lazy(() => import("./pages/MyTaklifContact"));
const MyTaklifInvitationView = lazy(() => import("./pages/MyTaklifInvitation"));
const MyTaklifWishes = lazy(() => import("./pages/MyTaklifWishes"));
const MyTaklifCPanel = lazy(() => import("./pages/MyTaklifCPanel"));

function PageLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Yuklanmoqda...
      </p>
    </div>
  );
}

function AppContent() {
  useEffect(() => {
    recordSiteVisit();
    syncWithSupabase();
  }, []);

  return (
    <Suspense fallback={<PageLoading />}>
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
    </Suspense>
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