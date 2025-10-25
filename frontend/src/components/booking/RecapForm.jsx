import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const FormContainer = styled.form`
  text-align: left;
  max-width: 450px;
  margin: 0 auto;
  animation: subtle-fade-up 0.5s var(--transition-subtle) forwards;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: calc(var(--spacing-unit) * 3);
`;

const Summary = styled.div`
  background-color: var(--theme-background);
  padding: calc(var(--spacing-unit) * 2.5);
  border-radius: 4px;
  margin-bottom: calc(var(--spacing-unit) * 4);
  text-align: center;
  line-height: 1.7;
  border-left: 3px solid var(--accent-primary);
  font-size: 1rem;

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 4);
`;

const RecapForm = ({ service, date, slot, onConfirm, onBack }) => {
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.phone) {
      return;
    }
    setIsSubmitting(true);
    await onConfirm(userInfo);
    setIsSubmitting(false);
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Récapitulatif et Confirmation</Title>
      <Summary>
        <strong>{service.title}</strong><br/>
        Le {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}<br/>
        à <strong>{new Date(slot.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' })}</strong>
      </Summary>
      <Input
        label="Votre Nom"
        type="text"
        name="name"
        value={userInfo.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Votre Téléphone"
        type="tel"
        name="phone"
        value={userInfo.phone}
        onChange={handleChange}
        required
      />
      <Actions>
        <Button type="button" variant="secondary" onClick={onBack}>Précédent</Button>
        <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
          Confirmer le Rendez-vous
        </Button>
      </Actions>
    </FormContainer>
  );
};

export default RecapForm;