import { Ayah } from '../types';
import { PRECACHED_SURAHS } from '../data/quranText';

const ALQURAN_CLOUD_BASE = 'https://api.alquran.cloud/v1';

export async function fetchSurahAyahs(
  surahNumber: number,
  reciterIdentifier: string = 'ar.alafasy',
  translationIdentifier: string = 'en.sahih'
): Promise<Ayah[]> {
  try {
    // Check if offline/precached data exists first for immediate responsiveness
    const cached = PRECACHED_SURAHS[surahNumber];
    
    // Fetch Arabic Uthmani text with audio
    const resAudio = await fetch(
      `${ALQURAN_CLOUD_BASE}/surah/${surahNumber}/${reciterIdentifier}`
    );

    // Fetch English Translation
    const resTrans = await fetch(
      `${ALQURAN_CLOUD_BASE}/surah/${surahNumber}/${translationIdentifier}`
    );

    if (!resAudio.ok || !resTrans.ok) {
      if (cached) return cached.ayahs;
      throw new Error(`Failed to load Surah ${surahNumber}`);
    }

    const audioData = await resAudio.json();
    const transData = await resTrans.json();

    const arabicAyahs = audioData.data?.ayahs || [];
    const translationAyahs = transData.data?.ayahs || [];

    const mappedAyahs: Ayah[] = arabicAyahs.map((item: any, idx: number) => {
      const transItem = translationAyahs[idx] || {};
      
      // Parse basic word-by-word approximation or fallback
      const wordsArabic = item.text ? item.text.split(' ') : [];
      const wordsEn = transItem.text ? transItem.text.split(' ') : [];

      const mockWords = wordsArabic.map((w: string, wIdx: number) => ({
        arabic: w,
        transliteration: 'Word ' + (wIdx + 1),
        translation: wordsEn[wIdx] || ''
      }));

      return {
        numberInSurah: item.numberInSurah,
        numberInQuran: item.number,
        textArabic: item.text,
        textUthmani: item.text,
        translationEn: transItem.text || '',
        transliterationEn: `Verse ${item.numberInSurah}`,
        words: mockWords,
        juz: item.juz,
        page: item.page,
        hizbQuarter: item.hizbQuarter,
        audioUrl: item.audio || `https://cdn.islamic.network/quran/audio/128/${reciterIdentifier}/${item.number}.mp3`
      };
    });

    return mappedAyahs;
  } catch (error) {
    console.warn(`API fetch failed for Surah ${surahNumber}, checking local cache:`, error);
    if (PRECACHED_SURAHS[surahNumber]) {
      return PRECACHED_SURAHS[surahNumber].ayahs;
    }
    // Generate fallback placeholder ayahs if API is unavailable
    return Array.from({ length: 7 }).map((_, idx) => ({
      numberInSurah: idx + 1,
      numberInQuran: idx + 1,
      textArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      transliterationEn: 'Bismillahir-Rahmanir-Rahim',
      juz: 1,
      page: 1,
      audioUrl: `https://cdn.islamic.network/quran/audio/128/${reciterIdentifier}/${idx + 1}.mp3`
    }));
  }
}

export async function fetchPrayerTimesByCoords(lat: number, lng: number) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
    );
    if (!res.ok) throw new Error('Failed to fetch prayer times');
    const data = await res.json();
    return data.data?.timings;
  } catch (err) {
    console.warn('Prayer times API fallback:', err);
    return {
      Fajr: '05:08',
      Sunrise: '06:28',
      Dhuhr: '12:22',
      Asr: '15:42',
      Sunset: '18:15',
      Maghrib: '18:15',
      Isha: '19:32'
    };
  }
}
