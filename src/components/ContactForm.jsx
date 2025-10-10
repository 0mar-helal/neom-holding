import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/contexts/AppContext";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { settings, isSubmittingContact, submitContactForm } = useAppContext();

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

  return (
    <div className="bg-[#0f172f] border border-[#1e2a44] rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">نموذج الاتصال</h2>

      {/* Contact Information */}
      <div className="mb-8 p-6 bg-[#0b1935] border border-[#1e2a44] rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-[#e7ecf4]">
          {t("sections.contact.office")}
        </h3>
        <div className="space-y-3 text-[#9fb1cc]">
          <p className="text-base font-medium text-[#e7ecf4]">
            {t("sections.contact.country")}
          </p>

          <div className="flex items-start gap-3">
            <MdLocationOn className="text-[#3abff8] text-lg mt-0.5 flex-shrink-0" />
            <p className="text-[#9fb1cc]">{t("sections.contact.address")}</p>
          </div>

          <div className="flex items-center gap-3">
            <MdPhone className="text-[#3abff8] text-lg flex-shrink-0" />
            <p className="text-[#9fb1cc]">{t("sections.contact.phone")}</p>
          </div>

          <div className="flex items-center gap-3">
            <MdEmail className="text-[#3abff8] text-lg flex-shrink-0" />
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
  );
};

export default ContactForm;
