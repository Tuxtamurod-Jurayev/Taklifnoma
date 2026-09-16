import {
  useState,
  type ChangeEvent,
} from "react";

import Icon from "../components/Icon";

import type {
  EditorInvitationData,
  EditorSection,
  EditorSidebarProps,
  EditorTab,
  EditorTheme,
  EditorTypography,
} from "./editorTypes";

import "./EditorSidebar.css";

const sectionItems: {
  id: EditorSection;
  title: string;
  icon:
    | "user"
    | "calendar"
    | "location"
    | "edit"
    | "image"
    | "music"
    | "check";
}[] = [
  {
    id: "couple",
    title: "Juftlik",
    icon: "user",
  },
  {
    id: "date",
    title: "Sana va vaqt",
    icon: "calendar",
  },
  {
    id: "venue",
    title: "O‘tkazilish joyi",
    icon: "location",
  },
  {
    id: "story",
    title: "Hikoya",
    icon: "edit",
  },
  {
    id: "gallery",
    title: "Gallery",
    icon: "image",
  },
  {
    id: "music",
    title: "Musiqa",
    icon: "music",
  },
  {
    id: "rsvp",
    title: "RSVP",
    icon: "check",
  },
];

const tabs: {
  id: EditorTab;
  title: string;
  icon:
    | "edit"
    | "sparkles"
    | "image"
    | "settings";
}[] = [
  {
    id: "content",
    title: "Kontent",
    icon: "edit",
  },
  {
    id: "design",
    title: "Dizayn",
    icon: "sparkles",
  },
  {
    id: "media",
    title: "Media",
    icon: "image",
  },
  {
    id: "settings",
    title: "Sozlamalar",
    icon: "settings",
  },
];

const colorPresets: {
  name: string;
  theme: EditorTheme;
}[] = [
  {
    name: "Classic",
    theme: {
      primaryColor: "#1f1f1f",
      secondaryColor: "#7c776f",
      backgroundColor: "#f7f5f0",
      textColor: "#242320",
      mutedColor: "#87837b",
      accentColor: "#c9a45c",
    },
  },
  {
    name: "Rose",
    theme: {
      primaryColor: "#38282b",
      secondaryColor: "#8d6f74",
      backgroundColor: "#faf3f2",
      textColor: "#332629",
      mutedColor: "#917f82",
      accentColor: "#b98891",
    },
  },
  {
    name: "Emerald",
    theme: {
      primaryColor: "#102f2a",
      secondaryColor: "#5b7871",
      backgroundColor: "#f2f5ef",
      textColor: "#1e302c",
      mutedColor: "#71817d",
      accentColor: "#b99b5f",
    },
  },
  {
    name: "Midnight",
    theme: {
      primaryColor: "#f5efe3",
      secondaryColor: "#a99f8e",
      backgroundColor: "#121210",
      textColor: "#f3efe7",
      mutedColor: "#9c978e",
      accentColor: "#c9a45c",
    },
  },
];

const fontPresets: {
  name: string;
  heading: string;
  body: string;
}[] = [
  {
    name: "Editorial",
    heading: "Playfair Display",
    body: "DM Sans",
  },
  {
    name: "Modern",
    heading: "DM Sans",
    body: "DM Sans",
  },
  {
    name: "Classic",
    heading: "Playfair Display",
    body: "DM Sans",
  },
];

const animationPresets = [
  {
    name: "Fade",
    value: "fade",
  },
  {
    name: "Slide Up",
    value: "slide-up",
  },
  {
    name: "Reveal",
    value: "reveal",
  },
  {
    name: "Scale",
    value: "scale",
  },
] as const;

type FieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (
    value: string,
  ) => void;
};

function InputField({
  label,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <label className="editor-field">
      <span>{label}</span>

      <input
        type="text"
        value={value}
        placeholder={
          placeholder
        }
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <label className="editor-field">
      <span>{label}</span>

      <textarea
        value={value}
        placeholder={
          placeholder
        }
        rows={5}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
      />
    </label>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (
    value: boolean,
  ) => void;
}) {
  return (
    <button
      type="button"
      className={`editor-toggle ${
        checked ? "is-on" : ""
      }`}
      onClick={() =>
        onChange(!checked)
      }
      aria-label="Toggle"
    >
      <span />
    </button>
  );
}

