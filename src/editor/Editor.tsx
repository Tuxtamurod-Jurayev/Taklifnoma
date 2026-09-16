import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Icon from "../components/Icon";
import EditorSidebar from "./EditorSidebar";
import LivePreview from "./LivePreview";

import {
  createDefaultEditorState,
  type EditorDevice,
  type EditorInvitationData,
  type EditorState,
} from "./editorTypes";

import "./Editor.css";

type EditorProps = {
  templateId?: string;
  initialData?: Partial<EditorInvitationData>;
  language?: "uz" | "ru" | "en";

  onSave?: (
    state: EditorState,
  ) => Promise<void> | void;

  onExit?: () => void;

  onContinueToPayment?: (
    state: EditorState,
  ) => void;
};

const validTemplates = [
  "cinematic",
  "classic",
  "elegant",
  "floral",
  "luxury",
  "minimal",
  "modern",
  "oriental",
  "romantic",
  "royal",
];

const templateNames: Record<
  string,
  string
> = {
  cinematic: "Cinematic",
  classic: "Classic",
  elegant: "Elegant",
  floral: "Floral",
  luxury: "Luxury",
  minimal: "Minimal",
  modern: "Modern",
  oriental: "Oriental",
  romantic: "Romantic",
  royal: "Royal",
};

function normalizeTemplate(
  value?: string,
) {
  const id =
    value?.toLowerCase().trim();

  if (
    id &&
    validTemplates.includes(id)
  ) {
    return id;
  }

  return "classic";
}

function storageKey(
  templateId: string,
) {
  return `momento-editor-${templateId}`;
}

function loadDraft(
  templateId: string,
) {
  const base =
    createDefaultEditorState(
      templateId,
    );

  if (
    typeof window ===
    "undefined"
  ) {
    return base;
  }

  try {
    const saved =
      localStorage.getItem(
        storageKey(templateId),
      );

    if (!saved) {
      return base;
    }

    const parsed =
      JSON.parse(saved) as Partial<EditorState>;

    return {
      ...base,
      ...parsed,
      templateId,
      data: {
        ...base.data,
        ...parsed.data,
      },
      isDirty: false,
      isSaving: false,
    };
  } catch {
    return base;
  }
}

function saveDraft(
  state: EditorState,
) {
  localStorage.setItem(
    storageKey(
      state.templateId,
    ),
    JSON.stringify(state),
  );
}

function validData(
  data: EditorInvitationData,
) {
  const errors: string[] = [];

  if (!data.groomName.trim()) {
    errors.push(
      "Kuyov ismini kiriting.",
    );
  }

  if (!data.brideName.trim()) {
    errors.push(
      "Kelin ismini kiriting.",
    );
  }

  if (!data.date.trim()) {
    errors.push(
      "Sanani kiriting.",
    );
  }

  if (!data.time.trim()) {
    errors.push(
      "Vaqtni kiriting.",
    );
  }

  if (!data.venue.trim()) {
    errors.push(
      "O‘tkazilish joyini kiriting.",
    );
  }

  return errors;
}

