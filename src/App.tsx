import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DailyVerseSection } from './components/DailyVerseSection';
import { SurahList } from './components/SurahList';
import { QuranReader } from './components/QuranReader';
import { AudioPlayerSection } from './components/AudioPlayerSection';
import { PrayerTimesSection } from './components/PrayerTimesSection';
import { IslamicTools } from './components/IslamicTools';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { StickyAudioBar } from './components/StickyAudioBar';

import { Bookmark, ReadingHistory, Reciter } from './types';
import { RECITERS, ALL_SURAHS } from './data/quranData';
import { voiceEngine } from './services/voiceEngine';
import { fetchAyahDetail } from './services/quranApi';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  
  // Bookmarks & History
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readingHistory, setReadingHistory] = useState<ReadingHistory | null>(() => {
    try {
      const saved = localStorage.getItem('quran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Global Search State
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Global Audio Engine State
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [audioSurah, setAudioSurah] = useState<number>(1);
  const [audioAyah, setAudioAyah] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [showStickyAudio, setShowStickyAudio] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state with refs to avoid stale closures in event listeners
  const audioSurahRef = useRef(audioSurah);
  const audioAyahRef = useRef(audioAyah);
  const selectedReciterRef = useRef(selectedReciter);
  const isLoopingRef = useRef(isLooping);

  useEffect(() => { audioSurahRef.current = audioSurah; }, [audioSurah]);
  useEffect(() => { audioAyahRef.current = audioAyah; }, [audioAyah]);
  useEffect(() => { selectedReciterRef.current = selectedReciter; }, [selectedReciter]);
  useEffect(() => { isLoopingRef.current = isLooping; }, [isLooping]);

  // Play Audio for Specific Verse / Surah
  const handlePlayAyahAudio = async (
    surahNum: number, 
    ayahNum: number = 1, 
    audioUrl?: string, 
    overrideReciter?: Reciter
  ) => {
    const activeReciter = overrideReciter || selectedReciterRef.current;
    setAudioSurah(surahNum);
    setAudioAyah(ayahNum);
    setShowStickyAudio(true);

    // If Female Speech Synthesis Voice is active
    if (activeReciter.voiceMode === 'speech') {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsPlaying(true);
      const detail = await fetchAyahDetail(surahNum, ayahNum);
      
      let speechText = detail.textArabic;
      let speechLang: 'ar' | 'ur' | 'en' = 'ar';

      if (activeReciter.language === 'ur') {
        speechText = detail.translationUr || detail.textArabic;
        speechLang = 'ur';
      } else if (activeReciter.language === 'en') {
        speechText = detail.translationEn || detail.textArabic;
        speechLang = 'en';
      } else if (activeReciter.language === 'ar-ur') {
        speechText = `${detail.textArabic}. ترجمہ: ${detail.translationUr || ''}`;
        speechLang = 'ur';
      } else {
        speechText = detail.textArabic;
        speechLang = 'ar';
      }

      voiceEngine.speak({
        text: speechText,
        lang: speechLang,
        rate: playbackSpeed,
        pitch: 1.25,
        onStart: () => setIsPlaying(true),
        onEnd: () => {
          if (isLoopingRef.current) {
            handlePlayAyahAudio(audioSurahRef.current, audioAyahRef.current);
            return;
          }

          const currentSurahObj = ALL_SURAHS.find(s => s.number === audioSurahRef.current);
          const totalAyahs = currentSurahObj ? currentSurahObj.numberOfAyahs : 7;

          if (audioAyahRef.current < totalAyahs) {
            const nextAyah = audioAyahRef.current + 1;
            handlePlayAyahAudio(audioSurahRef.current, nextAyah);
          } else if (audioSurahRef.current < 114) {
            handlePlayAyahAudio(audioSurahRef.current + 1, 1);
          } else {
            setIsPlaying(false);
          }
        },
        onError: () => setIsPlaying(false)
      });
      return;
    }

    // Standard Audio Stream CDN
    voiceEngine.stop();
    const formattedSurah = String(surahNum).padStart(3, '0');
    const formattedAyah = String(ayahNum).padStart(3, '0');
    
    const finalUrl = audioUrl || `https://everyayah.com/data/${activeReciter.identifier}/${formattedSurah}${formattedAyah}.mp3`;

    if (audioRef.current) {
      audioRef.current.src = finalUrl;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Audio playback prevented:', err));
    }
  };

  // Change Qari / Reciter and immediately update audio stream
  const handleReciterChange = (newReciter: Reciter) => {
    setSelectedReciter(newReciter);
    if (isPlaying) {
      handlePlayAyahAudio(audioSurahRef.current, audioAyahRef.current, undefined, newReciter);
    }
  };

  // Initialize HTML5 Audio Element & Auto-Advancing
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      if (isLoopingRef.current) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
        return;
      }

      // Auto-advance to next verse or next surah
      const currentSurahObj = ALL_SURAHS.find(s => s.number === audioSurahRef.current);
      const totalAyahs = currentSurahObj ? currentSurahObj.numberOfAyahs : 7;

      if (audioAyahRef.current < totalAyahs) {
        const nextAyah = audioAyahRef.current + 1;
        handlePlayAyahAudio(audioSurahRef.current, nextAyah);
      } else if (audioSurahRef.current < 114) {
        handlePlayAyahAudio(audioSurahRef.current + 1, 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      voiceEngine.stop();
    };
  }, []);

  // Handle Playback Speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save Reading History to LocalStorage
  useEffect(() => {
    if (readingHistory) {
      localStorage.setItem('quran_last_read', JSON.stringify(readingHistory));
    }
  }, [readingHistory]);

  // Handle Toggle Bookmark
  const handleToggleBookmark = (surahNum: number, ayahNum: number) => {
    const surahObj = ALL_SURAHS.find(s => s.number === surahNum);
    if (!surahObj) return;

    setBookmarks(prev => {
      const exists = prev.some(b => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
      if (exists) {
        return prev.filter(b => !(b.surahNumber === surahNum && b.ayahNumber === ayahNum));
      } else {
        return [
          ...prev,
          {
            id: `${surahNum}:${ayahNum}`,
            surahNumber: surahNum,
            surahName: surahObj.englishName,
            ayahNumber: ayahNum,
            createdAt: new Date().toISOString()
          }
        ];
      }
    });
  };

  // Open Surah in Reader Mode
  const handleSelectSurah = (surahNum: number) => {
    const surahObj = ALL_SURAHS.find(s => s.number === surahNum);
    setSelectedSurahNumber(surahNum);
    setActiveTab('quran');

    if (surahObj) {
      setReadingHistory({
        surahNumber: surahNum,
        surahName: surahObj.englishName,
        ayahNumber: 1,
        timestamp: new Date().toISOString()
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlay = () => {
    if (selectedReciter.voiceMode === 'speech') {
      if (isPlaying) {
        voiceEngine.stop();
        setIsPlaying(false);
      } else {
        handlePlayAyahAudio(audioSurah, audioAyah);
      }
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src) {
        handlePlayAyahAudio(audioSurah, audioAyah);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => handlePlayAyahAudio(audioSurah, audioAyah));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 font-sans selection:bg-[#166534] selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'quran' && selectedSurahNumber === null) {
            setSelectedSurahNumber(1);
          }
        }}
        bookmarks={bookmarks}
        readingHistory={readingHistory}
        onSelectSurahFromHistory={handleSelectSurah}
        onGlobalSearch={(term) => {
          setGlobalSearchTerm(term);
          setActiveTab('quran');
        }}
      />

      {/* Main View Router */}
      <main className="min-h-screen">
        
        {/* Landing Home View */}
        {activeTab === 'home' && (
          <>
            <Hero
              onStartReading={() => handleSelectSurah(1)}
              onListenAudio={() => setActiveTab('audio')}
              onViewPrayerTimes={() => setActiveTab('prayer')}
              quickSurahJump={handleSelectSurah}
            />

            <DailyVerseSection
              onReadInFull={handleSelectSurah}
              onPlayAudio={handlePlayAyahAudio}
            />

            <SurahList
              onSelectSurah={handleSelectSurah}
              onPlaySurahAudio={(sNum) => handlePlayAyahAudio(sNum, 1)}
              bookmarks={bookmarks}
              readingHistory={readingHistory}
              globalSearchTerm={globalSearchTerm}
            />

            <TestimonialsSection />
          </>
        )}

        {/* Dedicated Quran Reader / Surahs Directory View */}
        {activeTab === 'quran' && (
          selectedSurahNumber ? (
            <QuranReader
              surahNumber={selectedSurahNumber}
              onSelectSurah={handleSelectSurah}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              activePlayingAyah={isPlaying ? { surah: audioSurah, ayah: audioAyah } : null}
              onPlayAyahAudio={handlePlayAyahAudio}
            />
          ) : (
            <SurahList
              onSelectSurah={handleSelectSurah}
              onPlaySurahAudio={(sNum) => handlePlayAyahAudio(sNum, 1)}
              bookmarks={bookmarks}
              readingHistory={readingHistory}
              globalSearchTerm={globalSearchTerm}
            />
          )
        )}

        {/* Audio Recitations Studio */}
        {activeTab === 'audio' && (
          <AudioPlayerSection
            currentSurahNumber={audioSurah}
            onSelectSurah={(num) => handlePlayAyahAudio(num, 1)}
            selectedReciter={selectedReciter}
            onChangeReciter={handleReciterChange}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            playbackSpeed={playbackSpeed}
            onChangePlaybackSpeed={setPlaybackSpeed}
            isLooping={isLooping}
            onToggleLoop={() => setIsLooping(!isLooping)}
          />
        )}

        {/* Prayer Times & Qibla Compass */}
        {activeTab === 'prayer' && <PrayerTimesSection />}

        {/* Islamic Tools Suite */}
        {activeTab === 'tools' && <IslamicTools />}

        {/* Islamic Aesthetics Gallery */}
        {activeTab === 'gallery' && <GallerySection />}

      </main>

      {/* Floating Bottom Audio Player */}
      {showStickyAudio && (
        <StickyAudioBar
          currentSurahNumber={audioSurah}
          currentAyahNumber={audioAyah}
          reciter={selectedReciter}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onNextTrack={() => handlePlayAyahAudio(audioSurah < 114 ? audioSurah + 1 : 1, 1)}
          onPrevTrack={() => handlePlayAyahAudio(audioSurah > 1 ? audioSurah - 1 : 114, 1)}
          onCloseBar={() => setShowStickyAudio(false)}
          onOpenFullPlayer={() => setActiveTab('audio')}
        />
      )}

      {/* Footer */}
      <Footer onNavigateTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

    </div>
  );
}
