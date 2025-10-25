import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';

const ModalContent = styled.div`
  padding: var(--spacing-unit);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 2);
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-unit);
  margin-top: calc(var(--spacing-unit) * 3);
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--accent-error);
  cursor: pointer;
  margin-right: auto;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  margin-bottom: calc(var(--spacing-unit) * 2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--theme-surface);
  font-family: var(--font-text);
  font-size: 1rem;
`;

const AppointmentModal = ({ isOpen, event, onClose, onSave, onDelete }) => {
  const { data: services } = useApi('/services/');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id || null,
        title: event.title || '',
        phone: event.phone || '',
        start: event.start ? new Date(event.start).toISOString().slice(0, 16) : '',
        service: event.service || (services?.[0]?.id || ''),
      });
    }
  }, [event, services]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, start: new Date(formData.start).toISOString() });
  };

  const handleDelete = () => {
    if (formData.id) {
      onDelete(formData.id);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h3>{event?.id ? 'Modifier le Rendez-vous' : 'Nouveau Rendez-vous'}</h3>
        <Form onSubmit={handleSubmit}>
          <Input 
            label="Nom" 
            name="title" 
            value={formData.title || ''} 
            onChange={handleChange} 
          />
          <Input 
            label="Téléphone" 
            name="phone" 
            value={formData.phone || ''} 
            onChange={handleChange} 
          />
          <Input
            label="Date et heure"
            name="start"
            type="datetime-local"
            value={formData.start || ''}
            onChange={handleChange}
          />
          <label htmlFor="service">Service</label>
          <Select 
            name="service" 
            id="service"
            value={formData.service || ''} 
            onChange={handleChange}
          >
            {services?.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </Select>
          <Actions>
            {event?.id && (
              <DeleteButton type="button" onClick={handleDelete}>
                Supprimer
              </DeleteButton>
            )}
            <Button type="button" variant="secondary" onClick={onClose}>Annuler</Button>
            <Button type="submit" variant="primary">Enregistrer</Button>
          </Actions>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentModal;