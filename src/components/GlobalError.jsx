import React from "react";
import ErrorBoundary from "./ErrorBoundary";

// Static error component to prevent re-renders
const GlobalError = ({ error }) => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-6">
      <ErrorBoundary error={error} />
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    </div>
  </div>
);

export default GlobalError;
