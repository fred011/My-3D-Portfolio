import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");
  const [isMounted, setIsMounted] = useState(false);

  const loadingMessages = [
    "Initializing",
    "Loading assets",
    "Preparing interface",
    "Finalizing details",
    "Welcome",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;

        // Update loading message based on progress
        if (newProgress >= 20 && newProgress < 40) {
          setLoadingText(loadingMessages[1]);
        } else if (newProgress >= 40 && newProgress < 60) {
          setLoadingText(loadingMessages[2]);
        } else if (newProgress >= 60 && newProgress < 80) {
          setLoadingText(loadingMessages[3]);
        } else if (newProgress >= 80) {
          setLoadingText(loadingMessages[4]);
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
            Ferdinand
          </h1>
          <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">
            Portfolio
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border-2 border-slate-700 rounded-full"></div>
              <div
                className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full animate-spin"
                style={{ animationDuration: "1s" }}
              ></div>
            </div>
          </div>

          <p className="text-slate-300 text-sm font-medium mb-6">
            {loadingText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-mono">
              {Math.round(progress)}%
            </span>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-slate-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subtle loading text */}
        <p className="text-xs text-slate-600 mt-8 font-mono">
          Loading experience...
        </p>
      </div>
    </div>
  );
}
