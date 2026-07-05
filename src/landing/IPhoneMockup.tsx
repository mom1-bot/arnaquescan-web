interface Props {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneMockup({ children, className = "" }: Props) {
  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: 248, height: 504 }}
    >
      {/* Outer body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 50,
          background: "linear-gradient(160deg, #2c2c2c 0%, #111 100%)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.38), 0 6px 20px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Silent switch */}
        <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 26, background: "#383838", borderRadius: "2px 0 0 2px" }} />
        {/* Vol+ */}
        <div style={{ position: "absolute", left: -3, top: 128, width: 3, height: 48, background: "#383838", borderRadius: "2px 0 0 2px" }} />
        {/* Vol− */}
        <div style={{ position: "absolute", left: -3, top: 186, width: 3, height: 48, background: "#383838", borderRadius: "2px 0 0 2px" }} />
        {/* Power */}
        <div style={{ position: "absolute", right: -3, top: 150, width: 3, height: 68, background: "#383838", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div style={{ position: "absolute", inset: 8, borderRadius: 43, background: "#050505" }}>
          {/* Screen glass */}
          <div style={{ position: "absolute", inset: 2, borderRadius: 41, overflow: "hidden", background: "#F5F2EC" }}>
            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 82,
                height: 26,
                background: "#050505",
                borderRadius: 13,
                zIndex: 10,
              }}
            />
            {/* Content */}
            <div style={{ position: "absolute", inset: 0, paddingTop: 46, overflow: "hidden" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
