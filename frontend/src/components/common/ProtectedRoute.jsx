import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useAuth(); // On récupère l'état de chargement

  // Pendant que l'on vérifie l'authentification, on affiche un message
  if (loading) {
    return <div>Chargement de la session...</div>;
  }

  // Une fois le chargement terminé, on redirige si pas de token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est authentifié, on affiche la page demandée
  return <Outlet />;
};

export default ProtectedRoute;