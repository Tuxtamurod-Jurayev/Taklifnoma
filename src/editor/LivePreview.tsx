import {
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  
  import Cinematic from "../templates/Cinematic";
  import Classic from "../templates/Classic";
  import Elegant from "../templates/Elegant";
  import Floral from "../templates/Floral";
  import Luxury from "../templates/Luxury";
  import Minimal from "../templates/Minimal";
  import Modern from "../templates/Modern";
  import Oriental from "../templates/Oriental";
  import Romantic from "../templates/Romantic";
  import Royal from "../templates/Royal";
  
  import Icon from "../components/Icon";
  
  import type {
    EditorDevice,
    EditorInvitationData,
    LivePreviewProps,
  } from "./editorTypes";
  
  import "./LivePreview.css";
  
  type TemplateRendererProps = {
    templateId: string;
    data: EditorInvitationData;
  };
  
  type DeviceConfig = {
    width: number;
    height: number;
    label: string;
  };
  
  const deviceConfig: Record<
    EditorDevice,
    DeviceConfig
  > = {
    desktop: {
      width: 1440,
      height: 920,
      label: "Desktop",
    },
  
    tablet: {
      width: 820,
      height: 1100,
      label: "Tablet",
    },
  
    mobile: {
      width: 390,
      height: 844,
      label: "Mobile",
    },
  };
  
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
  
  function TemplateRenderer({
    templateId,
    data,
  }: TemplateRendererProps) {
    switch (templateId) {
      case "cinematic":
        return (
          <Cinematic
            data={data}
            preview
          />
        );
  
      case "classic":
        return (
          <Classic
            data={data}
            preview
          />
        );
  
      case "elegant":
        return (
          <Elegant
            data={data}
            preview
          />
        );
  
      case "floral":
        return (
          <Floral
            data={data}
            preview
          />
        );
  
      case "luxury":
        return (
          <Luxury
            data={data}
            preview
          />
        );
  
      case "minimal":
        return (
          <Minimal
            data={data}
            preview
          />
        );
  
      case "modern":
        return (
          <Modern
            data={data}
            preview
          />
        );
  
      case "oriental":
        return (
          <Oriental
            data={data}
            preview
          />
        );
  
      case "romantic":
        return (
          <Romantic
            data={data}
            preview
          />
        );
  
      case "royal":
        return (
          <Royal
            data={data}
            preview
          />
        );
  
      default:
        return (
          <div className="live-preview-empty">
            <div className="live-preview-empty-icon">
              <Icon
                name="sparkles"
                size={28}
              />
            </div>
  
            <h3>
              Template topilmadi
            </h3>
  
            <p>
              Ushbu template hali
              rendererga ulanmagan.
            </p>
          </div>
        );
    }
  }
  
  function PreviewLoading() {
    return (
      <div className="live-preview-loading">
        <div className="live-preview-loading-spinner" />
  
        <span>
          Preview yuklanmoqda...
        </span>
      </div>
    );
  }
  
  function PreviewDeviceButton({
    device,
    active,
    onClick,
  }: {
    device: EditorDevice;
    active: boolean;
    onClick: () => void;
  }) {
    const icons: Record<
      EditorDevice,
      "eye" | "layers" | "user"
    > = {
      desktop: "eye",
      tablet: "layers",
      mobile: "user",
    };
  
    const labels: Record<
      EditorDevice,
      string
    > = {
      desktop: "Desktop",
      tablet: "Tablet",
      mobile: "Mobile",
    };
  
    return (
      <button
        type="button"
        className={`live-preview-device-button ${
          active ? "is-active" : ""
        }`}
        onClick={onClick}
        title={labels[device]}
        aria-label={labels[device]}
      >
        <Icon
          name={icons[device]}
          size={16}
        />
  
        <span>
          {labels[device]}
        </span>
      </button>
    );
  }
  
  function PreviewTopbar({
    templateId,
    device,
    onDeviceChange,
    zoom,
    onZoomChange,
    onRefresh,
    isRefreshing,
  }: {
    templateId: string;
    device: EditorDevice;
    onDeviceChange: (
      device: EditorDevice,
    ) => void;
    zoom: number;
    onZoomChange: (
      value: number,
    ) => void;
    onRefresh: () => void;
    isRefreshing: boolean;
  }) {
    const zoomPercentage = Math.round(
      zoom * 100,
    );
  
    return (
      <div className="live-preview-topbar">
        <div className="live-preview-title">
          <div className="live-preview-title-icon">
            <Icon
              name="eye"
              size={17}
            />
          </div>
  
          <div>
            <span>LIVE PREVIEW</span>
  
            <strong>
              {templateNames[
                templateId
              ] ?? templateId}
            </strong>
          </div>
        </div>
  
        <div className="live-preview-toolbar">
          <div className="live-preview-devices">
            <PreviewDeviceButton
              device="desktop"
              active={
                device === "desktop"
              }
              onClick={() =>
                onDeviceChange(
                  "desktop",
                )
              }
            />
  
            <PreviewDeviceButton
              device="tablet"
              active={
                device === "tablet"
              }
              onClick={() =>
                onDeviceChange(
                  "tablet",
                )
              }
            />
  
            <PreviewDeviceButton
              device="mobile"
              active={
                device === "mobile"
              }
              onClick={() =>
                onDeviceChange(
                  "mobile",
                )
              }
            />
          </div>
  
          <div className="live-preview-zoom">
            <button
              type="button"
              onClick={() =>
                onZoomChange(
                  Math.max(
                    0.45,
                    Number(
                      (
                        zoom -
                        0.05
                      ).toFixed(2),
                    ),
                  ),
                )
              }
              aria-label="Zoom out"
            >
              −
            </button>
  
            <span>
              {zoomPercentage}%
            </span>
  
            <button
              type="button"
              onClick={() =>
                onZoomChange(
                  Math.min(
                    1,
                    Number(
                      (
                        zoom +
                        0.05
                      ).toFixed(2),
                    ),
                  ),
                )
              }
              aria-label="Zoom in"
            >
              +
            </button>
          </div>
  
          <button
            type="button"
            className={`live-preview-refresh ${
              isRefreshing
                ? "is-refreshing"
                : ""
            }`}
            onClick={onRefresh}
            aria-label="Refresh preview"
            title="Refresh preview"
          >
            <Icon
              name="arrow-right"
              size={17}
            />
          </button>
        </div>
      </div>
    );
  }
  
  function PreviewBottomInfo({
    templateId,
    device,
  }: {
    templateId: string;
    device: EditorDevice;
  }) {
    const deviceLabel =
      deviceConfig[device].label;
  
    return (
      <div className="live-preview-bottom-info">
        <div>
          <span>
            TEMPLATE
          </span>
  
          <strong>
            {templateNames[
              templateId
            ] ?? templateId}
          </strong>
        </div>
  
        <div>
          <span>
            VIEWPORT
          </span>
  
          <strong>
            {deviceLabel}
          </strong>
        </div>
  
        <div>
          <span>
            STATUS
          </span>
  
          <strong className="is-live">
            LIVE
          </strong>
        </div>
      </div>
    );
  }
  
  function PreviewStage({
    templateId,
    data,
    device,
    zoom,
    refreshKey,
  }: {
    templateId: string;
    data: EditorInvitationData;
    device: EditorDevice;
    zoom: number;
    refreshKey: number;
  }) {
    const stageRef =
      useRef<HTMLDivElement | null>(
        null,
      );
  
    const [ready, setReady] =
      useState(false);
  
    const config =
      deviceConfig[device];
  
    useEffect(() => {
      setReady(false);
  
      const timer =
        window.setTimeout(
          () => {
            setReady(true);
          },
          120,
        );
  
      return () =>
        window.clearTimeout(timer);
    }, [
      templateId,
      device,
      refreshKey,
    ]);
  
    const previewStyle = {
      width: `${config.width}px`,
      minHeight: `${config.height}px`,
      transform: `scale(${zoom})`,
      transformOrigin:
        "top center",
    };
  
    return (
      <div
        className={`live-preview-stage ${
          device === "mobile"
            ? "is-mobile"
            : device === "tablet"
              ? "is-tablet"
              : "is-desktop"
        }`}
        ref={stageRef}
      >
        <div
          className="live-preview-device-shell"
          style={{
            width: `${Math.max(
              config.width * zoom,
              320,
            )}px`,
          }}
        >
          {!ready && (
            <PreviewLoading />
          )}
  
          <div
            key={refreshKey}
            className="live-preview-viewport"
            style={previewStyle}
          >
            <TemplateRenderer
              templateId={
                templateId
              }
              data={data}
            />
          </div>
        </div>
      </div>
    );
  }
  
  function MobilePreviewHint({
    device,
  }: {
    device: EditorDevice;
  }) {
    if (device !== "mobile") {
      return null;
    }
  
    return (
      <div className="live-preview-mobile-hint">
        <Icon
          name="arrow-left"
          size={14}
        />
  
        <span>
          Scroll qilib invitationni
          to‘liq ko‘ring
        </span>
  
        <Icon
          name="arrow-right"
          size={14}
        />
      </div>
    );
  }
  
  export default function LivePreview({
    templateId,
    data,
    device,
    language,
    preview = true,
    onDeviceChange,
  }: LivePreviewProps) {
    const [internalDevice, setInternalDevice] =
      useState<EditorDevice>(
        device,
      );
  
    const [zoom, setZoom] =
      useState(0.68);
  
    const [refreshKey, setRefreshKey] =
      useState(0);
  
    const [isRefreshing, setIsRefreshing] =
      useState(false);
  
    const effectiveDevice =
      device ?? internalDevice;
  
    const effectiveData =
      useMemo(
        () => ({
          ...data,
          language:
            language ??
            data.language ??
            "uz",
        }),
        [data, language],
      );
  
    const handleDeviceChange = (
      nextDevice: EditorDevice,
    ) => {
      setInternalDevice(
        nextDevice,
      );
  
      onDeviceChange?.(
        nextDevice,
      );
  
      if (
        nextDevice ===
        "desktop"
      ) {
        setZoom(0.55);
      }
  
      if (
        nextDevice ===
        "tablet"
      ) {
        setZoom(0.65);
      }
  
      if (
        nextDevice ===
        "mobile"
      ) {
        setZoom(0.82);
      }
    };
  
    const handleRefresh = () => {
      setIsRefreshing(true);
  
      setRefreshKey(
        (current) =>
          current + 1,
      );
  
      window.setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    };
  
    useEffect(() => {
      if (
        effectiveDevice ===
        "desktop"
      ) {
        setZoom(0.55);
      }
  
      if (
        effectiveDevice ===
        "tablet"
      ) {
        setZoom(0.65);
      }
  
      if (
        effectiveDevice ===
        "mobile"
      ) {
        setZoom(0.82);
      }
    }, [
      effectiveDevice,
    ]);
  
    return (
      <section
        className={`live-preview ${
          preview
            ? "is-live"
            : "is-static"
        }`}
      >
        <PreviewTopbar
          templateId={templateId}
          device={
            effectiveDevice
          }
          onDeviceChange={
            handleDeviceChange
          }
          zoom={zoom}
          onZoomChange={setZoom}
          onRefresh={
            handleRefresh
          }
          isRefreshing={
            isRefreshing
          }
        />
  
        <div className="live-preview-content">
          <div className="live-preview-canvas">
            <div className="live-preview-canvas-grid" />
  
            <div className="live-preview-ruler ruler-top">
              <span>0</span>
              <span>360</span>
              <span>720</span>
              <span>1080</span>
              <span>1440</span>
            </div>
  
            <div className="live-preview-ruler ruler-left">
              <span>0</span>
              <span>300</span>
              <span>600</span>
              <span>900</span>
            </div>
  
            <PreviewStage
              templateId={
                templateId
              }
              data={effectiveData}
              device={
                effectiveDevice
              }
              zoom={zoom}
              refreshKey={
                refreshKey
              }
            />
  
            <div className="live-preview-floating-status">
              <span className="live-status-dot" />
              <span>
                LIVE
              </span>
            </div>
          </div>
  
          <MobilePreviewHint
            device={
              effectiveDevice
            }
          />
        </div>
  
        <PreviewBottomInfo
          templateId={templateId}
          device={
            effectiveDevice
          }
        />
      </section>
    );
  }