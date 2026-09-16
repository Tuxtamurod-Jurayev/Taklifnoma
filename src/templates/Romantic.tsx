import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./Romantic.css";

type Language = "uz" | "ru" | "en";

type RsvpValue = "yes" | "no" | null;

const fallbackData: InvitationData = {
  brideName: "Dilnoza",
  groomName: "Jasurbek",
  date: "12.09.2026",
  time: "18:00",
  venue: "Magnat Plaza",
  address:
    "Toshkent sh., Amir Temur 108",
  intro:
    "Sizni hayotimizdagi eng baxtiyor kun — nikoh to‘yimizga bag‘ishlangan tantanali kechaning aziz mehmoni bo‘lishga taklif etamiz.",
  story:
    "Ikki qalb, bir taqdir va bir umr davom etadigan sevgi hikoyasi.",
  coverImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90",
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=90",
  ],
  googleMapsUrl:
    "https://maps.google.com",
  rsvpEnabled: true,
};

const translations: Record<
  Language,
  {
    open: string;
    invitation: string;
    weddingDate: string;
    introTitle: string;
    countdownLabel: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    schedule: string;
    welcome: string;
    ceremony: string;
    cocktail: string;
    dinner: string;
    location: string;
    map: string;
    dressCode: string;
    men: string;
    women: string;
    details: string;
    detailsText: string;
    gallery: string;
    poem: string;
    poemLines: string[];
    rsvpTitle: string;
    rsvpText: string;
    yes: string;
    no: string;
    confirmed: string;
    closing: string;
    music: string;
  }
> = {
  uz: {
    open: "Ochish",
    invitation:
      "To‘y taklifnomasi",
    weddingDate: "Nikoh kuni",
    introTitle:
      "Assalomu alaykum",
    countdownLabel:
      "To‘yimizgacha",
    days: "Kun",
    hours: "Soat",
    minutes: "Daqiqa",
    seconds: "Soniya",
    schedule: "Marosim dasturi",
    welcome:
      "Mehmonlarni kutib olish",
    ceremony: "Nikoh marosimi",
    cocktail:
      "Kokteyl va raqs",
    dinner: "Kechki ovqat",
    location: "Manzil",
    map: "Xaritada ko‘rish",
    dressCode: "Kiyim kodi",
    men: "Erkaklar",
    women: "Ayollar",
    details: "Tafsilotlar",
    detailsText:
      "Qo‘shimcha savollar uchun bizning aloqalarimiz orqali murojaat qiling. Sizning ishtirokingiz biz uchun eng katta sovg‘a.",
    gallery: "Xotiralar",
    poem: "Sevgi bilan",
    poemLines: [
      "Ikki qalb bir yo‘lda uchrashdi,",
      "Bir nigohda bahor uyg‘ondi.",
      "Endi esa bir umrga atalgan",
      "Go‘zal bir hikoya boshlandi.",
    ],
    rsvpTitle:
      "To‘yimizga keling",
    rsvpText:
      "Iltimos, kelishingizni oldindan tasdiqlang.",
    yes: "Ha, kelaman",
    no: "Yo‘q, bora olmayman",
    confirmed:
      "Javobingiz qabul qilindi.",
    closing:
      "Sizni kutamiz!",
    music: "Musiqa",
  },

  ru: {
    open: "Открыть",
    invitation:
      "Свадебное приглашение",
    weddingDate: "День свадьбы",
    introTitle:
      "Добро пожаловать",
    countdownLabel:
      "До торжества",
    days: "Дни",
    hours: "Часы",
    minutes: "Минуты",
    seconds: "Сек",
    schedule: "Программа",
    welcome:
      "Встреча гостей",
    ceremony:
      "Церемония бракосочетания",
    cocktail:
      "Коктейль и танцы",
    dinner: "Ужин",
    location: "Место",
    map: "Показать на карте",
    dressCode: "Дресс-код",
    men: "Мужчины",
    women: "Женщины",
    details: "Детали",
    detailsText:
      "По дополнительным вопросам обращайтесь к организаторам. Ваше присутствие — наш самый большой подарок.",
    gallery: "Воспоминания",
    poem: "С любовью",
    poemLines: [
      "Два сердца однажды встретились,",
      "И в их глазах расцвела весна.",
      "Теперь начинается история,",
      "Которая написана на века.",
    ],
    rsvpTitle:
      "Приходите на свадьбу",
    rsvpText:
      "Пожалуйста, подтвердите своё присутствие.",
    yes: "Да, приду",
    no: "Не смогу прийти",
    confirmed:
      "Ваш ответ принят.",
    closing:
      "Будем рады вас видеть!",
    music: "Музыка",
  },

  en: {
    open: "Open",
    invitation:
      "Wedding Invitation",
    weddingDate: "Wedding Day",
    introTitle:
      "Welcome",
    countdownLabel:
      "Until the celebration",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Sec",
    schedule: "Program",
    welcome:
      "Guest arrival",
    ceremony:
      "Wedding ceremony",
    cocktail:
      "Cocktail & dancing",
    dinner: "Dinner",
    location: "Location",
    map: "View on map",
    dressCode: "Dress code",
    men: "For men",
    women: "For women",
    details: "Details",
    detailsText:
      "For any additional questions, please contact the organizers. Having you with us is the greatest gift.",
    gallery: "Memories",
    poem: "With love",
    poemLines: [
      "Two hearts once met along the way,",
      "And spring began within their eyes.",
      "Now starts a story made for always,",
      "A love that never says goodbye.",
    ],
    rsvpTitle:
      "Come celebrate with us",
    rsvpText:
      "Please confirm your attendance.",
    yes: "Yes, I'll come",
    no: "I can't attend",
    confirmed:
      "Your response has been received.",
    closing:
      "We can't wait to see you!",
    music: "Music",
  },
};

function parseInvitationDate(
  date: string,
  time: string,
) {
  const parts = date
    .split(/[./-]/)
    .map(Number);

  let day = 12;
  let month = 9;
  let year = 2026;

  if (
    parts.length === 3 &&
    parts.every(
      (part) =>
        !Number.isNaN(part),
    )
  ) {
    if (parts[0] > 1900) {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    }
  }

  const timeParts =
    time.split(":").map(Number);

  const hour =
    Number.isNaN(timeParts[0])
      ? 18
      : timeParts[0];

  const minute =
    Number.isNaN(timeParts[1])
      ? 0
      : timeParts[1];

  return new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    0,
  );
}

function Countdown({
  target,
  labels,
}: {
  target: Date;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}) {
  const getTime = () => {
    const diff =
      target.getTime() -
      Date.now();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        diff /
          86400000,
      ),
      hours: Math.floor(
        (diff / 3600000) %
          24,
      ),
      minutes: Math.floor(
        (diff / 60000) % 60,
      ),
      seconds: Math.floor(
        (diff / 1000) % 60,
      ),
    };
  };

  const [time, setTime] =
    useState(getTime);

  useEffect(() => {
    const interval =
      window.setInterval(
        () => {
          setTime(getTime());
        },
        1000,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [target]);

  const items = [
    {
      value: time.days,
      label: labels.days,
    },
    {
      value: time.hours,
      label: labels.hours,
    },
    {
      value: time.minutes,
      label: labels.minutes,
    },
    {
      value: time.seconds,
      label: labels.seconds,
    },
  ];

  return (
    <div className="romantic-countdown">
      {items.map(
        (item, index) => (
          <div
            className="romantic-countdown-item"
            key={item.label}
          >
            <strong>
              {String(
                item.value,
              ).padStart(
                2,
                "0",
              )}
            </strong>

            <span>
              {item.label}
            </span>

            {index <
              items.length -
                1 && (
              <i>:</i>
            )}
          </div>
        ),
      )}
    </div>
  );
}

function OpeningScreen({
  data,
  text,
  onOpen,
}: {
  data: InvitationData;
  text: (typeof translations)["uz"];
  onOpen: () => void;
}) {
  const [opening, setOpening] =
    useState(false);

  const handleOpen = () => {
    setOpening(true);

    window.setTimeout(
      onOpen,
      900,
    );
  };

  return (
    <section
      className={`romantic-opening ${
        opening
          ? "is-opening"
          : ""
      }`}
    >
      <div className="romantic-opening-image">
        <img
          src={
            data.coverImage ||
            fallbackData.coverImage
          }
          alt=""
        />
      </div>

      <div className="romantic-opening-overlay" />

      <div className="romantic-opening-flower flower-left">
        <span>✿</span>
      </div>

      <div className="romantic-opening-flower flower-right">
        <span>❀</span>
      </div>

      <div className="romantic-opening-card">
        <div className="romantic-opening-label">
          {text.invitation}
        </div>

        <div className="romantic-opening-monogram">
          <span>
            {data.brideName.charAt(
              0,
            )}
          </span>

          <small>&</small>

          <span>
            {data.groomName.charAt(
              0,
            )}
          </span>
        </div>

        <div className="romantic-opening-names">
          <strong>
            {data.brideName}
          </strong>

          <em>&</em>

          <strong>
            {data.groomName}
          </strong>
        </div>

        <div className="romantic-opening-rule">
          <span />
          <b>♡</b>
          <span />
        </div>

        <p>
          {data.intro ||
            "Sizni bizning eng baxtli kunimizga taklif etamiz."}
        </p>

        <div className="romantic-opening-date">
          {data.date}
        </div>

        <button
          type="button"
          className={`romantic-open-heart ${
            opening
              ? "is-active"
              : ""
          }`}
          onClick={
            handleOpen
          }
          aria-label={
            text.open
          }
        >
          <span className="heart-wave wave-one" />
          <span className="heart-wave wave-two" />
          <span className="heart-symbol">
            ♥
          </span>
        </button>

        <span className="romantic-open-label">
          {text.open}
        </span>
      </div>

      <div className="romantic-opening-petals">
        <span>✿</span>
        <span>❀</span>
        <span>✿</span>
        <span>❀</span>
        <span>✿</span>
        <span>❀</span>
      </div>
    </section>
  );
}

export default function Romantic({
  data,
  preview = false,
}: TemplateProps) {
  const invitation = useMemo(
    () => ({
      ...fallbackData,
      ...data,
    }),
    [data],
  );

  const [language, setLanguage] =
    useState<Language>("uz");

  const [opened, setOpened] =
    useState(preview);

  const [musicPlaying, setMusicPlaying] =
    useState(false);

  const [rsvp, setRsvp] =
    useState<RsvpValue>(null);

  const text =
    translations[language];

  const targetDate = useMemo(
    () =>
      parseInvitationDate(
        invitation.date,
        invitation.time,
      ),
    [
      invitation.date,
      invitation.time,
    ],
  );

  const gallery =
    invitation.gallery?.filter(
      Boolean,
    ) ?? [];

  const primaryImage =
    invitation.coverImage ||
    gallery[0] ||
    fallbackData.coverImage;

  useEffect(() => {
    if (!opened) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [opened]);

  const scrollToSection = (
    id: string,
  ) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  if (!opened) {
    return (
      <div className="romantic-template romantic-locked">
        <OpeningScreen
          data={invitation}
          text={text}
          onOpen={() =>
            setOpened(true)
          }
        />
      </div>
    );
  }

  return (
    <div className="romantic-template romantic-unlocked">
      <div className="romantic-page-noise" />

      <header className="romantic-top-controls">
        <div className="romantic-language-switch">
          {(
            [
              "uz",
              "ru",
              "en",
            ] as Language[]
          ).map((item) => (
            <button
              type="button"
              key={item}
              className={
                language ===
                item
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
          className={`romantic-music-button ${
            musicPlaying
              ? "is-playing"
              : ""
          }`}
          onClick={() =>
            setMusicPlaying(
              (current) =>
                !current,
            )
          }
          aria-label={
            text.music
          }
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="romantic-hero">
          <div className="romantic-hero-photo">
            <img
              src={primaryImage}
              alt={`${invitation.brideName} ${invitation.groomName}`}
            />
          </div>

          <div className="romantic-hero-dark" />

          <div className="romantic-hero-frame" />

          <div className="romantic-hero-content">
            <span className="romantic-kicker">
              {text.weddingDate}
            </span>

            <div className="romantic-hero-monogram">
              <span>
                {invitation.brideName.charAt(
                  0,
                )}
              </span>

              <small>&</small>

              <span>
                {invitation.groomName.charAt(
                  0,
                )}
              </span>
            </div>

            <h1>
              <span>
                {
                  invitation.brideName
                }
              </span>

              <em>&</em>

              <span>
                {
                  invitation.groomName
                }
              </span>
            </h1>

            <div className="romantic-hero-date">
              <span />
              <strong>
                {invitation.date}
              </strong>
              <span />
            </div>

            <button
              type="button"
              className="romantic-hero-scroll"
              onClick={() =>
                scrollToSection(
                  "romantic-intro",
                )
              }
            >
              <span />
              <small>
                ↓
              </small>
            </button>
          </div>

          <div className="romantic-hero-floral floral-top">
            ✿
          </div>

          <div className="romantic-hero-floral floral-bottom">
            ❀
          </div>
        </section>

        {/* INTRO */}
        <section
          id="romantic-intro"
          className="romantic-section romantic-intro-section"
        >
          <div className="romantic-section-small-number">
            01
          </div>

          <span className="romantic-section-kicker">
            {text.introTitle}
          </span>

          <h2>
            {invitation.greeting ||
              "Assalomu alaykum"}
          </h2>

          <div className="romantic-gold-rule">
            <span />
            <b>♡</b>
            <span />
          </div>

          <p className="romantic-intro-text">
            {invitation.intro}
          </p>

          <div className="romantic-intro-signature">
            <span>
              {invitation.brideName}
            </span>

            <b>
              ♥
            </b>

            <span>
              {invitation.groomName}
            </span>
          </div>
        </section>

        {/* FEATURE IMAGE */}
        <section className="romantic-feature-section">
          <div className="romantic-feature-image">
            <img
              src={primaryImage}
              alt=""
            />
          </div>

          <div className="romantic-feature-copy">
            <span>
              LOVE STORY
            </span>

            <h2>
              {invitation.story ||
                "Bir umrga birga"}
            </h2>

            <p>
              {invitation.coupleMessage ||
                "Ikki qalb, bir taqdir va bir umr davom etadigan sevgi hikoyasi."}
            </p>

            <div className="romantic-feature-sign">
              {invitation.brideName}
              {" "}
              <small>&</small>
              {" "}
              {invitation.groomName}
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="romantic-section romantic-countdown-section">
          <div className="romantic-section-small-number">
            02
          </div>

          <span className="romantic-section-kicker">
            {text.countdownLabel}
          </span>

          <h2>
            {invitation.date}
          </h2>

          <div className="romantic-section-rule">
            <span />
            <b>✦</b>
            <span />
          </div>

          <Countdown
            target={targetDate}
            labels={{
              days: text.days,
              hours: text.hours,
              minutes:
                text.minutes,
              seconds:
                text.seconds,
            }}
          />

          <div className="romantic-event-meta">
            <div>
              <span>
                {text.weddingDate}
              </span>

              <strong>
                {invitation.date}
              </strong>
            </div>

            <div>
              <span>
                {text.time}
              </span>

              <strong>
                {invitation.time}
              </strong>
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section className="romantic-section romantic-program-section">
          <div className="romantic-section-small-number">
            03
          </div>

          <span className="romantic-section-kicker">
            {text.schedule}
          </span>

          <div className="romantic-program">
            <div className="romantic-program-line" />

            <div className="romantic-program-item">
              <div className="romantic-program-time">
                16:00
              </div>

              <div className="romantic-program-dot">
                <span />
              </div>

              <div>
                <strong>
                  {text.welcome}
                </strong>

                <span>
                  Mehmonlarni qarshi
                  olish
                </span>
              </div>
            </div>

            <div className="romantic-program-item">
              <div className="romantic-program-time">
                17:00
              </div>

              <div className="romantic-program-dot">
                <span />
              </div>

              <div>
                <strong>
                  {text.ceremony}
                </strong>

                <span>
                  Nikoh marosimi
                </span>
              </div>
            </div>

            <div className="romantic-program-item">
              <div className="romantic-program-time">
                18:00
              </div>

              <div className="romantic-program-dot">
                <span />
              </div>

              <div>
                <strong>
                  {text.cocktail}
                </strong>

                <span>
                  Kokteyl va raqslar
                </span>
              </div>
            </div>

            <div className="romantic-program-item">
              <div className="romantic-program-time">
                20:00
              </div>

              <div className="romantic-program-dot">
                <span />
              </div>

              <div>
                <strong>
                  {text.dinner}
                </strong>

                <span>
                  Kechki ovqat
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="romantic-location-section">
          <div className="romantic-location-image">
            <img
              src={primaryImage}
              alt=""
            />

            <div />
          </div>

          <div className="romantic-location-card">
            <span className="romantic-section-small-number">
              04
            </span>

            <span className="romantic-section-kicker">
              {text.location}
            </span>

            <div className="romantic-location-pin">
              <svg
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <path d="M32 57s17-18.5 17-31A17 17 0 1 0 15 26c0 12.5 17 31 17 31Z" />

                <circle
                  cx="32"
                  cy="25"
                  r="5"
                />
              </svg>
            </div>

            <h2>
              {invitation.venue}
            </h2>

            <p>
              {invitation.address}
            </p>

            <div className="romantic-location-rule">
              <span />
              <b>♡</b>
              <span />
            </div>

            <a
              href={
                invitation.googleMapsUrl ||
                "https://maps.google.com"
              }
              target="_blank"
              rel="noreferrer"
              className="romantic-map-link"
            >
              <span>
                {text.map}
              </span>

              <b>
                ↗
              </b>
            </a>
          </div>
        </section>

        {/* DRESS CODE / DETAILS */}
        <section className="romantic-section romantic-details-section">
          <div className="romantic-details-block">
            <div className="romantic-section-small-number">
              05
            </div>

            <span className="romantic-section-kicker">
              {text.dressCode}
            </span>

            <h2>
              Dress Code
            </h2>

            <div className="romantic-dress-grid">
              <div>
                <span>
                  {text.men}
                </span>

                <strong>
                  Classic suit
                </strong>

                <p>
                  Klassik kostyum va
                  to‘y tuflisi afzal.
                </p>
              </div>

              <div>
                <span>
                  {text.women}
                </span>

                <strong>
                  Elegant dress
                </strong>

                <p>
                  Nafis va rasmiy
                  ko‘ylaklar tavsiya
                  etiladi.
                </p>
              </div>
            </div>
          </div>

          <div className="romantic-details-block">
            <div className="romantic-section-small-number">
              06
            </div>

            <span className="romantic-section-kicker">
              {text.details}
            </span>

            <h2>
              {text.closing}
            </h2>

            <p className="romantic-details-text">
              {text.detailsText}
            </p>

            <div className="romantic-details-hearts">
              <span>♡</span>
              <span>♡</span>
              <span>♡</span>
            </div>
          </div>
        </section>

        {/* POEM */}
        <section className="romantic-poem-section">
          <div className="romantic-poem-flower poem-left">
            ❀
          </div>

          <div className="romantic-poem-flower poem-right">
            ✿
          </div>

          <div className="romantic-poem-content">
            <div className="romantic-section-small-number">
              07
            </div>

            <span className="romantic-section-kicker">
              {text.poem}
            </span>

            <div className="romantic-poem-heart">
              ♥
            </div>

            <div className="romantic-poem-lines">
              {text.poemLines.map(
                (line) => (
                  <p key={line}>
                    {line}
                  </p>
                ),
              )}
            </div>

            <div className="romantic-poem-signature">
              {invitation.brideName}
              {" "}
              <span>&</span>
              {" "}
              {invitation.groomName}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="romantic-section romantic-gallery-section">
            <div className="romantic-section-small-number">
              08
            </div>

            <span className="romantic-section-kicker">
              {text.gallery}
            </span>

            <h2>
              Memories
            </h2>

            <div className="romantic-gallery">
              {gallery
                .slice(0, 6)
                .map(
                  (
                    image,
                    index,
                  ) => (
                    <figure
                      key={`${image}-${index}`}
                      className={`romantic-gallery-item ${
                        index === 0
                          ? "is-large"
                          : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Memory ${
                          index + 1
                        }`}
                      />

                      <figcaption>
                        0
                        {index +
                          1}
                      </figcaption>
                    </figure>
                  ),
                )}
            </div>
          </section>
        )}

        {/* RSVP */}
        {invitation.rsvpEnabled !==
          false && (
          <section className="romantic-rsvp-section">
            <div className="romantic-rsvp-card">
              <div className="romantic-section-small-number">
                09
              </div>

              <div className="romantic-rsvp-heart">
                ♥
              </div>

              <span className="romantic-section-kicker">
                RSVP
              </span>

              <h2>
                {text.rsvpTitle}
              </h2>

              <p>
                {text.rsvpText}
              </p>

              <div className="romantic-rsvp-buttons">
                <button
                  type="button"
                  className={
                    rsvp ===
                    "yes"
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setRsvp(
                      "yes",
                    )
                  }
                >
                  <span>
                    ✓
                  </span>

                  {text.yes}
                </button>

                <button
                  type="button"
                  className={
                    rsvp ===
                    "no"
                      ? "is-active is-negative"
                      : ""
                  }
                  onClick={() =>
                    setRsvp(
                      "no",
                    )
                  }
                >
                  <span>
                    ×
                  </span>

                  {text.no}
                </button>
              </div>

              {rsvp && (
                <div className="romantic-rsvp-response">
                  ✓{" "}
                  {text.confirmed}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="romantic-footer">
        <div className="romantic-footer-flower">
          ❀
        </div>

        <div className="romantic-footer-monogram">
          <span>
            {invitation.brideName.charAt(
              0,
            )}
          </span>

          <small>&</small>

          <span>
            {invitation.groomName.charAt(
              0,
            )}
          </span>
        </div>

        <h2>
          {invitation.brideName}

          <span>&</span>

          {invitation.groomName}
        </h2>

        <p>
          {text.closing}
        </p>

        <div className="romantic-footer-rule">
          <span />
          <b>♡</b>
          <span />
        </div>

        <small>
          Momento
        </small>
      </footer>
    </div>
  );
}