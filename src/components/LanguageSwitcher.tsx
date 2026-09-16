import { useState } from "react";
import Icon from "./Icon";

export type Language = "uz" | "ru" | "en";

type LanguageSwitcherProps = {
  value: Language;
  onChange: (language: Language) => void;
  mobile?: boolean;
};

const languageOptions: {
  value: Language;
  label: string;
}[] = [
  {
    value: "uz",
    label: "O‘zbek",
  },
  {
    value: "ru",
    label: "Русский",
  },
  {
    value: "en",
    label: "English",
  },
];

export default function LanguageSwitcher({
  value,
  onChange,
  mobile = false,
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`language-switcher ${
        mobile ? "language-switcher-mobile" : ""
      }`}
    >
      <button
        type="button"
        className="language-switcher-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span>{value.toUpperCase()}</span>

        <Icon
          name={open ? "chevron-up" : "chevron-down"}
          size={13}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="language-switcher-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Close language menu"
          />

          <div
            className="language-switcher-menu"
            role="menu"
          >
            {languageOptions.map((option) => {
              const active =
                option.value === value;

              return (
                <button
                  type="button"
                  role="menuitem"
                  key={option.value}
                  className={
                    active
                      ? "language-option active"
                      : "language-option"
                  }
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>

                  {active && (
                    <Icon
                      name="check"
                      size={14}
                      strokeWidth={1.7}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}