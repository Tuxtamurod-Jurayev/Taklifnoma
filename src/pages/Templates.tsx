import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Icon from "../components/Icon";
import type { Language } from "../components/LanguageSwitcher";

import "./Templates.css";

type Category =
  | "all"
  | "wedding"
  | "birthday"
  | "engagement";

type Template = {
  id: string;
  number: string;
  name: string;
  category: Exclude<Category, "all">;
  premium: boolean;
  description: Record<Language, string>;
  previewClass: string;
};

const templates: Template[] = [
  {
    id: "elegant",
    number: "01",
    name: "Elegant",
    category: "wedding",
    premium: true,
    previewClass: "is-elegant",
    description: {
      uz: "Nafis, sokin va premium to‘y taklifnomasi.",
      ru: "Элегантное и спокойное свадебное приглашение.",
      en: "Elegant and refined wedding invitation.",
    },
  },
  {
    id: "romantic",
    number: "02",
    name: "Romantic",
    category: "wedding",
    premium: true,
    previewClass: "is-romantic",
    description: {
      uz: "Yumshoq ranglar va romantik kompozitsiya.",
      ru: "Романтичная композиция с мягкими оттенками.",
      en: "Romantic composition with soft tones.",
    },
  },
  {
    id: "minimal",
    number: "03",
    name: "Minimal",
    category: "wedding",
    premium: true,
    previewClass: "is-minimal",
    description: {
      uz: "Toza tipografika va minimalistik ko‘rinish.",
      ru: "Минималистичный дизайн и чистая типографика.",
      en: "Minimal design with clean typography.",
    },
  },
  {
    id: "luxury",
    number: "04",
    name: "Luxury",
    category: "wedding",
    premium: true,
    previewClass: "is-luxury",
    description: {
      uz: "Hashamatli, qoramtir va premium uslub.",
      ru: "Роскошный тёмный премиальный стиль.",
      en: "Luxurious dark premium style.",
    },
  },
  {
    id: "floral",
    number: "05",
    name: "Floral",
    category: "wedding",
    premium: true,
    previewClass: "is-floral",
    description: {
      uz: "Botanik elementlar bilan yengil floral dizayn.",
      ru: "Лёгкий цветочный дизайн с ботаническими мотивами.",
      en: "Light floral design with botanical details.",
    },
  },
  {
    id: "classic",
    number: "06",
    name: "Classic",
    category: "wedding",
    premium: false,
    previewClass: "is-classic",
    description: {
      uz: "An’anaviy va vaqt sinovidan o‘tgan uslub.",
      ru: "Классический стиль, проверенный временем.",
      en: "A timeless and traditional style.",
    },
  },
  {
    id: "cinematic",
    number: "07",
    name: "Cinematic",
    category: "wedding",
    premium: true,
    previewClass: "is-cinematic",
    description: {
      uz: "Kino posterlari ruhidagi dramatik dizayn.",
      ru: "Драматичный дизайн в стиле кинопостера.",
      en: "Dramatic cinematic poster-inspired design.",
    },
  },
  {
    id: "oriental",
    number: "08",
    name: "Oriental",
    category: "wedding",
    premium: true,
    previewClass: "is-oriental",
    description: {
      uz: "Sharqona naqshlar va zamonaviy kompozitsiya.",
      ru: "Восточные мотивы в современной композиции.",
      en: "Oriental details in a modern composition.",
    },
  },
  {
    id: "modern",
    number: "09",
    name: "Modern",
    category: "engagement",
    premium: true,
    previewClass: "is-modern",
    description: {
      uz: "Zamonaviy editorial va toza vizual til.",
      ru: "Современный редакционный визуальный стиль.",
      en: "Modern editorial visual language.",
    },
  },
  {
    id: "royal",
    number: "10",
    name: "Royal",
    category: "birthday",
    premium: true,
    previewClass: "is-royal",
    description: {
      uz: "Tantanali va hashamatli royal kompozitsiya.",
      ru: "Торжественная и роскошная royal-композиция.",
      en: "Grand and luxurious royal composition.",
    },
  },
];

