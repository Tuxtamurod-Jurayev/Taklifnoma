import { useEffect, useMemo, useState } from "react";
import "./Classic.css";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

const defaultData: InvitationData = {
  brideName: "Malika",
  groomName: "Ulug'bek",
  date: "09.09.2026",
  time: "18:00",
  venue: "Baxtiyor restorani",
  address: "Toshkent viloyati, Qibray tumani",
  intro:
    "Sizni hayotimizdagi eng go‘zal kunni birga nishonlash uchun taklif qilamiz.",
  story:
    "Bir-birini topgan ikki qalb endi hayotining yangi sahifasini birga boshlaydi.",
  coverImage:
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1800&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
  ],
  googleMapsUrl: "https://maps.google.com",
  rsvpEnabled: true,
};

type Language = "uz" | "ru" | "en";

type ClassicCopy = {
  invitation: string;
  opening: string;
  dateTitle: string;
  countdown: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  september: string;
  program: string;
  guestArrival: string;
  ceremony: string;
  dinner: string;
  ending: string;
  storyTitle: string;
  venueTitle: string;
  galleryTitle: string;
  rsvpTitle: string;
  rsvpText: string;
  yes: string;
  no: string;
  openMap: string;
  continueText: string;
  footer: string;
};

const copy: Record<Language, ClassicCopy> = {
  uz: {
    invitation: "TAKLIFNOMA",
    opening: "SIZNI TO‘YIMIZGA TAKLIF QILAMIZ",
    dateTitle: "SANA",
    countdown: "TO‘Y GACHA QOLGAN VAQT",
    days: "KUN",
    hours: "SOAT",
    minutes: "DAQIQA",
    seconds: "SONIYA",
    september: "SENTYABR 2026",
    program: "DASTUR",
    guestArrival: "MEHMONLAR YIG‘ILISHI",
    ceremony: "MЕHMONLARNI KUTIB OLISH VA MAROSIM",
    dinner: "BAYRAM DASTURXONI",
    ending: "YAKUNI",
    storyTitle: "BIZNING HIKOYA",
    venueTitle: "O‘TKAZILISH JOYI",
    galleryTitle: "XOTIRALAR",
    rsvpTitle: "TASHRIFINGIZNI TASDIQLANG",
    rsvpText:
      "Sizning tashrifingiz biz uchun juda qadrli.",
    yes: "ALBATTA KELAMAN",
    no: "AFSUSKI KELA OLMAYMAN",
    openMap: "XARITANI OCHISH",
    continueText: "DAVOM ETISH",
    footer:
      "Sevgi bilan boshlangan yangi hayot sahifamizga guvoh bo‘ling.",
  },
  ru: {
    invitation: "ПРИГЛАШЕНИЕ",
    opening: "ПРИГЛАШАЕМ ВАС НА НАШУ СВАДЬБУ",
    dateTitle: "ДАТА",
    countdown: "ДО СВАДЬБЫ ОСТАЛОСЬ",
    days: "ДНЕЙ",
    hours: "ЧАСОВ",
    minutes: "МИНУТ",
    seconds: "СЕКУНД",
    september: "СЕНТЯБРЬ 2026",
    program: "ПРОГРАММА",
    guestArrival: "СБОР ГОСТЕЙ",
    ceremony: "ВСТРЕЧА ГОСТЕЙ И ЦЕРЕМОНИЯ",
    dinner: "ПРАЗДНИЧНЫЙ УЖИН",
    ending: "ЗАВЕРШЕНИЕ",
    storyTitle: "НАША ИСТОРИЯ",
    venueTitle: "МЕСТО ПРОВЕДЕНИЯ",
    galleryTitle: "ВОСПОМИНАНИЯ",
    rsvpTitle: "ПОДТВЕРДИТЕ ПРИСУТСТВИЕ",
    rsvpText:
      "Ваше присутствие очень ценно для нас.",
    yes: "Я БУДУ",
    no: "НЕ СМОГУ ПРИЙТИ",
    openMap: "ОТКРЫТЬ КАРТУ",
    continueText: "ПРОДОЛЖИТЬ",
    footer:
      "Станьте частью новой страницы нашей истории любви.",
  },
  en: {
    invitation: "INVITATION",
    opening: "WE INVITE YOU TO OUR WEDDING",
    dateTitle: "DATE",
    countdown: "TIME UNTIL OUR WEDDING",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    september: "SEPTEMBER 2026",
    program: "PROGRAM",
    guestArrival: "GUEST ARRIVAL",
    ceremony: "WELCOME & CEREMONY",
    dinner: "CELEBRATION DINNER",
    ending: "ENDING",
    storyTitle: "OUR STORY",
    venueTitle: "VENUE",
    galleryTitle: "MEMORIES",
    rsvpTitle: "PLEASE CONFIRM YOUR ATTENDANCE",
    rsvpText:
      "Your presence means so much to us.",
    yes: "I WILL ATTEND",
    no: "I CANNOT ATTEND",
    openMap: "OPEN MAP",
    continueText: "CONTINUE",
    footer:
      "Be part of the next beautiful chapter of our story.",
  },
};

