import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icon";
import LanguageSwitcher, {
  type Language,
} from "../components/LanguageSwitcher";

import "./Dashboard.css";

type InvitationStatus =
  | "draft"
  | "paid"
  | "published";

type Invitation = {
  id: string;
  couple: string;
  date: string;
  template: string;
  status: InvitationStatus;
  views: number;
  accent: string;
};

const initialInvitations: Invitation[] = [
  {
    id: "INV-001",
    couple: "Ali & Valiya",
    date: "25 Nov 2026",
    template: "Elegant",
    status: "published",
    views: 284,
    accent: "dashboard-preview-elegant",
  },
  {
    id: "INV-002",
    couple: "Javohir & Muslima",
    date: "11 Sep 2026",
    template: "Romantic",
    status: "paid",
    views: 96,
    accent: "dashboard-preview-romantic",
  },
  {
    id: "INV-003",
    couple: "Sardor & Madina",
    date: "08 Dec 2026",
    template: "Minimal",
    status: "draft",
    views: 0,
    accent: "dashboard-preview-minimal",
  },
];

const translations = {
  uz: {
    dashboard: "Kabinet",
    invitations: "Taklifnomalar",
    templates: "Namunalar",
    pricing: "Narxlar",
    settings: "Sozlamalar",
    greeting: "Xush kelibsiz",
    subtitle:
      "Taklifnomalaringizni shu yerdan boshqaring.",

    newInvitation: "Yangi taklifnoma",

    total: "Jami taklifnomalar",
    active: "Faol",
    views: "Ko‘rishlar",
    spent: "Xarajat",

    recent: "So‘nggi taklifnomalar",
    recentText:
      "Sizning taklifnomalaringiz va ularning holati.",

    search: "Taklifnomani qidiring...",

    all: "Barchasi",
    draft: "Qoralama",
    paid: "To‘langan",
    published: "E’lon qilingan",

    preview: "Ko‘rish",
    edit: "Tahrirlash",
    share: "Ulashish",
    delete: "O‘chirish",

    quick: "Tezkor amallar",
    chooseTemplate: "Maket tanlash",
    chooseText:
      "10+ dizayn orasidan o‘zingizga mosini tanlang.",
    create: "Taklifnoma yaratish",
    createText:
      "Yangi taklifnomani boshlang.",
    pricing: "Narxlar",
    pricingText:
      "Bitta taklifnoma 150 000 so‘m.",

    paidMessage:
      "To‘lov tasdiqlangach editor ochiladi.",
    empty: "Taklifnoma topilmadi",

    profile: "Foydalanuvchi",
    email: "user@example.com",
  },

  ru: {
    dashboard: "Кабинет",
    invitations: "Приглашения",
    templates: "Шаблоны",
    pricing: "Цены",
    settings: "Настройки",
    greeting: "Добро пожаловать",
    subtitle:
      "Управляйте своими приглашениями здесь.",

    newInvitation: "Новое приглашение",

    total: "Всего приглашений",
    active: "Активные",
    views: "Просмотры",
    spent: "Расход",

    recent: "Последние приглашения",
    recentText:
      "Ваши приглашения и их текущий статус.",

    search: "Поиск приглашения...",

    all: "Все",
    draft: "Черновик",
    paid: "Оплачено",
    published: "Опубликовано",

    preview: "Просмотр",
    edit: "Редактировать",
    share: "Поделиться",
    delete: "Удалить",

    quick: "Быстрые действия",
    chooseTemplate: "Выбрать шаблон",
    chooseText:
      "Выберите свой дизайн из 10+ вариантов.",
    create: "Создать приглашение",
    createText:
      "Начните новое приглашение.",
    pricing: "Цены",
    pricingText:
      "Одно приглашение — 150 000 сум.",

    paidMessage:
      "После подтверждения оплаты редактор откроется.",
    empty: "Приглашения не найдены",

    profile: "Пользователь",
    email: "user@example.com",
  },

  en: {
    dashboard: "Dashboard",
    invitations: "Invitations",
    templates: "Templates",
    pricing: "Pricing",
    settings: "Settings",
    greeting: "Welcome back",
    subtitle:
      "Manage your invitations from one place.",

    newInvitation: "New invitation",

    total: "Total invitations",
    active: "Active",
    views: "Views",
    spent: "Spent",

    recent: "Recent invitations",
    recentText:
      "Your invitations and their current status.",

    search: "Search invitations...",

    all: "All",
    draft: "Draft",
    paid: "Paid",
    published: "Published",

    preview: "Preview",
    edit: "Edit",
    share: "Share",
    delete: "Delete",

    quick: "Quick actions",
    chooseTemplate: "Choose a template",
    chooseText:
      "Choose from 10+ designs.",
    create: "Create invitation",
    createText:
      "Start a new invitation.",
    pricing: "Pricing",
    pricingText:
      "One invitation costs 150,000 UZS.",

    paidMessage:
      "The editor opens after payment confirmation.",
    empty: "No invitations found",

    profile: "User",
    email: "user@example.com",
  },
};

