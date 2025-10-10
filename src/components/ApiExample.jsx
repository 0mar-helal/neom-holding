import React from "react";
import {
  useSettingsAsObject,
  useKPIs,
  useCompanies,
  useBoard,
  useESG,
  useNews,
  useDashboardData,
} from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const ApiExample = () => {
  // Example of using individual hooks
  const {
    settings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useSettingsAsObject();
  const { kpis, isLoading: kpisLoading, isError: kpisError } = useKPIs();
  const {
    companies,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useCompanies();
  const { board, isLoading: boardLoading, isError: boardError } = useBoard();
  const { esg, isLoading: esgLoading, isError: esgError } = useESG();
  const { news, isLoading: newsLoading, isError: newsError } = useNews();

  // Example of using the combined dashboard data hook
  const dashboardData = useDashboardData();

  if (
    settingsLoading ||
    kpisLoading ||
    companiesLoading ||
    boardLoading ||
    esgLoading ||
    newsLoading
  ) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">مثال على استخدام API</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Settings Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">إعدادات الموقع</h2>
        {settingsError ? (
          <ErrorBoundary error={settingsError} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
                اسم الشركة
              </h3>
              <p className="text-[#9fb1cc]">
                العربية: {settings?.brand_name_ar}
              </p>
              <p className="text-[#9fb1cc]">
                English: {settings?.brand_name_en}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
                معلومات الاتصال
              </h3>
              <p className="text-[#9fb1cc]">
                البريد: {settings?.contact_email}
              </p>
              <p className="text-[#9fb1cc]">الهاتف: {settings?.office_phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* KPIs Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">المؤشرات الرئيسية</h2>
        {kpisError ? (
          <ErrorBoundary error={kpisError} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis?.results?.slice(0, 4).map((kpi, index) => (
              <div
                key={index}
                className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-[#22c55e] mb-1">
                  {kpi.value || "N/A"}
                </div>
                <div className="text-sm text-[#9fb1cc]">
                  {kpi.title || kpi.name || `KPI ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Companies Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">الشركات التابعة</h2>
        {companiesError ? (
          <ErrorBoundary error={companiesError} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies?.results?.slice(0, 6).map((company, index) => (
              <div
                key={index}
                className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-4"
              >
                <h3 className="text-lg font-bold mb-2">
                  {company.name || company.title}
                </h3>
                <p className="text-[#9fb1cc] text-sm">
                  {company.description || company.summary || "لا يوجد وصف متاح"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Board Members Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">أعضاء مجلس الإدارة</h2>
        {boardError ? (
          <ErrorBoundary error={boardError} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#1e2a44]">
                  <th className="text-left py-3 px-4">المنصب</th>
                  <th className="text-left py-3 px-4">الاسم</th>
                  <th className="text-left py-3 px-4">الجنسية</th>
                </tr>
              </thead>
              <tbody>
                {board?.results?.slice(0, 5).map((member, index) => (
                  <tr key={index} className="border-b border-[#1e2a44]">
                    <td className="py-3 px-4 font-semibold">
                      {member.position || member.role || "عضو مجلس إدارة"}
                    </td>
                    <td className="py-3 px-4">
                      {member.name || member.full_name}
                    </td>
                    <td className="py-3 px-4">
                      {member.nationality || "غير محدد"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ESG Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">الاستدامة والحوكمة</h2>
        {esgError ? (
          <ErrorBoundary error={esgError} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esg?.results?.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-3">
                  {item.title || item.name || `عنصر ${index + 1}`}
                </h3>
                <p className="text-[#9fb1cc] text-sm">
                  {item.description || item.content || "لا يوجد وصف متاح"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* News Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">الأخبار</h2>
        {newsError ? (
          <ErrorBoundary error={newsError} />
        ) : (
          <div className="space-y-4">
            {news?.results?.slice(0, 3).map((article, index) => (
              <div
                key={index}
                className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-4"
              >
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-[#9fb1cc] text-sm mb-2">
                  {article.summary || article.excerpt || "لا يوجد ملخص متاح"}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {article.published_date ||
                    article.created_at ||
                    "تاريخ غير محدد"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dashboard Data Example */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          بيانات لوحة التحكم (مثال على الاستخدام المشترك)
        </h2>
        {dashboardData.isError ? (
          <ErrorBoundary error={dashboardData.isError} />
        ) : (
          <div className="text-[#9fb1cc]">
            <p>تم تحميل البيانات بنجاح من جميع المصادر</p>
            <p>
              عدد الإعدادات:{" "}
              {dashboardData.settings
                ? Object.keys(dashboardData.settings).length
                : 0}
            </p>
            <p>عدد المؤشرات: {dashboardData.kpis?.results?.length || 0}</p>
            <p>عدد الشركات: {dashboardData.companies?.results?.length || 0}</p>
            <p>
              عدد أعضاء مجلس الإدارة:{" "}
              {dashboardData.board?.results?.length || 0}
            </p>
            <p>
              عدد عناصر الاستدامة: {dashboardData.esg?.results?.length || 0}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiExample;