export default function Editor({
  templateId: propTemplateId,
  initialData,
  language,
  onSave,
  onExit,
  onContinueToPayment,
}: EditorProps = {}) {
  const params =
    useParams<{
      templateId?: string;
    }>();

  const navigate =
    useNavigate();

  const templateId =
    normalizeTemplate(
      propTemplateId ??
        params.templateId,
    );

  const [state, setState] =
    useState<EditorState>(() => {
      const draft =
        loadDraft(templateId);

      return {
        ...draft,

        activeTab: "content",

        activeSection: "couple",

        previewMode: true,

        data: {
          ...draft.data,
          ...initialData,
          language:
            language ??
            draft.data.language ??
            "uz",
        },
      };
    });

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [exitOpen, setExitOpen] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errors, setErrors] =
    useState<string[]>([]);

  useEffect(() => {
    if (
      state.templateId !==
      templateId
    ) {
      const draft =
        loadDraft(templateId);

      setState({
        ...draft,

        activeTab: "content",

        activeSection: "couple",

        data: {
          ...draft.data,
          ...initialData,
          language:
            language ??
            draft.data.language ??
            "uz",
        },
      });
    }
  }, [
    initialData,
    language,
    state.templateId,
    templateId,
  ]);

  const updateData = useCallback(
    <
      K extends keyof EditorInvitationData,
    >(
      field: K,
      value: EditorInvitationData[K],
    ) => {
      setErrors([]);

      setState(
        (current) => ({
          ...current,

          data: {
            ...current.data,

            [field]: value,
          },

          isDirty: true,
        }),
      );
    },
    [],
  );

  const updateMultiple =
    useCallback(
      (
        patch: Partial<EditorInvitationData>,
      ) => {
        setErrors([]);

        setState(
          (current) => ({
            ...current,

            data: {
              ...current.data,
              ...patch,
            },

            isDirty: true,
          }),
        );
      },
      [],
    );

  const changeTab =
    useCallback(
      (
        activeTab: EditorState["activeTab"],
      ) => {
        setState(
          (current) => ({
            ...current,
            activeTab,
          }),
        );
      },
      [],
    );

  const changeSection =
    useCallback(
      (
        activeSection:
          EditorState["activeSection"],
      ) => {
        setState(
          (current) => ({
            ...current,

            activeSection,

            activeTab: "content",
          }),
        );
      },
      [],
    );

  const changeDevice =
    useCallback(
      (
        device: EditorDevice,
      ) => {
        setState(
          (current) => ({
            ...current,
            device,
          }),
        );
      },
      [],
    );

  const save = useCallback(
    async (
      silent = false,
    ) => {
      if (state.isSaving) {
        return false;
      }

      const now =
        new Date().toISOString();

      const nextState: EditorState =
        {
          ...state,

          isSaving: false,

          isDirty: false,

          lastSavedAt: now,
        };

      try {
        saveDraft(
          nextState,
        );

        setState(
          nextState,
        );

        if (onSave) {
          await onSave(
            nextState,
          );
        }

        if (!silent) {
          setMessage(
            "O‘zgarishlar saqlandi.",
          );

          window.setTimeout(
            () => {
              setMessage("");
            },
            2000,
          );
        }

        return true;
      } catch {
        setMessage(
          "Saqlashda xatolik yuz berdi.",
        );

        return false;
      }
    },
    [onSave, state],
  );

  const openPreview =
    useCallback(async () => {
      const validation =
        validData(
          state.data,
        );

      if (validation.length) {
        setErrors(
          validation,
        );

        return;
      }

      const saved =
        await save(true);

      if (!saved) {
        return;
      }

      setPreviewOpen(
        true,
      );
    }, [
      save,
      state.data,
    ]);

  const continueToPayment =
    useCallback(async () => {
      const validation =
        validData(
          state.data,
        );

      if (validation.length) {
        setErrors(
          validation,
        );

        setPreviewOpen(
          false,
        );

        return;
      }

      const saved =
        await save(true);

      if (!saved) {
        return;
      }

      const finalState:
        EditorState = {
        ...state,
        isDirty: false,
        isSaving: false,
      };

      if (
        onContinueToPayment
      ) {
        onContinueToPayment(
          finalState,
        );

        return;
      }

      navigate(
        `/pricing?template=${encodeURIComponent(
          state.templateId,
        )}`,
      );
    }, [
      navigate,
      onContinueToPayment,
      save,
      state,
    ]);

  const closePreview =
    useCallback(() => {
      setPreviewOpen(
        false,
      );
    }, []);

  const exitEditor =
    useCallback(() => {
      if (state.isDirty) {
        setExitOpen(true);

        return;
      }

      if (onExit) {
        onExit();
        return;
      }

      navigate(
        "/templates",
      );
    }, [
      navigate,
      onExit,
      state.isDirty,
    ]);

  useEffect(() => {
    const keyboard =
      (event: KeyboardEvent) => {
        if (
          (event.ctrlKey ||
            event.metaKey) &&
          event.key.toLowerCase() ===
            "s"
        ) {
          event.preventDefault();

          void save();
        }

        if (
          event.key ===
          "Escape"
        ) {
          if (previewOpen) {
            closePreview();
          }

          if (exitOpen) {
            setExitOpen(
              false,
            );
          }

          if (
            mobileSidebarOpen
          ) {
            setMobileSidebarOpen(
              false,
            );
          }
        }
      };

    window.addEventListener(
      "keydown",
      keyboard,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyboard,
      );
  }, [
    closePreview,
    exitOpen,
    mobileSidebarOpen,
    previewOpen,
    save,
  ]);

  useEffect(() => {
    if (
      previewOpen ||
      exitOpen ||
      mobileSidebarOpen
    ) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    exitOpen,
    mobileSidebarOpen,
    previewOpen,
  ]);

  const templateName =
    templateNames[
      state.templateId
    ] ?? "Classic";

  return (
    <div className="editor-page">
      <header className="editor-topbar">
        <div className="editor-topbar-left">
          <button
            type="button"
            className="editor-back-button"
            onClick={
              exitEditor
            }
          >
            <Icon
              name="arrow-left"
              size={18}
            />
          </button>

          <div className="editor-topbar-brand">
            <div className="editor-brand-mark">
              M
            </div>

            <div className="editor-topbar-template">
              <span>
                MOMENTO EDITOR
              </span>

              <div>
                <strong>
                  {templateName}
                </strong>

                <i />

                <small>
                  Tahrirlash
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="editor-topbar-center">
          <div className="editor-template-breadcrumb">
            <span>
              EDIT MODE
            </span>

            <strong>
              {templateName}
            </strong>
          </div>
        </div>

        <div className="editor-topbar-right">
          <div
            className={`editor-status ${
              state.isDirty
                ? "is-dirty"
                : "is-saved"
            }`}
          >
            <span />
            <span>
              {state.isDirty
                ? "O‘zgarishlar bor"
                : "Saqlangan"}
            </span>
          </div>

          <button
            type="button"
            className="editor-mobile-sidebar-button"
            onClick={() =>
              setMobileSidebarOpen(
                true,
              )
            }
          >
            <Icon
              name="edit"
              size={17}
            />
          </button>

          <button
            type="button"
            className="editor-top-preview-button"
            onClick={
              openPreview
            }
          >
            <Icon
              name="eye"
              size={17}
            />

            <span>
              Ko‘rish
            </span>
          </button>

          <button
            type="button"
            className="editor-save-button"
            onClick={() =>
              void save()
            }
          >
            <Icon
              name="check"
              size={17}
            />

            <span>
              Saqlash
            </span>
          </button>
        </div>
      </header>

      <div className="editor-body">
        <div
          className={`editor-sidebar-wrapper ${
            mobileSidebarOpen
              ? "is-mobile-open"
              : ""
          }`}
        >
          <button
            type="button"
            className="editor-sidebar-mobile-overlay"
            onClick={() =>
              setMobileSidebarOpen(
                false,
              )
            }
          />

          <div className="editor-sidebar-mobile-close">
            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen(
                  false,
                )
              }
            >
              <Icon
                name="close"
                size={19}
              />
            </button>
          </div>

          <EditorSidebar
            state={state}
            onDataChange={
              updateMultiple
            }
            onFieldChange={
              updateData
            }
            onTabChange={
              changeTab
            }
            onSectionChange={
              changeSection
            }
          />
        </div>

        <main className="editor-main">
          <div className="editor-main-header">
            <div className="editor-main-heading">
              <span>
                EDITING
              </span>

              <h1>
                {templateName}
              </h1>
            </div>

            <div className="editor-main-live">
              <span />
              LIVE
            </div>

            <div className="editor-main-actions">
              <button
                type="button"
                className={
                  state.device ===
                  "desktop"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  changeDevice(
                    "desktop",
                  )
                }
              >
                Desktop
              </button>

              <button
                type="button"
                className={
                  state.device ===
                  "tablet"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  changeDevice(
                    "tablet",
                  )
                }
              >
                Tablet
              </button>

              <button
                type="button"
                className={
                  state.device ===
                  "mobile"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  changeDevice(
                    "mobile",
                  )
                }
              >
                Mobile
              </button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="editor-validation">
              <div className="editor-validation-icon">
                !
              </div>

              <div>
                <strong>
                  Ma'lumotlarni
                  to‘ldiring
                </strong>

                <ul>
                  {errors.map(
                    (error) => (
                      <li
                        key={error}
                      >
                        {error}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  setErrors([])
                }
              >
                <Icon
                  name="close"
                  size={14}
                />
              </button>
            </div>
          )}

          <LivePreview
            templateId={
              state.templateId
            }
            data={state.data}
            device={
              state.device
            }
            language={
              state.data.language
            }
            preview
            onDeviceChange={
              changeDevice
            }
          />

          <div className="editor-bottom-action-bar">
            <div className="editor-bottom-info">
              <span>
                {templateName}
              </span>

              <strong>
                150 000 UZS
              </strong>
            </div>

            <div className="editor-bottom-actions">
              <button
                type="button"
                className="editor-secondary-action"
                onClick={
                  openPreview
                }
              >
                <Icon
                  name="eye"
                  size={17}
                />

                <span>
                  Taklifnomani
                  ko‘rish
                </span>
              </button>

              <button
                type="button"
                className="editor-primary-action"
                onClick={
                  continueToPayment
                }
              >
                <span>
                  Davom etish
                </span>

                <Icon
                  name="arrow-right"
                  size={18}
                />
              </button>
            </div>
          </div>
        </main>
      </div>

      {message && (
        <div className="editor-toast">
          <span>✓</span>
          <p>{message}</p>
        </div>
      )}

      {previewOpen && (
        <div className="editor-preview-modal">
          <button
            type="button"
            className="editor-preview-modal-backdrop"
            onClick={
              closePreview
            }
          />

          <div className="editor-preview-dialog">
            <header className="editor-preview-dialog-header">
              <div>
                <span>
                  PREVIEW
                </span>

                <h2>
                  {templateName}
                </h2>
              </div>

              <div className="editor-preview-dialog-header-actions">
                <button
                  type="button"
                  className="editor-preview-edit"
                  onClick={
                    closePreview
                  }
                >
                  <Icon
                    name="edit"
                    size={16}
                  />

                  <span>
                    Tahrirlash
                  </span>
                </button>

                <button
                  type="button"
                  className="editor-preview-close"
                  onClick={
                    closePreview
                  }
                >
                  <Icon
                    name="close"
                    size={18}
                  />
                </button>
              </div>
            </header>

            <div className="editor-preview-dialog-body">
              <LivePreview
                templateId={
                  state.templateId
                }
                data={state.data}
                device="mobile"
                language={
                  state.data.language
                }
                preview
              />
            </div>

            <footer className="editor-preview-dialog-footer">
              <div>
                <strong>
                  Taklifnoma tayyor
                </strong>

                <span>
                  Ko‘rinishi siz tanlagan
                  ma'lumotlar asosida.
                </span>
              </div>

              <button
                type="button"
                className="editor-preview-continue"
                onClick={
                  continueToPayment
                }
              >
                <span>
                  Davom etish
                </span>

                <Icon
                  name="arrow-right"
                  size={17}
                />
              </button>
            </footer>
          </div>
        </div>
      )}

      {exitOpen && (
        <div className="editor-exit-modal-root">
          <button
            type="button"
            className="editor-exit-modal-backdrop"
            onClick={() =>
              setExitOpen(
                false,
              )
            }
          />

          <div className="editor-exit-modal">
            <button
              type="button"
              className="editor-exit-close"
              onClick={() =>
                setExitOpen(
                  false,
                )
              }
            >
              <Icon
                name="close"
                size={18}
              />
            </button>

            <div className="editor-exit-icon">
              <Icon
                name="bell"
                size={20}
              />
            </div>

            <span>
              UNSAVED CHANGES
            </span>

            <h2>
              O‘zgarishlarni
              saqlaysizmi?
            </h2>

            <p>
              Taklifnomangizga
              o‘zgartirish
              kiritilgansiz.
            </p>

            <div className="editor-exit-actions">
              <button
                type="button"
                className="editor-exit-discard"
                onClick={() => {
                  setExitOpen(
                    false,
                  );

                  navigate(
                    "/templates",
                  );
                }}
              >
                Saqlamasdan chiqish
              </button>

              <button
                type="button"
                className="editor-exit-save"
                onClick={() =>
                  void save().then(
                    () => {
                      setExitOpen(
                        false,
                      );

                      navigate(
                        "/templates",
                      );
                    },
                  )
                }
              >
                Saqlash va chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}