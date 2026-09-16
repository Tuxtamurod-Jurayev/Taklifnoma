import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Dilnoza",
  groomName: "Aziz",
  date: "14 October 2026",
  time: "19:00",
  venue: "Samarkand Grand",
  address: "Samarqand shahri",
};

export default function Oriental({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template oriental-template">
      <section className="oriental-hero">
        <div className="oriental-pattern" />

        <div className="oriental-top">
          <span>08</span>
          <span>MOMENTO</span>
        </div>

        <div className="oriental-center">
          <small>
            BISMILLAH
          </small>

          <div className="oriental-mark">
            {invitation.groomName.charAt(0)}
            <span>&</span>
            {invitation.brideName.charAt(0)}
          </div>

          <h1 className="template-display">
            {invitation.groomName}
            <i>&</i>
            {invitation.brideName}
          </h1>

          <strong>
            {invitation.date}
          </strong>
        </div>
      </section>

      <section className="template-section oriental-intro">
        <div className="template-page template-center">
          <span className="template-eyebrow">
            BIZNING QUvonchimiz
          </span>

          <h2 className="template-display">
            Sevgi, oilalar
            <br />
            va yangi yo‘l.
          </h2>

          <p>
            Ushbu muborak kunimizda sizni
            aziz mehmonimiz sifatida kutamiz.
          </p>
        </div>
      </section>

      <section className="oriental-details">
        <div className="template-page">
          <article>
            <Icon
              name="calendar"
              size={19}
            />
            <span>SANA</span>
            <strong>{invitation.date}</strong>
          </article>

          <article>
            <Icon name="clock" size={19} />
            <span>VAQT</span>
            <strong>{invitation.time}</strong>
          </article>

          <article>
            <Icon
              name="location"
              size={19}
            />
            <span>MANZIL</span>
            <strong>{invitation.venue}</strong>
          </article>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="oriental-photo">
            <div className="oriental-photo-frame">
              <span>
                LOVE
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section oriental-story">
        <div className="template-page">
          <div className="oriental-story-grid">
            <div>
              <span>01</span>
              <h3 className="template-display">
                Birinchi uchrashuv.
              </h3>
            </div>

            <div>
              <span>02</span>
              <h3 className="template-display">
                Birinchi orzu.
              </h3>
            </div>

            <div>
              <span>03</span>
              <h3 className="template-display">
                Birgalikdagi hayot.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section">
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
          <div className="template-rsvp oriental-rsvp">
            <span>MEHMONLAR</span>

            <h2 className="template-display">
              Sizni kutamiz.
            </h2>

            <button type="button">
              TASDIQLASH
            </button>
          </div>
        </div>
      </section>

      <footer className="template-footer">
        <div className="template-footer-logo">
          momento
        </div>

        <small>
          BISMILLAH · 2026
        </small>
      </footer>
    </div>
  );
}