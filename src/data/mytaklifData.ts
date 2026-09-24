import {
  fetchInvitationsFromSupabase,
  upsertInvitationToSupabase,
  insertRsvpToSupabase,
  insertWishToSupabase,
  updateInvitationStatusInSupabase,
  deleteInvitationFromSupabase,
} from "../lib/supabaseService";

export type {
  CeremonyType,
  DesignId,
  GuestWish,
  GuestRsvp,
  ScheduleItem,
  MyTaklifInvitation,
  MusicTrack,
} from "../types/invitation";

import type {
  DesignId,
  GuestWish,
  GuestRsvp,
  MyTaklifInvitation,
  MusicTrack,
} from "../types/invitation";

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "m-1",
    title: "Yor-yor (Milliy kuy)",
    artist: "O'zbek xalq kuyi",
    duration: "3:45",
    category: "milliy",
    url: "https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg",
  },
  {
    id: "m-2",
    title: "A Thousand Years (Instrumental)",
    artist: "Piano & Cello",
    duration: "4:12",
    category: "romantik",
    url: "https://actions.google.com/sounds/v1/music/acoustic_guitar_bright.ogg",
  },
  {
    id: "m-3",
    title: "Sensiz (Nafis skripka)",
    artist: "Simfonik orkestr",
    duration: "3:20",
    category: "zamonaviy",
    url: "https://actions.google.com/sounds/v1/music/piano_moment.ogg",
  },
  {
    id: "m-4",
    title: "To'y muborak (Zarhal karnay)",
    artist: "O'zbekiston navolari",
    duration: "2:55",
    category: "milliy",
    url: "https://actions.google.com/sounds/v1/music/upbeat_acoustic.ogg",
  },
  {
    id: "m-5",
    title: "Perfect (Wedding Symphony)",
    artist: "Strings Quartet",
    duration: "4:05",
    category: "romantik",
    url: "https://actions.google.com/sounds/v1/music/ambient_guitar.ogg",
  },
];

export const DESIGNS: {
  id: DesignId;
  name: string;
  tag: string;
  accent: string;
  bgGrad: string;
  fontFamily: string;
  previewImg: string;
}[] = [
  {
    id: "emerald",
    name: "Yashil Zumrad",
    tag: "Eng ommabop",
    accent: "#10b981",
    bgGrad: "from-emerald-950 via-emerald-900 to-teal-950",
    fontFamily: "'Playfair Display', serif",
    previewImg:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gold",
    name: "Zarhal Hashamat",
    tag: "Premium",
    accent: "#f59e0b",
    bgGrad: "from-amber-950 via-neutral-900 to-yellow-950",
    fontFamily: "'Cinzel', serif",
    previewImg:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rose",
    name: "Romantik Pushti",
    tag: "Nafis",
    accent: "#f43f5e",
    bgGrad: "from-rose-950 via-pink-900 to-red-950",
    fontFamily: "'Great Vibes', cursive",
    previewImg:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "classic",
    name: "Klassik Oq",
    tag: "Sokin",
    accent: "#0ea5e9",
    bgGrad: "from-slate-100 via-stone-50 to-neutral-100",
    fontFamily: "'Playfair Display', serif",
    previewImg:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "milliy",
    name: "Milliy Zardo'zi",
    tag: "O'zbekona",
    accent: "#d97706",
    bgGrad: "from-blue-950 via-indigo-950 to-amber-950",
    fontFamily: "'Cinzel', serif",
    previewImg:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "boho",
    name: "Boho Terrakota",
    tag: "Issiq",
    accent: "#ea580c",
    bgGrad: "from-orange-950 via-amber-900 to-stone-900",
    fontFamily: "'Playfair Display', serif",
    previewImg:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "royal",
    name: "Moviy Qirollik",
    tag: "Tantanali",
    accent: "#2563eb",
    bgGrad: "from-blue-950 via-slate-900 to-sky-950",
    fontFamily: "'Cinzel', serif",
    previewImg:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dark",
    name: "Qora Velvet",
    tag: "Eksklyuziv",
    accent: "#a855f7",
    bgGrad: "from-neutral-950 via-stone-900 to-black",
    fontFamily: "'Cinzel', serif",
    previewImg:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
  },
];

