import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useClubStore } from './store/useClubStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { DemoSwitcher } from './components/DemoSwitcher';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { PlansPage } from './pages/PlansPage';
import { TrainersPage } from './pages/TrainersPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { AboutClubPage } from './pages/AboutClubPage';

export const App = () => {
  const { theme } = useClubStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jadval" element={<SchedulePage />} />
            <Route path="/tariflar" element={<PlansPage />} />
            <Route path="/murabbiylar" element={<TrainersPage />} />
            <Route path="/klub" element={<AboutClubPage />} />
            <Route path="/kalkulyator" element={<CalculatorPage />} />
            <Route path="/aloqa" element={<ContactPage />} />
            <Route path="/kabinet" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer />
        <DemoSwitcher />
      </div>
    </BrowserRouter>
  );
};

export default App;
