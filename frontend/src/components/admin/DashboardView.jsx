import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import KpiCard from './KpiCard';
import AdminSection from './AdminSection';
import useApi from '../../hooks/useApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const DashboardView = () => {
  const { data: kpis, loading, error } = useApi('/dashboard-kpis/summary/');

  if (loading) return <p>Chargement du tableau de bord...</p>;
  if (error) return <p style={{color: 'var(--accent-red)'}}>Erreur de chargement des données.</p>;

  return (
    <AdminSection title="Tableau de Bord">
      <KpiGrid>
        <KpiCard value={kpis?.daily_appointments || 0} label="RDV aujourd'hui" />
        <KpiCard value={`${kpis?.daily_revenue.toFixed(2) || 0} €`} label="Revenu estimé (jour)" />
        <KpiCard value={kpis?.weekly_appointments || 0} label="RDV sur 7 jours" />
      </KpiGrid>
      {/* Le composant de graphique pourrait être amélioré ici */}
    </AdminSection>
  );
};

export default DashboardView;