import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Valiya",
  groomName: "Ali",
  date: "25.11.2026",
  time: "18:00",
  venue: "Sapphire Palace",
  address: "Toshkent",
};

export default function Minimal({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template minimal-template">
      <section className="minimal-hero">
        <div className="minimal-grid-bg" />

        <div className="minimal-nav">
          <span>MOMENTO</span>
          <span>03</span>
        </div>

        <div className="minimal-content">
          <small>THE WEDDING</small>

          <h1>
            {invitation.groomName}
            <span>&</span>
            {invitation.brideName}
          </h1>

          <div className="minimal-date">
            {invitation.date}
          </div>
        </div>

        <div className="minimal-scroll">
          <span>SCROLL</span>
        </div>
      </section>

      <section className="minimal-intro">
        <div className="template-page">
          <span className="template-eyebrow">
            A NEW CHAPTER
          </span>

          <h2 className="template-display">
            Less decoration.
            <br />
            More meaning.
          </h2>
        </div>
      </section>

      <section className="minimal-details">
        <div className="template-page">
          <div className="minimal-detail-grid">
            <article>
              <small>DATE</small>
              <strong>
                {invitation.date}
              </strong>
              <Icon name="calendar" size={17} />
            </article>

            <article>
              <small>TIME</small>
              <strong>
                {invitation.time}
              </strong>
              <Icon name="clock" size={17} />
            </article>

            <article>
              <small>LOCATION</small>
              <strong>
                {invitation.venue}
              </strong>
              <Icon name="location" size={17} />
            </article>
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="minimal-editorial-photo">
            <span>
              {invitation.groomName}{" "}
              &{" "}
              {invitation.brideName}
            </span>
          </div>
        </div>
      </section>

      <section className="minimal-statement">
        <div className="template-page">
          <span>25 / 11 / 2026</span>

          <h2 className="template-display">
            One day.
            <br />
            One story.
            <br />
            Forever.
          </h2>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-map">
            <div className="template-map-inner">
              <Icon name="location" size={22} />
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
          <div className="template-rsvp minimal-rsvp">
            <span className="template-eyebrow">
              RSVP
            </span>

            <h2 className="template-display">
              See you there.
            </h2>

            <button type="button">
              CONFIRM
            </button>
          </div>
        </div>
      </section>

      <footer className="template-footer">
        <div className="template-footer-logo">
          momento
        </div>
        <small>
          {invitation.date}
        </small>
      </footer>
    </div>
  );
}