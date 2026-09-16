import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Malika",
  groomName: "Sardor",
  date: "18 October 2026",
  time: "17:00",
  venue: "Garden Hall",
  address: "Toshkent",
};

export default function Floral({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template floral-template">
      <section className="floral-hero">
        <div className="floral-leaf leaf-one" />
        <div className="floral-leaf leaf-two" />
        <div className="floral-leaf leaf-three" />

        <div className="floral-top">
          <span>05</span>
          <span>MOMENTO</span>
        </div>

        <div className="floral-center">
          <small>
            WITH LOVE
          </small>

          <h1 className="template-display">
            {invitation.groomName}
            <i>&</i>
            {invitation.brideName}
          </h1>

          <div className="floral-date">
            {invitation.date}
          </div>
        </div>
      </section>

      <section className="template-section floral-intro">
        <div className="template-page template-center">
          <span className="template-eyebrow">
            A LITTLE LOVE STORY
          </span>

          <h2 className="template-display">
            Grow together.
          </h2>

          <p>
            Bizning hikoyamizning keyingi
            bobini siz bilan birga
            nishonlashni istaymiz.
          </p>
        </div>
      </section>

      <section className="floral-details">
        <div className="template-page">
          <article>
            <Icon
              name="calendar"
              size={20}
            />

            <span>DATE</span>

            <strong>
              {invitation.date}
            </strong>
          </article>

          <article>
            <Icon name="clock" size={20} />

            <span>TIME</span>

            <strong>
              {invitation.time}
            </strong>
          </article>

          <article>
            <Icon
              name="location"
              size={20}
            />

            <span>VENUE</span>

            <strong>
              {invitation.venue}
            </strong>
          </article>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="floral-gallery">
            <div className="floral-photo large">
              <span>01</span>
            </div>

            <div className="floral-photo small">
              <span>02</span>
            </div>

            <div className="floral-photo small">
              <span>03</span>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section floral-location">
        <div className="template-page">
          <div className="template-map">
            <div className="template-map-inner">
              <Icon
                name="location"
                size={23}
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
          <div className="template-rsvp floral-rsvp">
            <span>RSVP</span>

            <h2 className="template-display">
              Bloom with us.
            </h2>

            <p>
              Ushbu maxsus kunni siz bilan
              birga nishonlashni kutamiz.
            </p>

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
          LOVE · GROW · FOREVER
        </small>
      </footer>
    </div>
  );
}