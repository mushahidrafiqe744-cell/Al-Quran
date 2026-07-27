import { Ayah } from '../types';

export const PRECACHED_SURAHS: Record<number, { name: string; englishName: string; ayahs: Ayah[] }> = {
  // Surah 1: Al-Fatiha
  1: {
    name: 'الفاتحة',
    englishName: 'Al-Fatiha',
    ayahs: [
      {
        numberInSurah: 1,
        numberInQuran: 1,
        textArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        transliterationEn: 'Bismillahir-Rahmanir-Rahim',
        words: [
          { arabic: 'بِسْمِ', transliteration: 'Bismi', translation: 'In the name' },
          { arabic: 'ٱللَّهِ', transliteration: 'Allah', translation: 'of Allah' },
          { arabic: 'ٱلرَّحْمَٰنِ', transliteration: 'Ar-Rahman', translation: 'The Entirely Merciful' },
          { arabic: 'ٱلرَّحِيمِ', transliteration: 'Ar-Rahim', translation: 'The Especially Merciful' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
        tafsirShort: 'The opening prayer of the Quran. Expresses praise to Allah as Creator, Lord of all worlds, Most Gracious and Most Merciful.'
      },
      {
        numberInSurah: 2,
        numberInQuran: 2,
        textArabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
        translationEn: '[All] praise is [due] to Allah, Lord of the worlds -',
        transliterationEn: 'Al-hamdu lillahi Rabbil-\'alamin',
        words: [
          { arabic: 'ٱلْحَمْدُ', transliteration: 'Al-hamdu', translation: 'All praise' },
          { arabic: 'لِلَّهِ', transliteration: 'lillahi', translation: 'is for Allah' },
          { arabic: 'رَبِّ', transliteration: 'Rabbi', translation: 'Lord' },
          { arabic: 'ٱلْعَٰلَمِينَ', transliteration: 'al-\'alamin', translation: 'of the worlds' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
        tafsirShort: 'Praise is a declaration of Allah\'s perfection and gratitude for His infinite bounties over all creation.'
      },
      {
        numberInSurah: 3,
        numberInQuran: 3,
        textArabic: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
        translationEn: 'The Entirely Merciful, the Especially Merciful,',
        transliterationEn: 'Ar-Rahmanir-Rahim',
        words: [
          { arabic: 'ٱلرَّحْمَٰنِ', transliteration: 'Ar-Rahman', translation: 'The Most Merciful' },
          { arabic: 'ٱلرَّحِيمِ', transliteration: 'Ar-Rahim', translation: 'The Most Compassionate' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
        tafsirShort: 'Reaffirms Allah\'s boundless mercy which encompasses all things in existence.'
      },
      {
        numberInSurah: 4,
        numberInQuran: 4,
        textArabic: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
        translationEn: 'Sovereign of the Day of Recompense.',
        transliterationEn: 'Maliki Yawmid-Din',
        words: [
          { arabic: 'مَٰلِكِ', transliteration: 'Maliki', translation: 'Master / Owner' },
          { arabic: 'يَوْمِ', transliteration: 'Yawmi', translation: 'Day' },
          { arabic: 'ٱلدِّينِ', transliteration: 'ad-Din', translation: 'of Judgment / Recompense' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
        tafsirShort: 'Allah is the Absolute King on the Day of Judgment where every soul will be judged with absolute justice.'
      },
      {
        numberInSurah: 5,
        numberInQuran: 5,
        textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translationEn: 'It is You we worship and You we ask for help.',
        transliterationEn: 'Iyyaka na\'budu wa iyyaka nasta\'in',
        words: [
          { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', translation: 'You alone' },
          { arabic: 'نَعْبُدُ', transliteration: 'na\'budu', translation: 'we worship' },
          { arabic: 'وَإِيَّاكَ', transliteration: 'wa iyyaka', translation: 'and You alone' },
          { arabic: 'نَسْتَعِينُ', transliteration: 'nasta\'in', translation: 'we ask for help' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
        tafsirShort: 'The core declaration of Pure Monotheism (Tawhid). We direct all worship and reliance solely to Allah.'
      },
      {
        numberInSurah: 6,
        numberInQuran: 6,
        textArabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
        translationEn: 'Guide us to the straight path -',
        transliterationEn: 'Ihdinas-Siratal-Mustaqim',
        words: [
          { arabic: 'ٱهْدِنَا', transliteration: 'Ihdina', translation: 'Guide us' },
          { arabic: 'ٱلصِّرَٰطَ', transliteration: 'as-Sirata', translation: 'to the path' },
          { arabic: 'ٱلْمُسْتَقِيمَ', transliteration: 'al-Mustaqim', translation: 'the straight' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3',
        tafsirShort: 'The supreme supplication asking Allah for continuous divine guidance upon the path of truth and righteous living.'
      },
      {
        numberInSurah: 7,
        numberInQuran: 7,
        textArabic: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
        translationEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        transliterationEn: 'Siratal-ladhina an\'amta \'alayhim, ghayril-maghdubi \'alayhim wa lad-dallin',
        words: [
          { arabic: 'صِرَٰطَ', transliteration: 'Sirata', translation: 'Path of' },
          { arabic: 'ٱلَّذِينَ', transliteration: 'alladhina', translation: 'those who' },
          { arabic: 'أَنْعَمْتَ', transliteration: 'an\'amta', translation: 'You favored' },
          { arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', translation: 'upon them' },
          { arabic: 'غَيْرِ', transliteration: 'ghayri', translation: 'not' },
          { arabic: 'ٱلْمَغْضُوبِ', transliteration: 'al-maghdubi', translation: 'those who earned anger' },
          { arabic: 'عَلَيْهِمْ', transliteration: '\'alayhim', translation: 'upon them' },
          { arabic: 'وَلَا', transliteration: 'wa la', translation: 'and nor' },
          { arabic: 'ٱلضَّآلِّينَ', transliteration: 'ad-dallin', translation: 'those who are astray' },
        ],
        juz: 1,
        page: 1,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
        tafsirShort: 'Refers to the path of the Prophets, truthful ones, martyrs, and righteous people.'
      }
    ]
  },

  // Surah 112: Al-Ikhlas
  112: {
    name: 'الإخلاص',
    englishName: 'Al-Ikhlas',
    ayahs: [
      {
        numberInSurah: 1,
        numberInQuran: 6222,
        textArabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
        translationEn: 'Say, "He is Allah, [who is] One,',
        transliterationEn: 'Qul Huwallahu Ahad',
        words: [
          { arabic: 'قُلْ', transliteration: 'Qul', translation: 'Say' },
          { arabic: 'هُوَ', transliteration: 'Huwa', translation: 'He is' },
          { arabic: 'ٱللَّهُ', transliteration: 'Allah', translation: 'Allah' },
          { arabic: 'أَحَدٌ', transliteration: 'Ahad', translation: 'One' },
        ],
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3',
        tafsirShort: 'Establishes pure Tawhid: Allah is unique, single, without peer or equal.'
      },
      {
        numberInSurah: 2,
        numberInQuran: 6223,
        textArabic: 'ٱللَّهُ ٱلصَّمَدُ',
        translationEn: 'Allah, the Eternal Refuge.',
        transliterationEn: 'Allahus-Samad',
        words: [
          { arabic: 'ٱللَّهُ', transliteration: 'Allah', translation: 'Allah' },
          { arabic: 'ٱلصَّمَدُ', transliteration: 'As-Samad', translation: 'The Eternal Refuge' },
        ],
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3',
        tafsirShort: 'Allah is As-Samad: The Self-Sufficient Master upon whom all creation depends, while He depends on none.'
      },
      {
        numberInSurah: 3,
        numberInQuran: 6224,
        textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        translationEn: 'He neither begets nor is born,',
        transliterationEn: 'Lam yalid wa lam yulad',
        words: [
          { arabic: 'لَمْ', transliteration: 'Lam', translation: 'Not' },
          { arabic: 'يَلِدْ', transliteration: 'yalid', translation: 'He begets' },
          { arabic: 'وَلَمْ', transliteration: 'wa lam', translation: 'and not' },
          { arabic: 'يُولَدْ', transliteration: 'yulad', translation: 'is He born' },
        ],
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3',
        tafsirShort: 'Rejects all anthropomorphic concepts of divine parentage or offspring.'
      },
      {
        numberInSurah: 4,
        numberInQuran: 6225,
        textArabic: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ',
        translationEn: 'Nor is there to Him any equivalent."',
        transliterationEn: 'Wa lam yakun lahu kufuwan ahad',
        words: [
          { arabic: 'وَلَمْ', transliteration: 'Wa lam', translation: 'And not' },
          { arabic: 'يَكُن', transliteration: 'yakun', translation: 'is there' },
          { arabic: 'لَّهُۥ', transliteration: 'lahu', translation: 'for Him' },
          { arabic: 'كُفُوًا', transliteration: 'kufuwan', translation: 'equal / comparable' },
          { arabic: 'أَحَدٌ', transliteration: 'ahad', translation: 'anyone' },
        ],
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3',
        tafsirShort: 'Nothing in existence resembles Allah in His attributes, essence, or majesty.'
      }
    ]
  },

  // Surah 113: Al-Falaq
  113: {
    name: 'الفلق',
    englishName: 'Al-Falaq',
    ayahs: [
      {
        numberInSurah: 1,
        numberInQuran: 6226,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
        translationEn: 'Say, "I seek refuge in the Lord of daybreak',
        transliterationEn: 'Qul a\'udhu bi Rabbil-falaq',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3'
      },
      {
        numberInSurah: 2,
        numberInQuran: 6227,
        textArabic: 'مِن شَرِّ مَا خَلَقَ',
        translationEn: 'From the evil of that which He created',
        transliterationEn: 'Min sharri ma khalaq',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3'
      },
      {
        numberInSurah: 3,
        numberInQuran: 6228,
        textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        translationEn: 'And from the evil of darkness when it settles',
        transliterationEn: 'Wa min sharri ghasiqin idha waqab',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3'
      },
      {
        numberInSurah: 4,
        numberInQuran: 6229,
        textArabic: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلْعُقَدِ',
        translationEn: 'And from the evil of the blowers in knots',
        transliterationEn: 'Wa min sharrin-naffathati fil-\'uqad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3'
      },
      {
        numberInSurah: 5,
        numberInQuran: 6230,
        textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translationEn: 'And from the evil of an envier when he envies."',
        transliterationEn: 'Wa min sharri hasidin idha hasad',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3'
      }
    ]
  },

  // Surah 114: An-Nas
  114: {
    name: 'الناس',
    englishName: 'An-Nas',
    ayahs: [
      {
        numberInSurah: 1,
        numberInQuran: 6231,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
        translationEn: 'Say, "I seek refuge in the Lord of mankind,',
        transliterationEn: 'Qul a\'udhu bi Rabbin-nas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3'
      },
      {
        numberInSurah: 2,
        numberInQuran: 6232,
        textArabic: 'مَلِكِ ٱلنَّاسِ',
        translationEn: 'The Sovereign of mankind,',
        transliterationEn: 'Malikin-nas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3'
      },
      {
        numberInSurah: 3,
        numberInQuran: 6233,
        textArabic: 'إِلَٰهِ ٱلنَّاسِ',
        translationEn: 'The God of mankind,',
        transliterationEn: 'Ilahin-nas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3'
      },
      {
        numberInSurah: 4,
        numberInQuran: 6234,
        textArabic: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
        translationEn: 'From the evil of the retreating whisperer -',
        transliterationEn: 'Min sharril-waswasil-khannas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3'
      },
      {
        numberInSurah: 5,
        numberInQuran: 6235,
        textArabic: 'ٱلَّذِي يُوَسْوِسُ فِي صُدُورِ ٱلنَّاسِ',
        translationEn: 'Who whispers [evil] into the breasts of mankind -',
        transliterationEn: 'Alladhi yuwaswisu fi sudurin-nas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3'
      },
      {
        numberInSurah: 6,
        numberInQuran: 6236,
        textArabic: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
        translationEn: 'From among the jinn and mankind."',
        transliterationEn: 'Minal-jinnati wan-nas',
        juz: 30,
        page: 604,
        audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3'
      }
    ]
  }
};
