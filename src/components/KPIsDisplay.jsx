import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const KPIsDisplay = () => {
  const { kpis, isLoading, isError } = useAppContext();

  if (isLoading) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">المؤشرات الرئيسية</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">المؤشرات الرئيسية</h2>
        <ErrorBoundary error={isError} />
      </div>
    );
  }

  if (!kpis || kpis.length === 0) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">المؤشرات الرئيسية</h2>
        <p className="text-[#9fb1cc]">لا توجد مؤشرات متاحة</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">المؤشرات الرئيسية</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center hover:border-[#3abff8] transition-colors duration-300"
          >
            <div className="text-2xl font-bold text-[#22c55e] mb-1">
              {kpi.value}
              {kpi.unit && (
                <span className="text-sm text-[#9fb1cc]">{kpi.unit}</span>
              )}
            </div>
            <div className="text-sm text-[#9fb1cc] leading-tight">
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPIsDisplay;
