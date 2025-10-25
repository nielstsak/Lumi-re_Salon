import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import ArtisanSection from '../components/home/ArtisanSection';
import ServicesSection from '../components/home/ServicesSection';
import BookingSection from '../components/home/BookingSection';
import ExhibitionSection from '../components/home/ExhibitionSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Salon Lumière - Barbier Coiffeur & Galerie d'Art à Lyon 8</title>
        <meta
          name="description"
          content="Découvrez le Salon Lumière, votre barbier et coiffeur artisan à Lyon 8e. Prenez rendez-vous en ligne. "
        />
      </Helmet>
      <HeroSection />
      <ArtisanSection />
      <ServicesSection />
      <BookingSection />
      <ExhibitionSection />
    </>
  );
};

export default HomePage;