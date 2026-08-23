import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { MahallaProvider, useMahalla } from './context/MahallaContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Modal } from './components/common/Modal';
import { AIChatbot } from './components/common/AIChatbot';
import { Toast } from './components/common/Toast';
import { SOSButton } from './components/common/SOSButton';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LazySection } from './components/common/LazySection';
import girihPattern from './assets/images/girih-pattern.jpg';

// Home components directly imported for instant First Contentful Paint without nested suspense delays
import { HeroSection } from './components/home/HeroSection';
import { UtilityStatus } from './components/home/UtilityStatus';
import { StatsStrip } from './components/home/StatsStrip';
import { HowItWorks } from './components/home/HowItWorks';
import { BeforeAfterSlider } from './components/home/BeforeAfterSlider';
import { MahallaMap } from './components/home/MahallaMap';
import { CommunityPoll } from './components/home/CommunityPoll';
import { MahallaFundCard } from './components/home/MahallaFundCard';
import { MahallaFundModal } from './components/payments/MahallaFundModal';
import { PaymentReceiptModal } from './components/payments/PaymentReceiptModal';

// Sub-routes lazily loaded for optimal chunk splitting
const NewsGrid = lazy(() => import('./components/news/NewsGrid').then(m => ({ default: m.NewsGrid })));
const AboutMahalla = lazy(() => import('./components/about/AboutMahalla').then(m => ({ default: m.AboutMahalla })));
const ServicesPage = lazy(() => import('./components/reporting/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ArchivePage = lazy(() => import('./components/archive/ArchivePage').then(m => ({ default: m.ArchivePage })));
const AdminPage = lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })));
const LeaderboardPage = lazy(() => import('./components/leaderboard/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));
const MarketplacePage = lazy(() => import('./components/marketplace/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const ProfilePage = lazy(() => import('./components/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const LoginPage = lazy(() => import('./components/auth/LoginPage').then(m => ({ default: m.LoginPage })));

// Sleek fallback loader for subroutes
const PageLoader = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3" role="status" aria-live="polite">
    <div className="relative w-10 h-10">
      <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 animate-ping absolute inset-0" />
      <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
    </div>
    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 animate-pulse">
      Smart Mahalla yuklanmoqda...
    </p>
  </div>
);

const PublicLayout = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 bg-gray-50 dark:bg-[#0A0F1D] text-gray-900 dark:text-white transition-colors duration-300">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pb-20 md:pb-0" id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <MobileBottomNav />
        <AIChatbot />
        <SOSButton />
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white">
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    </div>
  );
};

// Milliy Girih Naqsh bilan boyitilgan Home
const Home = () => (
  <>
    {/* Girih Background Overlay */}
    <div 
      className="fixed inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20"
      style={{
        backgroundImage: `url(${girihPattern})`,
        backgroundSize: '400px',
        backgroundRepeat: 'repeat',
        zIndex: 0
      }}
    />
    <div className="relative z-10 space-y-6">
      {/* Above the fold (Instant Render) */}
      <HeroSection />
      <UtilityStatus />

      {/* Below the fold (Deferred rendering on scroll) */}
      <LazySection minHeight="120px">
        <StatsStrip />
      </LazySection>

      <LazySection minHeight="300px">
        <HowItWorks />
      </LazySection>

      <LazySection minHeight="350px">
        <MahallaFundCard />
      </LazySection>

      <LazySection minHeight="300px">
        <CommunityPoll />
      </LazySection>

      <LazySection minHeight="450px">
        <MahallaMap />
      </LazySection>

      <LazySection minHeight="400px">
        <BeforeAfterSlider />
      </LazySection>
    </div>
  </>
);

const AppRoutes = () => {
  const { isAuthenticated } = useMahalla();

  return (
    <Routes>
      {/* Auth Route */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          )
        } 
      />

      {/* Public Layout (Accessible to all citizens) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsGrid />} />
        <Route path="/about" element={<AboutMahalla />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* Protected Admin Route */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        } 
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <MahallaProvider>
      <AppRoutes />
      <Modal />
      <MahallaFundModal />
      <PaymentReceiptModal />
      <Toast />
    </MahallaProvider>
  );
}
