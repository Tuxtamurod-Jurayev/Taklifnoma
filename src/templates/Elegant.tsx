import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";
import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Valiya",
  groomName: "Ali",
  date: "25 Noyabr 2026",
  time: "18:00",
  venue: "Sapphire Palace",
  address: "Toshkent shahri",
  intro:
    "Sizni hayotimizdagi eng muhim kunning guvohi bo‘lishga taklif qilamiz.",
};

export default function Elegant({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template elegant-template">
      <section className="elegant-cover">
        <div className="elegant-top">
          <span>INVITATION</span>
          <span>01 / MOMENTO</span>
        </div>

        <div className="elegant-center">
          <span className="elegant-small">
            THE WEDDING OF
          </span>

          <h1 className="template-display">
            {invitation.groomName}
            <i>&</i>
            {invitation.brideName}
          </h1>

          <div className="template-divider" />

          <strong>{invitation.date}</strong>

          <span>{invitation.venue}</span>
        </div>

        <div className="elegant-bottom">
          <span>SCROLL TO DISCOVER</span>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page template-center">
          <span className="template-eyebrow">
            OUR STORY
          </span>

          <h2 className="elegant-section-title template-display">
            Birgalikdagi yangi sahifa.
          </h2>

          <p className="elegant-text">
            {invitation.intro}
          </p>

          <div className="elegant-line-art">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="elegant-event">
        <div className="template-page">
          <div className="template-info-row">
            <div className="template-info-card">
              <span>Sana</span>
              <strong>{invitation.date}</strong>
              <Icon name="calendar" size={18} />
            </div>

            <div className="template-info-card">
              <span>Vaqt</span>
              <strong>{invitation.time}</strong>
              <Icon name="clock" size={18} />
            </div>
          </div>

          <div className="elegant-venue">
            <span className="template-eyebrow">
              MANZIL
            </span>

            <h2 className="template-display">
              {invitation.venue}
            </h2>

            <p>{invitation.address}</p>

            <Icon name="location" size={20} />
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-photo-placeholder elegant-photo">
            <span>OUR MOMENTS</span>
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-map">
            <div className="template-map-inner">
              <Icon name="location" size={25} />
              <span>{invitation.venue}</span>
              <small>{invitation.address}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-rsvp">
            <span className="template-eyebrow">
              RSVP
            </span>

            <h2 className="template-display">
              Sizni kutamiz.
            </h2>

            <p>
              Tadbirda ishtirokingizni tasdiqlashingizni
              so‘raymiz.
            </p>

            <button type="button">
              ISHTIROKNI TASDIQLASH
            </button>
          </div>
        </div>
      </section>

      <footer className="template-footer">
        <div className="template-footer-logo">
          momento
        </div>

        <small>
          {invitation.groomName} &{" "}
          {invitation.brideName}
        </small>
      </footer>
    </div>
  );
}