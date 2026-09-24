export type CeremonyType = "wedding" | "sunnat" | "engagement" | "birthday";

export type DesignId =
  | "emerald"
  | "gold"
  | "rose"
  | "classic"
  | "milliy"
  | "boho"
  | "royal"
  | "dark";

export type GuestWish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type GuestRsvp = {
  id: string;
  name: string;
  phone: string;
  guestsCount: number;
  attending: boolean;
  submittedAt: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  desc?: string;
};

export type MyTaklifInvitation = {
  id: string;
  slug: string;
  ceremonyType: CeremonyType;
  design: DesignId;
  groomName: string;
  brideName: string;
  groomParents?: string;
  brideParents?: string;
  date: string; // e.g. "2026-11-25"
  time: string; // e.g. "18:00"
  timeText?: string; // e.g. "Soat 18:00 da"
  venue: string; // e.g. "Versal Tantanalar Saroyi"
  address: string; // e.g. "Toshkent shahri, Chilonzor tumani"
  mapUrl?: string; // Google maps or Yandex
  coverImage: string;
  gallery: string[];
  intro: string;
  story?: string;
  musicTitle?: string;
  musicUrl?: string;
  schedule?: ScheduleItem[];
  dressCode?: string;
  cardNumber?: string;
  cardOwner?: string;
  phone?: string;
  status: "draft" | "pending_approval" | "approved";
  paid: boolean;
  price: number;
  views: number;
  rsvps: GuestRsvp[];
  wishes: GuestWish[];
  createdAt: string;
};

export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: "romantik" | "milliy" | "mumtoz" | "zamonaviy";
  url: string;
};