export default function Dashboard() {
  const [language, setLanguage] =
    useState<Language>("uz");

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    InvitationStatus | "all"
  >("all");

  const [invitations, setInvitations] =
    useState<Invitation[]>(
      initialInvitations,
    );

  const t = translations[language];

  const filtered = useMemo(() => {
    return invitations.filter((item) => {
      const matchSearch =
        item.couple
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.template
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all" ||
        item.status === status;

      return matchSearch && matchStatus;
    });
  }, [invitations, search, status]);

  const active = invitations.filter(
    (item) =>
      item.status === "paid" ||
      item.status === "published",
  ).length;

  const views = invitations.reduce(
    (sum, item) => sum + item.views,
    0,
  );

  const spent =
    active * 150000;

  const createDraft = () => {
    const newItem: Invitation = {
      id: `INV-${String(
        invitations.length + 1,
      ).padStart(3, "0")}`,
      couple: "Ali & Valiya",
      date: "25 Nov 2026",
      template: "Elegant",
      status: "draft",
      views: 0,
      accent:
        "dashboard-preview-elegant",
    };

    setInvitations((current) => [
      newItem,
      ...current,
    ]);
  };

  const removeInvitation = (id: string) => {
    setInvitations((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const shareInvitation = async (
    invitation: Invitation,
  ) => {
    const url =
      `${window.location.origin}/invitation/${invitation.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: invitation.couple,
          url,
        });
      } else {
        await navigator.clipboard.writeText(
          url,
        );
      }
    } catch {
      // Share dialog cancelled.
    }
  };

  const statusLabel = (
    value: InvitationStatus,
  ) => {
    if (value === "draft") return t.draft;
    if (value === "paid") return t.paid;
    return t.published;
  };

  return (
    <div className="dashboard-page">
      <aside
        className={`dashboard-sidebar ${
          mobileOpen ? "open" : ""
        }`}
      >
        <div className="dashboard-sidebar-top">
          <Link
            to="/"
            className="dashboard-logo"
          >
            momento
          </Link>

          <button
            type="button"
            className="dashboard-sidebar-close"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Icon
              name="close"
              size={18}
            />
          </button>
        </div>

        <div className="dashboard-profile">
          <div className="dashboard-avatar">
            U
          </div>

          <div>
            <strong>{t.profile}</strong>
            <span>{t.email}</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          <Link
            to="/dashboard"
            className="active"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Icon
              name="layers"
              size={18}
            />
            {t.dashboard}
          </Link>

          <Link
            to="/templates"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Icon
              name="heart"
              size={18}
            />
            {t.templates}
          </Link>

          <Link
            to="/pricing"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Icon
              name="credit-card"
              size={18}
            />
            {t.pricing}
          </Link>

          <Link
            to="/dashboard"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <Icon
              name="edit"
              size={18}
            />
            {t.invitations}
          </Link>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <Link to="/dashboard">
            <Icon
              name="settings"
              size={18}
            />
            {t.settings}
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="dashboard-overlay"
          onClick={() =>
            setMobileOpen(false)
          }
          aria-label="Close menu"
        />
      )}

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-top-left">
            <button
              type="button"
              className="dashboard-mobile-menu"
              onClick={() =>
                setMobileOpen(true)
              }
            >
              <Icon
                name="menu"
                size={19}
              />
            </button>

            <div>
              <span>
                MOMENTO / DASHBOARD
              </span>
              <h1>{t.dashboard}</h1>
            </div>
          </div>

          <div className="dashboard-top-actions">
            <LanguageSwitcher
              value={language}
              onChange={setLanguage}
            />

            <div className="dashboard-avatar top">
              U
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <div className="dashboard-label">
                <span />
                {t.greeting}
              </div>

              <h2>
                {t.greeting}, {t.profile}
              </h2>

              <p>{t.subtitle}</p>
            </div>

            <button
              type="button"
              className="dashboard-create-button"
              onClick={createDraft}
            >
              <Icon
                name="plus"
                size={16}
              />
              {t.newInvitation}
            </button>
          </section>

          <section className="dashboard-stats">
            <article>
              <div>
                <Icon
                  name="layers"
                  size={17}
                />
              </div>

              <span>{t.total}</span>
              <strong>
                {invitations.length}
              </strong>
            </article>

            <article>
              <div>
                <Icon
                  name="check"
                  size={17}
                />
              </div>

              <span>{t.active}</span>
              <strong>{active}</strong>
            </article>

            <article>
              <div>
                <Icon
                  name="eye"
                  size={17}
                />
              </div>

              <span>{t.views}</span>
              <strong>{views}</strong>
            </article>

            <article>
              <div>
                <Icon
                  name="credit-card"
                  size={17}
                />
              </div>

              <span>{t.spent}</span>
              <strong>
                {spent.toLocaleString(
                  "uz-UZ",
                )}
              </strong>
            </article>
          </section>

          <section className="dashboard-list-section">
            <div className="dashboard-heading">
              <div>
                <h2>{t.recent}</h2>
                <p>{t.recentText}</p>
              </div>

              <Link
                to="/templates"
                className="dashboard-link"
              >
                {t.templates}
                <Icon
                  name="arrow-right"
                  size={14}
                />
              </Link>
            </div>

            <div className="dashboard-toolbar">
              <div className="dashboard-search">
                <Icon
                  name="search"
                  size={16}
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder={t.search}
                />
              </div>

              <div className="dashboard-filters">
                {(
                  [
                    ["all", t.all],
                    ["draft", t.draft],
                    ["paid", t.paid],
                    [
                      "published",
                      t.published,
                    ],
                  ] as const
                ).map(
                  ([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      className={
                        status === value
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setStatus(value)
                      }
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="dashboard-empty">
                <Icon
                  name="heart"
                  size={26}
                />

                <h3>{t.empty}</h3>

                <p>{t.recentText}</p>
              </div>
            ) : (
              <div className="dashboard-list">
                {filtered.map((item) => (
                  <article
                    className="dashboard-item"
                    key={item.id}
                  >
                    <div
                      className={`dashboard-preview ${item.accent}`}
                    >
                      <span>MOMENTO</span>

                      <strong>
                        {item.couple}
                      </strong>

                      <small>
                        {item.date}
                      </small>
                    </div>

                    <div className="dashboard-item-main">
                      <div className="dashboard-item-title">
                        <div>
                          <h3>
                            {item.couple}
                          </h3>

                          <p>
                            {item.template} ·{" "}
                            {item.date}
                          </p>
                        </div>

                        <span
                          className={`dashboard-status ${item.status}`}
                        >
                          {statusLabel(
                            item.status,
                          )}
                        </span>
                      </div>

                      <div className="dashboard-item-meta">
                        <span>
                          <Icon
                            name="eye"
                            size={13}
                          />
                          {item.views}
                        </span>

                        {item.status ===
                          "paid" && (
                          <span>
                            {t.paidMessage}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="dashboard-item-actions">
                      <Link
                        to={`/invitation/${item.id}`}
                        title={t.preview}
                      >
                        <Icon
                          name="eye"
                          size={15}
                        />
                      </Link>

                      {item.status !==
                        "draft" && (
                        <Link
                          to={`/editor/${item.id}`}
                          title={t.edit}
                        >
                          <Icon
                            name="edit"
                            size={15}
                          />
                        </Link>
                      )}

                      <button
                        type="button"
                        title={t.share}
                        onClick={() =>
                          shareInvitation(
                            item,
                          )
                        }
                      >
                        <Icon
                          name="share"
                          size={15}
                        />
                      </button>

                      <button
                        type="button"
                        title={t.delete}
                        onClick={() =>
                          removeInvitation(
                            item.id,
                          )
                        }
                      >
                        <Icon
                          name="trash"
                          size={15}
                        />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="dashboard-quick">
            <div className="dashboard-heading">
              <div>
                <h2>{t.quick}</h2>
              </div>
            </div>

            <div className="dashboard-quick-grid">
              <Link
                to="/templates"
                className="dashboard-quick-card"
              >
                <span>01</span>

                <div>
                  <Icon
                    name="layers"
                    size={20}
                  />
                </div>

                <h3>
                  {t.chooseTemplate}
                </h3>

                <p>
                  {t.chooseText}
                </p>

                <Icon
                  name="arrow-right"
                  size={15}
                />
              </Link>

              <button
                type="button"
                className="dashboard-quick-card"
                onClick={createDraft}
              >
                <span>02</span>

                <div>
                  <Icon
                    name="plus"
                    size={20}
                  />
                </div>

                <h3>{t.create}</h3>

                <p>{t.createText}</p>

                <Icon
                  name="arrow-right"
                  size={15}
                />
              </button>

              <Link
                to="/pricing"
                className="dashboard-quick-card"
              >
                <span>03</span>

                <div>
                  <Icon
                    name="credit-card"
                    size={20}
                  />
                </div>

                <h3>{t.pricing}</h3>

                <p>{t.pricingText}</p>

                <Icon
                  name="arrow-right"
                  size={15}
                />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}