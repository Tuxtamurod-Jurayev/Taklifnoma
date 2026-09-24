import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Send,
} from "lucide-react";
import MyTaklifNavbar from "../components/MyTaklifNavbar";
import MyTaklifFooter from "../components/MyTaklifFooter";

type FaqItem = {
  q: string;
  a: string;
  category: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Umumiy",
    q: "mytaklif.uz nima va u qanday ishlaydi?",
    a: "mytaklif.uz — to'y, sunnat to'yi, fotiha va boshqa bayram tantanalari uchun zamonaviy onlayn sayt-taklifnomalar yaratish xizmati. Siz bir necha daqiqada ma'lumotlarni kiritasiz, chiroyli dizayn tanlaysiz va tayyor taklifnoma havolasini mehmonlaringizga Telegram, WhatsApp orqali yuborasiz.",
  },
  {
    category: "Umumiy",
    q: "Qog'oz taklifnomalardan qanday afzalligi bor?",
    a: "Onlayn taklifnoma ancha arzon (50 000 so'm), fon musiqasi yangraydi, jonli daqiqama-daqiqa hisoblagich ishlaydi, mehmonlar to'yxonaga Google va Yandex Xaritalar orqali yo'l ko'ra oladilar, kelishlarini onlayn tasdiqlashadi va tabriklarini qoldirishadi.",
  },
  {
    category: "Yaratish",
    q: "Taklifnomani yaratish qancha vaqt oladi?",
    a: "Barcha ma'lumotlarni kiritish bor-yo'g'i 3-5 daqiqa vaqt oladi. Siz kelin-kuyov ismlari, to'y sanasi, to'yxona nomi va fotosuratlarni joylashtirasiz, tizim darhol tayyor sayt ko'rinishida hosil qilib beradi.",
  },
  {
    category: "Yaratish",
    q: "Keyinchalik ma'lumotlarni o'zgartirish mumkinmi?",
    a: "Ha, albatta! To'y kuni, vaqti, fotosuratlar yoki boshqa matnlarda o'zgarish bo'lsa, 'Mening taklifnomalarim' bo'limi orqali istalgan paytda tahrirlashingiz mumkin.",
  },
  {
    category: "To'lov",
    q: "Taklifnoma narxi qancha va qanday to'lanadi?",
    a: "Xizmat narxi bir martalik 50 000 so'mni tashkil qiladi. Hech qanday yashirin to'lov yo'q. Click, Payme yoki Uzum orqali bemalol to'lov qilishingiz mumkin.",
  },
  {
    category: "To'lov",
    q: "To'lov qilgandan keyin qancha vaqt sayt ishlaydi?",
    a: "Taklifnoma muddatsiz ishlaydi. To'yingiz o'tgandan keyin ham fotosuratlar, tilaklar va xotiralar doimiy saqlanib qoladi.",
  },
  {
    category: "Mehmonlar",
    q: "Mehmonlar qatnashishini qanday bilishim mumkin?",
    a: "Mehmonlar taklifnoma sahifasidagi 'Tashrifingizni tasdiqlang' (RSVP) formasini to'ldirishadi. Ularning ism-familiyasi, telefon raqami va necha kishi bo'lib kelishlari to'g'ridan-to'g'ri sizning boshqaruv panelingizda ko'rinadi.",
  },
  {
    category: "Mehmonlar",
    q: "Musiqa qanday ishlaydi?",
    a: "Siz platformadagi mavjud mashhur milliy va romantik kuylardan birini tanlashingiz yoki o'zingiz xohlagan audio manzilini kiritishingiz mumkin. Mehmon sahifani ochganda yoki tugmani bosganda musiqa avtomatik jaranglaydi.",
  },
];

export default function MyTaklifFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");

  const categories = ["Barchasi", "Umumiy", "Yaratish", "To'lov", "Mehmonlar"];

  const filtered =
    selectedCategory === "Barchasi"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <MyTaklifNavbar />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Savol-javoblar
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Ko'p beriladigan savollar
            </h1>
            <p className="text-base text-slate-600">
              Onlayn taklifnomalar yaratish, to'lov qilish va ulashish haqidagi eng
              muhim savollarga batafsil javoblar.
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ ACCORDION */}
          <div className="space-y-3">
            {filtered.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-blue-600 transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SUPPORT BANNER */}
          <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
            <h3 className="text-xl font-bold">Savolingizga javob topmadingizmi?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Bizning mutaxassislarimiz Telegram orqali har qanday savolingizga javob
              berishga doim tayyor.
            </p>
            <a
              href="https://t.me/mytaklif_uz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg"
            >
              <Send className="w-4 h-4" />
              Telegram orqali yozish
            </a>
          </div>
        </div>
      </main>

      <MyTaklifFooter />
    </div>
  );
}
