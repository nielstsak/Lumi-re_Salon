import React from 'react';
import styled from 'styled-components';
import { HashLink } from 'react-router-hash-link';

const FooterContainer = styled.footer`
  background-color: #1C1C1C;
  color: var(--text-on-primary); /* Ajusté pour le contraste sur fond sombre */
  padding: calc(var(--spacing-unit) * 8) 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1); /* Bordure plus discrète */
  }

  @media (max-width: 768px) {
    padding: calc(var(--spacing-unit) * 6) 0;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: calc(var(--spacing-unit) * 5);
  max-width: var(--max-width);
  margin: 0 auto calc(var(--spacing-unit) * 6);
  padding: 0 calc(var(--spacing-unit) * 4);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: calc(var(--spacing-unit) * 4);
    text-align: center;
    margin-bottom: calc(var(--spacing-unit) * 4);
    padding: 0 calc(var(--spacing-unit) * 2);
  }
`;

const FooterCol = styled.div`
  h3 {
    font-family: var(--font-text);
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--text-on-primary);
    margin-bottom: calc(var(--spacing-unit) * 3);
  }

  p, li {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-unit);
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    color: var(--text-secondary);
    &:hover {
      color: var(--theme-surface);
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    h3 {
      margin-bottom: calc(var(--spacing-unit) * 2);
    }
    p, li {
      font-size: 0.95rem;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: calc(var(--spacing-unit) * 4);
  margin: 0 calc(var(--spacing-unit) * 4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: var(--text-secondary);

  @media (max-width: 768px) {
     margin: 0 calc(var(--spacing-unit) * 2);
     padding-top: calc(var(--spacing-unit) * 3);
     font-size: 0.85rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterCol>
          <h3>Salon Lumière</h3>
          <p>
            Artisan barbier et coiffeur à Lyon 8e. Une expérience authentique alliant savoir-faire traditionnel et style actuel.
          </p>
        </FooterCol>
        <FooterCol>
          <h3>Navigation</h3>
          <ul>
            <li><HashLink smooth to="/#artisan-barber">Artisan</HashLink></li>
            <li><HashLink smooth to="/#nos-services">Services</HashLink></li>
            <li><HashLink smooth to="/#prendre-rdv">Rendez-vous</HashLink></li>
            <li><HashLink smooth to="/#expo">Exposition</HashLink></li>
          </ul>
        </FooterCol>
        <FooterCol>
          <h3>Contact</h3>
          <p>Lundi au Vendredi : 11h - 19h</p>
          <p><a href="tel:+33478005164">04 78 00 51 64</a></p>
          <p><a href="https://maps.app.goo.gl/..." target="_blank" rel="noopener noreferrer">39 avenue des frères Lumière<br/>69008 Lyon</a></p>
        </FooterCol>
      </FooterGrid>
      <FooterBottom>
        <p>© {new Date().getFullYear()} Salon Lumière. Tous droits réservés.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;