const translations = {
  uz: {
    home: "Bosh sahifa",
    templates: "Namunalar",
    pricing: "Narxlar",
    create: "Taklifnoma yaratish",

    eyebrow: "MOMENTO / NAMUNALAR",
    title: "Muhim kuningiz uchun",
    titleAccent: "to‘g‘ri dizayn.",
    description:
      "10 xil premium maketdan o‘zingizga mosini tanlang. Maketni sahifadan chiqmasdan ko‘rib chiqing.",

    all: "Barchasi",
    wedding: "To‘y",
    birthday: "Tug‘ilgan kun",
    engagement: "Fotiha",

    search: "Maket qidirish",
    total: "10 ta maket",

    premium: "PREMIUM",
    free: "BEPUL",

    preview: "Ko‘rish",
    details: "Batafsil",
    choose: "Shu maketni tanlash",

    openPreview: "Preview ochish",
    previous: "Oldingi maket",
    next: "Keyingi maket",
    close: "Yopish",

    selected: "TANLANGAN MAKET",
    price: "150 000 SO‘M",
    oneTime: "Bir martalik to‘lov",

    noteEyebrow: "SHAXSIYLASHTIRISH",
    noteTitle: "Tanlagan dizayningiz keyin sizniki bo‘ladi.",
    noteText:
      "To‘lovdan so‘ng ism, sana, vaqt, manzil, rasmlar, musiqa, countdown va RSVP kabi elementlarni shaxsiy editor orqali boshqarasiz.",

    ctaEyebrow: "KEYINGI QADAM",
    ctaTitle: "Maketni tanlang.",
    ctaText:
      "Maketni oching, preview qiling va sizga mos dizaynni tanlang.",

    noResults: "Maket topilmadi",
    noResultsText:
      "Qidiruv yoki kategoriya bo‘yicha boshqa variantni tanlang.",
    reset: "Filtrni tozalash",

    demoWedding: "BIZ TURMUSH QURYAPMIZ",
    demoDate: "25 NOYABR 2026",
    demoPlace: "TOSHKENT",
  },

  ru: {
    home: "Главная",
    templates: "Шаблоны",
    pricing: "Цены",
    create: "Создать приглашение",

    eyebrow: "MOMENTO / ШАБЛОНЫ",
    title: "Для вашего важного дня",
    titleAccent: "нужен свой дизайн.",
    description:
      "Выберите один из 10 премиальных шаблонов и изучите его прямо на этой странице.",

    all: "Все",
    wedding: "Свадьба",
    birthday: "День рождения",
    engagement: "Помолвка",

    search: "Поиск шаблона",
    total: "10 шаблонов",

    premium: "ПРЕМИУМ",
    free: "БЕСПЛАТНО",

    preview: "Просмотр",
    details: "Подробнее",
    choose: "Выбрать этот шаблон",

    openPreview: "Открыть preview",
    previous: "Предыдущий",
    next: "Следующий",
    close: "Закрыть",

    selected: "ВЫБРАННЫЙ ШАБЛОН",
    price: "150 000 СУМ",
    oneTime: "Единоразовый платёж",

    noteEyebrow: "ПЕРСОНАЛИЗАЦИЯ",
    noteTitle: "После выбора дизайн становится вашим.",
    noteText:
      "После оплаты вы сможете редактировать имена, дату, время, адрес, фотографии, музыку, countdown и RSVP через персональный редактор.",

    ctaEyebrow: "СЛЕДУЮЩИЙ ШАГ",
    ctaTitle: "Выберите шаблон.",
    ctaText:
      "Откройте шаблон, изучите preview и выберите подходящий дизайн.",

    noResults: "Шаблон не найден",
    noResultsText:
      "Измените поиск или категорию и попробуйте снова.",
    reset: "Сбросить фильтр",

    demoWedding: "МЫ ЖЕНИМСЯ",
    demoDate: "25 НОЯБРЯ 2026",
    demoPlace: "ТАШКЕНТ",
  },

  en: {
    home: "Home",
    templates: "Templates",
    pricing: "Pricing",
    create: "Create invitation",

    eyebrow: "MOMENTO / TEMPLATES",
    title: "For your important day",
    titleAccent: "choose the right design.",
    description:
      "Choose from 10 premium templates and explore each one without leaving the page.",

    all: "All",
    wedding: "Wedding",
    birthday: "Birthday",
    engagement: "Engagement",

    search: "Search templates",
    total: "10 templates",

    premium: "PREMIUM",
    free: "FREE",

    preview: "Preview",
    details: "Details",
    choose: "Choose this template",

    openPreview: "Open preview",
    previous: "Previous template",
    next: "Next template",
    close: "Close",

    selected: "SELECTED TEMPLATE",
    price: "150,000 UZS",
    oneTime: "One-time payment",

    noteEyebrow: "PERSONALIZATION",
    noteTitle: "Your chosen design becomes yours.",
    noteText:
      "After payment, you can edit names, date, time, location, photos, music, countdown and RSVP through your personal editor.",

    ctaEyebrow: "NEXT STEP",
    ctaTitle: "Choose a template.",
    ctaText:
      "Open a design, explore the preview and choose the right one.",

    noResults: "No template found",
    noResultsText:
      "Change the search or category and try again.",
    reset: "Reset filters",

    demoWedding: "WE ARE GETTING MARRIED",
    demoDate: "25 NOVEMBER 2026",
    demoPlace: "TASHKENT",
  },
};

