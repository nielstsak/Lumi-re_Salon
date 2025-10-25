import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';

const FormContainer = styled.form`
  text-align: left;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 3);
`;

const Summary = styled.p`
  background-color: var(--bg-paper);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: 4px;
  margin-bottom: calc(var(--spacing-unit) * 3);
  text-align: center;
  line-height: 1.8;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 4);
`;

const ConfirmationForm = ({ service, date, slot, onConfirm, onCancel }) => {
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(userInfo);
  };
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Confirmez votre rendez-vous</Title>
      <Summary>
        <strong>{service.title}</strong><br/>
        Le {date} à <strong>{slot}</strong>
      </Summary>
      <Input
        label="Votre Nom"
        type="text"
        name="name"
        value={userInfo.name}
        onChange={handleChange}
      />
      <Input
        label="Votre Téléphone"
        type="tel"
        name="phone"
        value={userInfo.phone}
        onChange={handleChange}
      />
      <Actions>
        <Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button>
        <Button type="submit" variant="primary">Confirmer</Button>
      </Actions>
    </FormContainer>
  );
};

export default ConfirmationForm;