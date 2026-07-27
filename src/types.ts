export interface Surah {
  number: number;
  name: string; // Arabic name e.g. الفاتحة
  englishName: string; // e.g. Al-Fatiha
  englishNameTranslation: string; // e.g. The Opening
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  juz: number;
  audioReciterUrls?: Record<string, string>;
}

export interface WordByWord {
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran: number;
  textArabic: string;
  textUthmani?: string;
  translationEn: string;
  transliterationEn?: string;
  words?: WordByWord[];
  juz: number;
  page: number;
  hizbQuarter?: number;
  audioUrl?: string;
  tafsirShort?: string;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  style?: string;
  identifier: string; // Alquran Cloud identifier e.g. ar.alafasy
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
  note?: string;
}

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak?: string;
  Midnight?: string;
}

export interface LocationInfo {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  method?: string;
}

export interface AllahName {
  number: number;
  nameArabic: string;
  transliteration: string;
  enMeaning: string;
  explanation: string;
  benefits?: string;
}

export interface DuaItem {
  id: string;
  category: 'Morning & Evening' | 'Prayer & Dhikr' | 'Forgiveness' | 'Protection & Healing' | 'Guidance & Peace';
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  benefit?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Mosque' | 'Calligraphy' | 'Manuscript' | 'Nature';
  imageUrl: string;
  description: string;
  location?: string;
}

export interface ReadingHistory {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  lastReadAt: number;
  progressPercent: number;
}
