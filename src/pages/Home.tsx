import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import Header from "../components/Header";
import Icon from "../components/Icon";

import "./Home.css";

type Language =
  | "uz"
  | "ru"
  | "en";

type TemplatePreview =
  | "romantic"
  | "classic"
  | "elegant"
  | "cinematic"
  | "luxury"
  | "floral";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  preview:
    TemplatePreview;
  badge?: string;
};

const templates: TemplateItem[] = [
  {
    id: "romantic",
    name: "Romantic",
    category: "To‘y",
    preview: "romantic",
    badge: "Yangi",
  },
  {
    id: "classic",
    name: "Classic",
    category: "To‘y",
    preview: "classic",
  },
  {
    id: "elegant",
    name: "Elegant",
    category: "To‘y",
    preview: "elegant",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    category: "To‘y",
    preview: "cinematic",
    badge: "Premium",
  },
  {
    id: "luxury",
    name: "Luxury",
    category: "Nikoh",
    preview: "luxury",
  },
  {
    id: "floral",
    name: "Floral",
    category: "To‘y",
    preview: "floral",
  },
];

const translations = {
  uz: {
    navHome: "Bosh sahifa",
    navTemplates: "Shablonlar",
    navPricing: "Narxlar",
    navCreate: "Boshlash",

    heroBadge:
      "Yangi kolleksiya · 2026",
    heroTitle:
      "To‘yingiz uchun",
    heroAccent:
      "raqamli taklifnoma",
    heroText:
      "Mehmonlaringizga oddiy havola emas, sizning hikoyangizni aytib beradigan nafis taklifnoma yuboring.",

    heroPrimary:
      "Shablonlarni ko‘rish",
    heroSecondary:
      "Qanday ishlaydi",

    prepared: "tayyor",
    couples:
      "juftlik uchun",

    rating: "O‘rtacha baho",
    hours: "Tayyorlash",
    secure:
      "Ma’lumotlar himoyalangan",

    whyEyebrow:
      "Nega Momento?",
    whyTitle:
      "Taklifnoma emas — birinchi taassurot.",

    why1Title:
      "24 soatda tayyor",
    why1Text:
      "Ma’lumotlaringizni yuborasiz va taklifnoma tayyor holatda qo‘lingizga keladi.",

    why2Title:
      "Har bir detal sizniki",
    why2Text:
      "Ismlar, sana, manzil, foto va ranglar sizning marosimingizga moslashtiriladi.",

    why3Title:
      "Telefon uchun yaratilgan",
    why3Text:
      "Taklifnoma telefon, planshet va kompyuter ekranlarida chiroyli ko‘rinadi.",

    why4Title:
      "Bitta link — hamma mehmon",
    why4Text:
      "Taklifnomani Telegram, WhatsApp yoki boshqa messenjer orqali yuborish mumkin.",

    why5Title:
      "RSVP",
    why5Text:
      "Mehmonlar tashrifini tasdiqlaydi va siz kim kelishini oldindan bilasiz.",

    why6Title:
      "Musiqa va xotiralar",
    why6Text:
      "Musiqa, countdown va photo gallery bilan taklifnomani jonlantiring.",

    stepsEyebrow:
      "Jarayon",
    stepsTitle:
      "3 qadam. Shu xolos.",

    step1:
      "Tanlang",
    step1Text:
      "Sizga mos shablonni tanlang va uning jonli ko‘rinishini ko‘ring.",

    step2:
      "Tahrirlang",
    step2Text:
      "Ismlar, sana, joy, rasmlar va boshqa ma’lumotlarni o‘zingiz kiriting.",

    step3:
      "Tayyor bo‘ling",
    step3Text:
      "Taklifnomani ko‘rib chiqing, to‘lovni amalga oshiring va havolani oling.",

    collectionEyebrow:
      "Kolleksiya",
    collectionTitle:
      "Sizning kuningizga mos dizayn",
    collectionText:
      "Har bir shablon alohida kayfiyat uchun yaratilgan. Tanlang, ko‘ring va o‘zingiznikiga aylantiring.",

    all: "Barchasi",
    wedding: "To‘y",
    nikoh: "Nikoh",

    viewAll:
      "Barcha shablonlar",

    preview:
      "Ko‘rish",
    choose:
      "Tanlash",

    summerBadge:
      "Maxsus taklif",
    summerTitle:
      "Taklifnomangizni bugunoq boshlang.",
    summerText:
      "Dizaynni tanlang, ma’lumotlarni kiriting va tayyor taklifnomangizni real vaqt rejimida ko‘ring.",

    pricingEyebrow:
      "Narxlar",
    pricingTitle:
      "Oddiy va tushunarli",
    pricingText:
      "Keraksiz paketlar va chalkash qo‘shimchalar yo‘q.",

    standard:
      "Standart",
    standardPrice:
      "150 000",
    standardText:
      "Asosiy raqamli taklifnoma",

    premium:
      "Premium",
    premiumPrice:
      "250 000",
    premiumText:
      "To‘liq multimedia tajribasi",

    mostPopular:
      "Eng ko‘p tanlanadi",

    vip:
      "VIP",
    vipPrice:
      "450 000",
    vipText:
      "Shaxsiy premium yechim",

    feature1:
      "Tayyor shablon",
    feature2:
      "Ism va matnlarni tahrirlash",
    feature3:
      "Sana va countdown",
    feature4:
      "Manzil va Google Maps",
    feature5:
      "RSVP",
    feature6:
      "Foto gallery",
    feature7:
      "Fon musiqasi",
    feature8:
      "Animatsiyalar",
    feature9:
      "Shaxsiy dizayn",

    start:
      "Boshlash",

    guaranteeEyebrow:
      "Ishonch",
    guaranteeTitle:
      "Avval ko‘ring. Keyin to‘lang.",
    guaranteeText:
      "Taklifnomani tahrirlash va uning ko‘rinishini tekshirish birinchi o‘rinda. To‘lov esa tayyor natijani ko‘rgandan keyin.",

    testimonialsEyebrow:
      "Mijozlar fikri",
    testimonialsTitle:
      "Muhim kun egalari uchun",
    
    faqEyebrow:
      "FAQ",
    faqTitle:
      "Ko‘p so‘raladigan savollar",

    faq1:
      "Taklifnoma qanday ishlaydi?",
    faq1Answer:
      "Shablonni tanlaysiz, editor orqali ma’lumotlaringizni kiritasiz, taklifnomani ko‘rasiz va to‘lovdan so‘ng tayyor havolani olasiz.",

    faq2:
      "Telefonda ham ishlaydimi?",
    faq2Answer:
      "Ha. Taklifnomalar mobil, planshet va desktop ekranlari uchun responsive qilib ishlab chiqiladi.",

    faq3:
      "Rasmlarimni qo‘sha olamanmi?",
    faq3Answer:
      "Ha. Gallery bo‘limi orqali o‘zingizning rasmlaringizni qo‘shishingiz mumkin.",

    faq4:
      "Musiqa qo‘shish mumkinmi?",
    faq4Answer:
      "Ha. Premium imkoniyat sifatida fon musiqasini qo‘shish va taklifnoma ichida boshqarish mumkin.",

    faq5:
      "To‘lovdan oldin tahrirlash mumkinmi?",
    faq5Answer:
      "Ha. Bizning yangi oqimda avval editor ochiladi. Siz ma’lumotlarni sozlaysiz, preview qilasiz va keyin payment bosqichiga o‘tasiz.",

    finalEyebrow:
      "Momento",
    finalTitle:
      "To‘yingiz uchun birinchi sahifani yarating.",
    finalText:
      "Bir havola. Bir hikoya. Bir umrga qoladigan xotira.",

    footerText:
      "Raqamli taklifnomalar — sizning eng muhim kuningiz uchun.",
    footerTemplates:
      "Shablonlar",
    footerPricing:
      "Narxlar",
    footerFaq:
      "FAQ",
    footerContact:
      "Aloqa",
  },

  ru: {
    navHome: "Главная",
    navTemplates: "Шаблоны",
    navPricing: "Цены",
    navCreate: "Начать",

    heroBadge:
      "Новая коллекция · 2026",
    heroTitle:
      "Цифровое",
    heroAccent:
      "приглашение на свадьбу",
    heroText:
      "Создайте красивое приглашение, которое рассказывает вашу историю и производит первое впечатление.",

    heroPrimary:
      "Смотреть шаблоны",
    heroSecondary:
      "Как это работает",

    prepared: "готово",
    couples:
      "пар",

    rating: "Средняя оценка",
    hours: "Подготовка",
    secure:
      "Безопасная система",

    whyEyebrow:
      "Почему Momento?",
    whyTitle:
      "Не просто приглашение — первое впечатление.",

    why1Title:
      "Готово за 24 часа",
    why1Text:
      "Вы отправляете данные, а мы превращаем их в готовое цифровое приглашение.",

    why2Title:
      "Каждая деталь ваша",
    why2Text:
      "Имена, дата, место, фото и цвета настраиваются под ваше событие.",

    why3Title:
      "Создано для телефона",
    why3Text:
      "Приглашение красиво выглядит на телефоне, планшете и компьютере.",

    why4Title:
      "Одна ссылка",
    why4Text:
      "Отправляйте приглашение через Telegram, WhatsApp или другой мессенджер.",

    why5Title:
      "RSVP",
    why5Text:
      "Гости подтверждают участие, а вы заранее знаете количество гостей.",

    why6Title:
      "Музыка и воспоминания",
    why6Text:
      "Музыка, countdown и gallery превращают страницу в настоящую историю.",

    stepsEyebrow:
      "Процесс",
    stepsTitle:
      "3 шага. Вот и всё.",

    step1:
      "Выберите",
    step1Text:
      "Выберите понравившийся шаблон и посмотрите его вживую.",

    step2:
      "Настройте",
    step2Text:
      "Введите имена, дату, место, фотографии и другие детали.",

    step3:
      "Опубликуйте",
    step3Text:
      "Проверьте приглашение, оплатите и получите готовую ссылку.",

    collectionEyebrow:
      "Коллекция",
    collectionTitle:
      "Дизайн для вашего дня",
    collectionText:
      "Каждый шаблон создан для особенного настроения. Выберите и сделайте его своим.",

    all: "Все",
    wedding: "Свадьба",
    nikoh: "Никях",

    viewAll:
      "Все шаблоны",

    preview:
      "Просмотр",
    choose:
      "Выбрать",

    summerBadge:
      "Специальное предложение",
    summerTitle:
      "Начните приглашение уже сегодня.",
    summerText:
      "Выберите дизайн, введите данные и смотрите результат в реальном времени.",

    pricingEyebrow:
      "Цены",
    pricingTitle:
      "Просто и понятно",
    pricingText:
      "Без лишних пакетов и запутанных доплат.",

    standard:
      "Стандарт",
    standardPrice:
      "150 000",
    standardText:
      "Базовое цифровое приглашение",

    premium:
      "Премиум",
    premiumPrice:
      "250 000",
    premiumText:
      "Полная мультимедийная версия",

    mostPopular:
      "Популярный",

    vip:
      "VIP",
    vipPrice:
      "450 000",
    vipText:
      "Персональное премиум решение",

    feature1:
      "Готовый шаблон",
    feature2:
      "Редактирование текста",
    feature3:
      "Дата и countdown",
    feature4:
      "Адрес и Google Maps",
    feature5:
      "RSVP",
    feature6:
      "Фото gallery",
    feature7:
      "Фоновая музыка",
    feature8:
      "Анимации",
    feature9:
      "Персональный дизайн",

    start:
      "Начать",

    guaranteeEyebrow:
      "Доверие",
    guaranteeTitle:
      "Сначала посмотрите. Потом оплатите.",
    guaranteeText:
      "Сначала вы настраиваете приглашение и проверяете внешний вид. Оплата проходит после просмотра результата.",

    testimonialsEyebrow:
      "Отзывы",
    testimonialsTitle:
      "Для тех, кому важен каждый момент",

    faqEyebrow:
      "FAQ",
    faqTitle:
      "Частые вопросы",

    faq1:
      "Как работает приглашение?",
    faq1Answer:
      "Вы выбираете шаблон, редактируете его в editor, смотрите preview и после оплаты получаете готовую ссылку.",

    faq2:
      "Работает ли на телефоне?",
    faq2Answer:
      "Да. Все страницы адаптированы для телефона, планшета и компьютера.",

    faq3:
      "Можно ли добавить фотографии?",
    faq3Answer:
      "Да. В gallery можно добавить ваши фотографии.",

    faq4:
      "Можно ли добавить музыку?",
    faq4Answer:
      "Да. В premium версии можно добавить фоновую музыку.",

    faq5:
      "Можно ли редактировать до оплаты?",
    faq5Answer:
      "Да. Сначала открывается editor, затем preview и только после этого оплата.",

    finalEyebrow:
      "Momento",
    finalTitle:
      "Создайте первую страницу вашей свадьбы.",
    finalText:
      "Одна ссылка. Одна история. Воспоминание на всю жизнь.",

    footerText:
      "Цифровые приглашения для вашего самого важного дня.",
    footerTemplates:
      "Шаблоны",
    footerPricing:
      "Цены",
    footerFaq:
      "FAQ",
    footerContact:
      "Контакты",
  },

  en: {
    navHome: "Home",
    navTemplates: "Templates",
    navPricing: "Pricing",
    navCreate: "Start",

    heroBadge:
      "New collection · 2026",
    heroTitle:
      "Your digital",
    heroAccent:
      "wedding invitation",
    heroText:
      "Create an elegant invitation that tells your story and gives your guests a beautiful first impression.",

    heroPrimary:
      "Explore templates",
    heroSecondary:
      "How it works",

    prepared: "ready",
    couples:
      "couples",

    rating: "Average rating",
    hours: "Preparation",
    secure:
      "Secure system",

    whyEyebrow:
      "Why Momento?",
    whyTitle:
      "Not just an invitation — a first impression.",

    why1Title:
      "Ready in 24 hours",
    why1Text:
      "Send your details and turn them into a polished digital invitation.",

    why2Title:
      "Every detail is yours",
    why2Text:
      "Names, date, venue, photos and colors are tailored to your event.",

    why3Title:
      "Made for every screen",
    why3Text:
      "Your invitation looks beautiful on phones, tablets and computers.",

    why4Title:
      "One link",
    why4Text:
      "Share it through Telegram, WhatsApp or any messenger.",

    why5Title:
      "RSVP",
    why5Text:
      "Guests confirm attendance so you know who is coming.",

    why6Title:
      "Music and memories",
    why6Text:
      "Music, countdown and gallery turn the page into your story.",

    stepsEyebrow:
      "Process",
    stepsTitle:
      "3 steps. That's it.",

    step1:
      "Choose",
    step1Text:
      "Pick a template and see its live preview.",

    step2:
      "Customize",
    step2Text:
      "Add names, date, venue, photos and everything else.",

    step3:
      "Publish",
    step3Text:
      "Review your invitation, pay and receive the final link.",

    collectionEyebrow:
      "Collection",
    collectionTitle:
      "A design for your day",
    collectionText:
      "Every template is designed around a different mood. Choose one and make it yours.",

    all: "All",
    wedding: "Wedding",
    nikoh: "Nikah",

    viewAll:
      "All templates",

    preview:
      "Preview",
    choose:
      "Choose",

    summerBadge:
      "Special",
    summerTitle:
      "Start your invitation today.",
    summerText:
      "Choose a design, add your details and see the invitation update live.",

    pricingEyebrow:
      "Pricing",
    pricingTitle:
      "Simple and clear",
    pricingText:
      "No confusing packages or unnecessary extras.",

    standard:
      "Standard",
    standardPrice:
      "150,000",
    standardText:
      "Core digital invitation",

    premium:
      "Premium",
    premiumPrice:
      "250,000",
    premiumText:
      "Full multimedia experience",

    mostPopular:
      "Most popular",

    vip:
      "VIP",
    vipPrice:
      "450,000",
    vipText:
      "Personal premium solution",

    feature1:
      "Ready template",
    feature2:
      "Text editing",
    feature3:
      "Date and countdown",
    feature4:
      "Location and Google Maps",
    feature5:
      "RSVP",
    feature6:
      "Photo gallery",
    feature7:
      "Background music",
    feature8:
      "Animations",
    feature9:
      "Personal design",

    start:
      "Start",

    guaranteeEyebrow:
      "Trust",
    guaranteeTitle:
      "Preview first. Pay later.",
    guaranteeText:
      "Customize your invitation and check the result first. Payment comes after the preview.",

    testimonialsEyebrow:
      "Testimonials",
    testimonialsTitle:
      "For people who care about every detail",

    faqEyebrow:
      "FAQ",
    faqTitle:
      "Frequently asked questions",

    faq1:
      "How does it work?",
    faq1Answer:
      "Choose a template, customize it in the editor, preview it, pay and receive the final invitation link.",

    faq2:
      "Does it work on mobile?",
    faq2Answer:
      "Yes. Every invitation is responsive across phones, tablets and desktops.",

    faq3:
      "Can I add my photos?",
    faq3Answer:
      "Yes. Add your photos through the gallery section.",

    faq4:
      "Can I add music?",
    faq4Answer:
      "Yes. Background music is available in the premium experience.",

    faq5:
      "Can I edit before payment?",
    faq5Answer:
      "Yes. The editor opens first, then preview, and payment comes after that.",

    finalEyebrow:
      "Momento",
    finalTitle:
      "Create the first page of your wedding story.",
    finalText:
      "One link. One story. A memory that lasts.",

    footerText:
      "Digital invitations for your most important day.",
    footerTemplates:
      "Templates",
    footerPricing:
      "Pricing",
    footerFaq:
      "FAQ",
    footerContact:
      "Contact",
  },
} as const;

