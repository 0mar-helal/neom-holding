import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const SettingsDisplay = () => {
  const { settings, isLoading, isError } = useAppContext();

  if (isLoading) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2>
        <ErrorBoundary error={isError} />
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
              اسم الشركة
            </h3>
            <div className="space-y-2">
              <p>
                <span className="text-[#9fb1cc]">العربية:</span>{" "}
                {settings.brand_name_ar}
              </p>
              <p>
                <span className="text-[#9fb1cc]">English:</span>{" "}
                {settings.brand_name_en}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
              معلومات الاتصال
            </h3>
            <div className="space-y-2">
              <p>
                <span className="text-[#9fb1cc]">البريد الإلكتروني:</span>{" "}
                {settings.contact_email}
              </p>
              <p>
                <span className="text-[#9fb1cc]">الهاتف:</span>{" "}
                {settings.office_phone}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
              العنوان
            </h3>
            <div className="space-y-2">
              <p>
                <span className="text-[#9fb1cc]">العربية:</span>{" "}
                {settings.office_address_ar}
              </p>
              <p>
                <span className="text-[#9fb1cc]">English:</span>{" "}
                {settings.office_address_en}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
              الرابط الأساسي
            </h3>
            <p className="text-[#9fb1cc] break-all">{settings.canonical_url}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDisplay;
