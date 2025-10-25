import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';

const CalendarWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  animation: subtle-fade-up 0.5s var(--transition-subtle) forwards;
`;

const SectionTitle = styled.h3`
  text-align: left;
  font-size: 1.3rem;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: calc(var(--spacing-unit) * 3) 0;
`;

const MonthDisplay = styled.h4`
  font-family: var(--font-title);
  font-size: 1.5rem;
  text-transform: capitalize;
  text-align: center;
  flex-grow: 1;
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--text-secondary);
  transition: var(--transition-subtle);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary);
    background-color: var(--theme-background);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-unit);
`;

const DayName = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const Day = styled.button`
  height: 40px;
  font-size: 1rem;
  font-family: var(--font-text);
  border-radius: 50%;
  transition: var(--transition-subtle);
  border: none;

  color: ${({ $isSelected }) => ($isSelected ? 'var(--text-on-accent)' : 'var(--text-primary)')};
  background-color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-primary)' : 'transparent')};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    text-decoration: line-through;
  }

  &:not(:disabled):hover {
    background-color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-primary)' : 'var(--theme-background)')};
  }
`;

const InfoMessage = styled.p`
  text-align: center;
  margin-top: calc(var(--spacing-unit) * 3);
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const Actions = styled.div`
  margin-top: calc(var(--spacing-unit) * 4);
  text-align: left;
`;

const DatePickerCalendar = ({ onDateSelect, selectedDate, onBack }) => {
  const [displayDate, setDisplayDate] = useState(new Date());
  const { data: openingHours, loading } = useApi('/opening-hours/');
  
  const openDays = useMemo(() => {
    if (!openingHours) return [];
    return openingHours
      .filter(h => h.start_time && h.end_time)
      .map(h => h.day_of_week);
  }, [openingHours]);

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const renderDays = () => {
    const monthStart = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
    const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = (monthStart.getDay() + 6) % 7;
  
    const days = Array.from({ length: firstDayIndex }, (_, i) => <div key={`empty-${i}`} />);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), i);
      const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
      
      const isPastOrToday = date <= today;
      const isWorkDay = loading ? false : openDays.includes(dayOfWeek);
      const isAvailable = !isPastOrToday && isWorkDay;
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

      days.push(
        <Day 
          key={i} 
          $isSelected={isSelected}
          onClick={() => onDateSelect(date)}
          disabled={!isAvailable}
          aria-label={`Choisir la date du ${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}`}
        >
          {i}
        </Day>
      );
    }
    return days;
  };

  const changeMonth = (offset) => {
    setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
    <div style={{ animation: 'subtle-fade-up 0.5s var(--transition-subtle) forwards' }}>
      <SectionTitle>Choisissez une date</SectionTitle>
      <Header>
        <NavButton onClick={() => changeMonth(-1)} aria-label="Mois précédent">{'<'}</NavButton>
        <MonthDisplay>{displayDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</MonthDisplay>
        <NavButton onClick={() => changeMonth(1)} aria-label="Mois suivant">{'>'}</NavButton>
      </Header>
      <Grid>
        {daysOfWeek.map((day, index) => <DayName key={`${day}-${index}`}>{day}</DayName>)}
        {renderDays()}
      </Grid>
      <InfoMessage>
        Pour une réservation le jour même, merci d'appeler directement le salon.
      </InfoMessage>
      <Actions>
        <Button type="button" variant="secondary" onClick={onBack}>
          Précédent
        </Button>
      </Actions>
    </div>
  );
};

export default DatePickerCalendar;