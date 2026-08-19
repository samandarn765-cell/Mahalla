import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMahalla } from '../../context/MahallaContext';
import { useTranslation } from 'react-i18next';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import {
  Search,
  Eye,
  ArrowRight,
  Star,
  Tag
} from 'lucide-react';

export const NewsGrid = () => {
  const { newsList, setSelectedNews } = useMahalla();
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'ALL', label: t('newsGrid.filters.all') },
    { id: 'hashar', label: t('newsGrid.filters.hashar') },
    { id: 'kommunal', label: t('newsGrid.filters.utility') },
    { id: 'meeting', label: t('newsGrid.filters.meeting') },
    { id: 'cultural', label: t('newsGrid.filters.cultural') }
  ];

  const filteredNews = newsList.filter((item) => {
    const matchesFilter =
      selectedFilter === 'ALL' || item.categoryType === selectedFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          className="max-w-3xl mx-auto mb-10 space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <span className="h-[1px] w-12 bg-amber-200" />
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="h-[1px] w-12 bg-amber-200" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#c6a87c] font-serif-gold">
            {t('newsGrid.title')}
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t('newsGrid.subtitle')}
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Pill Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'bg-amber-50 text-amber-500 border-amber-300 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-amber-200 hover:text-amber-500'
                  }`}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder={t('newsGrid.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-300"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          </div>
        </motion.div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((news) => (
              <motion.div
                layout
                key={news.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedNews(news)}
                className="group cursor-pointer rounded-t-[100px] rounded-b-2xl bg-white border border-gray-100 overflow-hidden text-left flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div>
                  {/* Image Container with Arched Top */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <ImagePlaceholder
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Date Badge */}
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-black shadow-md">
                      {news.date}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6">
                    {/* Category Tag */}
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-bold tracking-wider uppercase mb-2.5">
                      <Tag className="w-3 h-3" />
                      <span>{news.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-amber-600 group-hover:text-amber-500 transition-colors font-serif-gold mb-3 line-clamp-2 leading-snug">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-500 group-hover:text-cyan-400 flex items-center gap-1">
                    <span>{t('newsGrid.readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{news.views}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
