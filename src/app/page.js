"use client";

import { useTranslation } from "react-i18next";
import { useHomeContext } from "@/contexts/HomeContext";
import { useState } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import {
  FaFacebook,
  FaXTwitter,
  FaThreads,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import Image from "next/image";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

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
  } = useHomeContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Dynamic social media configuration
  const socialMediaConfig = {
    facebook_account: {
      icon: FaFacebook,
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166FE5]",
      urlPrefix: "",
    },
    x_account: {
      icon: FaXTwitter,
      name: "X",
      color: "bg-black hover:bg-gray-800",
      urlPrefix: "",
    },
    threads_account: {
      icon: FaThreads,
      name: "Threads",
      color: "bg-black hover:bg-gray-800",
      urlPrefix: "",
    },
    instagram_account: {
      icon: FaInstagram,
      name: "Instagram",
      color:
        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      urlPrefix: "",
    },
    linkedin_account: {
      icon: FaLinkedin,
      name: "LinkedIn",
      color: "bg-[#0077B5] hover:bg-[#005885]",
      urlPrefix: "",
    },
    youtube_account: {
      icon: FaYoutube,
      name: "YouTube",
      color: "bg-[#FF0000] hover:bg-[#CC0000]",
      urlPrefix: "",
    },
    tiktok_account: {
      icon: FaTiktok,
      name: "TikTok",
      color: "bg-black hover:bg-gray-800",
      urlPrefix: "",
    },
    snapchat_account: {
      icon: FaSnapchat,
      name: "Snapchat",
      color: "bg-[#FFFC00] text-black hover:bg-[#E6E300]",
      urlPrefix: "",
    },
    telegram_account: {
      icon: FaTelegram,
      name: "Telegram",
      color: "bg-[#0088CC] hover:bg-[#006699]",
      urlPrefix: "",
    },
    whatsapp_account: {
      icon: FaWhatsapp,
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#1DA851]",
      urlPrefix: "",
    },
  };

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


  // Function to render social media links dynamically
  const renderSocialMediaLinks = () => {
    if (!settings) return null;

    // Get all social media accounts from settings that have values
    const socialAccounts = Object.keys(socialMediaConfig).filter(
      (key) => settings[key] && settings[key].trim() !== ""
    );

    if (socialAccounts.length === 0) return null;

    return (
      <div className="pt-4">
        <h4 className="text-lg font-semibold text-foreground mb-3">
          {i18n.language === "ar" ? "تابعنا على" : "Follow Us"}
        </h4>
        <div className="flex flex-wrap gap-3">
          {socialAccounts.map((accountKey) => {
            const config = socialMediaConfig[accountKey];
            const IconComponent = config.icon;
            const accountUrl = settings[accountKey];
            const fullUrl = config.urlPrefix + accountUrl;

            return (
              <a
                key={accountKey}
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${config.color}`}
                aria-label={config.name}
              >
                <IconComponent className="w-5 h-5" />
                {/* <span className="text-sm font-medium">{config.name}</span> */}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <SEOHead
        title={t("site.title")}
        description={t("site.description")}
        keywords={[
          "Saudi-Syrian investment",
          "Syria reconstruction",
          "holding company",
          "agriculture investment",
          "infrastructure development",
          "tourism investment",
          "ESG standards",
          "corporate governance",
        ]}
        url="/"
        type="website"
      />
      <StructuredData />

      <div className="min-h-screen bg-background text-foreground">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-section-gap">
            {/* Hero Section */}
            <section
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
              aria-labelledby="hero-title"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              <div className="lg:col-span-3">
                <div
                  className="bg-background-card border border-border rounded-2xl p-8"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                  data-aos-duration="500"
                >
                  <span
                    className="inline-block border border-border rounded-full px-3 py-1 text-sm text-foreground-secondary mb-4"
                    data-aos="fade-up"
                    data-aos-delay="150"
                  >
                    {hero?.badge}
                  </span>
                  <h1
                    id="hero-title"
                    className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    {hero?.headline}
                  </h1>
                  <p
                    className="text-lg text-foreground-secondary mb-8"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    {hero?.subtext}
                  </p>

                  {/* KPIs */}
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                    data-aos="fade-up"
                    data-aos-delay="150"
                  >
                    {hero?.kpis &&
                      hero?.kpis.length > 0 &&
                      hero?.kpis.map((kpi, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-b from-background-card to-background-accent border border-border rounded-xl p-4 text-center hover:border-primary transition"
                          data-aos="fade-up"
                          data-aos-delay={350 + index * 50}
                        >
                          <div className="text-2xl font-bold text-primary mb-1">
                            {kpi.value}
                            {kpi.unit && (
                              <span className="text-sm text-foreground-secondary">
                                {kpi.unit}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-foreground-secondary leading-tight">
                            {kpi.label}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div
                className="lg:col-span-2"
                data-aos="fade-left"
                data-aos-delay="150"
              >
                <div
                  className="bg-background-card border border-border rounded-2xl p-8"
                  data-aos="flip-right"
                  data-aos-delay="250"
                >
                  <h2
                    className="text-2xl font-bold mb-6"
                    data-aos="fade-up"
                    data-aos-delay="150"
                  >
                    {t("hero.portfolioTitle")}
                  </h2>
                  <ul
                    className="space-y-4"
                    data-aos="fade-up"
                    data-aos-delay="350"
                  >
                    {hero?.portfolio &&
                      hero.portfolio.length > 0 &&
                      hero.portfolio.map((item, index) => (
                        <li
                          key={index}
                          data-aos="fade-up"
                          data-aos-delay={400 + index * 50}
                        >
                          <div className="!flex !items-center !justify-between gap-2">
                            <span>{item.text}</span>
                            <span className="bg-background-accent px-2 py-1 rounded text-sm">
                              {item.badge}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-6"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.about.title")}
                </h2>
                {about?.body_items && about.body_items.length > 0 && (
                  <div
                    className="text-lg text-foreground-secondary leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {about.body_items.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Strategy Section */}
            <section id="strategy" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.strategy.title")}
                </h2>
                {strategyBlocks && strategyBlocks.length > 0 && (
                  <div
                    className="grid md:grid-cols-2 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {strategyBlocks.map((block, index) => (
                      <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={250 + index * 100}
                      >
                        <h3 className="text-xl font-bold mb-4">
                          {block.title}
                        </h3>
                        {block.content_type === "ul" && block.content_items ? (
                          <ul className="space-y-3 text-foreground-secondary">
                            {block.content_items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-foreground-secondary">
                            {block.content_items?.[0]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Chairman Section */}
            <section id="chairman" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.chairman.title")}
                </h2>
                {speeches &&
                  speeches.length > 0 &&
                  speeches.map((speech, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start mb-8 last:mb-0"
                      data-aos="fade-up"
                      data-aos-delay={400 + index * 200}
                    >
                      <div
                        className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-4xl font-bold text-primary-foreground overflow-hidden"
                        data-aos="scale-up"
                        data-aos-delay={250 + index * 100}
                      >
                        {speech.photo ? (
                          <Image
                            src={speech.photo}
                            alt={speech.speaker_name || "Speaker"}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            speech.photo ? "hidden" : "flex"
                          }`}
                          style={{ display: speech.photo ? "none" : "flex" }}
                        >
                          {speech.speaker_name?.charAt(0) || "C"}
                        </div>
                      </div>
                      <div
                        data-aos="fade-left"
                        data-aos-delay={300 + index * 100}
                      >
                        <h3 className="text-2xl font-bold mb-2">
                          {speech.speaker_name}
                        </h3>
                        <p className="text-foreground-secondary mb-4">
                          {speech.speaker_position}
                        </p>
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-primary">
                            {speech.title}
                          </h4>
                          <p className="text-lg leading-relaxed">
                            &ldquo;{speech.content}&rdquo;
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Board Section */}
            <section id="board" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.board.title")}
                </h2>
                {/* Desktop Table View */}
                <div
                  className="hidden md:block overflow-x-auto overflow-y-hidden shadow-lg rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="rtl:text-right text-left py-3 px-4 font-semibold text-primary w-1/4">
                          {t("sections.board.chairman")}
                        </th>
                        <th className="rtl:text-right text-left py-3 px-4 font-semibold text-primary w-1/2">
                          {t("sections.board.fullName")}
                        </th>
                        <th className="rtl:text-right text-left py-3 px-4 font-semibold text-primary w-1/4">
                          {t("sections.board.nationality")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {board &&
                        board.length > 0 &&
                        board.map((member, index) => (
                          <tr
                            key={index}
                            className={`border-b border-border hover:bg-background-accent transition-colors ${
                              member.is_chairman ? "bg-primary/5" : ""
                            }`}
                            data-aos="fade-up"
                            data-aos-delay={250 + index * 50}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {member.is_chairman && (
                                  <span className="w-2 h-2 bg-primary-light rounded-full"></span>
                                )}
                                <span className="font-semibold text-foreground">
                                  {member.role_label}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-foreground-secondary">
                              {member.full_name}
                            </td>
                            <td className="py-3 px-4 text-foreground-secondary">
                              {member.nationality}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div
                  className="md:hidden space-y-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {board &&
                    board.length > 0 &&
                    board.map((member, index) => (
                      <div
                        key={index}
                        className={`bg-background-accent border border-border rounded-xl p-4 ${
                          member.is_chairman
                            ? "border-primary/30 bg-primary/5"
                            : ""
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {member.is_chairman && (
                              <span className="w-2 h-2 bg-primary-light rounded-full"></span>
                            )}
                            <span className="font-semibold text-foreground text-sm">
                              {member.role_label}
                            </span>
                          </div>
                          <span className="text-xs text-foreground-secondary bg-background px-2 py-1 rounded">
                            {member.nationality}
                          </span>
                        </div>
                        <p className="text-foreground-secondary text-sm">
                          {member.full_name}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            {/* Sectors Section */}
            <section id="sectors" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {companies && companies.length > 0
                    ? i18n.language === "ar"
                      ? "القطاعات والشركات التابعة"
                      : "Sectors & Subsidiaries"
                    : t("sections.sectors.title")}
                </h2>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {companies &&
                    companies.length > 0 &&
                    companies.map((company, index) => (
                      <div
                        key={index}
                        className="bg-background-accent border border-border rounded-xl p-6 hover:border-border-hover transition-colors"
                        data-aos="zoom-in-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <a
                          href={`#company-${
                            company.name.toLowerCase().replace(/ /g, "-") ||
                            company.id
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            const targetId = `company-${
                              company.name.toLowerCase().replace(/ /g, "-") ||
                              company.id
                            }`;
                            const targetElement =
                              document.getElementById(targetId);
                            if (targetElement) {
                              const offsetTop = targetElement.offsetTop - 100; // 100px offset above the section
                              window.scrollTo({
                                top: offsetTop,
                                behavior: "smooth",
                              });
                            }
                          }}
                        >
                          <h3 className="text-lg font-bold mb-3 text-foreground hover:text-primary transition-colors">
                            {company.name}
                          </h3>
                        </a>
                        <p className="text-foreground-secondary text-sm">
                          {company.short_desc || company.summary}
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
                    id={`company-${
                      company.name.toLowerCase().replace(/ /g, "-") ||
                      company.id
                    }`}
                    data-aos="fade-up"
                    data-aos-duration="500"
                  >
                    <div
                      className="bg-background-card border border-border rounded-2xl p-8"
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    >
                      <h2
                        className="text-3xl font-bold mb-6 text-foreground"
                        data-aos="fade-up"
                        data-aos-delay="150"
                      >
                        {company.name}
                      </h2>
                      <p
                        className="text-foreground-secondary mb-6"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        {company.detailed_title || company.summary}
                      </p>

                      {company.long_items && company.long_items.length > 0 && (
                        <ul
                          className="space-y-3 mb-6 text-foreground-secondary"
                          data-aos="fade-up"
                          data-aos-delay="250"
                        >
                          {company.long_items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              data-aos="fade-up"
                              data-aos-delay={300 + itemIndex * 50}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div
                        className="mt-6"
                        data-aos="fade-up"
                        data-aos-delay="350"
                      >
                        <a
                          href="#contact"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          {i18n.language === "ar"
                            ? "طلب تواصل"
                            : "Request Contact"}
                        </a>
                      </div>
                    </div>
                  </section>
                ))}
              </>
            )}

            {/* Governance Section */}
            <section id="governance" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.governance.title")}
                </h2>
                {gov && gov.length > 0 && (
                  <div
                    className="space-y-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {gov.map((item, index) => (
                      <div
                        key={index}
                        className="bg-background-accent border border-border rounded-xl p-6"
                        data-aos="fade-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <p className="text-foreground-secondary leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ESG Section */}
            <section id="esg" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.esg.title")}
                </h2>
                {esg && esg.length > 0 && (
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {esg.map((item, index) => (
                      <div
                        key={index}
                        className="bg-background-accent border border-border rounded-xl p-6"
                        data-aos="zoom-in-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                        <p className="text-foreground-secondary text-sm">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Investor Relations Section */}
            <section id="Investor" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.investors.title")}
                </h2>
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div
                    className="bg-background-accent border border-border rounded-xl p-6"
                    data-aos="zoom-in-up"
                    data-aos-delay="250"
                  >
                    <h3 className="text-lg font-bold mb-3 text-foreground">
                      {t("sections.investors.distributionPolicies.title")}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {t("sections.investors.distributionPolicies.description")}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-background-accent text-foreground-secondary px-3 py-1 rounded text-xs">
                        {t("sections.investors.comingSoon")}
                      </span>
                    </div>
                  </div>
                  <div
                    className="bg-background-accent border border-border rounded-xl p-6"
                    data-aos="zoom-in-up"
                    data-aos-delay="300"
                  >
                    <h3 className="text-lg font-bold mb-3 text-foreground">
                      {t("sections.investors.financialCalendar.title")}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {t("sections.investors.financialCalendar.description")}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-background-accent text-foreground-secondary px-3 py-1 rounded text-xs">
                        {t("sections.investors.comingSoon")}
                      </span>
                    </div>
                  </div>
                  <div
                    className="bg-background-accent border border-border rounded-xl p-6"
                    data-aos="zoom-in-up"
                    data-aos-delay="350"
                  >
                    <h3 className="text-lg font-bold mb-3 text-foreground">
                      {t("sections.investors.annualReports.title")}
                    </h3>
                    <p className="text-foreground-secondary text-sm">
                      {t("sections.investors.annualReports.description")}
                    </p>
                    <div className="mt-4">
                      <span className="inline-block bg-background-accent text-foreground-secondary px-3 py-1 rounded text-xs">
                        {t("sections.investors.comingSoon")}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-6 text-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <p className="text-foreground-secondary text-sm">
                    {t("sections.investors.note")}
                  </p>
                </div>
              </div>
            </section>

            {/* News Section */}
            <section id="news" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.news.title")}
                </h2>
                {news && news.length > 0 && (
                  <div
                    className="space-y-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {news.map((article, index) => (
                      <div
                        key={index}
                        className="bg-background-accent border border-border rounded-xl p-6 hover:border-border-hover transition-colors"
                        data-aos="fade-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {article.title}
                          </h3>
                          <span className="text-sm text-foreground-secondary bg-background-accent px-3 py-1 rounded">
                            {new Date(
                              article.date_published
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground-secondary mb-4">
                          {article.summary}
                        </p>
                        {article.body_items &&
                          article.body_items.length > 0 && (
                            <div className="text-foreground-secondary text-sm">
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
                )}
              </div>
            </section>

            {/* Blog Section */}
            <section id="blog" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {posts && posts.length > 0
                    ? i18n.language === "ar"
                      ? "المدونة"
                      : "Blog"
                    : t("sections.blog.title")}
                </h2>
                {posts && posts.length > 0 && (
                  <div
                    className="space-y-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className="bg-background-accent border border-border rounded-xl p-6 hover:border-border-hover transition-colors"
                        data-aos="fade-up"
                        data-aos-delay={250 + index * 50}
                      >
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-foreground-secondary bg-background-accent py-1 rounded">
                              {new Date(
                                post.date_published
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {post.title}
                          </h3>
                        </div>
                        <p className="text-foreground-secondary mb-4">
                          {post.summary}
                        </p>
                        {post.body_items && post.body_items.length > 0 && (
                          <div className="text-foreground-secondary text-sm">
                            {post.body_items.map((item, itemIndex) => (
                              <p key={itemIndex} className="mb-2">
                                {item}
                              </p>
                            ))}
                          </div>
                        )}
                        <div className="mt-4">
                          <a
                            href={post.slug ? `/blog/${post.slug}` : "#contact"}
                            className="inline-flex items-center text-primary hover:text-primary-light transition-colors font-medium"
                          >
                            {i18n.language === "ar"
                              ? "اقرأ المزيد"
                              : "Read more"}
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
                )}
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" data-aos="fade-up" data-aos-duration="500">
              <div
                className="bg-background-card border border-border rounded-2xl p-8"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h2
                  className="text-3xl font-bold mb-8"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {t("sections.contact.title")}
                </h2>
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div data-aos="fade-right" data-aos-delay="250">
                    <h3 className="text-xl font-bold mb-4">
                      {t("sections.contact.office")}
                    </h3>
                    <div className="space-y-4 text-foreground-secondary">
                      <p className="text-lg font-medium text-foreground">
                        {t("sections.contact.country")}
                      </p>

                      <div className="flex items-start gap-3">
                        <MdLocationOn className="text-primary text-xl mt-0.5 flex-shrink-0" />
                        <p className="text-foreground-secondary">
                          {i18n.language === "ar"
                            ? settings?.office_address_ar ||
                              t("sections.contact.address")
                            : settings?.office_address_en ||
                              t("sections.contact.address")}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <MdPhone className="text-primary text-xl flex-shrink-0" />
                        <p className="text-foreground-secondary">
                          {settings?.office_phone ||
                            t("sections.contact.phone")}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <MdEmail className="text-primary text-xl flex-shrink-0" />
                        <a
                          href={`mailto:${settings?.contact_email}`}
                          className="text-white hover:underline transition-colors"
                        >
                          {settings?.contact_email}
                        </a>
                      </div>

                      {/* Social Media Accounts - Dynamic */}
                      {renderSocialMediaLinks()}
                    </div>
                  </div>
                  <div data-aos="fade-left" data-aos-delay="300">
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
                            placeholder={t(
                              "sections.contact.placeholders.name"
                            )}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
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
                            placeholder={t(
                              "sections.contact.placeholders.email"
                            )}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
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
                          placeholder={t(
                            "sections.contact.placeholders.subject"
                          )}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
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
                          placeholder={t(
                            "sections.contact.placeholders.message"
                          )}
                          rows={4}
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none resize-vertical"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className={`w-full bg-gradient-to-r from-primary to-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-opacity ${
                          isSubmittingContact
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:opacity-90"
                        }`}
                      >
                        {isSubmittingContact
                          ? t("sections.contact.sending")
                          : t("sections.contact.send")}
                      </button>

                      <p className="text-sm text-foreground-secondary text-center">
                        {t("sections.contact.help")}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Pages Sections */}
            {pages &&
              pages.length > 0 &&
              pages.map((page, index) => (
                <section
                  key={index}
                  id={page.key}
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <div
                    className="max-w-7xl mx-auto px-6"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div
                      className="bg-background-card border border-border rounded-2xl p-6 hover:border-border-hover transition-colors"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <h3 className="text-xl font-bold mb-4 text-foreground">
                        {page.title}
                      </h3>
                      {page.body_type === "ul" && page.body_items ? (
                        <ul className="space-y-2 text-foreground-secondary text-sm">
                          {page.body_items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      ) : page.body_type === "ol" && page.body_items ? (
                        <ol className="space-y-2 text-foreground-secondary text-sm">
                          {page.body_items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <div className="text-foreground-secondary text-sm">
                          {page.body_items?.map((item, itemIndex) => (
                            <p key={itemIndex} className="mb-2">
                              {item}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              ))}
          </div>
        </main>
      </div>
    </>
  );
}
