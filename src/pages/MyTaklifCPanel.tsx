import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Search,
  DollarSign,
  Heart,
  Calendar,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import {
  getMyTaklifInvitations,
  getMyTaklifStats,
  approveMyTaklifInvitation,
  deleteMyTaklifInvitation,
  saveMyTaklifInvitations,
  type MyTaklifInvitation,
} from "../data/mytaklifData";

export default function MyTaklifCPanel() {
  const [stats, setStats] = useState(getMyTaklifStats());
  const [invitations, setInvitations] = useState<MyTaklifInvitation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending_approval">("all");
  const [activeTab, setActiveTab] = useState<"invitations" | "rsvps" | "wishes" | "stats">("invitations");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const refreshData = () => {
    setStats(getMyTaklifStats());
    setInvitations(getMyTaklifInvitations());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleApprove = (slug: string) => {
    approveMyTaklifInvitation(slug);
    refreshData();
  };

  const handleDelete = (slug: string, name: string) => {
    if (window.confirm(`"${name}" taklifnomasini rostdan ham o'chirmoqchimisiz?`)) {
      deleteMyTaklifInvitation(slug);
      refreshData();
    }
  };

  const handleToggleStatus = (inv: MyTaklifInvitation) => {
    const all = getMyTaklifInvitations();
    const idx = all.findIndex((i) => i.id === inv.id);
    if (idx >= 0) {
      all[idx].status = inv.status === "approved" ? "pending_approval" : "approved";
      all[idx].paid = all[idx].status === "approved";
      saveMyTaklifInvitations(all);
      refreshData();
    }
  };

  const copyPublicLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/t/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Filtered invitations
  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch =
      inv.groomName.toLowerCase().includes(search.toLowerCase()) ||
      inv.brideName.toLowerCase().includes(search.toLowerCase()) ||
      inv.venue.toLowerCase().includes(search.toLowerCase()) ||
      inv.slug.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Extract all RSVPs across all invitations
  const allRsvps = invitations.flatMap((inv) =>
    (inv.rsvps || []).map((rsvp) => ({
      ...rsvp,
      invitationName: `${inv.groomName} & ${inv.brideName}`,
      invitationSlug: inv.slug,
    }))
  );

  // Extract all wishes across all invitations
  const allWishes = invitations.flatMap((inv) =>
    (inv.wishes || []).map((w) => ({
      ...w,
      invitationName: `${inv.groomName} & ${inv.brideName}`,
      invitationSlug: inv.slug,
    }))
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* TOP HEADER */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">
                  mytaklif<span className="text-sky-400">.uz</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Yangilash"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              to="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition flex items-center gap-1.5"
            >
              Saytga o'tish
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* STATS OVERVIEW CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Visitors */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Foydalanuvchilar
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">
                {stats.totalVisitors.toLocaleString()}
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Tashrif buyuruvchilar
              </p>
            </div>
          </div>

          {/* Total Invitations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Taklifnomalar
              </span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">
                {stats.totalInvitations} ta
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Yaratilgan loyihalar
              </p>
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Tasdiqlangan
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-600">
                {stats.approvedCount} ta
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Faol va havola berilgan
              </p>
            </div>
          </div>

          {/* Pending Approval */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Kutilmoqda
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-600">
                {stats.pendingCount} ta
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Ruxsat berish kerak
              </p>
            </div>
          </div>

          {/* RSVPs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                RSVP Mehmonlar
              </span>
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">
                {stats.totalRsvps} ta
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Tashrif tasdiqlari
              </p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Jami Tushum
              </span>
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-blue-700">
                {(stats.totalRevenue).toLocaleString()} UZS
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                To'langan buyurtmalar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("invitations")}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "invitations"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Taklifnomalar boshqaruvi ({invitations.length})
          </button>

          <button
            onClick={() => setActiveTab("rsvps")}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "rsvps"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            Mehmonlar (RSVP) ({allRsvps.length})
          </button>

          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === "wishes"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Heart className="w-4 h-4" />
            Tilaklar ({allWishes.length})
          </button>
        </div>
      </div>

      {/* CONTENT: INVITATIONS TAB */}
      {activeTab === "invitations" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ism, to'yxona yoki havola qidirish..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Barchasi ({invitations.length})
              </button>
              <button
                onClick={() => setStatusFilter("approved")}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  statusFilter === "approved"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-slate-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                Tasdiqlangan ({stats.approvedCount})
              </button>
              <button
                onClick={() => setStatusFilter("pending_approval")}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                  statusFilter === "pending_approval"
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-slate-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                }`}
              >
                Kutilayotgan ({stats.pendingCount})
              </button>
            </div>
          </div>

          {/* TABLE OF INVITATIONS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Kelin & Kuyov</th>
                    <th className="px-6 py-4">Sana & Manzil</th>
                    <th className="px-6 py-4">Shablon</th>
                    <th className="px-6 py-4">Holat / To'lov</th>
                    <th className="px-6 py-4">Havola & Ruxsat</th>
                    <th className="px-6 py-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 text-base">
                          {inv.groomName} & {inv.brideName}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          ID: {inv.id} &bull; Ko'rishlar: {inv.views || 0}
                        </div>
                        {inv.phone && (
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inv.phone}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">
                          {inv.date} &bull; {inv.time || "18:00"}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {inv.venue}
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-xs">
                          {inv.address}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {inv.design}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {inv.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Tasdiqlangan / Faol
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                            <Clock className="w-3.5 h-3.5" />
                            Ruxsat kutilmoqda
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded text-blue-700 font-mono">
                              /t/{inv.slug}
                            </code>
                            <button
                              onClick={() => copyPublicLink(inv.slug)}
                              className="p-1 text-slate-400 hover:text-slate-700 transition"
                              title="Havoladan nusxa olish"
                            >
                              {copiedSlug === inv.slug ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <Link
                              to={`/t/${inv.slug}`}
                              target="_blank"
                              className="p-1 text-slate-400 hover:text-blue-600 transition"
                              title="Ochish"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>

                          {/* Quick Approval button */}
                          {inv.status !== "approved" ? (
                            <button
                              onClick={() => handleApprove(inv.slug)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Ruxsat berish & Havolani ochish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleStatus(inv)}
                              className="text-xs text-amber-600 hover:underline text-left"
                            >
                              Holatni bekor qilish
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            handleDelete(
                              inv.slug,
                              `${inv.groomName} & ${inv.brideName}`
                            )
                          }
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredInvitations.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        Taklifnomalar topilmadi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: RSVPS TAB */}
      {activeTab === "rsvps" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Qabul qilingan mehmonlar ro'yxati
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Taklifnoma sahifasida tashrifini tasdiqlagan barcha mehmonlar
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                Jami: {allRsvps.length} ta
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Mehmon ismi</th>
                    <th className="px-6 py-4">Telefon</th>
                    <th className="px-6 py-4">Qatnashishi</th>
                    <th className="px-6 py-4">Kishi soni</th>
                    <th className="px-6 py-4">To'y loyihasi</th>
                    <th className="px-6 py-4">Vaqti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {rsvp.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">
                        {rsvp.phone || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {rsvp.attending ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            Keladi
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                            Kelolmaydi
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {rsvp.guestsCount} kishi
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/t/${rsvp.invitationSlug}`}
                          target="_blank"
                          className="text-blue-600 hover:underline font-medium text-xs flex items-center gap-1"
                        >
                          {rsvp.invitationName}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(rsvp.submittedAt).toLocaleDateString("uz-UZ")}
                      </td>
                    </tr>
                  ))}

                  {allRsvps.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        Hozircha hech bir mehmon RSVP qoldirmagan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT: WISHES TAB */}
      {activeTab === "wishes" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Mehmonlar tilaklari va tabriklari
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Barcha taklifnomalarga qoldirilgan tabrik xabarlari
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700">
                Jami: {allWishes.length} ta
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {allWishes.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">{w.name}</span>
                      <span className="text-xs text-slate-400">
                        {new Date(w.createdAt).toLocaleDateString("uz-UZ")}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 italic">"{w.message}"</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      To'y:{" "}
                      <Link
                        to={`/t/${w.invitationSlug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        {w.invitationName}
                      </Link>
                    </span>
                  </div>
                </div>
              ))}

              {allWishes.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-400">
                  Hozircha tilaklar yo'q.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
