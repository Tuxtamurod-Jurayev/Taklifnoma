import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Send,
  Sparkles,
  MessageSquareHeart,
} from "lucide-react";
import {
  getInvitationBySlug,
  addGuestWish,
  type MyTaklifInvitation,
} from "../data/mytaklifData";

export default function MyTaklifWishes() {
  const { slug } = useParams<{ slug: string }>();
  const [invitation, setInvitation] = useState<MyTaklifInvitation | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const inv = getInvitationBySlug(slug);
    if (inv) setInvitation(inv);
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !name.trim() || !message.trim()) return;

    addGuestWish(slug, name.trim(), message.trim());
    setSubmitted(true);
    setName("");
    setMessage("");

    const updated = getInvitationBySlug(slug);
    if (updated) setInvitation(updated);
  };

  if (!invitation) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Taklifnoma topilmadi</h2>
        <Link
          to="/"
          className="px-5 py-2.5 bg-blue-600 rounded-xl font-medium text-sm hover:bg-blue-700 transition"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* TOP BAR */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            to={`/t/${invitation.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Taklifnomaga qaytish
          </Link>
          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            mytaklif.uz
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-500/30">
            <MessageSquareHeart className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold font-serif tracking-tight text-white mb-1">
            {invitation.groomName} & {invitation.brideName}
          </h1>
          <p className="text-sm text-slate-400">
            Ushbu ikki yosh uchun yaxshi tilak va duolaringizni yozib qoldiring
          </p>
          <div className="inline-block mt-3 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-slate-300">
            Jami tilaklar:{" "}
            <strong className="text-amber-400">{invitation.wishes?.length || 0} ta</strong>
          </div>
        </div>

        {/* ADD WISH FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Yangi tabrik va tilak qoldirish
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Ismingiz *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Dilnoza Karimova"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Samimiy tilagingiz *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ikki yoshga baxt, mustahkam oila va quvonch tilayman!..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Tilakni yuborish
            </button>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center">
                ✨ Tilagingiz muvaffaqiyatli saqlandi! Rahmat!
              </div>
            )}
          </form>
        </div>

        {/* WISHES LIST */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Barcha mehmonlar tabriklari</span>
          </h2>

          {invitation.wishes && invitation.wishes.length > 0 ? (
            <div className="space-y-3">
              {invitation.wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md relative group hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                        {w.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-white text-sm">{w.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(w.createdAt).toLocaleString("uz-UZ", {
                        day: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-10">
                    "{w.message}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
              Hali hech kim tilak qoldirmagan. Birinchi bo'lib o'z samimiy
              tilaklaringizni yozib qoldiring!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
