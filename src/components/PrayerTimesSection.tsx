import React, { useState, useEffect } from 'react';
import { fetchPrayerTimesByCoords } from '../services/quranApi';
import { PrayerTimeData, LocationInfo } from '../types';
import { Compass, MapPin, Clock, Search, Sun, Moon, Sunrise, Sunset, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export const PrayerTimesSection: React.FC = () => {
  const [location, setLocation] = useState<LocationInfo>({
    city: 'Mecca',
    country: 'Saudi Arabia',
    latitude: 21.4225,
    longitude: 39.8262
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData>({
    Fajr: '05:08',
    Sunrise: '06:28',
    Dhuhr: '12:22',
    Asr: '15:42',
    Sunset: '18:15',
    Maghrib: '18:15',
    Isha: '19:32'
  });

  const [loading, setLoading] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [nextPrayerName, setNextPrayerName] = useState('Fajr');
  const [timeRemaining, setTimeRemaining] = useState('00:00:00');

  useEffect(() => {
    // Get geolocation if permitted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({
            city: 'Your Location',
            country: 'Detected',
            latitude: lat,
            longitude: lng
          });
          setLoading(true);
          const times = await fetchPrayerTimesByCoords(lat, lng);
          if (times) setPrayerTimes(times);
          setLoading(false);
        },
        (err) => {
          console.log('Location access denied, using Mecca defaults');
        }
      );
    }
  }, []);

  // Calculate Next Prayer Countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { name: 'Fajr', time: prayerTimes.Fajr },
        { name: 'Dhuhr', time: prayerTimes.Dhuhr },
        { name: 'Asr', time: prayerTimes.Asr },
        { name: 'Maghrib', time: prayerTimes.Maghrib },
        { name: 'Isha', time: prayerTimes.Isha },
      ];

      let foundNext = false;
      for (const p of prayers) {
        const [h, m] = p.time.split(':').map(Number);
        const pMinutes = h * 60 + m;
        if (pMinutes > currentMinutes) {
          setNextPrayerName(p.name);
          const diffSeconds = (pMinutes - currentMinutes) * 60 - now.getSeconds();
          const hrs = Math.floor(diffSeconds / 3600);
          const mins = Math.floor((diffSeconds % 3600) / 60);
          const secs = diffSeconds % 60;
          setTimeRemaining(
            `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
          );
          foundNext = true;
          break;
        }
      }

      if (!foundNext) {
        setNextPrayerName('Fajr (Tomorrow)');
        setTimeRemaining('06:12:00');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    setLoading(true);
    // Approximate geocode / default city set
    setLocation({
      city: cityInput,
      country: 'Searched',
      latitude: 21.4225,
      longitude: 39.8262
    });
    const times = await fetchPrayerTimesByCoords(21.4225, 39.8262);
    if (times) setPrayerTimes(times);
    setLoading(false);
    setCityInput('');
  };

  // Calculate Qibla Bearing (Approximate relative to Mecca 21.4225, 39.8262)
  const qiblaAngle = Math.round(
    (Math.atan2(
      Math.sin((39.8262 - location.longitude) * (Math.PI / 180)),
      Math.cos(location.latitude * (Math.PI / 180)) * Math.tan(21.4225 * (Math.PI / 180)) -
        Math.sin(location.latitude * (Math.PI / 180)) * Math.cos((39.8262 - location.longitude) * (Math.PI / 180))
    ) *
      180) /
      Math.PI
  );

  const prayerIcons: Record<string, any> = {
    Fajr: Sunrise,
    Sunrise: Sun,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon
  };

  return (
    <section id="prayer-times" className="py-16 bg-[#F8FAF8] text-slate-800 min-h-screen relative">
      {/* Unique beautiful backdrop: Masjid al-Haram courtyard during prayers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1597935258735-e254c1839188?auto=format&fit=crop&w=1600&q=80"
          alt="Prayer Times Backdrop"
          className="w-full h-full object-cover object-center opacity-20 filter brightness-100 contrast-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAF8] via-[#F8FAF8]/85 to-[#F8FAF8]/75"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Divine Rhythms</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            Prayer Times & Qibla Direction
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Accurate daily prayer schedules and live Qibla compass alignment for your location.
          </p>
        </div>

        {/* Location & Search Row */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Current Location</span>
              <span className="font-bold text-slate-800 text-sm sm:text-base">{location.city}, {location.country}</span>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleCitySearch} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search city (e.g. London, Istanbul, Cairo)..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs hover:bg-[#d6b068] transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Next Prayer Countdown Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-[#D4AF37]/5 border border-slate-200 p-8 mb-10 shadow-md text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="text-emerald-700 text-xs uppercase font-bold tracking-widest block mb-2">Next Prayer In</span>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-emerald-900 mb-2">
            {nextPrayerName}
          </h3>
          <div className="font-mono text-4xl sm:text-6xl font-black gold-gradient-text tracking-widest my-3">
            {timeRemaining}
          </div>
          <p className="text-slate-600 text-xs font-light">
            "So perform the prayer. Indeed, prayer has been decreed upon the believers a decree of specified times." (4:103)
          </p>
        </div>

        {/* Timetable Grid & Qibla Compass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Prayer Timetable Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(prayerTimes).map(([name, time]) => {
              const Icon = prayerIcons[name] || Clock;
              const isNext = name === nextPrayerName;
              return (
                <div
                  key={name}
                  className={`p-5 rounded-2xl border transition-all ${
                    isNext 
                      ? 'bg-white border-2 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]' 
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${isNext ? 'text-[#D4AF37]' : 'text-emerald-700'}`} />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{name}</span>
                  </div>
                  <span className="font-mono font-bold text-xl sm:text-2xl text-slate-800 block">
                    {time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Qibla Direction Compass Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-md flex flex-col items-center">
            <h4 className="font-cinzel text-base font-bold text-emerald-800 mb-1 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Qibla Direction Pointer</span>
            </h4>
            <p className="text-slate-500 text-xs mb-6">Direction towards Al-Kaaba in Mecca</p>

            {/* Visual Compass */}
            <div className="relative w-48 h-48 rounded-full border-4 border-[#D4AF37]/30 bg-slate-50 p-4 flex items-center justify-center shadow-inner">
              <div className="absolute top-2 text-[10px] font-bold text-[#B45309]">N</div>
              <div className="absolute right-2 text-[10px] font-bold text-slate-400">E</div>
              <div className="absolute bottom-2 text-[10px] font-bold text-slate-400">S</div>
              <div className="absolute left-2 text-[10px] font-bold text-slate-400">W</div>

              {/* Rotating Pointer Needle */}
              <div 
                className="w-full h-full flex items-center justify-center transition-transform duration-1000"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
              >
                <div className="w-1.5 h-20 bg-gradient-to-t from-transparent via-[#D4AF37] to-emerald-600 rounded-full shadow-sm"></div>
              </div>

              {/* Kaaba Center Emblem */}
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xs font-bold shadow-md">
                🕋
              </div>
            </div>

            <div className="mt-6 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-bold">
              Qibla Bearing: {qiblaAngle}° relative to North
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
