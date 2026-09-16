import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Madina",
  groomName: "Aziz",
  date: "20.09.2026",
  time: "17:30",
  venue: "Mono Hall",
  address: "Tashkent",
};

export default function Modern({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template modern-template">
      <section className="modern-hero">
        <div className="modern-number">
          09
        </div>

        <div className="modern-header">
          <span>MOMENTO</span>
          <span>WEDDING / 2026</span>
        </div>

        <div className="modern-title">
          <span>THE</span>
          <h1>
            {invitation.groomName}
            <i>&</i>
            {invitation.brideName}
          </h1>
          <strong>WEDDING</strong>
        </div>

        <div className="modern-hero-date">
          {invitation.date}
        </div>
      </section>

      <section className="modern-intro">
        <div className="template-page">
          <div className="modern-intro-grid">
            <span>09 — 2026</span>

            <div>
              <h2 className="template-display">
                Designed for
                <br />
                the moment.
              </h2>

              <p>
                Minimal shakl, aniq tipografika
                va shaxsiy hikoya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-information">
        <div className="template-page">
          <article>
            <span>01</span>
            <Icon
              name="calendar"
              size={19}
            />
            <strong>
              {invitation.date}
            </strong>
          </article>

          <article>
            <span>02</span>
            <Icon name="clock" size={19} />
            <strong>
              {invitation.time}
            </strong>
          </article>

          <article>
            <span>03</span>
            <Icon
              name="location"
              size={19}
            />
            <strong>
              {invitation.venue}
            </strong>
          </article>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="modern-photo">
            <span>ARCHIVE / 001</span>

            <div>
              <strong>
                {invitation.groomName}
                <i>&</i>
                {invitation.brideName}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-statement">
        <div className="template-page">
          <span>THE MOMENT</span>

          <h2 className="template-display">
            Love,
            <br />
            but make it
            <br />
            timeless.
          </h2>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="modern-map">
            <div>
              <Icon
                name="location"
                size={21}
              />

              <span>
                {invitation.venue}
              </span>

              <small>
                {invitation.address}
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-rsvp modern-rsvp">
            <span>RSVP / 09</span>

            <h2 className="template-display">
              Be there.
            </h2>

            <button type="button">
              CONFIRM
            </button>
          </div>
        </div>
      </section>

      <footer className="template-footer">
        <div className="template-footer-logo">
          MOMENTO
        </div>

        <small>
          DESIGNED FOR YOUR MOMENT
        </small>
      </footer>
    </div>
  );
}