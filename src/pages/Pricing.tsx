import { useMemo, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Header from "../components/Header";
import Icon from "../components/Icon";
import type { Language } from "../components/LanguageSwitcher";

import "./Pricing.css";

const templateNames: Record<string, string> = {
  elegant: "Elegant",
  romantic: "Romantic",
  minimal: "Minimal",
  luxury: "Luxury",
  floral: "Floral",
  classic: "Classic",
  cinematic: "Cinematic",
  oriental: "Oriental",
  modern: "Modern",
  royal: "Royal",
};

const content = {
  uz: {
    home: "Bosh sahifa",
    templates: "Namunalar",
    pricing: "Narxlar",
    create: "Taklifnoma yaratish",

    label: "MOMENTO / TO‘LOV",
    title: "Taklifnomangizni boshlang.",
    text:
      "Tanlangan maketni tasdiqlang va bir martalik to‘lovni amalga oshiring.",

    selected: "TANLANGAN MAKET",
    priceLabel: "BIRTA TAKLIFNOMA",
    price: "150 000",
    currency: "SO‘M",

    payment: "To‘lovga o‘tish",
    back: "Maketni almashtirish",

    afterPayment: "TO‘LOVDAN KEYIN",
    afterTitle:
      "Editor avtomatik ochiladi.",
    afterText:
      "To‘lov muvaffaqiyatli tasdiqlangandan keyin siz ushbu taklifnomani o‘zingiz tahrirlashingiz mumkin.",

    feature1: "Ism va matnlarni o‘zgartirish",
    feature2: "Rasmlar va musiqa",
    feature3: "Countdown",
    feature4: "Manzil va xarita",
    feature5: "RSVP",
    feature6: "Shaxsiy havola",

    faqLabel: "FAQ",
    faqTitle: "To‘lov haqida.",

    faq1: "To‘lov bir martalikmi?",
    faq1Text:
      "Ha. Bitta taklifnoma uchun 150 000 so‘m miqdorida bir martalik to‘lov amalga oshiriladi.",

    faq2: "To‘lovdan keyin nima bo‘ladi?",
    faq2Text:
      "To‘lov tasdiqlangach, ushbu taklifnoma uchun editor ochiladi.",

    faq3: "Boshqa maketni tanlash mumkinmi?",
    faq3Text:
      "Ha. To‘lovdan oldin istalgan boshqa maketni tanlashingiz mumkin.",

    faq4: "Bir nechta taklifnoma yarata olamanmi?",
    faq4Text:
      "Ha. Har bir yangi taklifnoma alohida 150 000 so‘mlik buyurtma hisoblanadi.",

    ctaTitle: "Tayyor.",
    ctaText:
      "Tanlangan dizayn bilan taklifnomangizni yaratishni boshlang.",
    ctaButton: "Maketni tasdiqlash",

    noTemplate:
      "Maket tanlanmagan. Avval maketni tanlang.",
  },

  ru: {
    home: "Главная",
    templates: "Шаблоны",
    pricing: "Цены",
    create: "Создать приглашение",

    label: "MOMENTO / ОПЛАТА",
    title: "Начните своё приглашение.",
    text:
      "Подтвердите выбранный шаблон и выполните единоразовую оплату.",

    selected: "ВЫБРАННЫЙ ШАБЛОН",
    priceLabel: "ОДНО ПРИГЛАШЕНИЕ",
    price: "150 000",
    currency: "СУМ",

    payment: "Перейти к оплате",
    back: "Выбрать другой шаблон",

    afterPayment: "ПОСЛЕ ОПЛАТЫ",
    afterTitle:
      "Редактор откроется автоматически.",
    afterText:
      "После подтверждения оплаты вы сможете самостоятельно редактировать приглашение.",

    feature1: "Изменение имени и текста",
    feature2: "Фотографии и музыка",
    feature3: "Countdown",
    feature4: "Адрес и карта",
    feature5: "RSVP",
    feature6: "Персональная ссылка",

    faqLabel: "FAQ",
    faqTitle: "Об оплате.",

    faq1: "Оплата единоразовая?",
    faq1Text:
      "Да. Одно приглашение стоит 150 000 сум и оплачивается один раз.",

    faq2: "Что происходит после оплаты?",
    faq2Text:
      "После подтверждения оплаты редактор выбранного приглашения открывается.",

    faq3: "Можно ли выбрать другой шаблон?",
    faq3Text:
      "Да. До оплаты можно выбрать любой другой шаблон.",

    faq4: "Можно ли создавать несколько приглашений?",
    faq4Text:
      "Да. Каждое новое приглашение оплачивается отдельно — 150 000 сум.",

    ctaTitle: "Готово.",
    ctaText:
      "Начните создавать приглашение с выбранным дизайном.",
    ctaButton: "Подтвердить шаблон",

    noTemplate:
      "Шаблон не выбран. Сначала выберите шаблон.",
  },

  en: {
    home: "Home",
    templates: "Templates",
    pricing: "Pricing",
    create: "Create invitation",

    label: "MOMENTO / PAYMENT",
    title: "Start your invitation.",
    text:
      "Confirm your selected template and continue with the one-time payment.",

    selected: "SELECTED TEMPLATE",
    priceLabel: "ONE INVITATION",
    price: "150,000",
    currency: "UZS",

    payment: "Continue to payment",
    back: "Choose another template",

    afterPayment: "AFTER PAYMENT",
    afterTitle:
      "The editor opens automatically.",
    afterText:
      "Once your payment is confirmed, you can edit the invitation yourself.",

    feature1: "Edit names and text",
    feature2: "Photos and music",
    feature3: "Countdown",
    feature4: "Location and map",
    feature5: "RSVP",
    feature6: "Personal link",

    faqLabel: "FAQ",
    faqTitle: "About payment.",

    faq1: "Is the payment one-time?",
    faq1Text:
      "Yes. One invitation costs 150,000 UZS as a one-time payment.",

    faq2: "What happens after payment?",
    faq2Text:
      "After payment confirmation, the editor for the selected invitation opens.",

    faq3: "Can I choose another template?",
    faq3Text:
      "Yes. You can choose another design before payment.",

    faq4: "Can I create multiple invitations?",
    faq4Text:
      "Yes. Every new invitation is a separate 150,000 UZS order.",

    ctaTitle: "Ready.",
    ctaText:
      "Start creating your invitation with the selected design.",
    ctaButton: "Confirm template",

    noTemplate:
      "No template selected. Choose a template first.",
  },
};

export default function Pricing() {
  const [language, setLanguage] =
    useState<Language>("uz");

  const [params] = useSearchParams();

  const selectedId =
    params.get("template") ?? "";

  const selectedName =
    templateNames[selectedId] ?? "";

  const [faq, setFaq] = useState<
    number | null
  >(0);

  const t = content[language];

  const features = useMemo(
    () => [
      t.feature1,
      t.feature2,
      t.feature3,
      t.feature4,
      t.feature5,
      t.feature6,
    ],
    [t],
  );

  const faqs = [
    {
      q: t.faq1,
      a: t.faq1Text,
    },
    {
      q: t.faq2,
      a: t.faq2Text,
    },
    {
      q: t.faq3,
      a: t.faq3Text,
    },
    {
      q: t.faq4,
      a: t.faq4Text,
    },
  ];

  return (
    <div className="pricing-page">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        active="pricing"
        labels={{
          home: t.home,
          templates: t.templates,
          pricing: t.pricing,
          create: t.create,
        }}
      />

      <main>
        <section className="pricing-hero">
          <div className="pricing-container pricing-hero-grid">
            <div className="pricing-hero-copy">
              <div className="pricing-label">
                <span />
                {t.label}
              </div>

              <h1>
                {t.title}
              </h1>

              <p>{t.text}</p>

              <div className="pricing-selected">
                <span>{t.selected}</span>

                {selectedName ? (
                  <strong>{selectedName}</strong>
                ) : (
                  <strong>
                    {t.noTemplate}
                  </strong>
                )}
              </div>

              <Link
                to="/templates"
                className="pricing-back-link"
              >
                <Icon
                  name="arrow-left"
                  size={14}
                />
                {t.back}
              </Link>
            </div>

            <div className="pricing-card">
              <div className="pricing-card-top">
                <span>{t.priceLabel}</span>
                <span>01</span>
              </div>

              <div className="pricing-price">
                <strong>{t.price}</strong>
                <span>{t.currency}</span>
              </div>

              <div className="pricing-card-divider" />

              <div className="pricing-feature-list-mini">
                {features.slice(0, 4).map(
                  (feature) => (
                    <span key={feature}>
                      <Icon
                        name="check"
                        size={14}
                      />
                      {feature}
                    </span>
                  ),
                )}
              </div>

              <button
                type="button"
                className="pricing-payment-button"
              >
                {t.payment}
                <Icon
                  name="arrow-right"
                  size={15}
                />
              </button>

              <small>
                {language === "uz"
                  ? "To‘lov tizimi keyingi bosqichda ulanadi."
                  : language === "ru"
                  ? "Платёжная система будет подключена на следующем этапе."
                  : "Payment integration will be connected in the next stage."}
              </small>
            </div>
          </div>
        </section>

        <section className="pricing-features">
          <div className="pricing-container">
            <div className="pricing-section-heading">
              <div className="pricing-label">
                <span />
                {t.afterPayment}
              </div>

              <h2>{t.afterTitle}</h2>

              <p>{t.afterText}</p>
            </div>

            <div className="pricing-feature-grid">
              {features.map(
                (feature, index) => (
                  <article key={feature}>
                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div>
                      <Icon
                        name="check"
                        size={18}
                      />

                      <h3>{feature}</h3>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="pricing-faq">
          <div className="pricing-container">
            <div className="pricing-section-heading">
              <div className="pricing-label">
                <span />
                {t.faqLabel}
              </div>

              <h2>{t.faqTitle}</h2>
            </div>

            <div className="pricing-faq-list">
              {faqs.map((item, index) => {
                const open =
                  faq === index;

                return (
                  <div
                    className={`pricing-faq-item ${
                      open ? "open" : ""
                    }`}
                    key={item.q}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setFaq(
                          open
                            ? null
                            : index,
                        )
                      }
                    >
                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <strong>{item.q}</strong>

                      <Icon
                        name={
                          open
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={16}
                      />
                    </button>

                    {open && (
                      <div>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pricing-cta">
          <div className="pricing-container">
            <div className="pricing-cta-box">
              <div className="pricing-label center">
                <span />
                {t.ctaTitle}
                <span />
              </div>

              <h2>{t.ctaTitle}</h2>

              <p>{t.ctaText}</p>

              <Link
                to={
                  selectedId
                    ? `/templates/${selectedId}`
                    : "/templates"
                }
                className="pricing-cta-button"
              >
                {t.ctaButton}
                <Icon
                  name="arrow-right"
                  size={15}
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}