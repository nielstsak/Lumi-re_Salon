import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Section from '../layout/Section';
import ServiceSelector from '../booking/ServiceSelector';
import DatePickerCalendar from '../booking/DatePickerCalendar';
import TimeSlotGrid from '../booking/TimeSlotGrid';
import RecapForm from '../booking/RecapForm';
import ConfirmationStep from '../booking/ConfirmationStep';
import BookingProgressBar from '../booking/BookingProgressBar';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../contexts/NotificationContext';

const BookingContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--theme-surface);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 5);
  box-shadow: var(--shadow-medium);
`;

const StepContainer = styled.div`
  margin-top: calc(var(--spacing-unit) * 5);
  animation: subtle-fade-up 0.5s var(--transition-subtle);
`;

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { showNotification } = useNotification();

  const handleServiceSelect = useCallback((service) => {
    setSelectedService(service);
    setStep(2);
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setStep(3);
  }, []);

  const handleSlotSelect = useCallback((slot) => {
    setSelectedSlot(slot);
    setStep(4);
  }, []);

  const handleConfirmation = async (userInfo) => {
    const appointmentData = {
      title: userInfo.name,
      phone: userInfo.phone,
      service: selectedService.id,
      start: selectedSlot.start,
    };

    try {
      await apiClient.post('/appointments/', appointmentData);
      setStep(5);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        showNotification("Ce créneau n'est plus disponible. Veuillez en choisir un autre.", 'error');
        setStep(3);
        setSelectedSlot(null);
      } else {
        showNotification(`Erreur lors de la réservation: ${err.message || 'Une erreur est survenue.'}`, 'error');
      }
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(current => current - 1);
    }
  };
  
  const resetProcess = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  return (
    <Section id="prendre-rdv" title="Prendre Rendez-vous">
      <BookingContainer>
        <BookingProgressBar currentStep={step} />
        
        <StepContainer>
          {step === 1 && <ServiceSelector onServiceSelect={handleServiceSelect} selectedServiceId={selectedService?.id} />}
          
          {step === 2 && (
            <DatePickerCalendar 
              onDateSelect={handleDateSelect} 
              selectedDate={selectedDate} 
              onBack={goBack}
            />
          )}

          {step === 3 && selectedService && selectedDate && (
            <TimeSlotGrid 
              serviceId={selectedService.id} 
              date={selectedDate} 
              onSlotSelect={handleSlotSelect}
              onBack={goBack}
            />
          )}

          {step === 4 && selectedService && selectedDate && selectedSlot && (
            <RecapForm
              service={selectedService}
              date={selectedDate}
              slot={selectedSlot}
              onConfirm={handleConfirmation}
              onBack={goBack}
            />
          )}

          {step === 5 && (
            <ConfirmationStep onReset={resetProcess} />
          )}
        </StepContainer>
      </BookingContainer>
    </Section>
  );
};

export default BookingSection;