function TemplatePreview({
  template,
  language,
  large = false,
}: {
  template: Template;
  language: Language;
  large?: boolean;
}) {
  const t = translations[language];

  return (
    <div
      className={`template-preview-surface ${
        template.previewClass
      } ${large ? "large" : ""}`}
    >
      <div className="template-preview-noise" />

      <div className="template-preview-corner top-left">
        <span>MOMENTO</span>
        <span>{template.number}</span>
      </div>

      <div className="template-preview-corner top-right">
        {template.premium ? t.premium : t.free}
      </div>

      <div className="template-preview-content">
        <small>{t.demoWedding}</small>

        <h2>
          Ali
          <i>&</i>
          Valiya
        </h2>

        <div className="template-preview-rule">
          <span />
          <Icon
            name="heart"
            size={large ? 14 : 12}
          />
          <span />
        </div>

        <strong>{t.demoDate}</strong>

        <span>{t.demoPlace}</span>
      </div>

      <div className="template-preview-corner bottom-left">
        {template.name}
      </div>

      <div className="template-preview-corner bottom-right">
        2026
      </div>
    </div>
  );
}

function PreviewDrawer({
  template,
  language,
  onClose,
  onPrevious,
  onNext,
}: {
  template: Template;
  language: Language;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const t = translations[language];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="templates-drawer-overlay"
        onClick={onClose}
        aria-label={t.close}
      />

      <aside
        className="templates-drawer"
        aria-label={t.openPreview}
      >
        <div className="templates-drawer-header">
          <div>
            <span>
              {t.selected}
            </span>

            <strong>
              {template.number} /{" "}
              {template.name}
            </strong>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="templates-drawer-close"
            aria-label={t.close}
          >
            <Icon
              name="close"
              size={17}
            />
          </button>
        </div>

        <div className="templates-drawer-body">
          <div className="templates-drawer-preview">
            <TemplatePreview
              template={template}
              language={language}
              large
            />
          </div>

          <div className="templates-drawer-info">
            <div className="templates-drawer-meta">
              <span>
                {template.premium
                  ? t.premium
                  : t.free}
              </span>

              <span>
                {template.number} / 10
              </span>
            </div>

            <h2>{template.name}</h2>

            <p>
              {template.description[
                language
              ]}
            </p>

            <div className="templates-drawer-price">
              <div>
                <span>{t.price}</span>
                <small>{t.oneTime}</small>
              </div>

              <Icon
                name="credit-card"
                size={18}
              />
            </div>

            <div className="templates-drawer-actions">
              <Link
                to={`/templates/${template.id}`}
                className="templates-drawer-primary"
                onClick={onClose}
              >
                {t.details}
                <Icon
                  name="arrow-right"
                  size={14}
                />
              </Link>

              <Link
                to={`/pricing?template=${template.id}`}
                className="templates-drawer-secondary"
                onClick={onClose}
              >
                {t.choose}
              </Link>
            </div>
          </div>
        </div>

        <div className="templates-drawer-footer">
          <button
            type="button"
            onClick={onPrevious}
            aria-label={t.previous}
          >
            <Icon
              name="arrow-left"
              size={15}
            />
            <span>{t.previous}</span>
          </button>

          <span>
            {template.number}
          </span>

          <button
            type="button"
            onClick={onNext}
            aria-label={t.next}
          >
            <span>{t.next}</span>
            <Icon
              name="arrow-right"
              size={15}
            />
          </button>
        </div>
      </aside>
    </>
  );
}

