import { supabase } from "./supabaseClient";
import type {
  MyTaklifInvitation,
  GuestRsvp,
  GuestWish,
} from "../types/invitation";

// Helper to convert camelCase MyTaklifInvitation to database snake_case
export function toDbInvitation(inv: MyTaklifInvitation) {
  return {
    id: inv.id,
    slug: inv.slug,
    ceremony_type: inv.ceremonyType,
    design: inv.design,
    groom_name: inv.groomName,
    bride_name: inv.brideName,
    groom_parents: inv.groomParents || null,
    bride_parents: inv.brideParents || null,
    date: inv.date,
    time: inv.time || "18:00",
    time_text: inv.timeText || null,
    venue: inv.venue,
    address: inv.address || null,
    map_url: inv.mapUrl || null,
    cover_image: inv.coverImage,
    gallery: inv.gallery || [],
    intro: inv.intro,
    story: inv.story || null,
    music_title: inv.musicTitle || null,
    music_url: inv.musicUrl || null,
    schedule: inv.schedule || [],
    dress_code: inv.dressCode || null,
    card_number: inv.cardNumber || null,
    card_owner: inv.cardOwner || null,
    phone: inv.phone || null,
    status: inv.status,
    paid: inv.paid,
    price: inv.price,
    views: inv.views || 0,
    created_at: inv.createdAt,
  };
}

// Helper to convert DB snake_case record to MyTaklifInvitation
export function fromDbInvitation(
  row: any,
  rsvps: GuestRsvp[] = [],
  wishes: GuestWish[] = []
): MyTaklifInvitation {
  return {
    id: row.id,
    slug: row.slug,
    ceremonyType: row.ceremony_type || "wedding",
    design: row.design || "emerald",
    groomName: row.groom_name,
    brideName: row.bride_name,
    groomParents: row.groom_parents || "",
    brideParents: row.bride_parents || "",
    date: row.date,
    time: row.time || "18:00",
    timeText: row.time_text || "",
    venue: row.venue,
    address: row.address || "",
    mapUrl: row.map_url || "",
    coverImage: row.cover_image || "",
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    intro: row.intro || "",
    story: row.story || "",
    musicTitle: row.music_title || "",
    musicUrl: row.music_url || "",
    schedule: Array.isArray(row.schedule) ? row.schedule : [],
    dressCode: row.dress_code || "",
    cardNumber: row.card_number || "",
    cardOwner: row.card_owner || "",
    phone: row.phone || "",
    status: row.status || "approved",
    paid: !!row.paid,
    price: Number(row.price) || 50000,
    views: Number(row.views) || 0,
    rsvps,
    wishes,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

// 1. Fetch all invitations from Supabase with their RSVPs and Wishes
export async function fetchInvitationsFromSupabase(): Promise<MyTaklifInvitation[] | null> {
  try {
    const { data: invRows, error: invErr } = await supabase
      .from("invitations")
      .select("*")
      .order("created_at", { ascending: false });

    if (invErr || !invRows) {
      console.warn("Supabase fetch invitations warning:", invErr?.message);
      return null;
    }

    const { data: rsvpRows } = await supabase.from("rsvps").select("*");
    const { data: wishRows } = await supabase.from("wishes").select("*");

    return invRows.map((inv) => {
      const invRsvps: GuestRsvp[] = (rsvpRows || [])
        .filter((r) => r.invitation_slug === inv.slug)
        .map((r) => ({
          id: r.id,
          name: r.name,
          phone: r.phone || "",
          guestsCount: r.guests_count || 1,
          attending: !!r.attending,
          submittedAt: r.submitted_at,
        }));

      const invWishes: GuestWish[] = (wishRows || [])
        .filter((w) => w.invitation_slug === inv.slug)
        .map((w) => ({
          id: w.id,
          name: w.name,
          message: w.message,
          createdAt: w.created_at,
        }));

      return fromDbInvitation(inv, invRsvps, invWishes);
    });
  } catch (err) {
    console.warn("Supabase connection error:", err);
    return null;
  }
}

// 2. Upsert an invitation into Supabase
export async function upsertInvitationToSupabase(
  inv: MyTaklifInvitation
): Promise<boolean> {
  try {
    const payload = toDbInvitation(inv);
    const { error } = await supabase
      .from("invitations")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      console.warn("Supabase upsert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase upsert error:", err);
    return false;
  }
}

// 3. Insert RSVP into Supabase
export async function insertRsvpToSupabase(
  slug: string,
  rsvp: Omit<GuestRsvp, "id" | "submittedAt">
): Promise<boolean> {
  try {
    const payload = {
      id: `rsvp-${Date.now()}`,
      invitation_slug: slug,
      name: rsvp.name,
      phone: rsvp.phone || null,
      guests_count: rsvp.guestsCount || 1,
      attending: rsvp.attending,
    };

    const { error } = await supabase.from("rsvps").insert(payload);
    if (error) {
      console.warn("Supabase RSVP insert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase RSVP insert error:", err);
    return false;
  }
}

// 4. Insert Wish into Supabase
export async function insertWishToSupabase(
  slug: string,
  name: string,
  message: string
): Promise<boolean> {
  try {
    const payload = {
      id: `wish-${Date.now()}`,
      invitation_slug: slug,
      name,
      message,
    };

    const { error } = await supabase.from("wishes").insert(payload);
    if (error) {
      console.warn("Supabase Wish insert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase Wish insert error:", err);
    return false;
  }
}

// 5. Update status (e.g. approve) in Supabase
export async function updateInvitationStatusInSupabase(
  slug: string,
  status: "approved" | "pending_approval"
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("invitations")
      .update({ status, paid: status === "approved" })
      .eq("slug", slug);

    if (error) {
      console.warn("Supabase status update error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase status update error:", err);
    return false;
  }
}

// 6. Delete invitation from Supabase
export async function deleteInvitationFromSupabase(slug: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("invitations")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.warn("Supabase delete error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase delete error:", err);
    return false;
  }
}
