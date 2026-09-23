import React from "react"

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asci-academy.pages.dev"

  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "ASCI Academy",
    alternateName: "ASCI",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Product-led engineering learning platform for mastering Data Structures, Algorithms, Low-Level Systems, and Full-Stack Engineering with interactive visualizers and compiler environments.",
    sameAs: [
      "https://github.com/asciacademy",
      "https://twitter.com/asciacademy",
      "https://linkedin.com/company/asci-academy",
      "https://youtube.com/@asciacademy",
    ],
    offers: {
      "@type": "Offer",
      category: "Education",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ASCI Academy",
    alternateName: "ASCI Engineering Platform",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/dsa?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
