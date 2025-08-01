import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
        padding: "30px",
        borderRadius: "12px",
        backdropFilter: "blur(6px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ddd",
          borderTop: "4px solid #00BFFF",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      {/* Progress Bar */}
      <div
        style={{
          width: "200px",
          height: "8px",
          backgroundColor: "#333",
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00BFFF, #1E90FF)",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      {/* Progress Text */}
      <p
        style={{
          fontSize: "14px",
          color: "#f1f1f1",
          fontWeight: 600,
          marginTop: "12px",
        }}
      >
        {progress.toFixed(0)}%
      </p>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Html>
  );
};

export default CanvasLoader;