export default function Templates() {
  const [language, setLanguage] =
    useState<Language>("uz");

  const [category, setCategory] =
    useState<Category>("all");

  const [search, setSearch] = useState("");

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string | null>(null);

  const t = translations[language];

  const categories = [
    {
      value: "all" as const,
      label: t.all,
    },
    {
      value: "wedding" as const,
      label: t.wedding,
    },
    {
      value: "birthday" as const,
      label: t.birthday,
    },
    {
      value: "engagement" as const,
      label: t.engagement,
    },
  ];

  const filteredTemplates = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return templates.filter((template) => {
      const categoryMatch =
        category === "all" ||
        template.category === category;

      const searchMatch =
        normalizedSearch === "" ||
        template.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        template.description[language]
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        categoryMatch && searchMatch
      );
    });
  }, [
    category,
    search,
    language,
  ]);

  const selectedTemplate = useMemo(
    () =>
      templates.find(
        (template) =>
          template.id ===
          selectedTemplateId,
      ) ?? null,
    [selectedTemplateId],
  );

  const selectedFilteredIndex =
    selectedTemplate
      ? filteredTemplates.findIndex(
          (template) =>
            template.id ===
            selectedTemplate.id,
        )
      : -1;

  const openNextTemplate = () => {
    if (
      filteredTemplates.length === 0
    ) {
      return;
    }

    const nextIndex =
      selectedFilteredIndex === -1
        ? 0
        : (selectedFilteredIndex + 1) %
          filteredTemplates.length;

    setSelectedTemplateId(
      filteredTemplates[nextIndex].id,
    );
  };

  const openPreviousTemplate = () => {
    if (
      filteredTemplates.length === 0
    ) {
      return;
    }

    const previousIndex =
      selectedFilteredIndex === -1
        ? 0
        : (selectedFilteredIndex -
            1 +
            filteredTemplates.length) %
          filteredTemplates.length;

    setSelectedTemplateId(
      filteredTemplates[
        previousIndex
      ].id,
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
  };

  return (
    <div className="templates-page">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        active="templates"
        labels={{
          home: t.home,
          templates: t.templates,
          pricing: t.pricing,
          create: t.create,
        }}
      />

      <main>
        {/* HERO */}

        <section className="templates-hero">
          <div className="templates-page-container">
            <div className="templates-hero-layout">
              <div>
                <div className="templates-eyebrow">
                  <span />
                  {t.eyebrow}
                </div>

                <h1>
                  {t.title}
                  <br />
                  <em>{t.titleAccent}</em>
                </h1>

                <p>
                  {t.description}
                </p>
              </div>

              <div className="templates-hero-stat">
                <span>COLLECTION</span>

                <strong>10</strong>

                <small>{t.total}</small>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG */}

        <section className="templates-catalog">
          <div className="templates-page-container">
            <div className="templates-toolbar">
              <div className="templates-filter-tabs">
                {categories.map(
                  (item) => (
                    <button
                      type="button"
                      key={item.value}
                      className={
                        category ===
                        item.value
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCategory(
                          item.value,
                        )
                      }
                    >
                      {item.label}
                    </button>
                  ),
                )}
              </div>

              <div className="templates-search-box">
                <Icon
                  name="search"
                  size={16}
                  strokeWidth={1.5}
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder={t.search}
                  aria-label={t.search}
                />

                {search && (
                  <button
                    type="button"
                    className="templates-search-clear"
                    onClick={() =>
                      setSearch("")
                    }
                    aria-label="Clear search"
                  >
                    <Icon
                      name="close"
                      size={13}
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="templates-catalog-meta">
              <span>
                {filteredTemplates.length}
                {" / "}
                10
              </span>

              <span>
                {category ===
                "all"
                  ? t.all
                  : categories.find(
                      (item) =>
                        item.value ===
                        category,
                    )?.label}
              </span>
            </div>

            {filteredTemplates.length ===
            0 ? (
              <div className="templates-empty-state">
                <div className="templates-empty-icon">
                  <Icon
                    name="search"
                    size={21}
                  />
                </div>

                <h2>
                  {t.noResults}
                </h2>

                <p>
                  {t.noResultsText}
                </p>

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                >
                  {t.reset}
                </button>
              </div>
            ) : (
              <div className="templates-grid">
                {filteredTemplates.map(
                  (template) => (
                    <article
                      key={template.id}
                      className="templates-card"
                    >
                      <button
                        type="button"
                        className="templates-card-preview-button"
                        onClick={() =>
                          setSelectedTemplateId(
                            template.id,
                          )
                        }
                        aria-label={`${t.openPreview}: ${template.name}`}
                      >
                        <TemplatePreview
                          template={template}
                          language={language}
                        />

                        <span className="templates-card-preview-label">
                          <Icon
                            name="eye"
                            size={14}
                          />
                          {t.preview}
                        </span>
                      </button>

                      <div className="templates-card-info">
                        <div className="templates-card-title-row">
                          <span>
                            {template.number}
                          </span>

                          <h2>
                            {template.name}
                          </h2>

                          {template.premium && (
                            <b>PRO</b>
                          )}
                        </div>

                        <p>
                          {
                            template
                              .description[
                              language
                            ]
                          }
                        </p>

                        <div className="templates-card-actions">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTemplateId(
                                template.id,
                              )
                            }
                            className="templates-view-button"
                          >
                            {t.preview}

                            <Icon
                              name="eye"
                              size={13}
                            />
                          </button>

                          <Link
                            to={`/templates/${template.id}`}
                            className="templates-details-button"
                          >
                            {t.details}

                            <Icon
                              name="arrow-right"
                              size={13}
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* PERSONALIZATION */}

        <section className="templates-personalization">
          <div className="templates-page-container">
            <div className="templates-personalization-grid">
              <div>
                <div className="templates-eyebrow light">
                  <span />
                  {t.noteEyebrow}
                </div>

                <h2>
                  {t.noteTitle}
                </h2>
              </div>

              <div>
                <p>
                  {t.noteText}
                </p>

                <div className="templates-personalization-points">
                  <span>
                    <Icon
                      name="edit"
                      size={15}
                    />
                    {language ===
                    "uz"
                      ? "Matn"
                      : language ===
                        "ru"
                      ? "Текст"
                      : "Text"}
                  </span>

                  <span>
                    <Icon
                      name="image"
                      size={15}
                    />
                    {language ===
                    "uz"
                      ? "Rasmlar"
                      : language ===
                        "ru"
                      ? "Фото"
                      : "Photos"}
                  </span>

                  <span>
                    <Icon
                      name="music"
                      size={15}
                    />
                    {language ===
                    "uz"
                      ? "Musiqa"
                      : language ===
                        "ru"
                      ? "Музыка"
                      : "Music"}
                  </span>

                  <span>
                    <Icon
                      name="calendar"
                      size={15}
                    />
                    {language ===
                    "uz"
                      ? "Sana"
                      : language ===
                        "ru"
                      ? "Дата"
                      : "Date"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="templates-final-cta">
          <div className="templates-page-container">
            <div className="templates-final-box">
              <div className="templates-final-content">
                <div className="templates-eyebrow center">
                  <span />
                  {t.ctaEyebrow}
                  <span />
                </div>

                <h2>
                  {t.ctaTitle}
                </h2>

                <p>
                  {t.ctaText}
                </p>

                <button
                  type="button"
                  className="templates-final-button"
                  onClick={() =>
                    setSelectedTemplateId(
                      "elegant",
                    )
                  }
                >
                  {t.preview}

                  <Icon
                    name="eye"
                    size={14}
                  />
                </button>
              </div>

              <div className="templates-final-ring ring-a" />
              <div className="templates-final-ring ring-b" />
            </div>
          </div>
        </section>
      </main>

      {selectedTemplate && (
        <PreviewDrawer
          template={selectedTemplate}
          language={language}
          onClose={() =>
            setSelectedTemplateId(
              null,
            )
          }
          onPrevious={
            openPreviousTemplate
          }
          onNext={
            openNextTemplate
          }
        />
      )}
    </div>
  );
}