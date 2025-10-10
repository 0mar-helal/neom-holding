import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const BoardDisplay = () => {
  const { board, isLoading, isError } = useAppContext();

  if (isLoading) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">مجلس الإدارة</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">مجلس الإدارة</h2>
        <ErrorBoundary error={isError} />
      </div>
    );
  }

  if (!board || board.length === 0) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">مجلس الإدارة</h2>
        <p className="text-[#9fb1cc]">لا توجد بيانات متاحة</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">مجلس الإدارة</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#1e2a44]">
              <th className="text-right py-3 px-4 font-semibold text-[#3abff8]">
                المنصب
              </th>
              <th className="text-right py-3 px-4 font-semibold text-[#3abff8]">
                الاسم الكامل
              </th>
            </tr>
          </thead>
          <tbody>
            {board.map((member, index) => (
              <tr
                key={index}
                className={`border-b border-[#1e2a44] hover:bg-[#0b1935] transition-colors ${
                  member.is_chairman ? "bg-[#3abff8]/5" : ""
                }`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {member.is_chairman && (
                      <span className="w-2 h-2 bg-[#22c55e] rounded-full"></span>
                    )}
                    <span className="font-semibold text-[#e7ecf4]">
                      {member.role_label}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#9fb1cc]">{member.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardDisplay;
