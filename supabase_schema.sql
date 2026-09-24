-- ================================================================
-- mytaklif.uz — Supabase Ma'lumotlar Bazasi Strukturasi (SQL Schema)
-- Ushbu kodni Supabase Dashboard -> SQL Editor bo'limiga nusxalab,
-- "Run" tugmasini bosing.
-- ================================================================

-- 1. Taklifnomalar jadvali (invitations)
CREATE TABLE IF NOT EXISTS public.invitations (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    ceremony_type TEXT DEFAULT 'wedding',
    design TEXT DEFAULT 'emerald',
    groom_name TEXT NOT NULL,
    bride_name TEXT NOT NULL,
    groom_parents TEXT,
    bride_parents TEXT,
    date TEXT NOT NULL,
    time TEXT DEFAULT '18:00',
    time_text TEXT,
    venue TEXT NOT NULL,
    address TEXT,
    map_url TEXT,
    cover_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    intro TEXT,
    story TEXT,
    music_title TEXT,
    music_url TEXT,
    schedule JSONB DEFAULT '[]'::jsonb,
    dress_code TEXT,
    card_number TEXT,
    card_owner TEXT,
    phone TEXT,
    status TEXT DEFAULT 'pending_approval',
    paid BOOLEAN DEFAULT false,
    price NUMERIC DEFAULT 50000,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. RSVP (Mehmonlar tashrifini tasdiqlash) jadvali
CREATE TABLE IF NOT EXISTS public.rsvps (
    id TEXT PRIMARY KEY,
    invitation_slug TEXT NOT NULL REFERENCES public.invitations(slug) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    guests_count INTEGER DEFAULT 1,
    attending BOOLEAN DEFAULT true,
    submitted_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Mehmonlar tilaklari va tabriklari jadvali (wishes)
CREATE TABLE IF NOT EXISTS public.wishes (
    id TEXT PRIMARY KEY,
    invitation_slug TEXT NOT NULL REFERENCES public.invitations(slug) ON DELETE CASCADE,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Sayt statistikasi jadvali (site_stats)
CREATE TABLE IF NOT EXISTS public.site_stats (
    id TEXT PRIMARY KEY DEFAULT 'global',
    total_visitors INTEGER DEFAULT 15840,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Boshlang'ich global statistika yozuvi
INSERT INTO public.site_stats (id, total_visitors)
VALUES ('global', 15840)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- Barcha foydalanuvchilar o'qish va taklifnoma yaratishlari mumkin
-- ================================================================

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Invitations uchun ruxsatlar
CREATE POLICY "Public read invitations" ON public.invitations
    FOR SELECT USING (true);

CREATE POLICY "Public insert invitations" ON public.invitations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update invitations" ON public.invitations
    FOR UPDATE USING (true);

CREATE POLICY "Public delete invitations" ON public.invitations
    FOR DELETE USING (true);

-- RSVPs uchun ruxsatlar
CREATE POLICY "Public read rsvps" ON public.rsvps
    FOR SELECT USING (true);

CREATE POLICY "Public insert rsvps" ON public.rsvps
    FOR INSERT WITH CHECK (true);

-- Wishes uchun ruxsatlar
CREATE POLICY "Public read wishes" ON public.wishes
    FOR SELECT USING (true);

CREATE POLICY "Public insert wishes" ON public.wishes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public delete wishes" ON public.wishes
    FOR DELETE USING (true);

-- Site stats uchun ruxsatlar
CREATE POLICY "Public read site_stats" ON public.site_stats
    FOR SELECT USING (true);

CREATE POLICY "Public update site_stats" ON public.site_stats
    FOR UPDATE USING (true);

-- ================================================================
-- NAMUNA MA'LUMOT (DEMO INVITATION)
-- ================================================================
INSERT INTO public.invitations (
    id, slug, ceremony_type, design, groom_name, bride_name,
    groom_parents, bride_parents, date, time, time_text,
    venue, address, map_url, cover_image, gallery,
    intro, story, music_title, music_url,
    schedule, dress_code, card_number, card_owner,
    phone, status, paid, price, views
) VALUES (
    'inv-1',
    'farhod-va-shirin',
    'wedding',
    'emerald',
    'Farhodbek',
    'Shirinbonu',
    'Rustamjon va Nodiraxon',
    'Baxtiyor aka va Dilfuza opa',
    '2026-11-25',
    '18:00',
    'Soat 18:00 da kutib qolamiz',
    'Versal Tantanalar Saroyi',
    'Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko''chasi, 42-uy',
    'https://maps.google.com/?q=Tashkent',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
    '["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"]'::jsonb,
    'Alloh taoloning marhamati ila, ikki yoshning baxt to''yiga aziz qarindosh, qadrdon do''st va tabarruk yaqinlarimizni lutfan taklif etamiz. Sizning quvonchimizga sherik bo''lishingiz biz uchun cheksiz sharafdir!',
    'Taqdirimiz bir-birimizga bog''langan o''sha unutilmas kundan boshlab, orzularimiz va qalbimiz mushtarak bo''ldi.',
    'Yor-yor (Milliy kuy)',
    'https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg',
    '[{"time":"17:30","title":"Mehmonlar tashrifi va qutlov","desc":"Jonli musiqa va kutib olish"},{"time":"18:00","title":"Kelin va kuyov kirib kelishi","desc":"Tantanali oqshom boshlanishi"},{"time":"19:00","title":"Nikoh fotiha marosimi","desc":"Oqsoqollar va ota-onalar duolari"},{"time":"20:00","title":"To''y torti va bayram dasturi","desc":"Estrada yulduzlari ijrosi"}]'::jsonb,
    'Erkaklar uchun: Klassik kostyum-shim. Ayollar uchun: Elegant oqshom ko''ylaklari.',
    '8600 1234 5678 9012',
    'FARHODBEK RUSTAMOV',
    '+998 90 123 45 67',
    'approved',
    true,
    50000,
    142
) ON CONFLICT (slug) DO NOTHING;
