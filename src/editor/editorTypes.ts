import type { InvitationData } from "../templates/templateTypes";

export type EditorTab =
  | "content"
  | "design"
  | "media"
  | "settings";

export type EditorSection =
  | "couple"
  | "date"
  | "venue"
  | "story"
  | "gallery"
  | "music"
  | "rsvp";

export type EditorDevice =
  | "desktop"
  | "tablet"
  | "mobile";

export type EditorLanguage =
  | "uz"
  | "ru"
  | "en";

export type EditorTheme = {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
};

export type EditorTypography = {
  headingFont: string;
  bodyFont: string;
  accentFont: string;
};

export type EditorAnimation = {
  enabled: boolean;
  entrance:
    | "fade"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "reveal";
  duration: number;
  delay: number;
};

export type EditorGalleryItem = {
  id: string;
  url: string;
  alt?: string;
  order: number;
};

export type EditorMusic = {
  enabled: boolean;
  url: string;
  title?: string;
  autoplay: boolean;
  loop: boolean;
};

export type EditorRsvp = {
  enabled: boolean;
  title?: string;
  description?: string;
  yesLabel?: string;
  noLabel?: string;
  buttonLabel?: string;
};

export type EditorInvitationData = InvitationData & {
  language: EditorLanguage;

  greeting?: string;

  ceremonyDate?: string;
  ceremonyTime?: string;

  coupleMessage?: string;

  galleryItems?: EditorGalleryItem[];

  music?: EditorMusic;

  rsvp?: EditorRsvp;

  theme?: EditorTheme;

  typography?: EditorTypography;

  animation?: EditorAnimation;
};

export type EditorState = {
  templateId: string;

  data: EditorInvitationData;

  activeTab: EditorTab;

  activeSection: EditorSection;

  device: EditorDevice;

  isDirty: boolean;

  isSaving: boolean;

  lastSavedAt: string | null;

  previewMode: boolean;
};

export type EditorField =
  | "brideName"
  | "groomName"
  | "date"
  | "time"
  | "venue"
  | "address"
  | "intro"
  | "story"
  | "coverImage"
  | "googleMapsUrl";

export type EditorChange<T = unknown> = {
  field: EditorField;
  value: T;
};

export type EditorAction =
  | {
      type: "SET_TEMPLATE";
      payload: string;
    }
  | {
      type: "SET_DATA";
      payload: Partial<EditorInvitationData>;
    }
  | {
      type: "UPDATE_FIELD";
      payload: EditorChange;
    }
  | {
      type: "SET_ACTIVE_TAB";
      payload: EditorTab;
    }
  | {
      type: "SET_ACTIVE_SECTION";
      payload: EditorSection;
    }
  | {
      type: "SET_DEVICE";
      payload: EditorDevice;
    }
  | {
      type: "SET_PREVIEW_MODE";
      payload: boolean;
    }
  | {
      type: "SET_SAVING";
      payload: boolean;
    }
  | {
      type: "MARK_SAVED";
      payload?: string;
    }
  | {
      type: "RESET";
      payload?: Partial<EditorState>;
    };

export type EditorContextValue = {
  state: EditorState;

  setData: (
    data: Partial<EditorInvitationData>,
  ) => void;

  updateField: <K extends keyof EditorInvitationData>(
    field: K,
    value: EditorInvitationData[K],
  ) => void;

  setActiveTab: (
    tab: EditorTab,
  ) => void;

  setActiveSection: (
    section: EditorSection,
  ) => void;

  setDevice: (
    device: EditorDevice,
  ) => void;

  setPreviewMode: (
    value: boolean,
  ) => void;

  save: () => Promise<void>;

  reset: () => void;
};

export type EditorSidebarProps = {
  state: EditorState;

  onDataChange: (
    data: Partial<EditorInvitationData>,
  ) => void;

  onFieldChange: <
    K extends keyof EditorInvitationData,
  >(
    field: K,
    value: EditorInvitationData[K],
  ) => void;

  onTabChange?: (
    tab: EditorTab,
  ) => void;

  onSectionChange?: (
    section: EditorSection,
  ) => void;
};