function ContentPanel({
  state,
  onFieldChange,
}: {
  state: EditorSidebarProps["state"];
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  const active =
    state.activeSection;

  if (active === "couple") {
    return (
      <div className="editor-panel">
        <div className="editor-panel-heading">
          <span>01</span>
          <h2>Juftlik</h2>
          <p>
            Taklifnoma uchun asosiy ismlar
            va matnlarni kiriting.
          </p>
        </div>

        <div className="editor-two">
          <InputField
            label="Kuyov ismi"
            value={
              state.data.groomName
            }
            placeholder="Ulug‘bek"
            onChange={(value) =>
              onFieldChange(
                "groomName",
                value,
              )
            }
          />

          <InputField
            label="Kelin ismi"
            value={
              state.data.brideName
            }
            placeholder="Malika"
            onChange={(value) =>
              onFieldChange(
                "brideName",
                value,
              )
            }
          />
        </div>

        <InputField
          label="Salomlashuv"
          value={
            state.data.greeting ??
            ""
          }
          placeholder="Qadrli mehmonlarimiz!"
          onChange={(value) =>
            onFieldChange(
              "greeting",
              value,
            )
          }
        />

        <TextareaField
          label="Asosiy matn"
          value={
            state.data.intro ??
            ""
          }
          placeholder="Sizni to‘yimizga taklif qilamiz..."
          onChange={(value) =>
            onFieldChange(
              "intro",
              value,
            )
          }
        />

        <TextareaField
          label="Qo‘shimcha xabar"
          value={
            state.data.coupleMessage ??
            ""
          }
          placeholder="Sizning tashrifingiz biz uchun qadrli..."
          onChange={(value) =>
            onFieldChange(
              "coupleMessage",
              value,
            )
          }
        />
      </div>
    );
  }

  if (active === "date") {
    return (
      <div className="editor-panel">
        <div className="editor-panel-heading">
          <span>02</span>
          <h2>Sana va vaqt</h2>
          <p>
            Taklifnomadagi sana va
            boshlanish vaqtini belgilang.
          </p>
        </div>

        <div className="editor-two">
          <InputField
            label="Sana"
            value={state.data.date}
            placeholder="09.09.2026"
            onChange={(value) =>
              onFieldChange(
                "date",
                value,
              )
            }
          />

          <InputField
            label="Vaqt"
            value={state.data.time}
            placeholder="18:00"
            onChange={(value) =>
              onFieldChange(
                "time",
                value,
              )
            }
          />
        </div>

        <InputField
          label="Marosim sanasi"
          value={
            state.data.ceremonyDate ??
            state.data.date
          }
          placeholder="09.09.2026"
          onChange={(value) =>
            onFieldChange(
              "ceremonyDate",
              value,
            )
          }
        />

        <InputField
          label="Marosim vaqti"
          value={
            state.data.ceremonyTime ??
            state.data.time
          }
          placeholder="18:00"
          onChange={(value) =>
            onFieldChange(
              "ceremonyTime",
              value,
            )
          }
        />

        <div className="editor-info">
          <Icon
            name="calendar"
            size={16}
          />

          <p>
            Countdown sana va vaqtga
            avtomatik moslashadi.
          </p>
        </div>
      </div>
    );
  }

  if (active === "venue") {
    return (
      <div className="editor-panel">
        <div className="editor-panel-heading">
          <span>03</span>
          <h2>O‘tkazilish joyi</h2>
          <p>
            Mehmonlar boradigan joyni
            kiriting.
          </p>
        </div>

        <InputField
          label="Joy nomi"
          value={
            state.data.venue
          }
          placeholder="Baxtiyor restorani"
          onChange={(value) =>
            onFieldChange(
              "venue",
              value,
            )
          }
        />

        <TextareaField
          label="Manzil"
          value={
            state.data.address
          }
          placeholder="Toshkent viloyati..."
          onChange={(value) =>
            onFieldChange(
              "address",
              value,
            )
          }
        />

        <InputField
          label="Google Maps"
          value={
            state.data
              .googleMapsUrl ??
            ""
          }
          placeholder="https://maps.google.com/..."
          onChange={(value) =>
            onFieldChange(
              "googleMapsUrl",
              value,
            )
          }
        />

        <a
          href={
            state.data.googleMapsUrl ||
            "https://maps.google.com"
          }
          target="_blank"
          rel="noreferrer"
          className="editor-link-box"
        >
          <Icon
            name="location"
            size={17}
          />

          <span>
            Xaritani tekshirish
          </span>

          <Icon
            name="arrow-right"
            size={15}
          />
        </a>
      </div>
    );
  }

  if (active === "story") {
    return (
      <div className="editor-panel">
        <div className="editor-panel-heading">
          <span>04</span>
          <h2>Hikoya</h2>
          <p>
            Sizning hikoyangizni
            mehmonlarga yetkazing.
          </p>
        </div>

        <TextareaField
          label="Hikoya"
          value={
            state.data.story ??
            ""
          }
          placeholder="Bizning hikoyamiz..."
          onChange={(value) =>
            onFieldChange(
              "story",
              value,
            )
          }
        />

        <div className="editor-character">
          <span>
            {(state.data.story ??
              "").length}
          </span>

          / 800
        </div>
      </div>
    );
  }

  if (active === "gallery") {
    return (
      <GalleryPanel
        data={state.data}
        onFieldChange={
          onFieldChange
        }
      />
    );
  }

  if (active === "music") {
    return (
      <MusicPanel
        data={state.data}
        onFieldChange={
          onFieldChange
        }
      />
    );
  }

  return (
    <RsvpPanel
      data={state.data}
      onFieldChange={
        onFieldChange
      }
    />
  );
}

function GalleryPanel({
  data,
  onFieldChange,
}: {
  data: EditorInvitationData;
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  const gallery =
    data.gallery ?? [];

  const [
    newImage,
    setNewImage,
  ] = useState("");

  const addImage = () => {
    const value =
      newImage.trim();

    if (!value) {
      return;
    }

    onFieldChange(
      "gallery",
      [...gallery, value],
    );

    setNewImage("");
  };

  const removeImage = (
    index: number,
  ) => {
    onFieldChange(
      "gallery",
      gallery.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  const updateImage = (
    index: number,
    value: string,
  ) => {
    onFieldChange(
      "gallery",
      gallery.map(
        (image, itemIndex) =>
          itemIndex === index
            ? value
            : image,
      ),
    );
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>05</span>
        <h2>Gallery</h2>
        <p>
          Taklifnomaga rasmlar qo‘shing.
        </p>
      </div>

      <InputField
        label="Cover rasmi"
        value={
          data.coverImage ??
          ""
        }
        placeholder="https://..."
        onChange={(value) =>
          onFieldChange(
            "coverImage",
            value,
          )
        }
      />

      <div className="editor-gallery-list">
        {gallery.map(
          (image, index) => (
            <div
              className="editor-gallery-row"
              key={`${image}-${index}`}
            >
              <div className="editor-gallery-thumb">
                <img
                  src={image}
                  alt={`Gallery ${
                    index + 1
                  }`}
                />
              </div>

              <input
                value={image}
                onChange={(
                  event,
                ) =>
                  updateImage(
                    index,
                    event.target
                      .value,
                  )
                }
                placeholder="Image URL"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(
                    index,
                  )
                }
                aria-label="Delete"
              >
                <Icon
                  name="trash"
                  size={15}
                />
              </button>
            </div>
          ),
        )}
      </div>

      <div className="editor-add-row">
        <input
          value={newImage}
          onChange={(
            event,
          ) =>
            setNewImage(
              event.target.value,
            )
          }
          placeholder="Yangi rasm URL..."
          onKeyDown={(event) => {
            if (
              event.key ===
              "Enter"
            ) {
              event.preventDefault();
              addImage();
            }
          }}
        />

        <button
          type="button"
          onClick={
            addImage
          }
        >
          <Icon
            name="plus"
            size={15}
          />
          Qo‘shish
        </button>
      </div>
    </div>
  );
}

function MusicPanel({
  data,
  onFieldChange,
}: {
  data: EditorInvitationData;
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  const music =
    data.music ?? {
      enabled: false,
      url: "",
      title: "",
      autoplay: false,
      loop: true,
    };

  const updateMusic = <
    K extends keyof typeof music,
  >(
    field: K,
    value: (typeof music)[K],
  ) => {
    onFieldChange(
      "music",
      {
        ...music,
        [field]: value,
      },
    );
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>06</span>
        <h2>Musiqa</h2>
        <p>
          Taklifnomaga fon musiqasi
          qo‘shing.
        </p>
      </div>

      <div className="editor-row">
        <div>
          <strong>
            Musiqani yoqish
          </strong>

          <span>
            Invitationda music
            tugmasi ko‘rinadi.
          </span>
        </div>

        <Toggle
          checked={
            music.enabled
          }
          onChange={(value) =>
            updateMusic(
              "enabled",
              value,
            )
          }
        />
      </div>

      <InputField
        label="Audio URL"
        value={music.url}
        placeholder="https://..."
        onChange={(value) =>
          updateMusic(
            "url",
            value,
          )
        }
      />

      <InputField
        label="Qo‘shiq nomi"
        value={
          music.title ?? ""
        }
        placeholder="Our Wedding Song"
        onChange={(value) =>
          updateMusic(
            "title",
            value,
          )
        }
      />

      <div className="editor-row">
        <div>
          <strong>
            Autoplay
          </strong>

          <span>
            Brauzer ruxsat bersa ishga tushadi.
          </span>
        </div>

        <Toggle
          checked={
            music.autoplay
          }
          onChange={(value) =>
            updateMusic(
              "autoplay",
              value,
            )
          }
        />
      </div>

      <div className="editor-row">
        <div>
          <strong>
            Loop
          </strong>

          <span>
            Musiqa tugagach qaytadan boshlanadi.
          </span>
        </div>

        <Toggle
          checked={
            music.loop
          }
          onChange={(value) =>
            updateMusic(
              "loop",
              value,
            )
          }
        />
      </div>
    </div>
  );
}

function RsvpPanel({
  data,
  onFieldChange,
}: {
  data: EditorInvitationData;
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  const rsvp =
    data.rsvp ?? {
      enabled: true,
      title:
        "Tashrifingizni tasdiqlang",
      description:
        "Sizning tashrifingiz biz uchun juda qadrli.",
      yesLabel:
        "Albatta kelaman",
      noLabel:
        "Kela olmayman",
      buttonLabel:
        "Tasdiqlash",
    };

  const updateRsvp = <
    K extends keyof typeof rsvp,
  >(
    field: K,
    value: (typeof rsvp)[K],
  ) => {
    onFieldChange(
      "rsvp",
      {
        ...rsvp,
        [field]: value,
      },
    );
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>07</span>
        <h2>RSVP</h2>
        <p>
          Mehmonlarning tashrifini
          tasdiqlash imkoniyati.
        </p>
      </div>

      <div className="editor-row">
        <div>
          <strong>
            RSVP ni yoqish
          </strong>

          <span>
            Mehmonlar tashrifini tasdiqlaydi.
          </span>
        </div>

        <Toggle
          checked={
            rsvp.enabled
          }
          onChange={(value) =>
            updateRsvp(
              "enabled",
              value,
            )
          }
        />
      </div>

      <InputField
        label="Sarlavha"
        value={
          rsvp.title ?? ""
        }
        placeholder="Tashrifingizni tasdiqlang"
        onChange={(value) =>
          updateRsvp(
            "title",
            value,
          )
        }
      />

      <TextareaField
        label="Izoh"
        value={
          rsvp.description ??
          ""
        }
        placeholder="Sizning tashrifingiz..."
        onChange={(value) =>
          updateRsvp(
            "description",
            value,
          )
        }
      />

      <InputField
        label="Ha tugmasi"
        value={
          rsvp.yesLabel ?? ""
        }
        placeholder="Albatta kelaman"
        onChange={(value) =>
          updateRsvp(
            "yesLabel",
            value,
          )
        }
      />

      <InputField
        label="Yo‘q tugmasi"
        value={
          rsvp.noLabel ?? ""
        }
        placeholder="Kela olmayman"
        onChange={(value) =>
          updateRsvp(
            "noLabel",
            value,
          )
        }
      />
    </div>
  );
}

function DesignPanel({
  data,
  onFieldChange,
}: {
  data: EditorInvitationData;
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  const theme: EditorTheme =
    data.theme ?? {
      primaryColor: "#1f1f1f",
      secondaryColor: "#7c776f",
      backgroundColor: "#f7f5f0",
      textColor: "#242320",
      mutedColor: "#87837b",
      accentColor: "#c9a45c",
    };

  const typography: EditorTypography =
    data.typography ?? {
      headingFont:
        "Playfair Display",
      bodyFont: "DM Sans",
      accentFont:
        "Playfair Display",
    };

  const animation =
    data.animation ?? {
      enabled: true,
      entrance: "fade",
      duration: 700,
      delay: 0,
    };

  const updateTheme = (
    patch: Partial<EditorTheme>,
  ) => {
    onFieldChange(
      "theme",
      {
        ...theme,
        ...patch,
      },
    );
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>DESIGN</span>
        <h2>Dizayn</h2>
        <p>
          Template ko‘rinishini
          soddalik bilan sozlang.
        </p>
      </div>

      <div className="editor-group">
        <div className="editor-group-title">
          <strong>
            Ranglar
          </strong>

          <span>
            Tayyor palitralardan birini tanlang.
          </span>
        </div>

        <div className="editor-palette-grid">
          {colorPresets.map(
            (preset) => {
              const active =
                theme.accentColor ===
                  preset.theme
                    .accentColor &&
                theme.backgroundColor ===
                  preset.theme
                    .backgroundColor;

              return (
                <button
                  type="button"
                  key={
                    preset.name
                  }
                  className={`editor-palette ${
                    active
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    onFieldChange(
                      "theme",
                      preset.theme,
                    )
                  }
                >
                  <span
                    className="editor-palette-preview"
                    style={{
                      background:
                        preset.theme
                          .backgroundColor,
                    }}
                  >
                    <i
                      style={{
                        background:
                          preset.theme
                            .accentColor,
                      }}
                    />

                    <b
                      style={{
                        background:
                          preset.theme
                            .textColor,
                      }}
                    />
                  </span>

                  <strong>
                    {
                      preset.name
                    }
                  </strong>
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="editor-group">
        <div className="editor-group-title">
          <strong>
            Maxsus ranglar
          </strong>

          <span>
            Ranglarni individual sozlang.
          </span>
        </div>

        <ColorField
          label="Accent"
          value={
            theme.accentColor
          }
          onChange={(value) =>
            updateTheme({
              accentColor:
                value,
            })
          }
        />

        <ColorField
          label="Fon"
          value={
            theme.backgroundColor
          }
          onChange={(value) =>
            updateTheme({
              backgroundColor:
                value,
            })
          }
        />

        <ColorField
          label="Matn"
          value={
            theme.textColor
          }
          onChange={(value) =>
            updateTheme({
              textColor:
                value,
            })
          }
        />
      </div>

      <div className="editor-group">
        <div className="editor-group-title">
          <strong>
            Shrift
          </strong>

          <span>
            Asosiy typography uslubini tanlang.
          </span>
        </div>

        <div className="editor-font-list">
          {fontPresets.map(
            (font) => {
              const active =
                typography.headingFont ===
                font.heading;

              return (
                <button
                  type="button"
                  key={font.name}
                  className={`editor-font ${
                    active
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    onFieldChange(
                      "typography",
                      {
                        ...typography,
                        headingFont:
                          font.heading,
                        bodyFont:
                          font.body,
                        accentFont:
                          font.heading,
                      },
                    )
                  }
                >
                  <span
                    style={{
                      fontFamily:
                        font.heading,
                    }}
                  >
                    Aa
                  </span>

                  <div>
                    <strong>
                      {
                        font.name
                      }
                    </strong>

                    <small>
                      {
                        font.heading
                      }
                    </small>
                  </div>

                  {active && (
                    <Icon
                      name="check"
                      size={15}
                    />
                  )}
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="editor-group">
        <div className="editor-group-title">
          <strong>
            Animatsiya
          </strong>

          <span>
            Sahifa kirish effektini tanlang.
          </span>
        </div>

        <div className="editor-animation-list">
          {animationPresets.map(
            (item) => {
              const active =
                animation.entrance ===
                  item.value &&
                animation.enabled;

              return (
                <button
                  type="button"
                  key={item.value}
                  className={`editor-animation ${
                    active
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    onFieldChange(
                      "animation",
                      {
                        ...animation,
                        enabled:
                          true,
                        entrance:
                          item.value,
                      },
                    )
                  }
                >
                  <span className="editor-animation-preview">
                    <i />
                  </span>

                  <strong>
                    {item.name}
                  </strong>

                  {active && (
                    <Icon
                      name="check"
                      size={15}
                    />
                  )}
                </button>
              );
            },
          )}
        </div>

        <div className="editor-row">
          <div>
            <strong>
              Animatsiyani yoqish
            </strong>

            <span>
              Barcha template effektlarini boshqaradi.
            </span>
          </div>

          <Toggle
            checked={
              animation.enabled
            }
            onChange={(value) =>
              onFieldChange(
                "animation",
                {
                  ...animation,
                  enabled:
                    value,
                },
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
}) {
  return (
    <label className="editor-color-field">
      <span>{label}</span>

      <input
        type="color"
        value={value}
        onChange={(
          event: ChangeEvent<HTMLInputElement>,
        ) =>
          onChange(
            event.target
              .value,
          )
        }
      />

      <code>{value}</code>
    </label>
  );
}

function MediaPanel({
  data,
}: {
  data: EditorInvitationData;
}) {
  const gallery =
    data.gallery ?? [];

  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>MEDIA</span>
        <h2>Media</h2>
        <p>
          Taklifnomada ishlatilayotgan
          media fayllar.
        </p>
      </div>

      <div className="editor-media-box">
        <div className="editor-media-icon">
          <Icon
            name="image"
            size={19}
          />
        </div>

        <div>
          <strong>
            Cover
          </strong>

          <span>
            {data.coverImage
              ? "Rasm mavjud"
              : "Rasm kiritilmagan"}
          </span>
        </div>
      </div>

      {data.coverImage && (
        <div className="editor-media-cover">
          <img
            src={
              data.coverImage
            }
            alt="Cover"
          />
        </div>
      )}

      <div className="editor-media-box">
        <div className="editor-media-icon">
          <Icon
            name="layers"
            size={19}
          />
        </div>

        <div>
          <strong>
            Gallery
          </strong>

          <span>
            {gallery.length} ta rasm
          </span>
        </div>
      </div>

      <div className="editor-media-box">
        <div className="editor-media-icon">
          <Icon
            name="music"
            size={19}
          />
        </div>

        <div>
          <strong>
            Music
          </strong>

          <span>
            {data.music?.enabled
              ? "Faol"
              : "O‘chiq"}
          </span>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({
  data,
  onFieldChange,
}: {
  data: EditorInvitationData;
  onFieldChange:
    EditorSidebarProps["onFieldChange"];
}) {
  return (
    <div className="editor-panel">
      <div className="editor-panel-heading">
        <span>SETTINGS</span>
        <h2>Sozlamalar</h2>
        <p>
          Taklifnomaning umumiy
          sozlamalari.
        </p>
      </div>

      <div className="editor-setting">
        <div>
          <strong>
            Til
          </strong>

          <span>
            Invitation asosiy tili.
          </span>
        </div>

        <select
          value={data.language}
          onChange={(event) =>
            onFieldChange(
              "language",
              event.target
                .value as EditorInvitationData["language"],
            )
          }
        >
          <option value="uz">
            O‘zbek
          </option>

          <option value="ru">
            Русский
          </option>

          <option value="en">
            English
          </option>
        </select>
      </div>

      <div className="editor-setting">
        <div>
          <strong>
            RSVP
          </strong>

          <span>
            Mehmon tasdig‘i.
          </span>
        </div>

        <span
          className={`editor-badge ${
            data.rsvp?.enabled
              ? "is-active"
              : ""
          }`}
        >
          {data.rsvp?.enabled
            ? "Faol"
            : "O‘chiq"}
        </span>
      </div>

      <div className="editor-setting">
        <div>
          <strong>
            Musiqa
          </strong>

          <span>
            Background music.
          </span>
        </div>

        <span
          className={`editor-badge ${
            data.music?.enabled
              ? "is-active"
              : ""
          }`}
        >
          {data.music?.enabled
            ? "Faol"
            : "O‘chiq"}
        </span>
      </div>
    </div>
  );
}

export default function EditorSidebar({
  state,
  onDataChange,
  onFieldChange,
  onTabChange,
  onSectionChange,
}: EditorSidebarProps) {
  const [fallbackTab, setFallbackTab] =
    useState<EditorTab>(
      state.activeTab,
    );

  const activeTab =
    state.activeTab ??
    fallbackTab;

  const changeTab = (
    tab: EditorTab,
  ) => {
    setFallbackTab(tab);
    onTabChange?.(tab);
  };

  return (
    <aside className="editor-sidebar">
      <div className="editor-sidebar-head">
        <div className="editor-sidebar-brand">
          <div className="editor-sidebar-logo">
            M
          </div>

          <div>
            <strong>
              momento
            </strong>

            <span>
              Invitation editor
            </span>
          </div>
        </div>
      </div>

      <nav className="editor-sidebar-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={
              activeTab ===
              tab.id
                ? "is-active"
                : ""
            }
            onClick={() =>
              changeTab(
                tab.id,
              )
            }
          >
            <Icon
              name={tab.icon}
              size={16}
            />

            <span>
              {tab.title}
            </span>
          </button>
        ))}
      </nav>

      <div className="editor-sidebar-body">
        {activeTab ===
          "content" && (
          <>
            <div className="editor-section-list">
              {sectionItems.map(
                (section) => (
                  <button
                    type="button"
                    key={section.id}
                    className={
                      state.activeSection ===
                      section.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      onSectionChange?.(
                        section.id,
                      )
                    }
                  >
                    <span className="editor-section-icon">
                      <Icon
                        name={
                          section.icon
                        }
                        size={
                          16
                        }
                      />
                    </span>

                    <strong>
                      {
                        section.title
                      }
                    </strong>

                    <Icon
                      name="chevron-down"
                      size={14}
                    />
                  </button>
                ),
              )}
            </div>

            <ContentPanel
              state={state}
              onFieldChange={
                onFieldChange
              }
            />
          </>
        )}

        {activeTab ===
          "design" && (
          <DesignPanel
            data={state.data}
            onFieldChange={
              onFieldChange
            }
          />
        )}

        {activeTab ===
          "media" && (
          <MediaPanel
            data={state.data}
          />
        )}

        {activeTab ===
          "settings" && (
          <SettingsPanel
            data={state.data}
            onFieldChange={
              onFieldChange
            }
          />
        )}
      </div>

      <div className="editor-sidebar-foot">
        <span
          className={
            state.isDirty
              ? "is-dirty"
              : "is-saved"
          }
        />

        <span>
          {state.isDirty
            ? "O‘zgarishlar saqlanmagan"
            : "Barcha o‘zgarishlar saqlangan"}
        </span>
      </div>

      <div
        style={{
          display: "none",
        }}
      >
        {onDataChange && "ready"}
      </div>
    </aside>
  );
}