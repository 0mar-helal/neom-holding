"use client";

import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import SEOHead from "@/components/SEOHead";
import Link from "next/link";
import { usePostBySlug } from "@/lib/api";
import GlobalLoading from "@/components/GlobalLoading";

export default function BlogPostPage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const {
    post,
    isLoading: loading,
    isError,
  } = usePostBySlug(params.slug, i18n.language);

  if (loading) {
    return (
      <GlobalLoading/>
    );
  }

  if (isError || (!loading && !post)) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center p-8 bg-background-card border border-border rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {i18n.language === "ar"
              ? "404 - المقال غير موجود"
              : "404 - Article Not Found"}
          </h1>
          <p className="text-foreground-secondary mb-6">
            {i18n.language === "ar"
              ? "عذراً، المقال الذي تبحث عنه غير موجود أو تم حذفه."
              : "Sorry, the article you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            {i18n.language === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.summary}
        keywords={[
          "blog",
          "article",
          "investment",
          "governance",
          "sustainability",
          "Syria reconstruction",
          "مدونة",
          "مقال",
          "استثمار",
          "حوكمة",
        ]}
        url={`/blog/${post.slug}`}
        type="article"
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Back Button */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/50 z-30">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary-light transition-colors font-medium"
            >
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {i18n.language === "ar" ? "العودة للرئيسية" : "Back to Home"}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Article Header */}
          <header className="mb-8" data-aos="fade-up" data-aos-duration="600">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-foreground-secondary text-sm">
                {new Date(post.date_published).toLocaleDateString(
                  i18n.language === "ar" ? "ar-SA" : "en-US"
                )}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
              {post.title}
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed">
              {post.summary}
            </p>
          </header>

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <div
              className="text-foreground leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
              style={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
                textAlign: i18n.language === "ar" ? "right" : "left",
                fontFamily: "inherit",
              }}
            />
          </article>

          {/* Article Footer */}
          {/* <footer
            className="mt-12 pt-8 border-t border-border"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-foreground-secondary text-sm">
                  {i18n.language === "ar" ? "تاريخ النشر:" : "Published:"}{" "}
                  {new Date(post.date_published).toLocaleDateString("ar-SA")}
                </span>
                <span className="text-foreground-secondary text-sm">•</span>
                <span className="text-foreground-secondary text-sm">
                  {i18n.language === "ar" ? "وقت القراءة:" : "Read time:"}{" "}
                  {post.readTime}
                </span>
              </div>
              <Link
                href="/"
                className="inline-flex items-center text-primary hover:text-primary-light transition-colors font-medium"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {i18n.language === "ar" ? "العودة للرئيسية" : "Back to Home"}
              </Link>
            </div>
          </footer> */}
        </main>
      </div>
    </>
  );
}
