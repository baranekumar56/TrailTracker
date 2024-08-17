import React from 'react';
import { useLocation } from 'react-router-dom';
import MapView from '../components/MapView';

const MapPage = () => {
  const location = JSON.parse(localStorage.getItem('selectedtrip'));
  const  latitude  = location.previousPosition.latitude
  const longitude = location.previousPosition.longitude
  return (
    <div className="map-page">
      <h1>Map View</h1>
      <MapView latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default MapPage;
