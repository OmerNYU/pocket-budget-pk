export const translations = {
  en: {
    increasing: 'Increasing',
    decreasing: 'Decreasing',
    will: 'will',
    increase: 'increase',
    decrease: 'reduce',
    by: 'by',
    impactInsights: 'Impact Insights'
  },
  ur: {
    increasing: 'اضافہ',
    decreasing: 'کمی',
    will: 'سے',
    increase: 'بڑھائے گا',
    decrease: 'کم کرے گا',
    by: 'سے',
    impactInsights: 'اثرات'
  }
};

export function t(key, lang = 'en') {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}