export const INITIAL_DEMO_INVITATIONS: MyTaklifInvitation[] = [
  {
    id: "inv-1",
    slug: "farhod-va-shirin",
    ceremonyType: "wedding",
    design: "emerald",
    groomName: "Farhodbek",
    brideName: "Shirinbonu",
    groomParents: "Rustamjon va Nodiraxon",
    brideParents: "Baxtiyor aka va Dilfuza opa",
    date: "2026-11-25",
    time: "18:00",
    timeText: "Soat 18:00 da kutib qolamiz",
    venue: "Versal Tantanalar Saroyi",
    address: "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi, 42-uy",
    mapUrl: "https://maps.google.com/?q=Tashkent",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
    ],
    intro:
      "Alloh taoloning marhamati ila, ikki yoshning baxt to'yiga aziz qarindosh, qadrdon do'st va tabarruk yaqinlarimizni lutfan taklif etamiz. Sizning quvonchimizga sherik bo'lishingiz biz uchun cheksiz sharafdir!",
    story:
      "Taqdirimiz bir-birimizga bog'langan o'sha unutilmas kundan boshlab, orzularimiz va qalbimiz mushtarak bo'ldi. Endi esa bir umr baxtli hayot kechirish arafasida turibmiz.",
    musicTitle: "Yor-yor (Milliy kuy)",
    musicUrl: "https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg",
    schedule: [
      { time: "17:30", title: "Mehmonlar tashrifi va qutlov", desc: "Jonli musiqa va kutib olish" },
      { time: "18:00", title: "Kelin va kuyov kirib kelishi", desc: "Tantanali oqshom boshlanishi" },
      { time: "19:00", title: "Nikoh fotiha marosimi", desc: "Oqsoqollar va ota-onalar duolari" },
      { time: "20:00", title: "To'y torti va bayram dasturi", desc: "Estrada yulduzlari ijrosi" },
    ],
    dressCode: "Erkaklar uchun: Klassik kostyum-shim. Ayollar uchun: Elegant oqshom ko'ylaklari.",
    cardNumber: "8600 1234 5678 9012",
    cardOwner: "Farhodbek R.",
    phone: "+998 90 123 45 67",
    status: "approved",
    paid: true,
    price: 50000,
    views: 480,
    rsvps: [
      {
        id: "r-1",
        name: "Akmal Karimov",
        phone: "+998 90 333 44 55",
        guestsCount: 2,
        attending: true,
        submittedAt: "2026-09-20T10:00:00Z",
      },
      {
        id: "r-2",
        name: "Gulbahor opa",
        phone: "+998 93 222 11 00",
        guestsCount: 1,
        attending: true,
        submittedAt: "2026-09-21T14:30:00Z",
      },
    ],
    wishes: [
      {
        id: "w-1",
        name: "Javohir & Nilufar",
        message:
          "Farhodbek va Shirinbonu, baxtingiz osmon qadar baland bo'lsin! Doimo bir-biringizni seving va ardoqlang.",
        createdAt: "2026-09-22T08:15:00Z",
      },
      {
        id: "w-2",
        name: "Shahzod",
        message: "To'y muborak bo'lsin do'stim! Xonadoningizdan quvonch va kulgu arimasin.",
        createdAt: "2026-09-22T19:40:00Z",
      },
    ],
    createdAt: "2026-09-15T09:00:00Z",
  },
  {
    id: "inv-2",
    slug: "javohir-va-muslima",
    ceremonyType: "wedding",
    design: "gold",
    groomName: "Javohir",
    brideName: "Muslima",
    groomParents: "Ulug'bek aka va Zulfiya opa",
    brideParents: "Qahramon aka va Saodat opa",
    date: "2026-10-18",
    time: "18:30",
    timeText: "Soat 18:30 da tantanali kecha",
    venue: "Yulduz Tantanalar Saroyi",
    address: "Samarqand shahri, Registon maydoni yaqinida",
    mapUrl: "https://maps.google.com/?q=Samarkand",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=85",
    ],
    intro:
      "Bismillahir Rohmanir Rohiym. Ota-onalarimizning oq fotihasi ila oila qurmoqdamiz. Ushbu nurli kunda barcha qadrdonlarimizni to'yimizga lutfan chorlaymiz.",
    musicTitle: "A Thousand Years (Instrumental)",
    musicUrl: "https://actions.google.com/sounds/v1/music/acoustic_guitar_bright.ogg",
    phone: "+998 91 999 88 77",
    status: "approved",
    paid: true,
    price: 50000,
    views: 312,
    rsvps: [],
    wishes: [
      {
        id: "w-3",
        name: "Bekzodbek",
        message: "Qo'sha qaringlar, ikki dunyo saodatini bersin!",
        createdAt: "2026-09-23T11:00:00Z",
      },
    ],
    createdAt: "2026-09-18T12:00:00Z",
  },
  {
    id: "inv-3",
    slug: "sardor-va-dilnoza",
    ceremonyType: "wedding",
    design: "milliy",
    groomName: "Sardorbek",
    brideName: "Dilnozaxon",
    date: "2026-12-05",
    time: "18:00",
    venue: "Sayyoh Restorani",
    address: "Buxoro shahri, Labi Hovuz majmuasi",
    coverImage:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=85",
    gallery: [],
    intro:
      "Boshimiz ko'kka yetguncha xursandmiz. Yaxshi kunimizda davramiz fayzi bo'ling!",
    status: "pending_approval",
    paid: true,
    price: 50000,
    views: 84,
    rsvps: [],
    wishes: [],
    createdAt: "2026-09-24T07:00:00Z",
  },
];

