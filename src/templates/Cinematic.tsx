import { useEffect, useMemo, useState } from "react";
import "./Cinematic.css";
import type { TemplateProps, InvitationData } from "./templateTypes";

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
    "Ikki qalb, bir taqdir va yangi hayot sari birinchi qadam. Ushbu unutilmas kunimizda biz bilan birga bo‘ling.",
  coverImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2200&q=90",
  gallery: [
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  ],
  googleMapsUrl: "https://maps.google.com",
  rsvpEnabled: true,
};

type Language = "uz" | "ru" | "en";

type CinematicCopy = {
  languageLabel: string;
  received: string;
  invitation: string;
  unlock: string;
  dateLabel: string;
  countdown: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  event: string;
  story: string;
  location: string;
  gallery: string;
  rsvp: string;
  confirm: string;
  footer: string;
  yes: string;
  no: string;
};

const copies: Record<Language, CinematicCopy> = {
  uz: {
    languageLabel: "O‘Z",
    received: "SIZ TAKLIFNOMA OLDINGIZ",
    invitation: "TAKLIFNOMA",
    unlock: "TAKLIFNOMANI OCHISH",
    dateLabel: "TO‘YIMIZ SANASI",
    countdown: "TO‘YGA QOLGAN VAQT",
    days: "KUN",
    hours: "SOAT",
    minutes: "DAQIQA",
    seconds: "SONIYA",
    event: "TO‘Y DASTURI",
    story: "BIZNING HIKOYA",
    location: "O‘TKAZILISH JOYI",
    gallery: "XOTIRALAR",
    rsvp: "TASHRIFINGIZNI TASDIQLANG",
    confirm: "Men qatnashaman",
    footer: "Siz bilan bu kun yanada go‘zal bo‘ladi.",
    yes: "Ha",
    no: "Yo‘q",
  },
  ru: {
    languageLabel: "RU",
    received: "ВЫ ПОЛУЧИЛИ ПРИГЛАШЕНИЕ",
    invitation: "ПРИГЛАШЕНИЕ",
    unlock: "ОТКРЫТЬ ПРИГЛАШЕНИЕ",
    dateLabel: "ДАТА НАШЕЙ СВАДЬБЫ",
    countdown: "ДО НАШЕЙ СВАДЬБЫ ОСТАЛОСЬ",
    days: "ДНЕЙ",
    hours: "ЧАСОВ",
    minutes: "МИНУТ",
    seconds: "СЕКУНД",
    event: "ПРОГРАММА",
    story: "НАША ИСТОРИЯ",
    location: "МЕСТО ПРОВЕДЕНИЯ",
    gallery: "ВОСПОМИНАНИЯ",
    rsvp: "ПОДТВЕРДИТЕ ПРИСУТСТВИЕ",
    confirm: "Я буду",
    footer: "Этот день станет ещё прекраснее вместе с вами.",
    yes: "Да",
    no: "Нет",
  },
  en: {
    languageLabel: "EN",
    received: "YOU HAVE RECEIVED AN INVITATION",
    invitation: "INVITATION",
    unlock: "OPEN INVITATION",
    dateLabel: "OUR WEDDING DATE",
    countdown: "TIME UNTIL OUR WEDDING",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    event: "THE PROGRAM",
    story: "OUR STORY",
    location: "VENUE",
    gallery: "MEMORIES",
    rsvp: "PLEASE CONFIRM YOUR ATTENDANCE",
    confirm: "I will attend",
    footer: "This day will be even more beautiful with you.",
    yes: "Yes",
    no: "No",
  },
};

function parseDate(date: string, time: string) {
  const dateParts = date.split(/[./-]/).map(Number);

  if (dateParts.length !== 3) {
    return new Date("2026-09-09T18:00:00");
  }

  const [day, month, year] = dateParts;

  if (
    Number.isNaN(day) ||
    Number.isNaN(month) ||
    Number.isNaN(year)
  ) {
    return new Date("2026-09-09T18:00:00");
  }

  const [hours, minutes] = time.split(":").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    Number.isNaN(hours) ? 18 : hours,
    Number.isNaN(minutes) ? 0 : minutes,
  );
}

