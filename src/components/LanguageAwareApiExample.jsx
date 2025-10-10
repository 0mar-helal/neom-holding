import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/contexts/AppContext";
import {
  useSettingsAsObject,
  useMenu,
  useKPIs,
  useCompanies,
  useBoard,
  useESG,
  useNews,
  useDashboardData,
} from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const LanguageAwareApiExample = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  // Get shared data from context
  const { settings, menu, kpis } = useAppContext();

  // Individual hooks with language support for demonstration
  const {
    settings: contextSettings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useSettingsAsObject(selectedLang);
  const {
    menu: contextMenu,
    isLoading: menuLoading,
    isError: menuError,
  } = useMenu(selectedLang);
  const {
    kpis: contextKpis,
    isLoading: kpisLoading,
    isError: kpisError,
  } = useKPIs(selectedLang);
  const {
    companies,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useCompanies(selectedLang);
  const {
    board,
    isLoading: boardLoading,
    isError: boardError,
  } = useBoard(selectedLang);
  const {
    esg,
    isLoading: esgLoading,
    isError: esgError,
  } = useESG(selectedLang);
  const {
    news,
    isLoading: newsLoading,
    isError: newsError,
  } = useNews(selectedLang);

  // Combined dashboard data with language support
  const dashboardData = useDashboardData(selectedLang);

  const isLoading =
    settingsLoading ||
    menuLoading ||
    kpisLoading ||
    companiesLoading ||
    boardLoading ||
    esgLoading ||
    newsLoading;

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  if (isLoading) {
    return (
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Language-Aware API Example</h2>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Language Selector */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Language-Aware API Example</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLang === "en"
                ? "bg-[#3abff8] text-[#0b1224]"
                : "bg-[#1e2a44] text-[#9fb1cc] hover:bg-[#2a3a5c]"
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("ar")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLang === "ar"
                ? "bg-[#3abff8] text-[#0b1224]"
                : "bg-[#1e2a44] text-[#9fb1cc] hover:bg-[#2a3a5c]"
            }`}
          >
            العربية
          </button>
        </div>
        <p className="text-[#9fb1cc]">
          Current Language:{" "}
          <span className="text-[#3abff8] font-semibold">
            {selectedLang.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Settings Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Settings ({selectedLang.toUpperCase()})
        </h2>
        {settingsError ? (
          <ErrorBoundary error={settingsError} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
                Company Name
              </h3>
              <p className="text-[#9fb1cc]">
                Arabic: {settings?.brand_name_ar}
              </p>
              <p className="text-[#9fb1cc]">
                English: {settings?.brand_name_en}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#3abff8] mb-2">
                Contact Info
              </h3>
              <p className="text-[#9fb1cc]">Email: {settings?.contact_email}</p>
              <p className="text-[#9fb1cc]">Phone: {settings?.office_phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Navigation Menu ({selectedLang.toUpperCase()})
        </h2>
        {menuError ? (
          <ErrorBoundary error={menuError} />
        ) : (
          <div className="flex flex-wrap gap-4">
            {menu?.results?.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="bg-[#0b1935] border border-[#1e2a44] rounded-lg px-4 py-2 text-[#9fb1cc] hover:text-[#3abff8] hover:border-[#3abff8] transition-colors"
              >
                {item.label} (Sort: {item.sort})
              </a>
            ))}
          </div>
        )}
      </div>

      {/* KPIs Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          KPIs ({selectedLang.toUpperCase()})
        </h2>
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
        <h2 className="text-2xl font-bold mb-6">
          Companies ({selectedLang.toUpperCase()})
        </h2>
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
                  {company.description ||
                    company.summary ||
                    "No description available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Board Members Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Board Members ({selectedLang.toUpperCase()})
        </h2>
        {boardError ? (
          <ErrorBoundary error={boardError} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#1e2a44]">
                  <th className="text-left py-3 px-4">Position</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {board?.results?.slice(0, 5).map((member, index) => (
                  <tr key={index} className="border-b border-[#1e2a44]">
                    <td className="py-3 px-4 font-semibold">
                      {member.position || member.role || "Board Member"}
                    </td>
                    <td className="py-3 px-4">
                      {member.name || member.full_name}
                    </td>
                    <td className="py-3 px-4">
                      {member.nationality || "Not specified"}
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
        <h2 className="text-2xl font-bold mb-6">
          ESG ({selectedLang.toUpperCase()})
        </h2>
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
                  {item.title || item.name || `Item ${index + 1}`}
                </h3>
                <p className="text-[#9fb1cc] text-sm">
                  {item.description ||
                    item.content ||
                    "No description available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* News Display */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          News ({selectedLang.toUpperCase()})
        </h2>
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
                  {article.summary || article.excerpt || "No summary available"}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {article.published_date ||
                    article.created_at ||
                    "Date not specified"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dashboard Data Summary */}
      <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Dashboard Data Summary ({selectedLang.toUpperCase()})
        </h2>
        {dashboardData.isError ? (
          <ErrorBoundary error={dashboardData.isError} />
        ) : (
          <div className="text-[#9fb1cc] space-y-2">
            <p>✅ Data loaded successfully from all sources</p>
            <p>
              Settings count:{" "}
              {dashboardData.settings
                ? Object.keys(dashboardData.settings).length
                : 0}
            </p>
            <p>KPIs count: {dashboardData.kpis?.results?.length || 0}</p>
            <p>
              Companies count: {dashboardData.companies?.results?.length || 0}
            </p>
            <p>
              Board members count: {dashboardData.board?.results?.length || 0}
            </p>
            <p>ESG items count: {dashboardData.esg?.results?.length || 0}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageAwareApiExample;
