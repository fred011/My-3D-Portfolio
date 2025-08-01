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
