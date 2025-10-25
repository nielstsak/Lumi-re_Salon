import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import useApi from '../../hooks/useApi';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../contexts/NotificationContext';
import AdminSection from './AdminSection';

const FormSection = styled.form`
  background-color: var(--theme-background);
  padding: calc(var(--spacing-unit) * 4);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-bottom: calc(var(--spacing-unit) * 5);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr auto;
  gap: calc(var(--spacing-unit) * 3);
  align-items: flex-end;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1rem;

  th, td {
    padding: calc(var(--spacing-unit) * 2);
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-family: var(--font-text);
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  h3 {
    margin-bottom: var(--spacing-unit);
  }
  p {
    margin-bottom: calc(var(--spacing-unit) * 3);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-unit);
`;

const BlocksManager = () => {
  const { data: blocks, loading, error, refresh } = useApi('/block-periods/');
  const { showNotification } = useNotification();
  const [formState, setFormState] = useState({ start_date: '', end_date: '', reason: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);

  const handleChange = e => setFormState(prev => ({...prev, [e.target.name]: e.target.value}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.start_date || !formState.end_date) {
      showNotification('Les dates de début et de fin sont requises.', 'error');
      return;
    }
    try {
      await apiClient.post('/block-periods/', formState);
      showNotification('Période de fermeture ajoutée.');
      refresh();
      setFormState({ start_date: '', end_date: '', reason: '' });
    } catch(err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    }
  };

  const openDeleteModal = (id) => {
    setBlockToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBlockToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!blockToDelete) return;
    try {
      await apiClient.delete(`/block-periods/${blockToDelete}/`);
      showNotification('Période supprimée.');
      refresh();
    } catch(err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    } finally {
      closeDeleteModal();
    }
  };
  
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('fr-FR', { timeZone: 'UTC' });

  return (
    <AdminSection title="Gérer les Périodes de Fermeture">
      <FormSection onSubmit={handleSubmit}>
        <h3>Ajouter une période (vacances, etc.)</h3>
        <FormGrid>
          <Input label="Début" name="start_date" type="date" value={formState.start_date} onChange={handleChange} />
          <Input label="Fin" name="end_date" type="date" value={formState.end_date} onChange={handleChange} />
          <Input label="Raison (optionnel)" name="reason" value={formState.reason} onChange={handleChange} />
          <Button type="submit">Ajouter</Button>
        </FormGrid>
      </FormSection>
      
      {loading && <p>Chargement...</p>}
      {error && <p style={{color: 'var(--accent-red)'}}>Erreur de chargement.</p>}
      <Table>
        <thead>
          <tr><th>Début</th><th>Fin</th><th>Raison</th><th>Action</th></tr>
        </thead>
        <tbody>
          {blocks?.map(block => (
            <tr key={block.id}>
              <td>{formatDate(block.start_date)}</td>
              <td>{formatDate(block.end_date)}</td>
              <td>{block.reason}</td>
              <td><Button variant="secondary" onClick={() => openDeleteModal(block.id)}>Supprimer</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeDeleteModal}>
        <ModalContent>
          <h3>Confirmer la suppression</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette période de fermeture ?</p>
          <ModalActions>
            <Button variant="secondary" onClick={closeDeleteModal}>Annuler</Button>
            <Button variant="primary" onClick={handleDelete}>Confirmer</Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </AdminSection>
  );
};

export default BlocksManager;