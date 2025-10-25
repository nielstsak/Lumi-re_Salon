import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useApi from '../../hooks/useApi';
import AdminSection from './AdminSection';
import AppointmentModal from './AppointmentModal';
import { useNotification } from '../../contexts/NotificationContext';
import apiClient from '../../services/apiClient';

const CalendarWrapper = styled.div`
  .fc { 
    font-family: var(--font-text); 
  }
  .fc .fc-toolbar-title { 
    font-family: var(--font-title); 
    font-size: 1.8rem; 
    color: var(--text-primary);
  }
  .fc .fc-button { 
    background-color: var(--theme-surface); 
    border: 1px solid var(--border-color);
    color: var(--text-primary) !important;
    transition: var(--transition-subtle);
    box-shadow: none;
  }
  .fc .fc-button:hover { 
    background-color: var(--theme-background);
  }
  .fc .fc-button .fc-icon {
    color: var(--text-primary);
  }
  .fc-icon {
    vertical-align: middle;
  }
`;

const PlanningView = () => {
  const { data: appointments, loading, error, refresh } = useApi('/appointments/');
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const formatEvents = (data) => {
    if (!data) return [];
    return data.map(app => ({
      id: app.id,
      title: `${app.title} - ${app.service_title}`,
      start: app.start,
      end: app.end,
      extendedProps: {
        phone: app.phone,
        service: app.service,
        title: app.title
      }
    }));
  };

  const handleEventClick = useCallback((clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      ...clickInfo.event.extendedProps
    });
    setIsModalOpen(true);
  }, []);

  const handleSelect = useCallback((selectInfo) => {
    setSelectedEvent({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleSave = async (eventData) => {
    const isUpdate = !!eventData.id;
    const url = isUpdate ? `/appointments/${eventData.id}/` : '/appointments/';
    const method = isUpdate ? 'put' : 'post';

    try {
      await apiClient[method](url, eventData);
      showNotification(`Rendez-vous ${isUpdate ? 'mis à jour' : 'créé'}.`);
      refresh();
      handleCloseModal();
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/appointments/${id}/`);
      showNotification('Rendez-vous supprimé.');
      refresh();
      handleCloseModal();
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    }
  };

  if (loading) return <p>Chargement du planning...</p>;
  if (error) return <p style={{ color: 'var(--accent-error)' }}>Erreur de chargement du planning.</p>;

  return (
    <AdminSection title="Planning des Rendez-vous">
      <CalendarWrapper>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={formatEvents(appointments)}
          locale="fr"
          allDaySlot={false}
          slotMinTime="11:00:00"
          slotMaxTime="20:00:00"
          height="70vh"
          buttonText={{
            today: "Aujourd'hui",
            month: 'Mois',
            week: 'Semaine',
          }}
          editable
          selectable
          selectMirror
          eventClick={handleEventClick}
          select={handleSelect}
        />
      </CalendarWrapper>

      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={handleCloseModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </AdminSection>
  );
};

export default PlanningView;