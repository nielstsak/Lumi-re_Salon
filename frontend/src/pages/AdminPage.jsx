import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../components/admin/AdminLayout';

const AdminPage = ({ tabs }) => {
  return (
    <>
      <Helmet>
        <title>Administration - Salon Lumière</title>
      </Helmet>
      <AdminLayout tabs={tabs} />
    </>
  );
};

export default AdminPage;