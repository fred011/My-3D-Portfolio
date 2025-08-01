import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "12px",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Clean Spinner */}
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid rgba(255, 255, 255, 0.2)",
            borderTop: "3px solid #ffffff",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "16px",
          }}
        />

        {/* Progress Text */}
        <p
          style={{
            fontSize: "14px",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Loading {progress.toFixed(0)}%
        </p>

        {/* Inline keyframes */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </Html>
  );
};

export default CanvasLoader;
