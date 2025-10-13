import React from "react";
import LoadingSpinner from "./LoadingSpinner";

// Static loading component to prevent re-renders
const GlobalLoading = () => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" className="mb-4" />
    </div>
  </div>
);

export default GlobalLoading;
