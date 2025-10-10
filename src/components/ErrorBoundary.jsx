import React from "react";

const ErrorBoundary = ({ error, children, fallback = null }) => {
  if (error) {
    return (
      fallback || (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
          <h3 className="font-bold mb-2">خطأ في تحميل البيانات</h3>
          <p className="text-sm">
            {error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."}
          </p>
        </div>
      )
    );
  }

  return children;
};

export default ErrorBoundary;
