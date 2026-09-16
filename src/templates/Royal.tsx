import Icon from "../components/Icon";
import type {
  InvitationData,
  TemplateProps,
} from "./templateTypes";

import "./TemplatesShared.css";

const defaultData: InvitationData = {
  brideName: "Malika",
  groomName: "Javohir",
  date: "05 October 2026",
  time: "18:30",
  venue: "Royal Palace",
  address: "Tashkent, Uzbekistan",
};

export default function Royal({
  data,
}: TemplateProps) {
  const invitation = {
    ...defaultData,
    ...data,
  };

  return (
    <div className="momento-template royal-template">
      <section className="royal-hero">
        <div className="royal-crown">
          ♢
        </div>

        <span className="royal-number">
          10
        </span>

        <div className="royal-content">
          <small>
            THE HONOUR OF YOUR PRESENCE
          </small>

          <h1 className="template-display">
            {invitation.groomName}
            <i>&</i>
            {invitation.brideName}
          </h1>

          <div className="royal-rule">
            <span />
            <Icon
              name="sparkles"
              size={15}
            />
            <span />
          </div>

          <strong>
            {invitation.date}
          </strong>
        </div>
      </section>

      <section className="royal-intro">
        <div className="template-page template-center">
          <span>WELCOME</span>

          <h2 className="template-display">
            A celebration
            <br />
            worthy of the moment.
          </h2>

          <p>
            Oilalarimiz, do‘stlarimiz va
            yaqinlarimiz bilan ushbu
            tantanali kunni nishonlaymiz.
          </p>
        </div>
      </section>

      <section className="royal-details">
        <div className="template-page">
          <div>
            <Icon
              name="calendar"
              size={19}
            />
            <span>DATE</span>
            <strong>{invitation.date}</strong>
          </div>

          <div>
            <Icon name="clock" size={19} />
            <span>TIME</span>
            <strong>{invitation.time}</strong>
          </div>

          <div>
            <Icon
              name="location"
              size={19}
            />
            <span>VENUE</span>
            <strong>{invitation.venue}</strong>
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="royal-gallery">
            <div className="royal-image image-one">
              <span>PORTRAIT I</span>
            </div>

            <div className="royal-image image-two">
              <span>PORTRAIT II</span>
            </div>
          </div>
        </div>
      </section>

      <section className="royal-quote">
        <div className="template-page template-center">
          <Icon
            name="sparkles"
            size={21}
          />

          <h2 className="template-display">
            Together is
            <br />
            our favourite place.
          </h2>
        </div>
      </section>

      <section className="template-section">
        <div className="template-page">
          <div className="template-map royal-map">
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
          <div className="template-rsvp royal-rsvp">
            <span>RSVP</span>

            <h2 className="template-display">
              We await you.
            </h2>

            <p>
              Tashrifingiz biz uchun
              sharafdir.
            </p>

            <button type="button">
              CONFIRM ATTENDANCE
            </button>
          </div>
        </div>
      </section>

      <footer className="template-footer">
        <div className="template-footer-logo">
          MOMENTO
        </div>

        <small>
          WITH HONOUR · 2026
        </small>
      </footer>
    </div>
  );
}