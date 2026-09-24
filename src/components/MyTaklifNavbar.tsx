import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  FolderHeart,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";
import { getMyTaklifInvitations } from "../data/mytaklifData";

type NavbarProps = {
  onOpenDrawer?: () => void;
};

export default function MyTaklifNavbar({ onOpenDrawer }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const invitations = getMyTaklifInvitations();
  const count = invitations.length;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-700 hover:text-blue-800 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>
            mytaklif<span className="text-sky-500">.uz</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className={`transition hover:text-blue-600 ${
              isActive("/") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Bosh sahifa
          </Link>
          <Link
            to="/create"
            className={`transition hover:text-blue-600 ${
              isActive("/create") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Yaratish
          </Link>
          <Link
            to="/pricing"
            className={`transition hover:text-blue-600 ${
              isActive("/pricing") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Narxlar
          </Link>
          <Link
            to="/musics"
            className={`transition hover:text-blue-600 ${
              isActive("/musics") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Musiqalar
          </Link>
          <Link
            to="/faq"
            className={`transition hover:text-blue-600 ${
              isActive("/faq") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Savol-javob
          </Link>
          <Link
            to="/contact"
            className={`transition hover:text-blue-600 ${
              isActive("/contact") ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Bog'lanish
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* USER INVITATIONS DRAWER TRIGGER */}
          <button
            type="button"
            onClick={onOpenDrawer}
            className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 rounded-xl transition border border-slate-200"
            title="Sizning taklifnomalaringiz"
          >
            <FolderHeart className="w-4 h-4 text-rose-500" />
            <span>Mening taklifnomalarim</span>
            {count > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>

          {/* ADMIN LINK */}
          <Link
            to="/cpanel"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition"
            title="Admin boshqaruv paneli"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Admin</span>
          </Link>

          {/* CREATE BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/create")}
            className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Taklifnoma yaratish</span>
            <span className="absolute inset-0 -left-20 w-16 bg-white/20 skew-x-[-30deg] group-hover:left-full transition-all duration-700" />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="p-2 text-slate-700 bg-slate-100 rounded-xl border border-slate-200"
            aria-label="Taklifnomalar"
          >
            <FolderHeart className="w-5 h-5 text-rose-500" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-700 hover:text-blue-700 bg-slate-100 rounded-xl"
            aria-label="Menyu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Bosh sahifa
          </Link>
          <Link
            to="/create"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Taklifnoma yaratish
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Narxlar
          </Link>
          <Link
            to="/musics"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Musiqalar
          </Link>
          <Link
            to="/faq"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Savol-javob
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-slate-700 font-medium hover:text-blue-600"
          >
            Bog'lanish
          </Link>
          <Link
            to="/cpanel"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2 text-emerald-700 font-semibold"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin CPanel</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate("/create");
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-blue-700 shadow-md shadow-blue-500/25"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Taklifnoma yaratish</span>
          </button>
        </div>
      )}
    </header>
  );
}
