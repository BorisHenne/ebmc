import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Locales supportées
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

// Locale par défaut
export const defaultLocale: Locale = "fr";

// Configuration next-intl
export default getRequestConfig(async ({ locale }) => {
  // Valider que le locale entrant est supporté
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Europe/Luxembourg",
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
        medium: {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
        long: {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      },
      number: {
        currency: {
          style: "currency",
          currency: "EUR",
        },
        percent: {
          style: "percent",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
    },
  };
});

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get the preferred locale from Accept-Language header
 */
export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, quality = "1"] = lang.trim().split(";q=");
      return {
        locale: locale.split("-")[0].toLowerCase(),
        quality: parseFloat(quality),
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of preferredLocales) {
    if (isValidLocale(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

/**
 * Locale display names
 */
export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

/**
 * Locale flags (emoji)
 */
export const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
};
