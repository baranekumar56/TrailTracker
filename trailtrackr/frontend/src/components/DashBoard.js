import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mapContainer}>
        <MapContainer center={[37.0902, -95.7129]} zoom={5} style={styles.map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <Dropdown />
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div style={styles.sidebar}>
    <h3>Trailer Management</h3>
    <ul>
      <li>Distribution Centers</li>
      <li>Fulfillment Centers</li>
      <li>Stores</li>
      <li>Reports</li>
    </ul>
  </div>
);

const Dropdown = () => (
  <div style={styles.dropdownContainer}>
    <label>Select Trailer:</label>
    <select>
      <option value="dc">Distribution Center</option>
      <option value="fc">Fulfillment Center</option>
      <option value="store">Store</option>
    </select>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#f1f1f1',
    padding: '20px',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    height: '100vh',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  }
};

export default Dashboard;
