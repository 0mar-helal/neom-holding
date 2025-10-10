import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const TestApi = () => {
  const { settings, isLoading, isError } = useAppContext();

  if (isLoading) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">اختبار API</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">اختبار API</h2>
        <ErrorBoundary error={isError} />
      </div>
    );
  }

  return (
    <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">
        اختبار API - البيانات المستلمة
      </h2>
      <div className="space-y-4">
        <div className="bg-[#0b1935] border border-[#1e2a44] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
            اسم الشركة
          </h3>
          <p className="text-[#9fb1cc]">العربية: {settings?.brand_name_ar}</p>
          <p className="text-[#9fb1cc]">English: {settings?.brand_name_en}</p>
        </div>

        <div className="bg-[#0b1935] border border-[#1e2a44] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
            معلومات الاتصال
          </h3>
          <p className="text-[#9fb1cc]">
            البريد الإلكتروني: {settings?.contact_email}
          </p>
          <p className="text-[#9fb1cc]">الهاتف: {settings?.office_phone}</p>
        </div>

        <div className="bg-[#0b1935] border border-[#1e2a44] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#3abff8] mb-2">العنوان</h3>
          <p className="text-[#9fb1cc]">
            العربية: {settings?.office_address_ar}
          </p>
          <p className="text-[#9fb1cc]">
            English: {settings?.office_address_en}
          </p>
        </div>

        <div className="bg-[#0b1935] border border-[#1e2a44] rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
            معلومات إضافية
          </h3>
          <p className="text-[#9fb1cc]">
            الرابط الأساسي: {settings?.canonical_url}
          </p>
          <p className="text-[#9fb1cc]">صورة OG: {settings?.og_image}</p>
        </div>
      </div>
    </div>
  );
};

export default TestApi;