const STORAGE_INVITATIONS_KEY = "mytaklif_invitations_v2";
const STORAGE_VISITORS_KEY = "mytaklif_visitors_count_v2";

export function getMyTaklifInvitations(): MyTaklifInvitation[] {
  if (typeof window === "undefined") return INITIAL_DEMO_INVITATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_INVITATIONS_KEY);
    if (!raw) {
      localStorage.setItem(
        STORAGE_INVITATIONS_KEY,
        JSON.stringify(INITIAL_DEMO_INVITATIONS),
      );
      return INITIAL_DEMO_INVITATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_INVITATIONS;
  }
}

export function saveMyTaklifInvitations(items: MyTaklifInvitation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_INVITATIONS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function getInvitationBySlug(slug: string): MyTaklifInvitation | undefined {
  const all = getMyTaklifInvitations();
  const normalized = slug.toLowerCase().trim();
  return all.find(
    (inv) => inv.slug.toLowerCase().trim() === normalized || inv.id === normalized,
  );
}

export function createOrUpdateMyTaklifInvitation(
  invitation: Partial<MyTaklifInvitation> & {
    groomName: string;
    brideName: string;
    date: string;
    venue: string;
  },
): MyTaklifInvitation {
  const all = getMyTaklifInvitations();
  const now = new Date().toISOString();

  // Generate slug
  const baseSlug = `${invitation.groomName}-va-${invitation.brideName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const id = invitation.id || `inv-${Date.now()}`;
  const slug = invitation.slug || baseSlug || `taklif-${Date.now()}`;

  const existingIdx = all.findIndex((item) => item.id === id || item.slug === slug);

  if (existingIdx >= 0) {
    const updated: MyTaklifInvitation = {
      ...all[existingIdx],
      ...invitation,
      id: all[existingIdx].id,
      slug: all[existingIdx].slug,
      rsvps: all[existingIdx].rsvps || [],
      wishes: all[existingIdx].wishes || [],
    };
    all[existingIdx] = updated;
    saveMyTaklifInvitations(all);
    upsertInvitationToSupabase(updated).catch(() => {});
    return updated;
  }

  const newInv: MyTaklifInvitation = {
    id,
    slug,
    ceremonyType: invitation.ceremonyType || "wedding",
    design: invitation.design || "emerald",
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    groomParents: invitation.groomParents || "",
    brideParents: invitation.brideParents || "",
    date: invitation.date,
    time: invitation.time || "18:00",
    timeText: invitation.timeText || `Soat ${invitation.time || "18:00"} da`,
    venue: invitation.venue,
    address: invitation.address || "",
    mapUrl: invitation.mapUrl || "",
    coverImage:
      invitation.coverImage ||
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85",
    gallery: invitation.gallery || [],
    intro:
      invitation.intro ||
      "Alloh taoloning marhamati ila ikki yoshning baxt to'yiga aziz mehmonimiz bo'lishingizni so'raymiz!",
    story: invitation.story || "",
    musicTitle: invitation.musicTitle || "Yor-yor",
    musicUrl: invitation.musicUrl || "",
    schedule: invitation.schedule || [
      { time: "18:00", title: "To'y tantanasining boshlanishi" },
    ],
    dressCode: invitation.dressCode || "Klassik va bayramona",
    cardNumber: invitation.cardNumber || "",
    cardOwner: invitation.cardOwner || "",
    phone: invitation.phone || "+998 90 000 00 00",
    status: invitation.status || "approved",
    paid: invitation.paid !== undefined ? invitation.paid : true,
    price: 50000,
    views: 1,
    rsvps: [],
    wishes: [],
    createdAt: now,
  };

  all.unshift(newInv);
  saveMyTaklifInvitations(all);
  upsertInvitationToSupabase(newInv).catch(() => {});
  return newInv;
}

export function approveMyTaklifInvitation(slugOrId: string): boolean {
  const all = getMyTaklifInvitations();
  const idx = all.findIndex(
    (item) => item.slug === slugOrId || item.id === slugOrId,
  );
  if (idx < 0) return false;
  all[idx].status = "approved";
  all[idx].paid = true;
  saveMyTaklifInvitations(all);
  updateInvitationStatusInSupabase(all[idx].slug, "approved").catch(() => {});
  return true;
}

export function deleteMyTaklifInvitation(slugOrId: string): boolean {
  const all = getMyTaklifInvitations();
  const filtered = all.filter(
    (item) => item.slug !== slugOrId && item.id !== slugOrId,
  );
  if (filtered.length !== all.length) {
    saveMyTaklifInvitations(filtered);
    deleteInvitationFromSupabase(slugOrId).catch(() => {});
    return true;
  }
  return false;
}

export function incrementInvitationViews(slugOrId: string): void {
  const all = getMyTaklifInvitations();
  const idx = all.findIndex(
    (item) => item.slug === slugOrId || item.id === slugOrId,
  );
  if (idx >= 0) {
    all[idx].views = (all[idx].views || 0) + 1;
    saveMyTaklifInvitations(all);
  }
}

export function addGuestRsvp(
  slugOrId: string,
  rsvp: Omit<GuestRsvp, "id" | "submittedAt">,
): boolean {
  const all = getMyTaklifInvitations();
  const idx = all.findIndex(
    (item) => item.slug === slugOrId || item.id === slugOrId,
  );
  if (idx < 0) return false;

  const newRsvp: GuestRsvp = {
    ...rsvp,
    id: `rsvp-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };

  all[idx].rsvps = [newRsvp, ...(all[idx].rsvps || [])];
  saveMyTaklifInvitations(all);
  insertRsvpToSupabase(all[idx].slug, rsvp).catch(() => {});
  return true;
}

