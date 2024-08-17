import React, { useState } from 'react';
import styled from 'styled-components';
import MapView from './MapView';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3f4f6;
  height: 100vh;
`;

const Header = styled.div`
  background-color: #1f2937;
  width: 100%;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const HomePage = () => {
  const [showMap, setShowMap] = useState(false);

  // Sample points for demonstration
  const points = [
    { position: [51.505, -0.09], description: 'Trailer #1' },
    { position: [51.515, -0.1], description: 'Trailer #2' },
    { position: [51.495, -0.08], description: 'Trailer #3' },
  ];

  return (
    <HomeContainer>
      <Header>TrailTracker Dashboard</Header>
      <Button onClick={() => setShowMap(!showMap)}>
        {showMap ? 'Hide Map' : 'Show Map'}
      </Button>
      {showMap && <MapView points={points} />}
    </HomeContainer>
  );
};

export default HomePage;
