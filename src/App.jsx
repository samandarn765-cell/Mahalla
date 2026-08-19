import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MahallaProvider, useMahalla } from './context/MahallaContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Modal } from './components/common/Modal';
import { AIChatbot } from './components/common/AIChatbot';
import { Toast } from './components/common/Toast';
import { ASSETS } from './assets/assetsManager';
import girihPattern from './assets/images/girih-pattern.jpg';

// Page Components
import { HeroSection } from './components/home/HeroSection';
import { UtilityStatus } from './components/home/UtilityStatus';
import { StatsStrip } from './components/home/StatsStrip';
import { HowItWorks } from './components/home/HowItWorks';
import { BeforeAfterSlider } from './components/home/BeforeAfterSlider';
import { NewsGrid } from './components/news/NewsGrid';
import { AboutMahalla } from './components/about/AboutMahalla';
import { ServicesPage } from './components/reporting/ServicesPage';
import { ArchivePage } from './components/archive/ArchivePage';
import { AdminPage } from './components/admin/AdminPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';

const PublicLayout = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 bg-gray-50 dark:bg-[#0A0F1D] text-gray-900 dark:text-white transition-colors duration-300">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white">
      <AdminPage />
    </div>
  );
};

const Home = () => (
  <>
    {/* Girih Background Overlay specifically for Home Page */}
    <div 
      className="fixed inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20"
      style={{
        backgroundImage: `url(${girihPattern})`,
        backgroundSize: '400px',
        backgroundRepeat: 'repeat',
        zIndex: 0
      }}
    />
    <div className="relative z-10 space-y-4">
      <HeroSection />
      <UtilityStatus />
      <StatsStrip />
      <HowItWorks />
      <BeforeAfterSlider />
    </div>
  </>
);

export default function App() {
  return (
    <MahallaProvider>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsGrid />} />
          <Route path="/about" element={<AboutMahalla />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>
        
        {/* Isolated Admin Route */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
      <Modal />
      <Toast />
    </MahallaProvider>
  );
}
