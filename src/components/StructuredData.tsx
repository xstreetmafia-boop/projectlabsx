import { SITE_ADDRESS, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address: {
      "@type": "PostalAddress",
      ...SITE_ADDRESS,
    },
    areaServed: "IN",
    description:
      "Design, development, and AI research studio offering brand identity, web design and development, product design, and AI research.",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
