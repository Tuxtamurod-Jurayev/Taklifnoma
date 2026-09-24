import { Link } from "react-router-dom";
import {
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import MyTaklifNavbar from "../components/MyTaklifNavbar";
import MyTaklifFooter from "../components/MyTaklifFooter";

export default function MyTaklifPricing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <MyTaklifNavbar />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Shaffof va qulay narxlar
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Oddiy, adolatli va barcha uchun qulay
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Hech qanday yashirin to'lovlarsiz. Bir martalik to'lov evaziga
            to'yingiz uchun mukammal onlayn taklifnomaga ega bo'ling.
          </p>

          {/* PRICING CARD */}
          <div className="relative max-w-lg mx-auto bg-white rounded-3xl border-2 border-blue-600 p-8 sm:p-10 shadow-2xl shadow-blue-500/10 text-left">
            <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-md">
              Eng ommabop
            </div>

            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">To'liq To'plam</h3>
                <p className="text-xs text-slate-500 mt-1">Barcha imkoniyatlar kiritilgan</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-extrabold text-blue-700">50 000</span>
                <span className="text-sm font-semibold text-slate-500 ml-1">so'm</span>
                <div className="text-[11px] text-slate-400">bir martalik to'lov</div>
              </div>
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="space-y-3.5 mb-8">
              {[
                "8 xil zamonaviy dizayn (Yashil Zumrad, Zarhal, Pushti, Milliy va b.)",
                "Cheksiz mehmonlarga Telegram va WhatsApp orqali yuborish",
                "Jonli orqaga hisoblash taymeri (kun, soat, daqiqa, sekund)",
                "Fon musiqasi (romantik kuylar yoki o'z musiqangiz)",
                "Google va Yandex Xaritalar orqali manzil navigatsiyasi",
                "Kelin va kuyov fotosuratlari galereyasi",
                "Onlayn RSVP (mehmonlar kelishini tasdiqlash paneli)",
                "Mehmonlar tabriklari va tilaklari doskasi",
                "To'yona uchun plastik karta raqamini qoldirish",
                "Kun tartibi (marosim dasturi rejasi)",
                "Dress-code tavsiyalari",
                "Doimiy saqlanadigan xavfsiz havolalar (mytaklif.uz/t/...)",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              to="/create"
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-center block text-sm shadow-xl shadow-blue-500/25 transition"
            >
              Hoziroq taklifnoma yaratish
            </Link>

            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% xavfsiz to'lov &bull; Click, Payme, Uzum orqali
            </p>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-20 text-left max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              To'lov bo'yicha ko'p so'raladigan savollar
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  Qanday qilib to'lov qilaman?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Taklifnomani to'ldirib bo'lgach, admin panel orqali yoki to'g'ridan-to'g'ri
                  Click, Payme yoki Uzum ilovalaridan istalgan plastik karta orqali to'lov
                  qilishingiz mumkin.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  To'lovdan so'ng taklifnoma qancha vaqt faol bo'ladi?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Taklifnomangiz to'yingiz o'tguncha va undan keyin ham xotira sifatida
                  doimiy tarzda onlayn turadi. Hech qanday muddat cheklovi yo'q!
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  Nechta mehmonga yuborishim mumkin?
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cheksiz! Havolangizni 100 kishiga ham, 1 000 kishiga ham bemalol
                  Telegram, WhatsApp yoki SMS orqali yubora olasiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MyTaklifFooter />
    </div>
  );
}
