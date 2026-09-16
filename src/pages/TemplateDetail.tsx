import { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "../components/Header";
import Icon from "../components/Icon";

import "./TemplateDetail.css";

type Language = "uz" | "ru" | "en";

type TemplateInfo = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: Record<
    Language,
    string
  >;
  image: string;
  premium: boolean;
};

const templateData: Record<
  string,
  TemplateInfo
> = {
  cinematic: {
    id: "cinematic",
    number: "01",
    name: "Cinematic",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Kinematik, dramatik va premium to‘y taklifnomasi.",
      ru:
        "Кинематографичное и премиальное свадебное приглашение.",
      en:
        "A cinematic and premium wedding invitation.",
    },
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
  },

  classic: {
    id: "classic",
    number: "02",
    name: "Classic",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Klassik serif typography va nafis oltin detallar.",
      ru:
        "Классическая типографика и изысканные золотые детали.",
      en:
        "Classic typography with refined golden details.",
    },
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1800&q=90",
  },

  elegant: {
    id: "elegant",
    number: "03",
    name: "Elegant",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Yumshoq ranglar va premium editorial dizayn.",
      ru:
        "Мягкие тона и премиальный editorial-дизайн.",
      en:
        "Soft tones with a premium editorial design.",
    },
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
  },

  floral: {
    id: "floral",
    number: "04",
    name: "Floral",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Gullar, romantika va nafis pastel kompozitsiya.",
      ru:
        "Цветочный, романтичный и нежный дизайн.",
      en:
        "Romantic floral design with elegant pastel tones.",
    },
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=90",
  },

  luxury: {
    id: "luxury",
    number: "05",
    name: "Luxury",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Qora fon va oltin premium kombinatsiyasi.",
      ru:
        "Чёрный фон и роскошные золотые акценты.",
      en:
        "Black background with luxurious gold accents.",
    },
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
  },

  minimal: {
    id: "minimal",
    number: "06",
    name: "Minimal",
    category: "To‘y",
    premium: false,
    description: {
      uz:
        "Toza, sodda va zamonaviy minimalizm.",
      ru:
        "Чистый, простой и современный минимализм.",
      en:
        "Clean, simple and modern minimalism.",
    },
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
  },

  modern: {
    id: "modern",
    number: "07",
    name: "Modern",
    category: "Unashtiruv",
    premium: false,
    description: {
      uz:
        "Editorial layout va kuchli tipografik kompozitsiya.",
      ru:
        "Editorial layout и выразительная типографика.",
      en:
        "Editorial layout with bold typography.",
    },
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1800&q=90",
  },

  oriental: {
    id: "oriental",
    number: "08",
    name: "Oriental",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Sharqona ornament va oltin detallar.",
      ru:
        "Восточные орнаменты и золотые детали.",
      en:
        "Oriental ornaments with elegant golden details.",
    },
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=90",
  },

  romantic: {
    id: "romantic",
    number: "09",
    name: "Romantic",
    category: "To‘y",
    premium: false,
    description: {
      uz:
        "Yumshoq pushti ranglar va romantik animatsiyalar.",
      ru:
        "Нежные розовые оттенки и романтические анимации.",
      en:
        "Soft pink tones with romantic animations.",
    },
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
  },

  royal: {
    id: "royal",
    number: "10",
    name: "Royal",
    category: "To‘y",
    premium: true,
    description: {
      uz:
        "Qirollik uslubi, ramkalar va boy ranglar.",
      ru:
        "Королевский стиль, рамки и насыщенные оттенки.",
      en:
        "Royal style with frames and rich colors.",
    },
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=90",
  },
};

