"use client";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import DynamicNavigation from "@/components/DynamicNavigation";
import MobileDynamicNavigation from "@/components/MobileDynamicNavigation";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export default function Home() {
  const { t, i18n } = useTranslation();
  const {
    settings,
    hero,
    about,
    strategyBlocks,
    companies,
    kpis,
    board,
    speeches,
    gov,
    esg,
    news,
    posts,
    pages,
    isSubmittingContact,
    submitContactForm,
  } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return;
    }

    // Submit form via API
    const result = await submitContactForm(formData);

    if (result.success) {
      // Clear form on success
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  // Loading and error states are now handled by AppProvider

  // Get company name from settings or fallback to translation
  const companyName =
    i18n.language === "ar"
      ? settings?.brand_name_ar || t("site.companyName")
      : settings?.brand_name_en || t("site.companyName");

  return (
    <div className="min-h-screen bg-[#0b1224] text-[#e7ecf4]">
      {/* Header */}
      <header className="sticky top-0 bg-[#0b1224]/95 backdrop-blur-xl border-b border-[#1e2a44]/50 z-30 transition-all duration-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo and Company Name - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#3abff8] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#3abff8]/25 flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">
                  N
                </span>
              </div>
              <span className="text-sm sm:text-lg lg:text-xl font-bold text-[#e7ecf4] transition-colors duration-300 hover:text-[#3abff8] hidden sm:block">
                {companyName}
              </span>
            </div>

            {/* Desktop Navigation - Hidden on smaller screens */}
            <div className="hidden xl:block">
              <DynamicNavigation />
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />
              <MobileDynamicNavigation />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center py-12">
          <div className="lg:col-span-3">
            <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
              <span className="inline-block border border-[#1e2a44] rounded-full px-3 py-1 text-sm text-[#9fb1cc] mb-4">
                {hero?.badge || t("site.badge")}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {hero?.headline || t("hero.title")}
              </h1>
              <p className="text-lg text-[#9fb1cc] mb-8">
                {hero?.subtext || t("hero.subtitle")}
              </p>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis && kpis.length > 0 ? (
                  kpis.map((kpi, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center hover:border-[#3abff8] transition-colors duration-300"
                    >
                      <div className="text-2xl font-bold text-[#22c55e] mb-1">
                        {kpi.value}
                        {kpi.unit && (
                          <span className="text-sm text-[#9fb1cc]">
                            {kpi.unit}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[#9fb1cc] leading-tight">
                        {kpi.label}
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback to hardcoded values if API data is not available
                  <>
                    <div className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#22c55e] mb-1">
                        6+
                      </div>
                      <div className="text-sm text-[#9fb1cc]">
                        {t("hero.kpis.subsidiaries")}
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#22c55e] mb-1">
                        10
                      </div>
                      <div className="text-sm text-[#9fb1cc]">
                        {t("hero.kpis.pillars")}
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#22c55e] mb-1">
                        500+
                      </div>
                      <div className="text-sm text-[#9fb1cc]">
                        {t("hero.kpis.jobs")}
                      </div>
                    </div>
                    <div className="bg-gradient-to-b from-[#0f172f] to-[#0b1935] border border-[#1e2a44] rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#22c55e] mb-1">
                        100%
                      </div>
                      <div className="text-sm text-[#9fb1cc]">
                        {t("hero.kpis.compliance")}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                {t("hero.portfolioTitle")}
              </h2>
              <ul className="space-y-4">
                {hero?.portfolio && hero.portfolio.length > 0 ? (
                  hero.portfolio.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{item.text}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {item.badge}
                      </span>
                    </li>
                  ))
                ) : (
                  // Fallback to hardcoded values if API data is not available
                  <>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.smartAgriculture")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.tharwa")}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.infrastructure")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.bunya")}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.industry")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.azm")}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.contracting")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.albunyan")}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.tourism")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.jathb")}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{t("hero.portfolio.internationalTrade")}</span>
                      <span className="bg-[#1e2a44] px-2 py-1 rounded text-sm">
                        {t("hero.companies.nufudh")}
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              {t("sections.about.title")}
            </h2>
            {about?.body_items && about.body_items.length > 0 ? (
              <div className="text-lg text-[#9fb1cc] leading-relaxed">
                {about.body_items.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            ) : (
              <p className="text-lg text-[#9fb1cc] leading-relaxed">
                <strong className="text-[#e7ecf4]">{companyName}</strong>{" "}
                {t("sections.about.content")}
              </p>
            )}
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.strategy.title")}
            </h2>
            {strategyBlocks && strategyBlocks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {strategyBlocks.map((block, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold mb-4">{block.title}</h3>
                    {block.content_type === "ul" && block.content_items ? (
                      <ul className="space-y-3 text-[#9fb1cc]">
                        {block.content_items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[#9fb1cc]">
                        {block.content_items?.[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {t("sections.strategy.investment.title")}
                  </h3>
                  <ul className="space-y-3 text-[#9fb1cc]">
                    {t("sections.strategy.investment.items", {
                      returnObjects: true,
                    }).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {t("sections.strategy.governance.title")}
                  </h3>
                  <ul className="space-y-3 text-[#9fb1cc]">
                    {t("sections.strategy.governance.items", {
                      returnObjects: true,
                    }).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Chairman Section */}
        <section id="chairman" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.chairman.title")}
            </h2>
            {speeches && speeches.length > 0 ? (
              speeches.map((speech, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start mb-8 last:mb-0"
                >
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#3abff8] to-[#22c55e] flex items-center justify-center text-4xl font-bold text-[#0b1224]">
                    {speech.speaker_name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {speech.speaker_name || t("sections.chairman.name")}
                    </h3>
                    <p className="text-[#9fb1cc] mb-4">
                      {speech.speaker_position ||
                        t("sections.chairman.position")}
                    </p>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[#3abff8]">
                        {speech.title}
                      </h4>
                      <p className="text-lg leading-relaxed">
                        &ldquo;{speech.content}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#3abff8] to-[#22c55e] flex items-center justify-center text-4xl font-bold text-[#0b1224]">
                  {t("sections.chairman.avatar")}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t("sections.chairman.name")}
                  </h3>
                  <p className="text-[#9fb1cc] mb-4">
                    {t("sections.chairman.position")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    &ldquo;{t("sections.chairman.message")}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Board Section */}
        <section id="board" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.board.title")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#1e2a44]">
                    <th className="rtl:text-right text-left py-3 px-4 font-semibold text-[#3abff8]">
                      {t("sections.board.chairman")}
                    </th>
                    <th className="rtl:text-right text-left py-3 px-4 font-semibold text-[#3abff8]">
                      {t("sections.board.fullName")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {board && board.length > 0
                    ? board.map((member, index) => (
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
                          <td className="py-3 px-4 text-[#9fb1cc]">
                            {member.full_name}
                          </td>
                        </tr>
                      ))
                    : // Fallback to translation data if API data is not available
                      t("sections.board.members", { returnObjects: true }).map(
                        (member, index) => (
                          <tr
                            key={index}
                            className={
                              index < 3 ? "border-b border-[#1e2a44]" : ""
                            }
                          >
                            <td className="py-3 px-4 font-semibold">
                              {member.role}
                            </td>
                            <td className="py-3 px-4">{member.name}</td>
                          </tr>
                        )
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section id="sectors" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {companies && companies.length > 0
                ? i18n.language === "ar"
                  ? "القطاعات والشركات التابعة"
                  : "Sectors & Subsidiaries"
                : t("sections.sectors.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies && companies.length > 0
                ? companies.map((company, index) => (
                    <div
                      key={index}
                      className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6 hover:border-[#3abff8] transition-colors"
                    >
                      <a href={`#company-${company.key || company.id}`}>
                        <h3 className="text-lg font-bold mb-3 text-[#e7ecf4] hover:text-[#3abff8] transition-colors">
                          {company.name}
                        </h3>
                      </a>
                      <p className="text-[#9fb1cc] text-sm">
                        {company.short_desc || company.summary}
                      </p>
                    </div>
                  ))
                : // Fallback to hardcoded sectors
                  t("sections.sectors.subsidiaries", {
                    returnObjects: true,
                  }).map((sector, index) => (
                    <div
                      key={index}
                      className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6 hover:border-[#3abff8] transition-colors"
                    >
                      <h3 className="text-lg font-bold mb-3">{sector.name}</h3>
                      <p className="text-[#9fb1cc] text-sm">
                        {sector.description}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Individual Company Sections */}
        {companies && companies.length > 0 && (
          <>
            {companies.map((company, index) => (
              <section
                key={index}
                id={`company-${company.key || company.id}`}
                className="py-12"
              >
                <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
                  <h2 className="text-3xl font-bold mb-6 text-[#e7ecf4]">
                    {company.name}
                  </h2>
                  <p className="text-[#9fb1cc] mb-6">
                    {company.detailed_title || company.summary}
                  </p>

                  {company.long_items && company.long_items.length > 0 && (
                    <ul className="space-y-3 mb-6 text-[#9fb1cc]">
                      {company.long_items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#22c55e] to-[#3abff8] text-[#081225] font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {i18n.language === "ar" ? "طلب تواصل" : "Request Contact"}
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </>
        )}

        {/* Governance Section */}
        <section id="governance" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.governance.title")}
            </h2>
            {gov && gov.length > 0 ? (
              <div className="space-y-6">
                {gov.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6"
                  >
                    <p className="text-[#9fb1cc] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6">
                  <p className="text-[#9fb1cc] leading-relaxed">
                    {t("sections.governance.content")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ESG Section */}
        <section id="esg" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.esg.title")}
            </h2>
            {esg && esg.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {esg.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-[#9fb1cc] text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">
                    {t("sections.esg.environment.title")}
                  </h3>
                  <p className="text-[#9fb1cc] text-sm">
                    {t("sections.esg.environment.description")}
                  </p>
                </div>
                <div className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">
                    {t("sections.esg.social.title")}
                  </h3>
                  <p className="text-[#9fb1cc] text-sm">
                    {t("sections.esg.social.description")}
                  </p>
                </div>
                <div className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">
                    {t("sections.esg.governance.title")}
                  </h3>
                  <p className="text-[#9fb1cc] text-sm">
                    {t("sections.esg.governance.description")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.news.title")}
            </h2>
            {news && news.length > 0 ? (
              <div className="space-y-6">
                {news.map((article, index) => (
                  <div
                    key={index}
                    className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6 hover:border-[#3abff8] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[#e7ecf4]">
                        {article.title}
                      </h3>
                      <span className="text-sm text-[#9fb1cc] bg-[#1e2a44] px-3 py-1 rounded">
                        {new Date(article.date_published).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#9fb1cc] mb-4">{article.summary}</p>
                    {article.body_items && article.body_items.length > 0 && (
                      <div className="text-[#9fb1cc] text-sm">
                        {article.body_items.map((item, itemIndex) => (
                          <p key={itemIndex} className="mb-2">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#9fb1cc] text-lg">
                  {t("sections.news.noNews")}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {posts && posts.length > 0
                ? i18n.language === "ar"
                  ? "المدونة"
                  : "Blog"
                : t("sections.blog.title")}
            </h2>
            {posts && posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-[#0b1935] border border-[#1e2a44] rounded-xl p-6 hover:border-[#3abff8] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[#e7ecf4]">
                        {post.title}
                      </h3>
                      <span className="text-sm text-[#9fb1cc] bg-[#1e2a44] px-3 py-1 rounded">
                        {new Date(post.date_published).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#9fb1cc] mb-4">{post.summary}</p>
                    {post.body_items && post.body_items.length > 0 && (
                      <div className="text-[#9fb1cc] text-sm">
                        {post.body_items.map((item, itemIndex) => (
                          <p key={itemIndex} className="mb-2">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="mt-4">
                      <a
                        href="#contact"
                        className="inline-flex items-center text-[#3abff8] hover:text-[#22c55e] transition-colors font-medium"
                      >
                        {i18n.language === "ar"
                          ? "اقرأ المزيد / تواصل"
                          : "Read more / Contact"}
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#9fb1cc] text-lg">
                  {i18n.language === "ar"
                    ? "مقالات ورؤى حول الاستثمار، الاستدامة، وإعادة الإعمار — لتحسين الظهور في نتائج البحث."
                    : "Insights on investment, sustainability, and reconstruction — crafted to enhance search visibility."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12">
          <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-8">
              {t("sections.contact.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {t("sections.contact.office")}
                </h3>
                <div className="space-y-4 text-[#9fb1cc]">
                  <p className="text-lg font-medium text-[#e7ecf4]">
                    {t("sections.contact.country")}
                  </p>

                  <div className="flex items-start gap-3">
                    <MdLocationOn className="text-[#3abff8] text-xl mt-0.5 flex-shrink-0" />
                    <p className="text-[#9fb1cc]">
                      {t("sections.contact.address")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdPhone className="text-[#3abff8] text-xl flex-shrink-0" />
                    <p className="text-[#9fb1cc]">
                      {t("sections.contact.phone")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdEmail className="text-[#3abff8] text-xl flex-shrink-0" />
                    <a
                      href={`mailto:${
                        settings?.contact_email || t("sections.contact.email")
                      }`}
                      className="text-[#3abff8] hover:underline transition-colors"
                    >
                      {settings?.contact_email || t("sections.contact.email")}
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("sections.contact.name")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("sections.contact.placeholders.name")}
                        className="w-full px-4 py-3 bg-[#0b1224] border border-[#1e2a44] rounded-lg text-[#e7ecf4] focus:border-[#3abff8] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("sections.contact.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("sections.contact.placeholders.email")}
                        className="w-full px-4 py-3 bg-[#0b1224] border border-[#1e2a44] rounded-lg text-[#e7ecf4] focus:border-[#3abff8] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("sections.contact.subject")}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t("sections.contact.placeholders.subject")}
                      className="w-full px-4 py-3 bg-[#0b1224] border border-[#1e2a44] rounded-lg text-[#e7ecf4] focus:border-[#3abff8] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("sections.contact.message")}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("sections.contact.placeholders.message")}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0b1224] border border-[#1e2a44] rounded-lg text-[#e7ecf4] focus:border-[#3abff8] focus:outline-none resize-vertical"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className={`w-full bg-gradient-to-r from-[#22c55e] to-[#3abff8] text-[#0b1224] font-bold py-3 px-6 rounded-lg transition-opacity ${
                      isSubmittingContact
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`}
                  >
                    {isSubmittingContact
                      ? t("sections.contact.sending")
                      : t("sections.contact.send")}
                  </button>

                  <p className="text-sm text-[#9fb1cc] text-center">
                    {t("sections.contact.help")}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Pages Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-6">
              {pages && pages.length > 0 ? (
                pages.map((page, index) => (
                  <div
                    key={index}
                    id={page.key}
                    className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-6 hover:border-[#3abff8] transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-4 text-[#e7ecf4]">
                      {page.title}
                    </h3>
                    {page.body_type === "ul" && page.body_items ? (
                      <ul className="space-y-2 text-[#9fb1cc] text-sm">
                        {page.body_items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : page.body_type === "ol" && page.body_items ? (
                      <ol className="space-y-2 text-[#9fb1cc] text-sm">
                        {page.body_items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <div className="text-[#9fb1cc] text-sm">
                        {page.body_items?.map((item, itemIndex) => (
                          <p key={itemIndex} className="mb-2">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Fallback to hardcoded legal pages
                <>
                  <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-6 hover:border-[#3abff8] transition-colors">
                    <h3 className="text-xl font-bold mb-4 text-[#e7ecf4]">
                      {t("sections.legal.compliance.title")}
                    </h3>
                    <p className="text-[#9fb1cc] text-sm mb-4">
                      {t("sections.legal.compliance.description")}
                    </p>
                    <ul className="space-y-2 text-[#9fb1cc] text-sm">
                      {t("sections.legal.compliance.items", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-6 hover:border-[#3abff8] transition-colors">
                    <h3 className="text-xl font-bold mb-4 text-[#e7ecf4]">
                      {t("sections.legal.privacy.title")}
                    </h3>
                    <p className="text-[#9fb1cc] text-sm mb-4">
                      {t("sections.legal.privacy.description")}
                    </p>
                    <ul className="space-y-2 text-[#9fb1cc] text-sm">
                      {t("sections.legal.privacy.items", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-6 hover:border-[#3abff8] transition-colors">
                    <h3 className="text-xl font-bold mb-4 text-[#e7ecf4]">
                      {t("sections.legal.supply.title")}
                    </h3>
                    <p className="text-[#9fb1cc] text-sm mb-4">
                      {t("sections.legal.supply.description")}
                    </p>
                    <ul className="space-y-2 text-[#9fb1cc] text-sm">
                      {t("sections.legal.supply.items", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-6 hover:border-[#3abff8] transition-colors">
                    <h3 className="text-xl font-bold mb-4 text-[#e7ecf4]">
                      {t("sections.legal.terms.title")}
                    </h3>
                    <p className="text-[#9fb1cc] text-sm mb-4">
                      {t("sections.legal.terms.description")}
                    </p>
                    <ol className="space-y-2 text-[#9fb1cc] text-sm">
                      {t("sections.legal.terms.items", {
                        returnObjects: true,
                      }).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e2a44] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#9fb1cc]">
            © {new Date().getFullYear()} {companyName}.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </footer>
    </div>
  );
}