export function addGuestWish(
  slugOrId: string,
  name: string,
  message: string,
): boolean {
  const all = getMyTaklifInvitations();
  const idx = all.findIndex(
    (item) => item.slug === slugOrId || item.id === slugOrId,
  );
  if (idx < 0) return false;

  const newWish: GuestWish = {
    id: `wish-${Date.now()}`,
    name: name.trim() || "Mehmon",
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  all[idx].wishes = [newWish, ...(all[idx].wishes || [])];
  saveMyTaklifInvitations(all);
  insertWishToSupabase(all[idx].slug, name, message).catch(() => {});
  return true;
}

export async function syncWithSupabase(): Promise<void> {
  try {
    const remote = await fetchInvitationsFromSupabase();
    if (remote && remote.length > 0) {
      saveMyTaklifInvitations(remote);
    }
  } catch {
    // fallback gracefully to localStorage
  }
}

export function getMyTaklifStats() {
  const all = getMyTaklifInvitations();
  let visitors = 15840;

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_VISITORS_KEY);
      if (stored) {
        visitors = parseInt(stored, 10);
      } else {
        localStorage.setItem(STORAGE_VISITORS_KEY, String(visitors));
      }
    } catch {
      // ignore
    }
  }

  const approved = all.filter((i) => i.status === "approved").length;
  const pending = all.filter((i) => i.status === "pending_approval").length;
  const totalRsvps = all.reduce((sum, i) => sum + (i.rsvps?.length || 0), 0);
  const totalWishes = all.reduce((sum, i) => sum + (i.wishes?.length || 0), 0);
  const totalRevenue = all
    .filter((i) => i.paid)
    .reduce((sum, i) => sum + (i.price || 50000), 0);

  return {
    totalVisitors: visitors,
    totalInvitations: all.length,
    approvedCount: approved,
    pendingCount: pending,
    totalRsvps,
    totalWishes,
    totalRevenue,
  };
}

export function recordSiteVisit(): void {
  if (typeof window === "undefined") return;
  try {
    const visited = sessionStorage.getItem("mytaklif_session_tracked");
    if (!visited) {
      sessionStorage.setItem("mytaklif_session_tracked", "true");
      const current = parseInt(
        localStorage.getItem(STORAGE_VISITORS_KEY) || "15840",
        10,
      );
      localStorage.setItem(STORAGE_VISITORS_KEY, String(current + 1));
    }
  } catch {
    // ignore
  }
}
