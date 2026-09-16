import { Link } from "react-router-dom";
import Icon from "./Icon";
import LanguageSwitcher, {
  type Language,
} from "./LanguageSwitcher";
import "./Header.css";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;

  labels: {
    home: string;
    templates: string;
    pricing: string;
    create: string;
  };

  active?: "home" | "templates" | "pricing";
};

export default function Header({
  language,
  onLanguageChange,
  labels,
  active = "home",
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          momento
        </Link>

        <nav className="site-desktop-navigation">
          <Link
            to="/"
            className={
              active === "home"
                ? "site-nav-link active"
                : "site-nav-link"
            }
          >
            {labels.home}
          </Link>

          <Link
            to="/templates"
            className={
              active === "templates"
                ? "site-nav-link active"
                : "site-nav-link"
            }
          >
            {labels.templates}
          </Link>

          <Link
            to="/pricing"
            className={
              active === "pricing"
                ? "site-nav-link active"
                : "site-nav-link"
            }
          >
            {labels.pricing}
          </Link>

          <LanguageSwitcher
            value={language}
            onChange={onLanguageChange}
          />

          <Link
            to="/templates"
            className="site-create-button"
          >
            <span>{labels.create}</span>
            <Icon
              name="arrow-right"
              size={15}
              strokeWidth={1.7}
            />
          </Link>
        </nav>

        <div className="site-mobile-controls">
          <LanguageSwitcher
            value={language}
            onChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}