type Testimonial = {
  name: string;
  text: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Madina & Sardor",
    text:
      "Taklifnomamiz juda nafis chiqdi. Eng yoqqani — telefon ekranida ham hammasi juda chiroyli ko‘rinadi.",
    date: "2026",
  },
  {
    name: "Aziz & Dilnoza",
    text:
      "Editor juda qulay bo‘lsa, foydalanuvchi o‘zi bemalol tayyorlay oladi. Aynan shu yo‘nalish Momento uchun kerak.",
    date: "2026",
  },
  {
    name: "Bekzod & Zarina",
    text:
      "Fotosuratlar, countdown va RSVP bitta sahifada bo‘lgani taklifnomani oddiy linkdan ancha yuqori darajaga olib chiqadi.",
    date: "2026",
  },
];

const faqs = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
] as const;

function TemplatePreview({
  type,
}: {
  type: TemplatePreview;
}) {
  return (
    <div
      className={`home-template-preview preview-${type}`}
    >
      <div className="home-preview-noise" />

      <div className="home-preview-content">
        {type === "romantic" && (
          <>
            <span>
              OUR STORY
            </span>

            <strong>
              A & J
            </strong>

            <em>
              together
            </em>

            <small>
              16 · 09 · 2026
            </small>
          </>
        )}

        {type === "classic" && (
          <>
            <span>
              WEDDING
            </span>

            <strong>
              Alisher
            </strong>

            <b>
              &
            </b>

            <strong>
              Amina
            </strong>

            <small>
              12 SEPTEMBER
            </small>
          </>
        )}

        {type === "elegant" && (
          <>
            <span>
              SAVE THE DATE
            </span>

            <strong>
              Ulug‘bek
            </strong>

            <b>
              & Malika
            </b>

            <small>
              09.09.2026
            </small>
          </>
        )}

        {type === "cinematic" && (
          <>
            <span>
              A LOVE STORY
            </span>

            <strong>
              U & M
            </strong>

            <small>
              PREMIERE
            </small>
          </>
        )}

        {type === "luxury" && (
          <>
            <span>
              THE WEDDING
            </span>

            <strong>
              A
              <i>&</i>
              M
            </strong>

            <small>
              2026
            </small>
          </>
        )}

        {type === "floral" && (
          <>
            <span>
              TO‘Y TAKLIFNOMASI
            </span>

            <strong>
              Nigora
            </strong>

            <b>
              &
            </b>

            <strong>
              Jahongir
            </strong>

            <small>
              16.06.2027
            </small>
          </>
        )}
      </div>

      <div className="home-preview-flower flower-a">
        ✿
      </div>

      <div className="home-preview-flower flower-b">
        ❀
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`home-section-heading align-${align}`}
    >
      <span>
        {eyebrow}
      </span>

      <h2>
        {title}
      </h2>

      {text && (
        <p>
          {text}
        </p>
      )}
    </div>
  );
}

