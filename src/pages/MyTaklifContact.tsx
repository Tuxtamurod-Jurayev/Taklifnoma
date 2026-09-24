import { useState } from "react";
import {
  Phone,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import MyTaklifNavbar from "../components/MyTaklifNavbar";
import MyTaklifFooter from "../components/MyTaklifFooter";

export default function MyTaklifContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate sending
    setSubmitted(true);
    setName("");
    setPhone("+998 ");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <MyTaklifNavbar />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Bog'lanish va qo'llab-quvvatlash
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Biz bilan aloqada bo'ling
            </h1>
            <p className="text-base text-slate-600">
              Taklifnoma bo'yicha savollaringiz, taklif yoki maxsus istaklaringiz
              bo'lsa, bizga xabar qoldiring yoki to'g'ridan-to'g'ri Telegram orqali
              bog'laning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CONTACT CARDS */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="https://t.me/mytaklif_uz"
                target="_blank"
                rel="noreferrer"
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition flex items-center gap-4 block group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-sky-500/20">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Rasmiy Telegram
                  </h4>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                    @mytaklif_uz
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Tezkor onlayn javob</p>
                </div>
              </a>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Telefon raqamimiz
                  </h4>
                  <div className="text-base font-bold text-slate-900 font-mono">
                    +998 (90) 123-45-67
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Har kuni qo'ng'iroqlar uchun
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ish vaqti
                  </h4>
                  <div className="text-base font-bold text-slate-900">
                    09:00 — 22:00
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Haftaning 7 kuni</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Manzil
                  </h4>
                  <div className="text-base font-bold text-slate-900">
                    Toshkent shahri
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">O'zbekiston bo'ylab xizmat</p>
                </div>
              </div>
            </div>

            {/* FEEDBACK FORM */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Xabar yuborish
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Quyidagi formani to'ldiring, menejerimiz tez orada siz bilan bog'lanadi.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor Alimov"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Telefon yoki Telegram nik *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+998 90 ... yoki @username"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Xabaringiz *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Savolingiz yoki fikringizni yozing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Xabarni yuborish
                </button>

                {submitted && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Xabaringiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      <MyTaklifFooter />
    </div>
  );
}
