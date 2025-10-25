import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: calc(var(--spacing-unit) * 2);
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  background-color: var(--theme-surface);
  padding: calc(var(--spacing-unit) * 5);
  border-radius: 8px;
  box-shadow: var(--shadow-medium);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const ErrorMessage = styled.p`
  color: var(--accent-error);
  margin-bottom: calc(var(--spacing-unit) * 2);
`;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(credentials.username, credentials.password);
    if (success) {
      navigate('/admin');
    } else {
      setError("Le nom d'utilisateur ou le mot de passe est incorrect.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Connexion - Salon Lumière</title>
      </Helmet>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Espace Administrateur</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            label="Nom d'utilisateur"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Button type="submit" variant="primary" loading={isLoading} disabled={isLoading}>
            Connexion
          </Button>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default LoginPage;