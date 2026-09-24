import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  CheckCircle2,
  Users,
  Eye,
  ChevronDown,
  Layers,
} from "lucide-react";
import {
  INITIAL_DEMO_INVITATIONS,
  DESIGNS,
} from "../data/mytaklifData";

export default function MyTaklifHome() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live countdown state for hero card
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredDemos = INITIAL_DEMO_INVITATIONS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.design === selectedCategory;
  });

  const faqs = [
    {
      q: "Onlayn sayt taklifnoma nima va uning afzalligi nimada?",
      a: "Onlayn taklifnoma — bu sizning to'yingiz uchun maxsus tayyorlangan, individual havolaga (linkka) ega bo'lgan veb-sahifadir. Qog'oz taklifnomadan farqli ravishda, unda jonli musiqa, to'yxona lokatsiyasi (xarita), kelin-kuyov foto galereyasi, to'y dasturi, jonli hisoblagich va mehmonlarning kelishini tasdiqlash (RSVP) imkoniyati mavjud.",
    },
    {
      q: "Taklifnoma qancha vaqtda tayyor bo'ladi?",
      a: "mytaklif.uz platformasida taklifnoma bir necha daqiqada tayyor bo'ladi! Ma'lumotlaringizni kiritasiz, yoqqan dizaynni tanlaysiz va tayyor havolani darhol qo'lga kiritasiz.",
    },
    {
      q: "Keyinchalik ma'lumotlarni (sana, joy, rasmlar) o'zgartirsa bo'ladimi?",
      a: "Ha, albatta! Istalgan vaqtda taklifnomangizni tahrirlashingiz mumkin. Barcha o'zgarishlar mehmonlar uchun darhol yangilanadi.",
    },
    {
      q: "Mehmonlar kelishini qanday qilib onlayn bilib olaman?",
      a: "Taklifnomangizda maxsus RSVP (tashrifni tasdiqlash) tugmasi bo'ladi. Mehmonlar o'z ismlarini kiritib, kelishini tasdiqlashadi va siz barcha ro'yxatni qulay ko'rinishda ko'rib turasiz.",
    },
    {
      q: "Qanday qilib to'lov qilinadi?",
      a: "To'lovni Payme, Click, Uzum Bank yoki bank kartalari orqali xavfsiz va bir martalik to'lov bilan amalga oshirish mumkin.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32 bg-gradient-to-b from-blue-50/70 via-white to-[#F8FAFC]">
        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* HERO LEFT COPY */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm animate-fade-in">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Online to'y taklifnoma yaratish xizmati</span>
              </div>

              {/* HEADLINE */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                TO'YINGIZGA TAKLIFNOMANI{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
                  — bir zumda tayyorlaymiz!
                </span>
              </h1>

              {/* SUBTITLE */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Taklifnomangizni do'stlaringiz va yaqinlaringiz bilan onlayn ulashib, ularni quvontiring. Chiroyli dizayn, jonli musiqa, lokatsiya xaritasi va mehmonlar hisobi bitta qulay havolada.
              </p>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navigate("/create")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Taklifnoma yaratish</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#namunalar"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition"
                >
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Namunalarni ko'rish</span>
                </a>
              </div>

              {/* SOCIAL PROOF */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3 daqiqada tayyor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>8+ professional dizayn</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cheksiz mehmonlarga ulashish</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT: INTERACTIVE LIVE PHONE CARD MOCKUP */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-slate-900 p-3 sm:p-4 rounded-[40px] shadow-2xl shadow-blue-900/20 border-4 border-slate-800">
                {/* NOTCH */}
                <div className="w-32 h-5 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                  <div className="w-10 h-1.5 rounded-full bg-slate-900" />
                </div>

                {/* INNER CARD SURFACE (LIVE DEMO PREVIEW) */}
                <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white p-5 border border-emerald-800/40 shadow-inner">
                  {/* FLOATING MUSIC BADGE */}
                  <div className="flex items-center justify-between pb-4 border-b border-emerald-700/30">
                    <span className="text-[10px] tracking-widest text-emerald-300 font-semibold uppercase">
                      mytaklif.uz / demo
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-[11px] text-emerald-200 hover:text-white transition"
                    >
                      {isPlayingMusic ? (
                        <>
                          <Pause className="w-3 h-3 text-emerald-400" />
                          <span className="animate-pulse">Ijro etilmoqda</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                          <span>Musiqa</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* COVER PHOTO & NAMES */}
                  <div className="text-center my-6 space-y-3">
                    <div className="relative w-28 h-28 mx-auto rounded-full p-1 border-2 border-emerald-400/50 shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                        alt="Farhodbek & Shirinbonu"
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow">
                        <Heart className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>

                    <div className="text-emerald-200/80 text-[11px] tracking-wider uppercase font-medium">
                      Biz oila qurmoqdamiz
                    </div>

                    <h3 className="text-3xl font-serif tracking-tight text-white font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Farhodbek
                      <span className="block text-emerald-400 font-sans text-xl my-0.5">&</span>
                      Shirinbonu
                    </h3>
                  </div>

                  {/* LIVE COUNTDOWN TICKER */}
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 border border-emerald-500/20 mb-5">
                    <div className="text-[10px] text-center text-emerald-300 font-semibold mb-2 uppercase tracking-wider">
                      To'y kunigacha qoldi:
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="bg-emerald-950/70 p-1.5 rounded-lg border border-emerald-700/40">
                        <span className="block text-lg font-bold text-emerald-300 font-mono">
                          {timeLeft.days}
                        </span>
                        <span className="text-[9px] text-emerald-200/70 uppercase">Kun</span>
                      </div>
                      <div className="bg-emerald-950/70 p-1.5 rounded-lg border border-emerald-700/40">
                        <span className="block text-lg font-bold text-emerald-300 font-mono">
                          {timeLeft.hours}
                        </span>
                        <span className="text-[9px] text-emerald-200/70 uppercase">Soat</span>
                      </div>
                      <div className="bg-emerald-950/70 p-1.5 rounded-lg border border-emerald-700/40">
                        <span className="block text-lg font-bold text-emerald-300 font-mono">
                          {timeLeft.minutes}
                        </span>
                        <span className="text-[9px] text-emerald-200/70 uppercase">Daqiqa</span>
                      </div>
                      <div className="bg-emerald-950/70 p-1.5 rounded-lg border border-emerald-700/40">
                        <span className="block text-lg font-bold text-emerald-300 font-mono">
                          {timeLeft.seconds}
                        </span>
                        <span className="text-[9px] text-emerald-200/70 uppercase">Sek</span>
                      </div>
                    </div>
                  </div>

                  {/* WEDDING DETAILS */}
                  <div className="space-y-2 text-xs text-emerald-100/90 mb-5 bg-emerald-900/40 p-3 rounded-xl border border-emerald-700/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>25 Noyabr, 2026 (Chorshanba)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Soat 18:00 da</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">Versal Tantanalar Saroyi</span>
                    </div>
                  </div>

                  {/* BOTTOM ACTION */}
                  <Link
                    to="/t/farhod-va-shirin"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/30 transition text-center"
                  >
                    <span>To'liq taklifnomani ochish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS BAR
      ========================================================= */}
      <section className="bg-white border-y border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700">15 000+</div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Baxtli juftliklar</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700">250 000+</div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Taklif etilgan mehmonlar</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700">3 daqiqa</div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Tayyor bo'lish vaqti</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-700">100%</div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Onlayn va qulay</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SHOWCASE / YAQINDA YARATILGAN SHABLONLAR
      ========================================================= */}
      <section id="namunalar" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              Namunalar kutubxonasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Yaqinda yaratilgan taklifnomalar
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Har bir dizayn o'zgacha uslub va nafislikka ega. Yoqtirgan namunani ko'ring va xuddi shu ko'rinishda o'z taklifnomangizni yarating.
            </p>

            {/* CATEGORY TABS */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === "all"
                    ? "bg-blue-700 text-white shadow-md shadow-blue-500/25"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Barchasi
              </button>
              {DESIGNS.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedCategory(d.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    selectedCategory === "d.id" || selectedCategory === d.id
                      ? "bg-blue-700 text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* DEMO CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDemos.map((inv) => (
              <div
                key={inv.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* IMAGE & BADGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={inv.coverImage}
                    alt={inv.groomName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold shadow">
                    {inv.design.toUpperCase()}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                      Nikoh to'yi
                    </span>
                    <h3 className="text-xl font-bold font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {inv.groomName} & {inv.brideName}
                    </h3>
                  </div>
                </div>

                {/* BODY INFO */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{inv.date} · {inv.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span className="truncate">{inv.venue}</span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <Link
                      to={`/t/${inv.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ko'rish</span>
                    </Link>

                    <Link
                      to={`/create?design=${inv.design}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition"
                    >
                      <span>Yaratish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          NIMA UCHUN MYTAKLIF.UZ (BENEFITS)
      ========================================================= */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
              Imkoniyatlar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nima uchun mytaklif.uz ni tanlashadi?
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Biz to'y taklifnomalarini oddiy qog'ozdan butunlay yangi, interaktiv va unutilmas raqamli tajribaga aylantirdik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FEATURE 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Tez va juda oson
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hech qanday dasturlash yoki dizayn bilimi kerak emas. 3 daqiqada kerakli ma'lumotlarni kiritasiz va taklifnomangiz tayyor!
              </p>
            </div>

            {/* FEATURE 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-md shadow-amber-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                8+ xil professional dizayn
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Zumrad yashil, zarhal hashamat, romantik pushti, o'zbekona zardo'zi va boshqa zamonaviy ranglar uyg'unligi.
              </p>
            </div>

            {/* FEATURE 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Xarita va aniq lokatsiya
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mehmonlar to'yxonani qidirib adashib yurmaydi. Bitta tugma orqali Google Maps yoki Yandex Navigatsiyada yo'nalish ochiladi.
              </p>
            </div>

            {/* FEATURE 4 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mb-5 shadow-md shadow-rose-500/20">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Musiqa va foto galereya
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Taklifnoma ochilishi bilan orqa fonda yoqimli to'yona musiqa yangraydi va baxtli suratlaringiz to'plami ko'rinadi.
              </p>
            </div>

            {/* FEATURE 5 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-5 shadow-md shadow-purple-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Onlayn RSVP va mehmonlar hisobi
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mehmonlar to'yga kelish-kelmasliklarini onlayn tasdiqlashadi. Siz esa stol va xarajatlarni aniq rejalashtirasiz.
              </p>
            </div>

            {/* FEATURE 6 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-5 shadow-md shadow-sky-500/20">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Samimiy tilaklar va tabriklar
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mehmonlar taklifnoma sahifasida yangi oilaga ezgu niyatlar va qutlovlarini qoldirib, xotira sifatida saqlashadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QANDAY ISHLAYDI (3 BOSQICH)
      ========================================================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              Oddiy va tushunarli
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 oddiy qadamda tayyorlang
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Barcha jarayon qulay va shaffof tuzilgan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-extrabold">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ma'lumotlarni kiriting
              </h3>
              <p className="text-sm text-slate-600">
                Kelin-kuyov ismlari, to'y sanasi, vaqti, restorani va rasmlaringizni to'ldiring.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-extrabold">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Dizaynni tanlang
              </h3>
              <p className="text-sm text-slate-600">
                O'zingizga yoqqan ranglar palitrasini tanlab, real vaqt rejimida natijani ko'ring.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-extrabold">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Havolani ulashing
              </h3>
              <p className="text-sm text-slate-600">
                Tayyor shaxsiy linkni oling va Telegram, WhatsApp orqali barcha yaqinlaringizga yuboring!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING TEASER
      ========================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/80 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              Hamyonbop narxlar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              To'yingiz uchun eng yaxshi taklif
            </h2>
            <p className="text-slate-400 mt-2">
              Hech qanday yashirin to'lovlarsiz, bir martalik to'lov orqali to'liq imkoniyatlardan foydalaning.
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-slate-800/90 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Sayt taklifnoma</h3>
                <p className="text-xs text-slate-400 mt-1">Eng to'liq va ommabop tarif</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 line-through">90 000 so'm</div>
                <div className="text-3xl font-extrabold text-blue-400">50 000 so'm</div>
              </div>
            </div>

            <ul className="py-6 space-y-3.5 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Barcha 8 ta professional dizayn</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Kelin-kuyov fotosuratlari va galereyasi</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Musiqa pleyeri (o'zingizniki yoki kutubxonadan)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Jonli hisoblagich (Countdown)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Google & Yandex xaritalar lokatsiyasi</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Mehmonlar kelishini onlayn kuzatish (RSVP)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Mehmonlardan samimiy tilaklar qoldirish doskasi</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Istalgan vaqt tahrirlash imkoniyati</span>
              </li>
            </ul>

            <Link
              to="/create"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition text-center"
            >
              <Sparkles className="w-5 h-5" />
              <span>Hoziroq yaratish</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION
      ========================================================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              Savol-javoblar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tez-tez beriladigan savollar
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-700 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${
                      openFaq === index ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            To'yingiz uchun betakror taklifnomani hoziroq yarating!
          </h2>
          <p className="text-base text-blue-100 max-w-xl mx-auto mb-8 font-normal">
            Atigi bir necha daqiqada tayyor bo'ladi. Mehmonlaringizga unutilmas taassurot ulashing.
          </p>
          <button
            type="button"
            onClick={() => navigate("/create")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-blue-900 bg-white hover:bg-slate-100 shadow-xl transition transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-blue-700" />
            <span>Taklifnoma yaratish</span>
            <ArrowRight className="w-5 h-5 text-blue-700" />
          </button>
        </div>
      </section>
    </div>
  );
}
