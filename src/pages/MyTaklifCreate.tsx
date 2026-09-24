import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Music,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  Send,
  Smartphone,
} from "lucide-react";
import {
  createOrUpdateMyTaklifInvitation,
  getInvitationBySlug,
  DESIGNS,
  MUSIC_TRACKS,
  type CeremonyType,
  type DesignId,
  type MyTaklifInvitation,
} from "../data/mytaklifData";

const SAMPLE_COVERS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85",
];

export default function MyTaklifCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editSlug = searchParams.get("edit");
  const initialDesignParam = searchParams.get("design") as DesignId | null;

  // Form states
  const [ceremonyType, setCeremonyType] = useState<CeremonyType>("wedding");
  const [design, setDesign] = useState<DesignId>(initialDesignParam || "emerald");
  const [groomName, setGroomName] = useState("Farhodbek");
  const [brideName, setBrideName] = useState("Shirinbonu");
  const [groomParents, setGroomParents] = useState("Rustamjon va Nodiraxon");
  const [brideParents, setBrideParents] = useState("Baxtiyor aka va Dilfuza opa");
  const [date, setDate] = useState("2026-11-25");
  const [time, setTime] = useState("18:00");
  const [timeText, setTimeText] = useState("Soat 18:00 da kutib qolamiz");
  const [venue, setVenue] = useState("Versal Tantanalar Saroyi");
  const [address, setAddress] = useState("Toshkent shahri, Chilonzor tumani");
  const [mapUrl, setMapUrl] = useState("https://maps.google.com");
  const [coverImage, setCoverImage] = useState(SAMPLE_COVERS[0]);
  const [intro, setIntro] = useState(
    "Alloh taoloning marhamati ila, ikki yoshning baxt to'yiga aziz qarindosh, qadrdon do'st va tabarruk yaqinlarimizni lutfan taklif etamiz!",
  );
  const [story, setStory] = useState(
    "Ikki qalb rishtasi abadiy muhabbat va sadoqat bilan bog'landi.",
  );
  const [musicTitle, setMusicTitle] = useState(MUSIC_TRACKS[0].title);
  const [musicUrl, setMusicUrl] = useState(MUSIC_TRACKS[0].url);
  const [cardNumber, setCardNumber] = useState("8600 1234 5678 9012");
  const [cardOwner, setCardOwner] = useState("Farhodbek R.");
  const [phone, setPhone] = useState("+998 90 123 45 67");
  const [gallery, setGallery] = useState<string[]>([
    SAMPLE_COVERS[0],
    SAMPLE_COVERS[1],
    SAMPLE_COVERS[2],
  ]);

  // UI state
  const [activeStep, setActiveStep] = useState<number>(1);
  const [createdSuccess, setCreatedSuccess] = useState<MyTaklifInvitation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // If editing an existing invitation, load it
  useEffect(() => {
    if (editSlug) {
      const existing = getInvitationBySlug(editSlug);
      if (existing) {
        setCeremonyType(existing.ceremonyType);
        setDesign(existing.design);
        setGroomName(existing.groomName);
        setBrideName(existing.brideName);
        setGroomParents(existing.groomParents || "");
        setBrideParents(existing.brideParents || "");
        setDate(existing.date);
        setTime(existing.time);
        setTimeText(existing.timeText || "");
        setVenue(existing.venue);
        setAddress(existing.address);
        setMapUrl(existing.mapUrl || "");
        setCoverImage(existing.coverImage);
        setIntro(existing.intro);
        setStory(existing.story || "");
        setMusicTitle(existing.musicTitle || "");
        setMusicUrl(existing.musicUrl || "");
        setCardNumber(existing.cardNumber || "");
        setCardOwner(existing.cardOwner || "");
        setPhone(existing.phone || "");
        if (existing.gallery?.length) setGallery(existing.gallery);
      }
    }
  }, [editSlug]);

  const handleSave = () => {
    if (!groomName.trim() || !brideName.trim()) {
      alert("Iltimos, kelin va kuyov ismini kiriting!");
      setActiveStep(1);
      return;
    }
    if (!date.trim() || !venue.trim()) {
      alert("Iltimos, to'y sanasi va to'yxona nomini kiriting!");
      setActiveStep(2);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const saved = createOrUpdateMyTaklifInvitation({
        id: editSlug ? undefined : undefined,
        slug: editSlug || undefined,
        ceremonyType,
        design,
        groomName: groomName.trim(),
        brideName: brideName.trim(),
        groomParents: groomParents.trim(),
        brideParents: brideParents.trim(),
        date,
        time,
        timeText,
        venue: venue.trim(),
        address: address.trim(),
        mapUrl: mapUrl.trim(),
        coverImage,
        gallery,
        intro: intro.trim(),
        story: story.trim(),
        musicTitle,
        musicUrl,
        cardNumber: cardNumber.trim(),
        cardOwner: cardOwner.trim(),
        phone: phone.trim(),
        status: "approved",
        paid: true,
      });

      setIsSubmitting(false);
      setCreatedSuccess(saved);
    }, 400);
  };

  const copyUrl = (slug: string) => {
    const url = `${window.location.origin}/t/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const selectedDesignMeta = DESIGNS.find((d) => d.id === design) || DESIGNS[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Taklifnoma konstruktori</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            To'y taklifnomangizni tayyorlang
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Ma'lumotlarni to'ldiring, natijani o'ng tomondagi ekranda jonli kuzatib boring.
          </p>
        </div>

        {/* WORKSPACE GRID: FORM (LEFT) + LIVE PREVIEW (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM ACCORDION & INPUTS */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            {/* STEP 1: ASOSIY MA'LUMOTLAR */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="w-full p-5 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-base"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span>Kelin va Kuyov ma'lumotlari</span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeStep === 1 ? "rotate-90 text-blue-600" : ""
                  }`}
                />
              </button>

              {activeStep === 1 && (
                <div className="p-6 space-y-5 bg-white">
                  {/* CEREMONY TYPE */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Marosim turi:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          ["wedding", "Nikoh to'yi"],
                          ["sunnat", "Sunnat to'yi"],
                          ["engagement", "Fotiha to'yi"],
                          ["birthday", "Yubiley / Tantanali"],
                        ] as const
                      ).map(([val, label]) => (
                        <button
                          type="button"
                          key={val}
                          onClick={() => setCeremonyType(val)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition border ${
                            ceremonyType === val
                              ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kuyov ismi: *
                      </label>
                      <input
                        type="text"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        placeholder="Masalan: Farhodbek"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kelin ismi: *
                      </label>
                      <input
                        type="text"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        placeholder="Masalan: Shirinbonu"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kuyovning ota-onasi:
                      </label>
                      <input
                        type="text"
                        value={groomParents}
                        onChange={(e) => setGroomParents(e.target.value)}
                        placeholder="Rustamjon va Nodiraxon"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Kelinning ota-onasi:
                      </label>
                      <input
                        type="text"
                        value={brideParents}
                        onChange={(e) => setBrideParents(e.target.value)}
                        placeholder="Baxtiyor aka va Dilfuza opa"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Taklifnoma kirish matni / Tabrik:
                    </label>
                    <textarea
                      rows={3}
                      value={intro}
                      onChange={(e) => setIntro(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                    >
                      Keyingi: Sana va Manzil →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: SANA, VAQT VA TO'YXONA */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="w-full p-5 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-base"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span>To'y sanasi, vaqti va manzili</span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeStep === 2 ? "rotate-90 text-blue-600" : ""
                  }`}
                />
              </button>

              {activeStep === 2 && (
                <div className="p-6 space-y-5 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        To'y kuni (Sana): *
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Boshlanish soati: *
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Vaqt qo'shimcha matni:
                    </label>
                    <input
                      type="text"
                      value={timeText}
                      onChange={(e) => setTimeText(e.target.value)}
                      placeholder="Soat 18:00 da tantanali kecha"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      To'yxona / Restoran nomi: *
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Masalan: Versal Tantanalar Saroyi"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      To'yxona aniq manzili:
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Toshkent sh., Chilonzor tumani..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Google Maps yoki Yandex xarita havolasi:
                    </label>
                    <input
                      type="url"
                      value={mapUrl}
                      onChange={(e) => setMapUrl(e.target.value)}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
                    >
                      ← Ortga
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                    >
                      Keyingi: Dizayn va Rasmlar →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: DIZAYN, RASMLAR VA MUSIQA */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="w-full p-5 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-base"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span>Dizayn, Fotosuratlar va Musiqa</span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    activeStep === 3 ? "rotate-90 text-blue-600" : ""
                  }`}
                />
              </button>

              {activeStep === 3 && (
                <div className="p-6 space-y-5 bg-white">
                  {/* DESIGN SELECTOR (8 DESIGNS) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Dizayn uslubini tanlang:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {DESIGNS.map((d) => (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => setDesign(d.id)}
                          className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                            design === d.id
                              ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full shadow-sm"
                            style={{ backgroundColor: d.accent }}
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{d.name}</div>
                            <div className="text-[10px] text-slate-500">{d.tag}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COVER PHOTO QUICK PICKER */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Asosiy muqova fotosurati:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                      {SAMPLE_COVERS.map((imgUrl, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setCoverImage(imgUrl)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                            coverImage === imgUrl
                              ? "border-blue-600 ring-2 ring-blue-500/30 scale-95"
                              : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                        >
                          <img src={imgUrl} alt="sample" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Yoki o'z rasmingiz havolasini kiriting (https://...)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-xs font-medium"
                    />
                  </div>

                  {/* MUSIC TRACK SELECTOR */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Fon musiqasi:
                    </label>
                    <div className="space-y-2">
                      {MUSIC_TRACKS.map((track) => (
                        <div
                          key={track.id}
                          onClick={() => {
                            setMusicTitle(track.title);
                            setMusicUrl(track.url);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                            musicTitle === track.title
                              ? "border-blue-600 bg-blue-50/50"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Music className="w-4 h-4 text-blue-600" />
                            <div>
                              <div className="text-xs font-bold text-slate-900">{track.title}</div>
                              <div className="text-[10px] text-slate-500">{track.artist}</div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">{track.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GIFT CARD NUMBER */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        To'yona uchun karta raqami (ixtiyoriy):
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="8600 ...."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Karta egasining ismi:
                      </label>
                      <input
                        type="text"
                        value={cardOwner}
                        onChange={(e) => setCardOwner(e.target.value)}
                        placeholder="Farhodbek R."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
                    >
                      ← Ortga
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SAVE ACTION BUTTON */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 shadow-xl shadow-blue-500/25 transition transform active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? "Tayyorlanmoqda..."
                    : "Taklifnomani saqlash va havola olish"}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: REAL-TIME MOBILE CARD PREVIEW */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Jonli ko'rinish (Real-time Preview)</span>
              </span>
            </div>

            <div className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto bg-slate-900 p-3 sm:p-4 rounded-[40px] shadow-2xl shadow-blue-900/20 border-4 border-slate-800">
              {/* NOTCH */}
              <div className="w-32 h-5 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                <div className="w-10 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* CARD PREVIEW SURFACE */}
              <div
                className={`relative rounded-[28px] overflow-hidden text-white p-5 border border-white/10 shadow-inner bg-gradient-to-b ${selectedDesignMeta.bgGrad}`}
              >
                {/* FLOATING MUSIC BADGE */}
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-[10px] tracking-widest text-slate-200 font-semibold uppercase">
                    mytaklif.uz
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-[11px] text-white">
                    <Music className="w-3 h-3 text-sky-400" />
                    <span className="truncate max-w-[90px]">{musicTitle}</span>
                  </div>
                </div>

                {/* COVER PHOTO & NAMES */}
                <div className="text-center my-6 space-y-3">
                  <div className="relative w-28 h-28 mx-auto rounded-full p-1 border-2 border-white/40 shadow-lg">
                    <img
                      src={coverImage}
                      alt={groomName}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </div>
                  </div>

                  <div className="text-white/80 text-[11px] tracking-wider uppercase font-medium">
                    {ceremonyType === "wedding" ? "Biz oila qurmoqdamiz" : "Qutlug' to'y tantanasi"}
                  </div>

                  <h3
                    className="text-3xl tracking-tight text-white font-normal"
                    style={{ fontFamily: selectedDesignMeta.fontFamily }}
                  >
                    {groomName || "Kuyov"}
                    <span className="block text-sky-300 font-sans text-xl my-0.5">&</span>
                    {brideName || "Kelin"}
                  </h3>
                </div>

                {/* COUNTDOWN */}
                <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-white/10 mb-4 text-center">
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider mb-1.5">
                    To'y kunigacha:
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono font-bold text-sm">
                    <div className="bg-white/10 p-1 rounded">42 kun</div>
                    <div className="bg-white/10 p-1 rounded">14 soat</div>
                    <div className="bg-white/10 p-1 rounded">36 daq</div>
                    <div className="bg-white/10 p-1 rounded">20 sek</div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="space-y-1.5 text-xs text-white/90 bg-black/20 p-3 rounded-xl border border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{date || "2026-11-25"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{timeText || `Soat ${time} da`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate">{venue || "Tantanalar Saroyi"}</span>
                  </div>
                </div>

                {/* RSVP BUTTON */}
                <div className="w-full py-2.5 rounded-xl font-bold text-xs bg-white text-slate-900 text-center shadow-lg">
                  Tashrifni tasdiqlash (RSVP)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SUCCESS MODAL (TAKLIFNOMA TAYYOR BO'LGANDA)
      ========================================================= */}
      {createdSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Tabriklaymiz! Taklifnomangiz tayyor!
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Sizning shaxsiy onlayn taklifnomangiz muvaffaqiyatli saqlandi va barcha yaqinlaringizga yuborish uchun tayyor.
              </p>
            </div>

            {/* URL BOX */}
            <div className="p-3 bg-slate-100 rounded-2xl flex items-center justify-between gap-3 border border-slate-200">
              <span className="text-xs text-blue-700 font-semibold font-mono truncate">
                {`${window.location.origin}/t/${createdSuccess.slug}`}
              </span>
              <button
                type="button"
                onClick={() => copyUrl(createdSuccess.slug)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0"
              >
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Nusxalandi" : "Nusxalash"}</span>
              </button>
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  `${window.location.origin}/t/${createdSuccess.slug}`,
                )}&text=${encodeURIComponent(
                  `Assalomu alaykum! Sizni ${createdSuccess.groomName} va ${createdSuccess.brideName}ning baxt to'yiga lutfan taklif etamiz!`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow transition"
              >
                <Send className="w-4 h-4" />
                <span>Telegramda ulashish</span>
              </a>

              <button
                type="button"
                onClick={() => navigate(`/t/${createdSuccess.slug}`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Taklifnomani ochish</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCreatedSuccess(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Yopish va tahrirni davom ettirish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