const text = {
  uz: {
    home: "Bosh sahifa",
    templates: "Shablonlar",
    pricing: "Narxlar",
    create: "Boshlash",
    back: "Shablonlarga qaytish",
    choose: "Shu maketni tahrirlash",
    price: "150 000 UZS",
    live: "Jonli preview",
    premium: "PREMIUM",
    included: "TAKLIFNOMADA MAVJUD",
    feature1: "To‘liq mobil moslashuv",
    feature2: "Animatsiyali sahifalar",
    feature3: "Gallery va musiqa",
    feature4: "RSVP va xarita",
  },
  ru: {
    home: "Главная",
    templates: "Шаблоны",
    pricing: "Цены",
    create: "Начать",
    back: "Назад к шаблонам",
    choose: "Редактировать макет",
    price: "150 000 UZS",
    live: "Live preview",
    premium: "PREMIUM",
    included: "В ПРИГЛАШЕНИИ",
    feature1: "Полная адаптация для mobile",
    feature2: "Анимированные страницы",
    feature3: "Галерея и музыка",
    feature4: "RSVP и карта",
  },
  en: {
    home: "Home",
    templates: "Templates",
    pricing: "Pricing",
    create: "Create",
    back: "Back to templates",
    choose: "Edit this design",
    price: "150 000 UZS",
    live: "Live preview",
    premium: "PREMIUM",
    included: "INCLUDED",
    feature1: "Fully responsive",
    feature2: "Animated sections",
    feature3: "Gallery and music",
    feature4: "RSVP and map",
  },
};

export default function TemplateDetail() {
  const params =
    useParams<{
      id?: string;
    }>();

  const navigate =
    useNavigate();

  const [language, setLanguage] =
    useState<Language>("uz");

  const templateId =
    params.id?.toLowerCase() ??
    "classic";

  const template =
    templateData[
      templateId
    ] ?? templateData.classic;

  const copy = text[language];

  const templateName =
    useMemo(
      () => template.name,
      [template.name],
    );

  const handleEdit = () => {
    navigate(
      `/editor/${template.id}`,
    );
  };

  return (
    <div className="template-detail-page">
      <Header
        language={language}
        onLanguageChange={
          setLanguage
        }
        active="templates"
        labels={{
          home: copy.home,
          templates:
            copy.templates,
          pricing: copy.pricing,
          create: copy.create,
        }}
      />

      <main className="template-detail-main">
        <section className="template-detail-hero">
          <div className="template-detail-visual">
            <div
              className="template-detail-image"
              style={{
                backgroundImage:
                  `url(${template.image})`,
              }}
            />

            <div className="template-detail-overlay" />

            <div className="template-detail-number">
              {template.number}
            </div>

            <div className="template-detail-live">
              <span />
              {copy.live}
            </div>

            <div className="template-detail-name">
              <span>
                {template.category}
              </span>

              <h1>
                {templateName}
              </h1>
            </div>
          </div>

          <div className="template-detail-info">
            <div className="template-detail-topline">
              <span>
                {template.number} / 10
              </span>

              {template.premium && (
                <strong>
                  {copy.premium}
                </strong>
              )}
            </div>

            <h2>
              {templateName}
            </h2>

            <p className="template-detail-description">
              {
                template.description[
                  language
                ]
              }
            </p>

            <div className="template-detail-price">
              <span>
                ONE-TIME PAYMENT
              </span>

              <strong>
                {copy.price}
              </strong>
            </div>

            <button
              type="button"
              className="template-detail-edit"
              onClick={handleEdit}
            >
              <span>
                {copy.choose}
              </span>

              <Icon
                name="arrow-right"
                size={19}
              />
            </button>

            <Link
              to="/templates"
              className="template-detail-back"
            >
              <Icon
                name="arrow-left"
                size={16}
              />

              {copy.back}
            </Link>

            <div className="template-detail-features">
              <div className="template-detail-feature-heading">
                <span>
                  {copy.included}
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={16}
                />
                <span>
                  {copy.feature1}
                </span>
              </div>

              <div>
                <Icon
                  name="sparkles"
                  size={16}
                />
                <span>
                  {copy.feature2}
                </span>
              </div>

              <div>
                <Icon
                  name="image"
                  size={16}
                />
                <span>
                  {copy.feature3}
                </span>
              </div>

              <div>
                <Icon
                  name="location"
                  size={16}
                />
                <span>
                  {copy.feature4}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}