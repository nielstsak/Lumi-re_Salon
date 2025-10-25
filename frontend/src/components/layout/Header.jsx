import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: calc(var(--spacing-unit) * 3) 0;
  background-color: var(--theme-background);
  transition: var(--transition-subtle);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--border-color);
    transform: scaleY(${({ $isScrolled }) => ($isScrolled ? 1 : 0)});
    transition: var(--transition-subtle);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center; /* Centrer le contenu */
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 calc(var(--spacing-unit) * 4);
`;

const Logo = styled(NavLink)`
  font-family: var(--font-title);
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--text-primary);
  text-align: center;
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $isScrolled={isScrolled}>
      <Nav>
        <Logo to="/">Salon Lumière</Logo>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;