function formatDateText(date: string) {
  return date.replace(/\./g, " • ");
}

function CinematicCountdown({
  targetDate,
  copy,
}: {
  targetDate: Date;
  copy: CinematicCopy;
}) {
  const calculate = () => {
    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24,
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60,
      ),
      seconds: Math.floor(
        (difference / 1000) % 60,
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate.getTime()]);

  const items = [
    {
      value: timeLeft.days,
      label: copy.days,
    },
    {
      value: timeLeft.hours,
      label: copy.hours,
    },
    {
      value: timeLeft.minutes,
      label: copy.minutes,
    },
    {
      value: timeLeft.seconds,
      label: copy.seconds,
    },
  ];

  return (
    <div className="cinematic-countdown-grid">
      {items.map((item) => (
        <div className="cinematic-countdown-item" key={item.label}>
          <div className="cinematic-countdown-value">
            {String(item.value).padStart(2, "0")}
          </div>

          <div className="cinematic-countdown-label">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function MusicButton({
  playing,
  onClick,
}: {
  playing: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`cinematic-music ${playing ? "is-playing" : ""}`}
      onClick={onClick}
      aria-label="Music"
    >
      <span className="cinematic-music-icon">
        {playing ? "Ⅱ" : "▷"}
      </span>

      <span className="cinematic-music-waves">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

export default function Cinematic({
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

  const [language, setLanguage] = useState<Language>("uz");
  const [opened, setOpened] = useState(preview);
  const [playing, setPlaying] = useState(false);
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);

  const copy = copies[language];

  const targetDate = useMemo(
    () => parseDate(invitation.date, invitation.time),
    [invitation.date, invitation.time],
  );

  const coverStyle = {
    backgroundImage: `url(${invitation.coverImage})`,
  };

  const gallery = invitation.gallery?.length
    ? invitation.gallery
    : defaultData.gallery ?? [];

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`cinematic-page ${
        opened ? "is-opened" : "is-locked"
      } ${preview ? "is-preview" : ""}`}
    >
      <div
        className="cinematic-background"
        style={coverStyle}
      />

      <div className="cinematic-noise" />
      <div className="cinematic-overlay" />

      <header className="cinematic-topbar">
        <div className="cinematic-languages">
          {(["ru", "en", "uz"] as Language[]).map((item) => (
            <button
              type="button"
              key={item}
              className={
                language === item ? "is-active" : ""
              }
              onClick={() => setLanguage(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <MusicButton
          playing={playing}
          onClick={() => setPlaying((value) => !value)}
        />
      </header>

      <section
        className={`cinematic-lock-screen ${
          opened ? "is-hidden" : ""
        }`}
      >
        <div className="cinematic-lock-content">
          <div className="cinematic-small-line">
            <span />
            <p>{copy.received}</p>
            <span />
          </div>

          <div className="cinematic-monogram">
            {invitation.groomName.charAt(0)}
            <span>&</span>
            {invitation.brideName.charAt(0)}
          </div>

          <h1>
            {invitation.groomName}
            <span>&</span>
            {invitation.brideName}
          </h1>

          <p className="cinematic-lock-date">
            {formatDateText(invitation.date)}
          </p>

          <div className="cinematic-lock-quote">
            <span>﴾</span>
            <p>
              «И Он соединил их сердца»
            </p>
            <small>Аль-Анфаль, 63</small>
          </div>

          <button
            type="button"
            className="cinematic-unlock"
            onClick={() => setOpened(true)}
          >
            <span className="cinematic-lock-icon">
              ♧
            </span>

            <span>{copy.unlock}</span>

            <strong>→</strong>
          </button>

          <button
            type="button"
            className="cinematic-scroll-hint"
            onClick={() => setOpened(true)}
          >
            <span>SCROLL</span>
            <i />
          </button>
        </div>
      </section>

      <main
        className={`cinematic-main ${
          opened ? "is-visible" : ""
        }`}
      >
        <section className="cinematic-hero cinematic-section">
          <div className="cinematic-hero-center">
            <div className="cinematic-eyebrow">
              {copy.invitation}
            </div>

            <div className="cinematic-monogram cinematic-monogram-large">
              {invitation.groomName.charAt(0)}
              <span>&</span>
              {invitation.brideName.charAt(0)}
            </div>

            <h2>
              <span>{invitation.groomName}</span>
              <em>&</em>
              <span>{invitation.brideName}</span>
            </h2>

            <div className="cinematic-gold-divider">
              <span />
              <b>◆</b>
              <span />
            </div>

            <p className="cinematic-hero-date">
              {formatDateText(invitation.date)}
            </p>

            <p className="cinematic-hero-time">
              {invitation.time}
            </p>

            <button
              type="button"
              className="cinematic-round-arrow"
              onClick={() => scrollTo("cinematic-countdown")}
              aria-label="Scroll down"
            >
              ↓
            </button>
          </div>
        </section>

        <section
          id="cinematic-countdown"
          className="cinematic-section cinematic-countdown-section"
        >
          <div className="cinematic-section-heading">
            <span>{copy.dateLabel}</span>

            <h3>
              {formatDateText(invitation.date)}
            </h3>

            <div className="cinematic-gold-divider small">
              <span />
              <b>◆</b>
              <span />
            </div>

            <p>{copy.countdown}</p>
          </div>

          <CinematicCountdown
            targetDate={targetDate}
            copy={copy}
          />
        </section>

        <section className="cinematic-section cinematic-intro-section">
          <div className="cinematic-vertical-line" />

          <p className="cinematic-section-label">
            01
          </p>

          <h3>{copy.story}</h3>

          <p className="cinematic-story-text">
            {invitation.story}
          </p>

          <div className="cinematic-quote">
            <span>“</span>
            <p>{invitation.intro}</p>
            <span>”</span>
          </div>
        </section>

        <section className="cinematic-section cinematic-program-section">
          <div className="cinematic-section-heading left">
            <span>02</span>
            <h3>{copy.event}</h3>
          </div>

          <div className="cinematic-timeline">
            <div className="cinematic-timeline-item">
              <div className="cinematic-timeline-time">
                18:00
              </div>

              <div className="cinematic-timeline-marker">
                <i />
              </div>

              <div>
                <h4>
                  {language === "ru"
                    ? "Сбор гостей"
                    : language === "en"
                      ? "Guest arrival"
                      : "Mehmonlar yig‘ilishi"}
                </h4>

                <p>
                  {language === "ru"
                    ? "Встречаем гостей"
                    : language === "en"
                      ? "Welcoming our guests"
                      : "Aziz mehmonlarni kutib olish"}
                </p>
              </div>
            </div>

            <div className="cinematic-timeline-item">
              <div className="cinematic-timeline-time">
                19:00
              </div>

              <div className="cinematic-timeline-marker">
                <i />
              </div>

              <div>
                <h4>
                  {language === "ru"
                    ? "Торжественная часть"
                    : language === "en"
                      ? "Wedding ceremony"
                      : "Nikoh marosimi"}
                </h4>

                <p>
                  {language === "ru"
                    ? "Главный момент нашего дня"
                    : language === "en"
                      ? "The most important moment"
                      : "Kunimizning eng go‘zal lahzasi"}
                </p>
              </div>
            </div>

            <div className="cinematic-timeline-item">
              <div className="cinematic-timeline-time">
                20:00
              </div>

              <div className="cinematic-timeline-marker">
                <i />
              </div>

              <div>
                <h4>
                  {language === "ru"
                    ? "Праздничный ужин"
                    : language === "en"
                      ? "Celebration dinner"
                      : "Bayram dasturxoni"}
                </h4>

                <p>
                  {language === "ru"
                    ? "Музыка, танцы и радость"
                    : language === "en"
                      ? "Music, dance and celebration"
                      : "Musiqa, raqs va unutilmas lahzalar"}
                </p>
              </div>
            </div>

            <div className="cinematic-timeline-item">
              <div className="cinematic-timeline-time">
                23:00
              </div>

              <div className="cinematic-timeline-marker">
                <i />
              </div>

              <div>
                <h4>
                  {language === "ru"
                    ? "Завершение"
                    : language === "en"
                      ? "Farewell"
                      : "Yakun"}
                </h4>

                <p>
                  {language === "ru"
                    ? "До новых встреч"
                    : language === "en"
                      ? "Until we meet again"
                      : "Yana uchrashguncha"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cinematic-section cinematic-location-section">
          <div className="cinematic-location-grid">
            <div className="cinematic-location-image">
              <div
                className="cinematic-location-image-inner"
                style={{
                  backgroundImage: `url(${
                    gallery[0] ?? invitation.coverImage
                  })`,
                }}
              />
            </div>

            <div className="cinematic-location-content">
              <span>03</span>
              <h3>{copy.location}</h3>

              <div className="cinematic-gold-divider left small">
                <span />
                <b>◆</b>
                <span />
              </div>

              <h4>{invitation.venue}</h4>

              <p>{invitation.address}</p>

              <a
                href={
                  invitation.googleMapsUrl ??
                  "https://maps.google.com"
                }
                target="_blank"
                rel="noreferrer"
                className="cinematic-location-button"
              >
                <span>↗</span>
                {language === "ru"
                  ? "Открыть карту"
                  : language === "en"
                    ? "Open map"
                    : "Xaritani ochish"}
              </a>
            </div>
          </div>
        </section>

        <section className="cinematic-section cinematic-gallery-section">
          <div className="cinematic-section-heading">
            <span>04</span>
            <h3>{copy.gallery}</h3>
          </div>

          <div className="cinematic-gallery">
            {gallery.map((image, index) => (
              <figure
                key={`${image}-${index}`}
                className={`cinematic-gallery-item gallery-${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${invitation.groomName} ${invitation.brideName}`}
                />

                <div className="cinematic-gallery-overlay">
                  <span>
                    0{index + 1}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </section>

        <section className="cinematic-section cinematic-rsvp-section">
          <div className="cinematic-rsvp-card">
            <span>05</span>

            <div className="cinematic-heart">
              ♡
            </div>

            <h3>{copy.rsvp}</h3>

            <p>
              {language === "ru"
                ? "Ваше присутствие сделает этот день особенным."
                : language === "en"
                  ? "Your presence will make this day even more special."
                  : "Sizning tashrifingiz bu kunni yanada unutilmas qiladi."}
            </p>

            <div className="cinematic-rsvp-actions">
              <button
                type="button"
                className={rsvp === "yes" ? "selected" : ""}
                onClick={() => setRsvp("yes")}
              >
                {copy.yes}
              </button>

              <button
                type="button"
                className={rsvp === "no" ? "selected" : ""}
                onClick={() => setRsvp("no")}
              >
                {copy.no}
              </button>
            </div>

            <div className="cinematic-confirm-label">
              {rsvp === "yes"
                ? copy.confirm
                : rsvp === "no"
                  ? language === "ru"
                    ? "Мы будем ждать вас в следующий раз"
                    : language === "en"
                      ? "We hope to see you another time"
                      : "Keyingi safar uchrashamiz"
                  : ""}
            </div>
          </div>
        </section>

        <footer className="cinematic-footer">
          <div className="cinematic-monogram cinematic-footer-monogram">
            {invitation.groomName.charAt(0)}
            <span>&</span>
            {invitation.brideName.charAt(0)}
          </div>

          <h3>
            {invitation.groomName}
            <span>&</span>
            {invitation.brideName}
          </h3>

          <p>{copy.footer}</p>

          <div className="cinematic-footer-line" />

          <small>Momento</small>
        </footer>
      </main>
    </div>
  );
}