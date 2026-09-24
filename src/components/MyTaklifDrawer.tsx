import { Link } from "react-router-dom";
import { X, ExternalLink, Edit3, Share2, Calendar, MapPin, PlusCircle, Heart } from "lucide-react";
import { getMyTaklifInvitations, type MyTaklifInvitation } from "../data/mytaklifData";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MyTaklifDrawer({ isOpen, onClose }: DrawerProps) {
  const invitations = getMyTaklifInvitations();

  if (!isOpen) return null;

  const handleShare = async (inv: MyTaklifInvitation) => {
    const url = `${window.location.origin}/t/${inv.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${inv.groomName} & ${inv.brideName} — To'y taklifnomasi`,
          url,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Taklifnoma havolasi nusxalandi!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* DRAWER PANEL */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Sizning taklifnomalaringiz</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ochish yoki ulashish uchun tanlang
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* INVITATION LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {invitations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-slate-800">
                Hozircha taklifnoma yo'q
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-6">
                To'yingiz uchun ilk elektron taklifnomani atigi 3 daqiqada yarating.
              </p>
              <Link
                to="/create"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Yangi taklifnoma yaratish</span>
              </Link>
            </div>
          ) : (
            invitations.map((inv) => (
              <div
                key={inv.id}
                className="group relative bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={inv.coverImage}
                    alt={inv.groomName}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-900 truncate">
                      {inv.groomName} & {inv.brideName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{inv.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate">{inv.venue}</span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/t/${inv.slug}`}
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ko'rish</span>
                  </Link>

                  <Link
                    to={`/create?edit=${inv.slug}`}
                    onClick={onClose}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleShare(inv)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                    title="Ulashish"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <Link
            to="/create"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-500/25 transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Yangi taklifnoma yaratish</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
