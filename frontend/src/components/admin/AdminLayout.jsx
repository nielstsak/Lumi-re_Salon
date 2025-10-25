import React from 'react';
import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';

const AdminContainer = styled.div`
  max-width: var(--max-width);
  margin: calc(var(--spacing-unit) * 8) auto;
  padding: 0 calc(var(--spacing-unit) * 4);
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const StyledNavLink = styled(NavLink)`
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 1rem;
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  position: relative;
  text-decoration: none;

  &.active {
    color: var(--text-primary);
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent-primary);
    transform: scaleX(1);
    transition: var(--transition-subtle);
  }

  &:hover {
    color: var(--text-primary);
  }
`;

const ContentContainer = styled.div`
  background-color: var(--theme-surface);
  padding: calc(var(--spacing-unit) * 4);
  border-radius: 4px;
  box-shadow: var(--shadow-subtle);
`;

const AdminLayout = ({ tabs }) => {
  return (
    <AdminContainer>
      <TabsContainer>
        {tabs.map((tab) => (
          <StyledNavLink
            key={tab.path}
            to={tab.path}
          >
            {tab.label}
          </StyledNavLink>
        ))}
      </TabsContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AdminContainer>
  );
};

export default AdminLayout;