function parseWeddingDate(
  date: string,
  time: string,
) {
  const dateParts = date
    .split(/[./-]/)
    .map(Number);

  if (dateParts.length !== 3) {
    return new Date("2026-09-09T18:00:00");
  }

  const [
    day,
    month,
    year,
  ] = dateParts;

  const [
    hour = 18,
    minute = 0,
  ] = time.split(":").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    Number.isNaN(hour) ? 18 : hour,
    Number.isNaN(minute) ? 0 : minute,
  );
}

function ClassicCountdown({
  target,
  labels,
}: {
  target: Date;
  labels: ClassicCopy;
}) {
  const getRemaining = () => {
    const distance =
      target.getTime() - Date.now();

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        distance /
          (1000 * 60 * 60 * 24),
      ),
      hours: Math.floor(
        (distance /
          (1000 * 60 * 60)) %
          24,
      ),
      minutes: Math.floor(
        (distance / (1000 * 60)) % 60,
      ),
      seconds: Math.floor(
        (distance / 1000) % 60,
      ),
    };
  };

  const [remaining, setRemaining] =
    useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        setRemaining(getRemaining());
      },
      1000,
    );

    return () =>
      window.clearInterval(timer);
  }, [target.getTime()]);

  const items = [
    {
      value: remaining.days,
      label: labels.days,
    },
    {
      value: remaining.hours,
      label: labels.hours,
    },
    {
      value: remaining.minutes,
      label: labels.minutes,
    },
    {
      value: remaining.seconds,
      label: labels.seconds,
    },
  ];

  return (
    <div className="classic-countdown">
      {items.map((item) => (
        <div
          className="classic-countdown-item"
          key={item.label}
        >
          <div className="classic-countdown-box">
            <span>
              {String(item.value).padStart(
                2,
                "0",
              )}
            </span>
          </div>

          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

function ClassicCalendar() {
  const days = [
    "",
    "",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];

  return (
    <div className="classic-calendar">
      <div className="classic-calendar-head">
        <span>DU</span>
        <span>SE</span>
        <span>CH</span>
        <span>PA</span>
        <span>JU</span>
        <span>SH</span>
        <span>YA</span>
      </div>

      <div className="classic-calendar-days">
        {days.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={
              day === "9"
                ? "is-selected"
                : ""
            }
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Classic({
  data,
  preview = false,
}: TemplateProps) {
  const invitation = useMemo(
    () => ({
      ...defaultData,
      ...data,
    }),
    [data],
  );

  const [language, setLanguage] =
    useState<Language>("uz");

  const [opened, setOpened] =
    useState(preview);

  const [rsvp, setRsvp] = useState<
    "yes" | "no" | null
  >(null);

  const targetDate = useMemo(
    () =>
      parseWeddingDate(
        invitation.date,
        invitation.time,
      ),
    [
      invitation.date,
      invitation.time,
    ],
  );

  const content = copy[language];

  const gallery =
    invitation.gallery?.length
      ? invitation.gallery
      : defaultData.gallery ?? [];

  const scrollTo = (
    id: string,
  ) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const primaryImage =
    invitation.coverImage ??
    gallery[0];

  return (
    <div
      className={`classic-template ${
        opened ? "is-opened" : ""
      } ${preview ? "is-preview" : ""}`}
    >
      <div className="classic-grain" />

      <div className="classic-fixed-controls">
        <div className="classic-language-switcher">
          {(
            [
              "ru",
              "en",
              "uz",
            ] as Language[]
          ).map((item) => (
            <button
              type="button"
              key={item}
              className={
                language === item
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setLanguage(item)
              }
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="classic-music"
          aria-label="Music"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <section
        className={`classic-opening ${
          opened ? "is-hidden" : ""
        }`}
      >
        <div className="classic-opening-frame">
          <div className="classic-corner top-left" />
          <div className="classic-corner top-right" />
          <div className="classic-corner bottom-left" />
          <div className="classic-corner bottom-right" />

          <div className="classic-opening-inner">
            <span className="classic-opening-kicker">
              {content.invitation}
            </span>

            <div className="classic-ornament">
              <i />
              <b>♡</b>
              <i />
            </div>

            <p className="classic-opening-text">
              {content.opening}
            </p>

            <div className="classic-opening-names">
              <span>
                {invitation.groomName}
              </span>
              <i>&</i>
              <span>
                {invitation.brideName}
              </span>
            </div>

            <div className="classic-opening-date">
              {invitation.date}
            </div>

            <button
              type="button"
              className="classic-opening-button"
              onClick={() =>
                setOpened(true)
              }
            >
              <span />
              {content.continueText}
              <span />
            </button>
          </div>
        </div>
      </section>

      <main className="classic-main">
        <section className="classic-hero">
          <div className="classic-hero-pattern" />

          <div className="classic-hero-content">
            <p className="classic-label">
              {content.opening}
            </p>

            <div className="classic-hero-monogram">
              <span>
                {invitation.groomName.charAt(
                  0,
                )}
              </span>
              <small>&</small>
              <span>
                {invitation.brideName.charAt(
                  0,
                )}
              </span>
            </div>

            <h1>
              <span>
                {invitation.groomName}
              </span>

              <em>&</em>

              <span>
                {invitation.brideName}
              </span>
            </h1>

            <div className="classic-gold-rule">
              <span />
              <b>◆</b>
              <span />
            </div>

            <p className="classic-hero-date">
              {invitation.date}
            </p>

            <p className="classic-hero-time">
              {invitation.time}
            </p>

            <button
              type="button"
              className="classic-scroll-button"
              onClick={() =>
                scrollTo(
                  "classic-date",
                )
              }
              aria-label="Scroll"
            >
              <span>↓</span>
            </button>
          </div>
        </section>

        <section
          id="classic-date"
          className="classic-section classic-date-section"
        >
          <div className="classic-section-top">
            <p className="classic-overline">
              {content.dateTitle}
            </p>

            <h2>
              {invitation.date.replace(
                /\./g,
                " ",
              )}
            </h2>

            <div className="classic-gold-rule">
              <span />
              <b>♡</b>
              <span />
            </div>

            <p className="classic-section-subtitle">
              {content.countdown}
            </p>
          </div>

          <ClassicCountdown
            target={targetDate}
            labels={content}
          />

          <div className="classic-calendar-block">
            <div className="classic-calendar-title">
              {content.september}
            </div>

            <ClassicCalendar />
          </div>
        </section>

        <section className="classic-section classic-story-section">
          <div className="classic-story-grid">
            <div className="classic-story-image">
              <img
                src={primaryImage}
                alt={`${invitation.groomName} ${invitation.brideName}`}
              />

              <div className="classic-image-frame" />
            </div>

            <div className="classic-story-content">
              <span className="classic-index">
                01
              </span>

              <p className="classic-overline">
                {content.storyTitle}
              </p>

              <h2>
                Bir umrga
                <br />
                birga
              </h2>

              <p className="classic-story-copy">
                {invitation.story}
              </p>

              <div className="classic-story-quote">
                <span>“</span>

                <p>
                  {invitation.intro}
                </p>

                <span>”</span>
              </div>
            </div>
          </div>
        </section>

        <section className="classic-section classic-program-section">
          <div className="classic-section-heading">
            <span className="classic-index">
              02
            </span>

            <p className="classic-overline">
              {content.program}
            </p>

            <h2>
              {content.program}
            </h2>
          </div>

          <div className="classic-program">
            <div className="classic-program-item">
              <div className="classic-program-icon">
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d="M17 32h30" />
                  <path d="M21 30c2-8 20-8 22 0" />
                  <path d="M27 23c0-6 10-7 12 0" />
                  <path d="M23 36h18" />
                </svg>
              </div>

              <div className="classic-program-line">
                <i />
              </div>

              <div className="classic-program-content">
                <strong>18:00</strong>
                <h3>
                  {content.guestArrival}
                </h3>
                <p>
                  {language === "uz"
                    ? "Mehmonlarni kutib olish"
                    : language === "ru"
                      ? "Встреча гостей"
                      : "Welcoming our guests"}
                </p>
              </div>
            </div>

            <div className="classic-program-item">
              <div className="classic-program-icon">
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="12"
                  />
                  <circle
                    cx="23"
                    cy="32"
                    r="10"
                  />
                </svg>
              </div>

              <div className="classic-program-line">
                <i />
              </div>

              <div className="classic-program-content">
                <strong>19:00</strong>
                <h3>
                  {content.ceremony}
                </h3>
                <p>
                  {language === "uz"
                    ? "Unutilmas marosim"
                    : language === "ru"
                      ? "Торжественная церемония"
                      : "The wedding ceremony"}
                </p>
              </div>
            </div>

            <div className="classic-program-item">
              <div className="classic-program-icon">
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d="M15 42h34" />
                  <path d="M20 39c0-12 24-12 24 0" />
                  <path d="M26 26c2-5 10-5 12 0" />
                </svg>
              </div>

              <div className="classic-program-line">
                <i />
              </div>

              <div className="classic-program-content">
                <strong>20:00</strong>
                <h3>
                  {content.dinner}
                </h3>
                <p>
                  {language === "uz"
                    ? "Bayram dasturxoni va tantana"
                    : language === "ru"
                      ? "Праздничный ужин и торжество"
                      : "Dinner and celebration"}
                </p>
              </div>
            </div>

            <div className="classic-program-item">
              <div className="classic-program-icon">
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d="M18 43l8-8" />
                  <path d="M29 40l7-7" />
                  <path d="M38 43l8-8" />
                  <path d="M15 50h34" />
                </svg>
              </div>

              <div className="classic-program-line">
                <i />
              </div>

              <div className="classic-program-content">
                <strong>23:00</strong>
                <h3>
                  {content.ending}
                </h3>
                <p>
                  {language === "uz"
                    ? "Yana uchrashguncha"
                    : language === "ru"
                      ? "До новых встреч"
                      : "Until we meet again"}
                </p>
              </div>
            </div>
          </div>

          <div className="classic-program-heart">
            ♡
          </div>
        </section>

        <section className="classic-section classic-venue-section">
          <div className="classic-venue-image">
            <img
              src={
                gallery[1] ??
                primaryImage
              }
              alt={invitation.venue}
            />

            <div className="classic-venue-overlay" />
          </div>

          <div className="classic-venue-card">
            <span className="classic-index">
              03
            </span>

            <p className="classic-overline">
              {content.venueTitle}
            </p>

            <h2>
              {invitation.venue}
            </h2>

            <div className="classic-gold-rule left">
              <span />
              <b>◆</b>
              <span />
            </div>

            <p className="classic-address">
              {invitation.address}
            </p>

            <a
              className="classic-map-button"
              href={
                invitation.googleMapsUrl ??
                "https://maps.google.com"
              }
              target="_blank"
              rel="noreferrer"
            >
              {content.openMap}
              <span>↗</span>
            </a>
          </div>
        </section>

        <section className="classic-section classic-gallery-section">
          <div className="classic-section-heading">
            <span className="classic-index">
              04
            </span>

            <p className="classic-overline">
              {content.galleryTitle}
            </p>

            <h2>
              {content.galleryTitle}
            </h2>
          </div>

          <div className="classic-gallery">
            {gallery.map(
              (image, index) => (
                <figure
                  key={`${image}-${index}`}
                  className={`classic-gallery-item gallery-${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                  />

                  <div className="classic-gallery-overlay">
                    <span>
                      0{index + 1}
                    </span>
                  </div>
                </figure>
              ),
            )}
          </div>
        </section>

        <section className="classic-section classic-rsvp-section">
          <div className="classic-rsvp-frame">
            <div className="classic-rsvp-inner">
              <span className="classic-index">
                05
              </span>

              <div className="classic-rsvp-heart">
                ♡
              </div>

              <p className="classic-overline">
                RSVP
              </p>

              <h2>
                {content.rsvpTitle}
              </h2>

              <p className="classic-rsvp-text">
                {content.rsvpText}
              </p>

              <div className="classic-rsvp-actions">
                <button
                  type="button"
                  className={
                    rsvp === "yes"
                      ? "is-selected"
                      : ""
                  }
                  onClick={() =>
                    setRsvp("yes")
                  }
                >
                  {content.yes}
                </button>

                <button
                  type="button"
                  className={
                    rsvp === "no"
                      ? "is-selected"
                      : ""
                  }
                  onClick={() =>
                    setRsvp("no")
                  }
                >
                  {content.no}
                </button>
              </div>

              <div className="classic-rsvp-status">
                {rsvp === "yes" &&
                  content.yes}

                {rsvp === "no" &&
                  content.no}
              </div>
            </div>
          </div>
        </section>

        <footer className="classic-footer">
          <div className="classic-footer-monogram">
            <span>
              {invitation.groomName.charAt(
                0,
              )}
            </span>

            <small>&</small>

            <span>
              {invitation.brideName.charAt(
                0,
              )}
            </span>
          </div>

          <h2>
            {invitation.groomName}
            <span>&</span>
            {invitation.brideName}
          </h2>

          <p>{content.footer}</p>

          <div className="classic-footer-line" />

          <small>Momento</small>
        </footer>
      </main>
    </div>
  );
}