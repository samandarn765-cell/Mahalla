import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Layers,
  Building2,
  HeartPulse,
  GraduationCap,
  Wrench,
  Sparkles,
  Navigation,
  Compass
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMahalla } from '../../context/MahallaContext';

export const MahallaMap = () => {
  const { theme } = useMahalla();
  const { t } = useTranslation();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Real Tashkent Mahalla Locations (coordinates)
  const mahallaPoints = [
    {
      id: 1,
      lat: 41.3145,
      lng: 69.2485,
      category: 'admin',
      title: "Mahalla Boshqaruv Markazi (Guzar)",
      desc: "Fuqarolar qabuli, rais xonasi, ma'lumotnoma berish va 24/7 navbatchilik.",
      badge: "Guzar & Idora",
      icon: "🏢",
      color: "#06b6d4"
    },
    {
      id: 2,
      lat: 41.3175,
      lng: 69.2420,
      category: 'medical',
      title: "Mahalla Salomatlik & Tibbiyot Punkti",
      desc: "Birlamchi tibbiy yordam, vaksina va patronaj hamshiralar xizmati.",
      badge: "Tibbiyot",
      icon: "🏥",
      color: "#10b981"
    },
    {
      id: 3,
      lat: 41.3110,
      lng: 69.2520,
      category: 'education',
      title: "214-sonli Davlat Maktabi & Bog'cha",
      desc: "Mahalla yoshlari uchun to'garaklar, sport maydonchasi va kutubxona.",
      badge: "Ta'lim",
      icon: "🏫",
      color: "#f59e0b"
    },
    {
      id: 4,
      lat: 41.3125,
      lng: 69.2440,
      category: 'utility',
      title: "Yo'l va Suv Tizimini Ta'mirlash Ishlari",
      desc: "14-uy yo'lagida yangi asfalt va quvurlarni modernizatsiya qilish.",
      badge: "Jarayonda",
      icon: "🚧",
      color: "#ef4444"
    },
    {
      id: 5,
      lat: 41.3160,
      lng: 69.2550,
      category: 'eco',
      title: "Yashil Makon Xiyoboni & Bolalar O'yingohi",
      desc: "Yangi ekilgan 300+ daraxtlar, quyosh chiroqlari va dam olish hududi.",
      badge: "Eco & Dam olish",
      icon: "🌳",
      color: "#10b981"
    }
  ];

  const categories = [
    { id: 'all', label: t('map.filterAll', { defaultValue: 'Barchasi' }), icon: <Layers className="w-4 h-4" /> },
    { id: 'admin', label: t('map.filterAdmin', { defaultValue: 'Idora & Xizmatlar' }), icon: <Building2 className="w-4 h-4" /> },
    { id: 'medical', label: t('map.filterMed', { defaultValue: 'Tibbiyot' }), icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'education', label: t('map.filterEdu', { defaultValue: "Ta'lim & Sport" }), icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'utility', label: t('map.filterRepair', { defaultValue: "Ta'mirlash" }), icon: <Wrench className="w-4 h-4" /> }
  ];

  useEffect(() => {
    let isMounted = true;

    // Dynamically inject Leaflet CSS & JS
    const loadLeaflet = async () => {
      if (!window.L) {
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        await new Promise((resolve) => {
          if (window.L) return resolve();
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const L = window.L;
      const map = L.map(mapContainerRef.current, {
        center: [41.3140, 69.2475],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // Add Zoom Control top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark / Modern CartoDB map tiles
      const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
      renderMarkers();
    };

    loadLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [theme]);

  // Update markers when category changes
  const renderMarkers = () => {
    if (!mapInstanceRef.current || !window.L) return;
    const L = window.L;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = activeCategory === 'all'
      ? mahallaPoints
      : mahallaPoints.filter((p) => p.category === activeCategory);

    filtered.forEach((pt) => {
      // Custom HTML Marker Pin
      const customIcon = L.divIcon({
        className: 'custom-mahalla-marker',
        html: `
          <div style="
            background: #091222;
            border: 2px solid ${pt.color};
            box-shadow: 0 0 15px ${pt.color}80;
            width: 38px;
            height: 38px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            ${pt.icon}
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon }).addTo(mapInstanceRef.current);

      marker.on('click', () => {
        setSelectedPoint(pt);
        mapInstanceRef.current.flyTo([pt.lat, pt.lng], 16, { duration: 1 });
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    renderMarkers();
  }, [activeCategory]);

  return (
    <section className="py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
              <span>{t('map.title', { defaultValue: 'Haqiqiy Interaktiv Mahalla Haritasi' })}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {t('map.subtitle', { defaultValue: 'Mahallamiz Jonli Haritasi' })}
            </h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 max-w-xl">
              {t('map.desc', { defaultValue: "Guzar, tibbiyot punkti, maktab, ta'mirlash hududlari va barcha muhim nuqtalarni real xaritada ko'ring va monitoring qiling." })}
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_4px_15px_rgba(6,182,212,0.4)]'
                    : 'bg-white dark:bg-slate-900/90 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive Map Canvas Card */}
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-2xl bg-slate-950">
          
          {/* Leaflet Map DOM Node */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Active Marker Floating Information Card */}
          {selectedPoint && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 rounded-2xl bg-[#091222]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)] z-20 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{selectedPoint.icon}</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {selectedPoint.badge}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                      {selectedPoint.title}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="text-slate-400 hover:text-white p-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-normal">
                {selectedPoint.desc}
              </p>

              <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Real vaqt rejimida faol
                </span>
                <button
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo([selectedPoint.lat, selectedPoint.lng], 17, { duration: 1 });
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Yaqinlashtirish</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick Legend at bottom right */}
          <div className="hidden sm:flex absolute top-4 left-4 p-3 rounded-2xl bg-[#091222]/90 backdrop-blur-md border border-white/10 z-10 flex-col gap-2 pointer-events-none text-left">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {t('map.legendTitle', { defaultValue: "Mahalla Ob'ektlari:" })}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>{t('map.legendAdmin', { defaultValue: 'Guzar & Boshqaruv idorasi' })}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>{t('map.legendMed', { defaultValue: 'Tibbiyot & Yashil xiyobon' })}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>{t('map.legendEdu', { defaultValue: "Maktab & Bog'cha" })}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>{t('map.legendRepair', { defaultValue: "Ta'mirlash hududlari" })}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
