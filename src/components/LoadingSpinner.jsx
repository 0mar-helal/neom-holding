import React from "react";

// Memoized size classes to prevent recreation
const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const LoadingSpinner = React.memo(({ size = "md", className = "" }) => {
  return (
    <div
      className={`loading-container flex justify-center items-center ${className}`}
    >
      <div
        className={`${sizeClasses[size]} border-2 border-border border-t-primary rounded-full loading-spinner`}
        style={{
          animation: "smooth-spin 1s linear infinite",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      ></div>
    </div>
  );
});

export default LoadingSpinner;
