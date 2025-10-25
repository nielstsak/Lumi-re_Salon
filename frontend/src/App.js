import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Notification from './components/common/Notification';

import DashboardView from './components/admin/DashboardView';
import PlanningView from './components/admin/PlanningView';
import ServicesManager from './components/admin/ServicesManager';
import HoursManager from './components/admin/HoursManager';
import BlocksManager from './components/admin/BlocksManager';
import SettingsManager from './components/admin/SettingsManager';

function App() {
  const adminTabs = [
    { path: 'dashboard', label: 'Dashboard', component: DashboardView },
    { path: 'planning', label: 'Planning', component: PlanningView },
    { path: 'services', label: 'Services', component: ServicesManager },
    { path: 'horaires', label: 'Horaires', component: HoursManager },
    { path: 'fermetures', label: 'Périodes de fermeture', component: BlocksManager },
    { path: 'reglages', label: 'Réglages', component: SettingsManager },
  ];

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage tabs={adminTabs} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              {adminTabs.map(tab => (
                <Route key={tab.path} path={tab.path} element={<tab.component />} />
              ))}
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
      
      <Notification />
    </Router>
  );
}

export default App;