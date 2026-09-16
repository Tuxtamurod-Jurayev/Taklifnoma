export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "chevron-down"
  | "chevron-up"
  | "menu"
  | "close"
  | "heart"
  | "calendar"
  | "clock"
  | "location"
  | "image"
  | "music"
  | "check"
  | "edit"
  | "share"
  | "eye"
  | "trash"
  | "user"
  | "layers"
  | "credit-card"
  | "settings"
  | "search"
  | "plus"
  | "bell"
  | "play"
  | "sparkles";

type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),

  "arrow-left": (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),

  "chevron-down": <path d="m6.5 9 5.5 5.5L17.5 9" />,

  "chevron-up": <path d="m6.5 15 5.5-5.5 5.5 5.5" />,

  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),

  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),

  heart: (
    <path d="M20.5 8.7c0 5.1-8.5 10.1-8.5 10.1S3.5 13.8 3.5 8.7a4.55 4.55 0 0 1 8.5-2.2 4.55 4.55 0 0 1 8.5 2.2Z" />
  ),

  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3.5 10h17" />
    </>
  ),

  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),

  location: (
    <>
      <path d="M20 10.3c0 5.2-8 10.2-8 10.2s-8-5-8-10.2a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),

  image: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <circle cx="9" cy="9" r="1.4" />
      <path d="m4.5 17 4.2-4.2 3.5 3 2.6-2.5 4.7 4.2" />
    </>
  ),

  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),

  check: <path d="m5 12 4 4L19 6" />,

  edit: (
    <>
      <path d="m4 16.5-.7 3.2 3.2-.7L18 7.5 16.5 6 4 16.5Z" />
      <path d="m14.8 7.7 1.5 1.5" />
    </>
  ),

  share: (
    <>
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="m8 11 8-5M8 13l8 5" />
    </>
  ),

  eye: (
    <>
      <path d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5Z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),

  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M9 7V4h6v3" />
      <path d="m7 7 1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),

  user: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c.7-3.5 3-5.2 7-5.2s6.3 1.7 7 5.2" />
    </>
  ),

  layers: (
    <>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </>
  ),

  "credit-card": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </>
  ),

  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-2.2-.4l-.2.1a2 2 0 0 0-1.2 1.8v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-1.2-1.8l-.2-.1a2 2 0 0 0-2.2.4l-.1.1A2 2 0 0 1 4 15.1l.1-.1a2 2 0 0 0 .4-2.2l-.1-.2A2 2 0 0 0 2.6 11h-.1a2 2 0 0 1 0-4h.1a2 2 0 0 0 1.8-1.2l.1-.2A2 2 0 0 0 4 3.4l-.1-.1A2 2 0 0 1 6.7.5l.1.1a2 2 0 0 0 2.2.4l.2-.1A2 2 0 0 0 10.4 0v-.2a2 2 0 0 1 4 0V0a2 2 0 0 0 1.2 1.8l.2.1a2 2 0 0 0 2.2-.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a2 2 0 0 0-.4 2.2l.1.2A2 2 0 0 0 22.3 8h.1a2 2 0 0 1 0 4h-.1a2 2 0 0 0-1.8 1.2l-.1.2a2 2 0 0 0 .4 2.2Z" />
    </>
  ),

  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),

  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),

  bell: (
    <>
      <path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8Z" />
      <path d="M10 21h4" />
    </>
  ),

  play: <path d="m9 6 9 6-9 6V6Z" />,

  sparkles: (
    <>
      <path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3Z" />
      <path d="m19 14 .6 2.4L22 17l-2.4.6L19 20l-.6-2.4L16 17l2.4-.6L19 14Z" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.6,
  className = "",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}