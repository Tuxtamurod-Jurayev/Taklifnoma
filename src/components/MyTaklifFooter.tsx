import { Link } from "react-router-dom";
import { Sparkles, Send, Phone, Mail, Heart, ShieldCheck } from "lucide-react";

export default function MyTaklifFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* BRAND */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>
                mytaklif<span className="text-sky-400">.uz</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              mytaklif.uz — to'y va tantanali marosimlar uchun zamonaviy onlayn sayt taklifnoma xizmati. Bir necha daqiqada chiroyli taklifnoma yarating va mehmonlarni onlayn kuzatib boring.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/mytaklif_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                title="Telegram kanalimiz"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="tel:+998900000000"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                title="Telefon orqali bog'lanish"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* SAHIFALAR */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">
              Sahifalar
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-white transition">
                  Taklifnoma yaratish
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition">
                  Xizmat narxlari
                </Link>
              </li>
              <li>
                <Link to="/musics" className="hover:text-white transition">
                  To'y musiqalari
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  Ko'p beriladigan savollar
                </Link>
              </li>
              <li>
                <Link to="/cpanel" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Admin boshqaruv</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* XIZMATLAR */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">
              Xizmatlar
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">Elektron sayt taklifnoma</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Onlayn RSVP va mehmonlar hisobi</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Jonli sana hisoblagich (Countdown)</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Lokatsiya va xarita integratsiyasi</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Kelin-kuyov foto galereyasi</span>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Tilaklar va tabriklar qoldirish</span>
              </li>
            </ul>
          </div>

          {/* ALOQA */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 tracking-wide">
              Bog'lanish
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram: @mytaklif_uz</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+998 (90) 123-45-67</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>info@mytaklif.uz</span>
              </p>
              <div className="pt-2 text-xs text-slate-400">
                To'lov turlari: Payme, Click, Uzum Bank, Visa / MasterCard
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 mytaklif.uz — Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>O'zbekistonda mehr bilan yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