export type LivePreviewProps = {
  templateId: string;

  data: EditorInvitationData;

  device: EditorDevice;

  language?: EditorLanguage;

  preview?: boolean;

  onDeviceChange?: (
    device: EditorDevice,
  ) => void;
};

export type EditorProps = {
  templateId: string;

  initialData?: Partial<EditorInvitationData>;

  language?: EditorLanguage;

  onSave?: (
    state: EditorState,
  ) => Promise<void> | void;

  onExit?: () => void;
};

export type EditorTranslation = {
  content: string;
  design: string;
  media: string;
  settings: string;

  couple: string;
  date: string;
  venue: string;
  story: string;
  gallery: string;
  music: string;
  rsvp: string;

  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;

  save: string;
  saving: string;
  saved: string;

  preview: string;
  close: string;

  desktop: string;
  tablet: string;
  mobile: string;
};

export const defaultEditorTheme: EditorTheme = {
  primaryColor: "#1f1f1f",
  secondaryColor: "#7c776f",
  backgroundColor: "#f7f5f0",
  textColor: "#242320",
  mutedColor: "#87837b",
  accentColor: "#c9a45c",
};

export const defaultEditorTypography: EditorTypography = {
  headingFont: "Playfair Display",
  bodyFont: "DM Sans",
  accentFont: "Playfair Display",
};

export const defaultEditorAnimation: EditorAnimation = {
  enabled: true,
  entrance: "fade",
  duration: 700,
  delay: 0,
};

export const createDefaultEditorData = (
  overrides?: Partial<EditorInvitationData>,
): EditorInvitationData => {
  return {
    brideName: "Malika",
    groomName: "Ulug'bek",
    date: "09.09.2026",
    time: "18:00",
    venue: "Baxtiyor restorani",
    address:
      "Toshkent viloyati, Qibray tumani",
    intro:
      "Sizni hayotimizdagi eng go‘zal kunni birga nishonlash uchun taklif qilamiz.",
    story:
      "Bir-birini topgan ikki qalb endi hayotining yangi sahifasini birga boshlaydi.",

    coverImage:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1800&q=85",

    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
    ],

    googleMapsUrl:
      "https://maps.google.com",

    language: "uz",

    greeting: "Qadrli mehmonlarimiz!",

    ceremonyDate: "09.09.2026",

    ceremonyTime: "18:00",

    coupleMessage:
      "Baxtimizni siz bilan birga baham ko‘rishni istaymiz.",

    galleryItems: [
      {
        id: "gallery-1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
        alt: "Wedding photo 1",
        order: 1,
      },
      {
        id: "gallery-2",
        url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
        alt: "Wedding photo 2",
        order: 2,
      },
      {
        id: "gallery-3",
        url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
        alt: "Wedding photo 3",
        order: 3,
      },
    ],

    music: {
      enabled: false,
      url: "",
      title: "",
      autoplay: false,
      loop: true,
    },

    rsvp: {
      enabled: true,
      title:
        "Tashrifingizni tasdiqlang",
      description:
        "Sizning tashrifingiz biz uchun juda qadrli.",
      yesLabel: "Albatta kelaman",
      noLabel:
        "Afsuski, kela olmayman",
      buttonLabel: "Tasdiqlash",
    },

    theme: defaultEditorTheme,

    typography:
      defaultEditorTypography,

    animation:
      defaultEditorAnimation,

    ...overrides,
  };
};

export const createDefaultEditorState = (
  templateId: string,
  overrides?: Partial<EditorState>,
): EditorState => {
  return {
    templateId,

    data: createDefaultEditorData(),

    activeTab: "content",

    activeSection: "couple",

    device: "desktop",

    isDirty: false,

    isSaving: false,

    lastSavedAt: null,

    previewMode: true,

    ...overrides,
  };
};