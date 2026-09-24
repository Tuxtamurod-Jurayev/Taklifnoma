import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  ArrowRight,
  Headphones,
} from "lucide-react";
import MyTaklifNavbar from "../components/MyTaklifNavbar";
import MyTaklifFooter from "../components/MyTaklifFooter";
import { MUSIC_TRACKS, type MusicTrack } from "../data/mytaklifData";

export default function MyTaklifMusics() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const handlePlayToggle = (track: MusicTrack) => {
    if (playingTrackId === track.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(track.id);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play().catch(() => {
          setPlayingTrackId(null);
        });
      }
    }
  };

  const handleSelectTrack = (track: MusicTrack) => {
    // Navigate to create page with track selected in state or query
    navigate(`/create?musicId=${track.id}`);
  };

  const filteredTracks =
    selectedCategory === "all"
      ? MUSIC_TRACKS
      : MUSIC_TRACKS.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <MyTaklifNavbar />

      {/* Hidden audio element for previews */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        onError={() => setPlayingTrackId(null)}
      />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
              <Headphones className="w-3.5 h-3.5 text-blue-600" />
              Fon musiqalari kutubxonasi
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              To'yingiz uchun eng go'zal kuylar
            </h1>
            <p className="text-base text-slate-600">
              Mehmonlaringiz taklifnomani ochganida avtomatik jaranglaydigan romantik,
              milliy yoki mumtoz kuylarni tinglab ko'ring va o'zingizga ma'qulini tanlang.
            </p>
          </div>

          {/* CATEGORIES FILTER */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: "all", label: "Barcha kuylar" },
              { id: "romantik", label: "Romantik kuylar" },
              { id: "milliy", label: "O'zbek milliy kuylari" },
              { id: "mumtoz", label: "Mumtoz / Skripka" },
              { id: "zamonaviy", label: "Zamonaviy pop" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* TRACKS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTracks.map((track) => {
              const isCurrentPlaying = playingTrackId === track.id;

              return (
                <div
                  key={track.id}
                  className={`bg-white rounded-2xl border p-5 transition-all flex items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                    isCurrentPlaying
                      ? "border-blue-500 ring-2 ring-blue-500/20"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <button
                      onClick={() => handlePlayToggle(track)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md ${
                        isCurrentPlaying
                          ? "bg-amber-500 text-slate-950 animate-pulse"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                      }`}
                      title={isCurrentPlaying ? "To'xtatish" : "Tinglash"}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                        {track.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {track.artist}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {track.category}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectTrack(track)}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                  >
                    <span>Tanlash</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* BOTTOM BANNER */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                O'zingizning sevimli musiqangiz bormi?
              </h2>
              <p className="text-sm text-blue-100 max-w-lg">
                Taklifnoma yaratish jarayonida xohlagan audio havolangizni yoki o'z
                faylingizni qulay tarzda kiritishingiz mumkin.
              </p>
            </div>
            <Link
              to="/create"
              className="px-6 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shrink-0 transition shadow-lg"
            >
              Taklifnoma yaratishga o'tish
            </Link>
          </div>
        </div>
      </main>

      <MyTaklifFooter />
    </div>
  );
}