function PriceCard({
  name,
  price,
  description,
  popular = false,
  features,
  action,
}: {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  features: string[];
  action: string;
}) {
  return (
    <article
      className={`home-price-card ${
        popular
          ? "is-popular"
          : ""
      }`}
    >
      {popular && (
        <div className="home-price-popular">
          ★
        </div>
      )}

      <span className="home-price-name">
        {name}
      </span>

      <div className="home-price-value">
        <strong>
          {price}
        </strong>

        <span>
          UZS
        </span>
      </div>

      <p>
        {description}
      </p>

      <div className="home-price-divider" />

      <ul>
        {features.map(
          (feature) => (
            <li
              key={
                feature
              }
            >
              <span>
                <Icon
                  name="check"
                  size={14}
                />
              </span>

              <p>
                {feature}
              </p>
            </li>
          ),
        )}
      </ul>

      <Link
        to="/templates"
        className="home-price-button"
      >
        {action}

        <Icon
          name="arrow-right"
          size={16}
        />
      </Link>
    </article>
  );
}

export default function Home() {
  const [language, setLanguage] =
    useState<Language>("uz");

  const [category, setCategory] =
    useState<
      "all" | "wedding" | "nikah"
    >("all");

  const [
    activeFaq,
    setActiveFaq,
  ] = useState<number | null>(
    0,
  );

  const text =
    translations[language];

  const filteredTemplates =
    templates.filter(
      (template) => {
        if (
          category ===
          "all"
        ) {
          return true;
        }

        if (
          category ===
          "wedding"
        ) {
          return (
            template.category ===
            "To‘y"
          );
        }

        return (
          template.category ===
          "Nikoh"
        );
      },
    );

  const scrollToSteps =
    () => {
      document
        .getElementById(
          "home-process",
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });
    };

  return (
    <div className="home-page">
      <Header
        language={language}
        onLanguageChange={
          setLanguage
        }
        active="home"
        labels={{
          home: text.navHome,
          templates:
            text.navTemplates,
          pricing:
            text.navPricing,
          create:
            text.navCreate,
        }}
      />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-grid" />

        <div className="home-hero-glow glow-left" />
        <div className="home-hero-glow glow-right" />

        <div className="home-hero-content">
          <div className="home-hero-copy">
            <div className="home-hero-badge">
              <span />
              {text.heroBadge}
            </div>

            <h1>
              {text.heroTitle}

              <span>
                {text.heroAccent}
              </span>
            </h1>

            <p>
              {text.heroText}
            </p>

            <div className="home-hero-actions">
              <Link
                to="/templates"
                className="home-button home-button-primary"
              >
                {text.heroPrimary}

                <Icon
                  name="arrow-right"
                  size={18}
                />
              </Link>

              <button
                type="button"
                className="home-button home-button-light"
                onClick={
                  scrollToSteps
                }
              >
                {text.heroSecondary}

                <span className="home-play-icon">
                  <Icon
                    name="play"
                    size={13}
                  />
                </span>
              </button>
            </div>

            <div className="home-hero-trust">
              <div>
                <strong>
                  500+
                </strong>

                <span>
                  {text.prepared}
                </span>
              </div>

              <div>
                <strong>
                  4.9
                </strong>

                <span>
                  {text.rating}
                </span>
              </div>

              <div>
                <strong>
                  24h
                </strong>

                <span>
                  {text.hours}
                </span>
              </div>
            </div>
          </div>

          <div className="home-hero-showcase">
            <div className="home-showcase-shadow" />

            <div className="home-showcase-card">
              <div className="home-showcase-top">
                <div>
                  <span>
                    01
                  </span>

                  <small>
                    MOMENTO
                  </small>
                </div>

                <span>
                  INVITATION
                </span>
              </div>

              <div className="home-showcase-photo">
                <div className="home-photo-orbit" />

                <div className="home-showcase-photo-copy">
                  <small>
                    WE ARE
                  </small>

                  <strong>
                    Alisher
                  </strong>

                  <i>
                    &
                  </i>

                  <strong>
                    Amina
                  </strong>

                  <span>
                    12 · 09 · 2026
                  </span>
                </div>
              </div>

              <div className="home-showcase-bottom">
                <div>
                  <span>
                    WEDDING DAY
                  </span>

                  <strong>
                    12 September
                  </strong>
                </div>

                <div className="home-showcase-heart">
                  <Icon
                    name="heart"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div className="home-showcase-floating floating-one">
              <Icon
                name="calendar"
                size={16}
              />

              <div>
                <strong>
                  12.09.2026
                </strong>

                <span>
                  Wedding date
                </span>
              </div>
            </div>

            <div className="home-showcase-floating floating-two">
              <Icon
                name="location"
                size={16}
              />

              <div>
                <strong>
                  Tashkent
                </strong>

                <span>
                  Venue
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-hero-scroll">
          <span>
            SCROLL
          </span>

          <i />
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div className="home-container home-stats-grid">
          <div>
            <strong>
              500+
            </strong>

            <span>
              {text.couples}
            </span>
          </div>

          <div>
            <strong>
              4.9
            </strong>

            <span>
              ★ {text.rating}
            </span>
          </div>

          <div>
            <strong>
              24h
            </strong>

            <span>
              {text.hours}
            </span>
          </div>

          <div>
            <strong>
              100%
            </strong>

            <span>
              {text.secure}
            </span>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="home-section home-why">
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.whyEyebrow
            }
            title={
              text.whyTitle
            }
          />

          <div className="home-feature-grid">
            <article className="home-feature-card feature-large">
              <div className="home-feature-number">
                01
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="clock"
                  size={20}
                />
              </div>

              <h3>
                {text.why1Title}
              </h3>

              <p>
                {text.why1Text}
              </p>

              <div className="home-feature-line">
                <span />
              </div>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-number">
                02
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="edit"
                  size={20}
                />
              </div>

              <h3>
                {text.why2Title}
              </h3>

              <p>
                {text.why2Text}
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-number">
                03
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="eye"
                  size={20}
                />
              </div>

              <h3>
                {text.why3Title}
              </h3>

              <p>
                {text.why3Text}
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-number">
                04
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="share"
                  size={20}
                />
              </div>

              <h3>
                {text.why4Title}
              </h3>

              <p>
                {text.why4Text}
              </p>
            </article>

            <article className="home-feature-card">
              <div className="home-feature-number">
                05
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="check"
                  size={20}
                />
              </div>

              <h3>
                {text.why5Title}
              </h3>

              <p>
                {text.why5Text}
              </p>
            </article>

            <article className="home-feature-card feature-dark">
              <div className="home-feature-number">
                06
              </div>

              <div className="home-feature-icon">
                <Icon
                  name="music"
                  size={20}
                />
              </div>

              <h3>
                {text.why6Title}
              </h3>

              <p>
                {text.why6Text}
              </p>

              <div className="home-music-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="home-process"
        className="home-section home-process-section"
      >
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.stepsEyebrow
            }
            title={
              text.stepsTitle
            }
          />

          <div className="home-steps">
            <div className="home-step">
              <div className="home-step-number">
                01
              </div>

              <div className="home-step-line">
                <span />
              </div>

              <div className="home-step-content">
                <h3>
                  {text.step1}
                </h3>

                <p>
                  {text.step1Text}
                </p>

                <Link
                  to="/templates"
                  className="home-step-link"
                >
                  {text.viewAll}

                  <Icon
                    name="arrow-right"
                    size={14}
                  />
                </Link>
              </div>
            </div>

            <div className="home-step">
              <div className="home-step-number">
                02
              </div>

              <div className="home-step-line">
                <span />
              </div>

              <div className="home-step-content">
                <h3>
                  {text.step2}
                </h3>

                <p>
                  {text.step2Text}
                </p>
              </div>
            </div>

            <div className="home-step">
              <div className="home-step-number">
                03
              </div>

              <div className="home-step-line">
                <span />
              </div>

              <div className="home-step-content">
                <h3>
                  {text.step3}
                </h3>

                <p>
                  {text.step3Text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="home-section home-collection-section">
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.collectionEyebrow
            }
            title={
              text.collectionTitle
            }
            text={
              text.collectionText
            }
          />

          <div className="home-category-tabs">
            <button
              type="button"
              className={
                category ===
                "all"
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setCategory(
                  "all",
                )
              }
            >
              {text.all}
            </button>

            <button
              type="button"
              className={
                category ===
                "wedding"
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setCategory(
                  "wedding",
                )
              }
            >
              {text.wedding}
            </button>

            <button
              type="button"
              className={
                category ===
                "nikah"
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setCategory(
                  "nikah",
                )
              }
            >
              {text.nikoh}
            </button>
          </div>

          <div className="home-template-grid">
            {filteredTemplates.map(
              (
                template,
              ) => (
                <article
                  className="home-template-card"
                  key={
                    template.id
                  }
                >
                  <div className="home-template-preview-wrap">
                    {template.badge && (
                      <span className="home-template-badge">
                        {template.badge}
                      </span>
                    )}

                    <TemplatePreview
                      type={
                        template.preview
                      }
                    />

                    <div className="home-template-hover">
                      <Link
                        to={`/templates/${template.id}`}
                        className="home-template-preview-button"
                      >
                        <Icon
                          name="eye"
                          size={15}
                        />

                        {text.preview}
                      </Link>

                      <Link
                        to={`/editor/${template.id}`}
                        className="home-template-choose-button"
                      >
                        {text.choose}

                        <Icon
                          name="arrow-right"
                          size={15}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="home-template-info">
                    <div>
                      <span>
                        {
                          template.category
                        }
                      </span>

                      <h3>
                        {
                          template.name
                        }
                      </h3>
                    </div>

                    <Link
                      to={`/templates/${template.id}`}
                      aria-label={
                        text.preview
                      }
                    >
                      <Icon
                        name="arrow-right"
                        size={17}
                      />
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="home-collection-footer">
            <Link
              to="/templates"
              className="home-outline-button"
            >
              {text.viewAll}

              <Icon
                name="arrow-right"
                size={17}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="home-promo">
        <div className="home-promo-pattern" />

        <div className="home-container home-promo-inner">
          <div className="home-promo-copy">
            <span>
              {text.summerBadge}
            </span>

            <h2>
              {text.summerTitle}
            </h2>

            <p>
              {text.summerText}
            </p>

            <Link
              to="/templates"
              className="home-promo-button"
            >
              {text.heroPrimary}

              <Icon
                name="arrow-right"
                size={17}
              />
            </Link>
          </div>

          <div className="home-promo-art">
            <div className="home-promo-card card-one">
              <span>
                SAVE
              </span>

              <strong>
                THE
              </strong>

              <strong>
                DATE
              </strong>
            </div>

            <div className="home-promo-card card-two">
              <span>
                M
              </span>

              <small>
                09
              </small>

              <small>
                09
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="home-section home-pricing-section">
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.pricingEyebrow
            }
            title={
              text.pricingTitle
            }
            text={
              text.pricingText
            }
          />

          <div className="home-pricing-grid">
            <PriceCard
              name={
                text.standard
              }
              price={
                text.standardPrice
              }
              description={
                text.standardText
              }
              action={
                text.start
              }
              features={[
                text.feature1,
                text.feature2,
                text.feature3,
                text.feature4,
                text.feature5,
              ]}
            />

            <PriceCard
              name={
                text.premium
              }
              price={
                text.premiumPrice
              }
              description={
                text.premiumText
              }
              popular
              action={
                text.start
              }
              features={[
                text.feature1,
                text.feature2,
                text.feature3,
                text.feature4,
                text.feature5,
                text.feature6,
                text.feature7,
                text.feature8,
              ]}
            />

            <PriceCard
              name={
                text.vip
              }
              price={
                text.vipPrice
              }
              description={
                text.vipText
              }
              action={
                text.start
              }
              features={[
                text.feature1,
                text.feature2,
                text.feature3,
                text.feature4,
                text.feature5,
                text.feature6,
                text.feature7,
                text.feature8,
                text.feature9,
              ]}
            />
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="home-guarantee">
        <div className="home-container home-guarantee-inner">
          <div className="home-guarantee-icon">
            <Icon
              name="check"
              size={24}
            />
          </div>

          <div>
            <span>
              {
                text.guaranteeEyebrow
              }
            </span>

            <h2>
              {
                text.guaranteeTitle
              }
            </h2>

            <p>
              {
                text.guaranteeText
              }
            </p>
          </div>

          <div className="home-guarantee-seal">
            <strong>
              100%
            </strong>

            <span>
              TRUST
            </span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="home-section home-testimonials-section">
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.testimonialsEyebrow
            }
            title={
              text.testimonialsTitle
            }
          />

          <div className="home-testimonials">
            {testimonials.map(
              (
                testimonial,
              ) => (
                <article
                  key={
                    testimonial.name
                  }
                  className="home-testimonial"
                >
                  <div className="home-testimonial-stars">
                    ★★★★★
                  </div>

                  <p>
                    “
                    {
                      testimonial.text
                    }
                    ”
                  </p>

                  <div className="home-testimonial-person">
                    <div>
                      {
                        testimonial.name
                          .charAt(
                            0,
                          )
                      }
                    </div>

                    <section>
                      <strong>
                        {
                          testimonial.name
                        }
                      </strong>

                      <span>
                        {
                          testimonial.date
                        }
                      </span>
                    </section>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="home-section home-faq-section">
        <div className="home-container">
          <SectionHeading
            eyebrow={
              text.faqEyebrow
            }
            title={
              text.faqTitle
            }
          />

          <div className="home-faq">
            {faqs.map(
              (
                faqKey,
                index,
              ) => {
                const isOpen =
                  activeFaq ===
                  index;

                return (
                  <article
                    key={
                      faqKey
                    }
                    className={`home-faq-item ${
                      isOpen
                        ? "is-open"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveFaq(
                          isOpen
                            ? null
                            : index,
                        )
                      }
                    >
                      <span>
                        {
                          text[
                            faqKey
                          ]
                        }
                      </span>

                      <div>
                        <Icon
                          name={
                            isOpen
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={17}
                        />
                      </div>
                    </button>

                    <div className="home-faq-answer">
                      <p>
                        {
                          text[
                            `${faqKey}Answer` as keyof typeof text
                          ]
                        }
                      </p>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-final">
        <div className="home-final-orbit orbit-one" />
        <div className="home-final-orbit orbit-two" />
        <div className="home-final-flower">
          ❀
        </div>

        <div className="home-container home-final-inner">
          <span>
            {
              text.finalEyebrow
            }
          </span>

          <h2>
            {
              text.finalTitle
            }
          </h2>

          <p>
            {
              text.finalText
            }
          </p>

          <Link
            to="/templates"
            className="home-final-button"
          >
            {text.navCreate}

            <Icon
              name="arrow-right"
              size={18}
            />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="home-container home-footer-grid">
          <div className="home-footer-brand">
            <Link
              to="/"
              className="home-footer-logo"
            >
              momento
            </Link>

            <p>
              {
                text.footerText
              }
            </p>
          </div>

          <div>
            <span className="home-footer-title">
              MOMENTO
            </span>

            <Link to="/templates">
              {
                text.footerTemplates
              }
            </Link>

            <Link to="/pricing">
              {
                text.footerPricing
              }
            </Link>

            <a href="#home-faq">
              {text.footerFaq}
            </a>
          </div>

          <div>
            <span className="home-footer-title">
              CONTACT
            </span>

            <a href="mailto:hello@momento.uz">
              hello@momento.uz
            </a>

            <a href="https://t.me">
              Telegram
            </a>

            <a href="https://instagram.com">
              Instagram
            </a>
          </div>
        </div>

        <div className="home-container home-footer-bottom">
          <span>
            © 2026 Momento
          </span>

          <span>
            Digital wedding invitations
          </span>
        </div>
      </footer>
    </div>
  );
}