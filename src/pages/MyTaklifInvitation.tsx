import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Volume2,
  VolumeX,
  MessageCircle,
  ExternalLink,
  Users,
  Send,
  Sparkles,
  ChevronRight,
  Compass,
} from "lucide-react";
import {
  getInvitationBySlug,
  incrementInvitationViews,
  addGuestRsvp,
  addGuestWish,
  type MyTaklifInvitation,
} from "../data/mytaklifData";

export default function MyTaklifInvitationView() {
  const { slug } = useParams<{ slug: string }>();
  const [invitation, setInvitation] = useState<MyTaklifInvitation | null>(null);
  const [loading, setLoading] = useState(true);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("+998 ");
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpAttending, setRsvpAttending] = useState(true);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Wish Form State
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Copy state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);

  // Lightbox
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Load invitation
  useEffect(() => {
    if (!slug) return;
    const inv = getInvitationBySlug(slug);
    if (inv) {
      setInvitation(inv);
      incrementInvitationViews(inv.slug);
    }
    setLoading(false);
  }, [slug]);

  // Audio control
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedAudio(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  // Attempt autoplay on first user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasStartedAudio && audioRef.current && invitation?.musicUrl) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStartedAudio(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstClick, { once: true });
    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, [hasStartedAudio, invitation]);

  // Countdown timer calculation
  useEffect(() => {
    if (!invitation?.date) return;

    const calcTime = () => {
      const targetTimeStr = `${invitation.date}T${invitation.time || "18:00"}:00`;
      const target = new Date(targetTimeStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, [invitation?.date, invitation?.time]);

  // Format date nicely
  const getFormattedDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
      ];
      const weekdays = [
        "Yakshanba",
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba",
      ];
      return {
        day: d.getDate(),
        month: months[d.getMonth()],
        year: d.getFullYear(),
        weekday: weekdays[d.getDay()],
      };
    } catch {
      return { day: 25, month: "Noyabr", year: 2026, weekday: "Chorshanba" };
    }
  };

  // Google Calendar link
  const getGoogleCalendarUrl = () => {
    if (!invitation) return "#";
    const title = encodeURIComponent(
      `${invitation.groomName} & ${invitation.brideName} Nikoh To'yi`
    );
    const details = encodeURIComponent(
      `Sizni ${invitation.groomName} va ${invitation.brideName}larning baxt to'yiga taklif etamiz!\nManzil: ${invitation.venue}, ${invitation.address}`
    );
    const loc = encodeURIComponent(`${invitation.venue}, ${invitation.address}`);
    const dateFormatted = invitation.date.replace(/-/g, "");
    const timeFormatted = (invitation.time || "18:00").replace(":", "") + "00";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T${timeFormatted}/${dateFormatted}T230000&details=${details}&location=${loc}`;
  };

  // Handle RSVP
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitation || !rsvpName.trim()) {
      setRsvpError("Iltimos, ismingizni kiriting!");
      return;
    }
    setRsvpError("");
    addGuestRsvp(invitation.slug, {
      name: rsvpName.trim(),
      phone: rsvpPhone.trim(),
      guestsCount: rsvpCount,
      attending: rsvpAttending,
    });
    setRsvpSubmitted(true);
    // Refresh invitation data
    const updated = getInvitationBySlug(invitation.slug);
    if (updated) setInvitation(updated);
  };

  // Handle Wish
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitation || !wishName.trim() || !wishMessage.trim()) return;

    addGuestWish(invitation.slug, wishName.trim(), wishMessage.trim());
    setWishSubmitted(true);
    setWishName("");
    setWishMessage("");
    // Refresh invitation data
    const updated = getInvitationBySlug(invitation.slug);
    if (updated) setInvitation(updated);
    setTimeout(() => setWishSubmitted(false), 5000);
  };

  // Copy page link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy card number
  const handleCopyCard = (cardNum: string) => {
    navigator.clipboard.writeText(cardNum.replace(/\s+/g, ""));
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Taklifnoma yuklanmoqda...</p>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
          !
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Taklifnoma topilmadi
        </h1>
        <p className="text-slate-600 max-w-md mb-8">
          Ushbu manzil bo'yicha taklifnoma mavjud emas yoki o'chirib yuborilgan.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
        >
          <Sparkles className="w-5 h-5" />
          O'z taklifnomangizni yarating
        </Link>
      </div>
    );
  }

  const dateObj = getFormattedDate(invitation.date);

  // Theme styling rules based on design
  const getThemeStyles = () => {
    switch (invitation.design) {
      case "gold":
        return {
          wrapper: "bg-[#111111] text-[#f7e7c4]",
          card: "bg-[#1a1714] border-[#d4af37]/30 text-[#f7e7c4]",
          accentText: "text-[#d4af37]",
          accentBg: "bg-[#d4af37] text-black",
          border: "border-[#d4af37]/30",
          font: "'Cinzel', serif",
        };
      case "rose":
        return {
          wrapper: "bg-[#fff5f6] text-[#4a282b]",
          card: "bg-white border-[#fecdd3] text-[#4a282b] shadow-xl shadow-rose-100",
          accentText: "text-[#e11d48]",
          accentBg: "bg-[#e11d48] text-white",
          border: "border-rose-200",
          font: "'Playfair Display', serif",
        };
      case "classic":
        return {
          wrapper: "bg-[#f8fafc] text-slate-800",
          card: "bg-white border-slate-200 text-slate-800 shadow-xl",
          accentText: "text-blue-600",
          accentBg: "bg-blue-600 text-white",
          border: "border-slate-200",
          font: "'Playfair Display', serif",
        };
      case "milliy":
        return {
          wrapper: "bg-[#0b132b] text-[#fbf5e5]",
          card: "bg-[#1c2541] border-[#f5b700]/30 text-[#fbf5e5] shadow-2xl",
          accentText: "text-[#f5b700]",
          accentBg: "bg-[#f5b700] text-[#0b132b]",
          border: "border-[#f5b700]/30",
          font: "'Cinzel', serif",
        };
      case "boho":
        return {
          wrapper: "bg-[#fcf8f2] text-[#432818]",
          card: "bg-[#fffdfa] border-[#ddb892]/40 text-[#432818] shadow-lg",
          accentText: "text-[#b05c38]",
          accentBg: "bg-[#b05c38] text-white",
          border: "border-[#ddb892]/40",
          font: "'Playfair Display', serif",
        };
      case "royal":
        return {
          wrapper: "bg-[#0a1128] text-white",
          card: "bg-[#101f42] border-[#2563eb]/40 text-white shadow-2xl",
          accentText: "text-sky-400",
          accentBg: "bg-blue-600 text-white",
          border: "border-blue-500/30",
          font: "'Cinzel', serif",
        };
      case "dark":
        return {
          wrapper: "bg-[#0a0a0c] text-slate-200",
          card: "bg-[#141418] border-purple-500/30 text-white shadow-2xl",
          accentText: "text-purple-400",
          accentBg: "bg-purple-600 text-white",
          border: "border-purple-500/30",
          font: "'Cinzel', serif",
        };
      case "emerald":
      default:
        return {
          wrapper: "bg-[#062016] text-[#e8f5e9]",
          card: "bg-[#0c3123] border-[#10b981]/30 text-[#e8f5e9] shadow-2xl shadow-emerald-950/60",
          accentText: "text-[#34d399]",
          accentBg: "bg-[#10b981] text-emerald-950 font-bold",
          border: "border-[#10b981]/30",
          font: "'Playfair Display', serif",
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div
      className={`min-h-screen ${theme.wrapper} transition-colors duration-300 selection:bg-amber-400 selection:text-black`}
    >
      {/* BACKGROUND MUSIC PLAYER */}
      {invitation.musicUrl && (
        <>
          <audio ref={audioRef} src={invitation.musicUrl} loop preload="auto" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={toggleAudio}
              className={`p-3.5 rounded-full shadow-2xl flex items-center justify-center gap-2 backdrop-blur-md transition-all duration-300 ${
                isPlaying
                  ? "bg-amber-500 text-slate-950 ring-4 ring-amber-400/40 animate-pulse"
                  : "bg-slate-900/80 text-white border border-white/20 hover:scale-105"
              }`}
              title={isPlaying ? "Musiqani to'xtatish" : "Musiqani yoqish"}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-5 h-5 animate-bounce" />
                  <span className="text-xs font-bold pr-1">Musiqa chalmoqda</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span className="text-xs font-medium pr-1">Musiqani yoqish</span>
                </>
              )}
            </button>
          </div>
        </>
      )}

      {/* TOP BRAND BAR */}
      <header className="w-full py-3 px-4 border-b border-white/10 backdrop-blur-md flex items-center justify-between text-xs text-white/70 max-w-xl mx-auto">
        <Link to="/" className="flex items-center gap-1.5 font-bold hover:text-white transition">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>mytaklif.uz</span>
        </Link>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {invitation.views || 1} marta ko'rildi
        </span>
      </header>

      {/* MAIN CONTAINER (MOBILE FIRST PHONE EXPERIENCE) */}
      <main className="max-w-xl mx-auto px-4 py-6 sm:py-10 space-y-6">
        {/* 1. HERO CARD */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-8 text-center relative overflow-hidden backdrop-blur-sm ${theme.card}`}
        >
          {/* Subtle ornamental glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          {/* Bismillah / Greeting */}
          <div className="mb-4">
            <p className="font-serif text-lg sm:text-xl tracking-wider text-amber-300/90 font-medium">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-xs uppercase tracking-[0.25em] opacity-75 mt-1 font-semibold">
              Bismillahir Rohmanir Rohiym
            </p>
          </div>

          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 border border-current opacity-80">
            {invitation.ceremonyType === "wedding"
              ? "Nikoh To'yi"
              : invitation.ceremonyType === "sunnat"
              ? "Sunnat To'yi"
              : invitation.ceremonyType === "engagement"
              ? "Fotiha To'yi"
              : "Tantanali Marosim"}
          </div>

          {/* Couple Names */}
          <h1
            style={{ fontFamily: theme.font }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 leading-tight"
          >
            {invitation.groomName}
            <span className={`block text-2xl sm:text-3xl my-1 ${theme.accentText}`}>
              &
            </span>
            {invitation.brideName}
          </h1>

          {/* Cover photo */}
          {invitation.coverImage && (
            <div className="my-6 relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] group">
              <img
                src={invitation.coverImage}
                alt={`${invitation.groomName} & ${invitation.brideName}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-semibold tracking-wider">
                  {dateObj.day} {dateObj.month} {dateObj.year}
                </span>
                <span className="opacity-90">{invitation.venue}</span>
              </div>
            </div>
          )}

          {/* Intro Text */}
          <div className="space-y-3 max-w-md mx-auto mt-4 text-sm sm:text-base leading-relaxed opacity-90 font-light">
            <p>{invitation.intro}</p>
            {invitation.story && (
              <p className="italic opacity-80 text-xs sm:text-sm border-l-2 border-current pl-3 text-left">
                "{invitation.story}"
              </p>
            )}
          </div>

          {/* Parents information */}
          {(invitation.groomParents || invitation.brideParents) && (
            <div className="mt-6 pt-5 border-t border-current/15 text-xs sm:text-sm opacity-85 space-y-1">
              <p className="font-semibold uppercase tracking-wider text-[11px] mb-2 text-amber-300">
                To'y egalari:
              </p>
              {invitation.groomParents && (
                <p>
                  <span className="opacity-70">Kuyov tomon:</span>{" "}
                  <strong>{invitation.groomParents}</strong>
                </p>
              )}
              {invitation.brideParents && (
                <p>
                  <span className="opacity-70">Kelin tomon:</span>{" "}
                  <strong>{invitation.brideParents}</strong>
                </p>
              )}
            </div>
          )}
        </section>

        {/* 2. LIVE COUNTDOWN TICKER */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-7 text-center backdrop-blur-sm ${theme.card}`}
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest opacity-80">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Tantanagacha qolgan vaqt</span>
          </div>

          {timeLeft.isPast ? (
            <div className="py-4 text-amber-400 font-semibold text-lg">
              ✨ Marosim tantanali tarzda bo'lib o'tdi!
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Kun", value: timeLeft.days },
                { label: "Soat", value: timeLeft.hours },
                { label: "Daqiqa", value: timeLeft.minutes },
                { label: "Sekund", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-3 sm:p-4 bg-black/25 border border-white/10 flex flex-col items-center justify-center shadow-inner"
                >
                  <span className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-70 mt-1 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. DATE & TIME CARD */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm ${theme.card}`}
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest opacity-80">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>Sana va vaqt</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-y border-current/15 my-2">
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold">
                {dateObj.day}-{dateObj.month}, {dateObj.year}
              </div>
              <div className="text-sm opacity-80 mt-0.5">
                {dateObj.weekday} kuni &bull;{" "}
                <strong className={theme.accentText}>
                  {invitation.timeText || `Soat ${invitation.time || "18:00"}`}
                </strong>
              </div>
            </div>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-xs font-bold border border-white/20 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Taqvimga qo'shish
            </a>
          </div>
        </section>

        {/* 4. VENUE & LOCATION CARD */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm ${theme.card}`}
        >
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest opacity-80">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>To'yxona manzili</span>
          </div>

          <h3 className="text-2xl font-bold mb-1">{invitation.venue}</h3>
          <p className="text-sm opacity-80 mb-5 leading-relaxed">
            {invitation.address}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={
                invitation.mapUrl ||
                `https://maps.google.com/?q=${encodeURIComponent(
                  `${invitation.venue} ${invitation.address}`
                )}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-md"
            >
              <Compass className="w-4 h-4" />
              Google Xaritalarda ochish
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>

            <a
              href={`https://yandex.com/maps/?text=${encodeURIComponent(
                `${invitation.venue} ${invitation.address}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition shadow-md"
            >
              <MapPin className="w-4 h-4" />
              Yandex Xaritada ko'rish
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>
          </div>
        </section>

        {/* 5. SCHEDULE / KUN TARTIBI (IF DEFINED) */}
        {invitation.schedule && invitation.schedule.length > 0 && (
          <section
            className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm ${theme.card}`}
          >
            <div className="flex items-center gap-2 mb-5 text-xs font-bold uppercase tracking-widest opacity-80">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Kun tartibi (Reja)</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-current/20 pl-8">
              {invitation.schedule.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-black/40" />
                  <div className="font-extrabold text-sm text-amber-300">
                    {item.time}
                  </div>
                  <div className="font-semibold text-base mt-0.5">{item.title}</div>
                  {item.desc && (
                    <div className="text-xs opacity-75 mt-0.5">{item.desc}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. PHOTO GALLERY */}
        {invitation.gallery && invitation.gallery.length > 0 && (
          <section
            className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm ${theme.card}`}
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest opacity-80">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Suratlar galereyasi</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {invitation.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className="rounded-2xl overflow-hidden aspect-square border border-white/10 cursor-pointer hover:opacity-90 transition group shadow-md"
                >
                  <img
                    src={imgUrl}
                    alt={`Galereya ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. DRESS CODE & GIFT CARD (TO'YONA) */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm space-y-5 ${theme.card}`}
        >
          {invitation.dressCode && (
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
                Dress-code (Kiyinish uslubi)
              </div>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                {invitation.dressCode}
              </p>
            </div>
          )}

          {invitation.cardNumber && (
            <div className="pt-4 border-t border-current/15">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
                To'yona (Karta orqali hadya)
              </div>
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-mono text-base sm:text-lg font-bold tracking-wider">
                    {invitation.cardNumber}
                  </div>
                  {invitation.cardOwner && (
                    <div className="text-xs opacity-75 mt-0.5">
                      {invitation.cardOwner}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleCopyCard(invitation.cardNumber!)}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copiedCard ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Nusxalandi</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Nusxa olish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 8. RSVP (ATTENDANCE CONFIRMATION FORM) */}
        <section
          id="rsvp"
          className={`rounded-3xl border ${theme.border} p-6 sm:p-8 backdrop-blur-sm ${theme.card}`}
        >
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-blue-600/20 text-blue-400 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Tashrifingizni tasdiqlang</h2>
            <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-sm mx-auto">
              Sizning qatnashishingiz biz uchun muhim. Marosimga tashrif buyurishingizni
              oldingi kunlarda ma'lum qilishingizni iltimos qilamiz.
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-1">
                Javobingiz qabul qilindi!
              </h3>
              <p className="text-xs opacity-90 text-white/90">
                Tashakkur! Sizning javobingiz to'y egalariga yetkazildi. Sizni intizorlik
                bilan kutib qolamiz!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              {rsvpError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                  {rsvpError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1.5">
                  Ismingiz va familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Azizbek Aliyev"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1.5">
                  Telefon raqamingiz
                </label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/25 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-2">
                  To'yda qatnashasizmi?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpAttending(true)}
                    className={`py-3 px-4 rounded-xl font-bold text-xs border transition ${
                      rsvpAttending
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                        : "bg-black/20 border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    Albatta boraman 🎉
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttending(false)}
                    className={`py-3 px-4 rounded-xl font-bold text-xs border transition ${
                      !rsvpAttending
                        ? "bg-rose-600 text-white border-rose-500 shadow-md"
                        : "bg-black/20 border-white/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    Bora olmayman 😔
                  </button>
                </div>
              </div>

              {rsvpAttending && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-80 mb-1.5">
                    Necha kishi bo'lib kelasiz?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRsvpCount(num)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition ${
                          rsvpCount === num
                            ? "bg-amber-500 text-black border-amber-400"
                            : "bg-black/20 border-white/20 opacity-70 hover:opacity-100"
                        }`}
                      >
                        {num === 4 ? "4+ kishi" : `${num} kishi`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 mt-2 ${theme.accentBg}`}
              >
                <Send className="w-4 h-4" />
                Javobni yuborish
              </button>
            </form>
          )}
        </section>

        {/* 9. GUEST WISHES (TILAKLAR) SECTION */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-8 backdrop-blur-sm ${theme.card}`}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Yaxshi tilaklar ({invitation.wishes?.length || 0})</span>
            </div>
            <Link
              to={`/t/${invitation.slug}/tilaklar`}
              className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1"
            >
              Barchasi <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* New wish submission */}
          <form onSubmit={handleWishSubmit} className="space-y-3 mb-6">
            <input
              type="text"
              required
              placeholder="Ismingiz"
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/25 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              required
              rows={2}
              placeholder="Yaxshi tilak va tabrigingizni yozing..."
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/25 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Tilak qoldirish
            </button>
            {wishSubmitted && (
              <p className="text-xs text-emerald-400 font-semibold text-center">
                ✨ Tilagingiz uchun rahmat!
              </p>
            )}
          </form>

          {/* Recent wishes list */}
          {invitation.wishes && invitation.wishes.length > 0 ? (
            <div className="space-y-3">
              {invitation.wishes.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-black/25 border border-white/10 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-300">{w.name}</span>
                    <span className="text-[10px] opacity-60">
                      {new Date(w.createdAt).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>
                  <p className="opacity-90 italic">"{w.message}"</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-center opacity-60 py-3">
              Hozircha tilaklar yo'q. Birinchi bo'lib tabrik qoldiring!
            </p>
          )}
        </section>

        {/* 10. SHARE & FOOTER ACTIONS */}
        <section
          className={`rounded-3xl border ${theme.border} p-6 sm:p-7 backdrop-blur-sm text-center space-y-4 ${theme.card}`}
        >
          <div className="text-xs font-bold uppercase tracking-wider opacity-80">
            Taklifnomani yaqinlaringizga yuboring
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {/* Telegram share */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                window.location.href
              )}&text=${encodeURIComponent(
                `${invitation.groomName} & ${invitation.brideName} to'y taklifnomasi`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
            >
              <Send className="w-3.5 h-3.5" />
              Telegram
            </a>

            {/* WhatsApp share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${invitation.groomName} & ${invitation.brideName} to'y taklifnomasi: ${window.location.href}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>

            {/* Copy link */}
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Nusxalandi
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Havoladan nusxa olish
                </>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-current/15">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Siz ham shunday taklifnoma yaratmoqchimisiz? mytaklif.uz
            </Link>
          </div>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <img
            src={activeImage}
            alt="Katta rasm"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
