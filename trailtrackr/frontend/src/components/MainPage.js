import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import MapView from './MapView';
const fetchCenterData = async (userDetails, navigate, setCenterDetails) => {
    try {
        const response = await fetch('http://localhost:8000/depart/getCenterData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        if (response.status !== 200) {
            console.log("Failed to fetch center data");
            localStorage.setItem('userdetails', '');
            navigate('/');
            return;
        }

        const centerDetails = await response.json();
        console.log(centerDetails);

        localStorage.setItem('centerdetails', JSON.stringify(centerDetails));
        setCenterDetails(centerDetails);
    } catch (error) {
        console.error("Error fetching center data:", error);
    }
};

const MainPage = () => {
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userdetails'));

    const [centerDetails, setCenterDetails] = useState(undefined);
    const [tripType, setTripType] = useState('incoming');
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [filter, setFilter] = useState('all'); 
    const [loadMap, setLoadMap] = useState(false);
    const [newTrip, setNewTrip] = useState({
        sourceId: '',
        destinationId: '',
        operatingDriver: '',
        beingSent: true,
        containerId: '',
        isFinished: false,
        previousPosition: { latitude: 0, longitude: 0 },
        positions: [],
    });

    const [finishTripData, setFinishTripData] = useState({
        tripId: '',
        additionalInfo: '',
    });

    useEffect(() => {
        if (!centerDetails) {
            fetchCenterData(userDetails, navigate, setCenterDetails);
        }
    }, [centerDetails, userDetails, navigate]);

    useEffect(() => {
        const fetchTrips = async () => {
            if (!centerDetails) return;

            try {
                const response = await fetch(
                    tripType === 'incoming'
                        ? 'http://localhost:8000/trips/getTripOfDCentersIncoming'
                        : 'http://localhost:8000/trips/getTripOfDCentersOutGoing',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(centerDetails),
                    }
                );

                const data = await response.json();
                setTrips(data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [tripType, centerDetails]);

    const handleMap = (e) => {
        localStorage.setItem('selectedtrip', JSON.stringify(selectedTrip))
        navigate('/map')
    }

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
        setSelectedTrip(null);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setSelectedTrip(null);
    };

    const handleStartTrip = async () => {
        if (!centerDetails) return;

        newTrip.previousPosition = { latitude: centerDetails.location.latitude, longitude: centerDetails.location.longitude };
        newTrip.positions = [newTrip.previousPosition];
        console.log(newTrip);

        try {
            const response = await fetch('http://localhost:8000/trips/createtrip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrip),
            });

            const data = await response.json();
            alert('Trip started successfully!');
            setTrips([...trips, data]);
            setNewTrip({
                sourceId: '',
                destinationId: '',
                operatingDriver: '',
                beingSent: true,
                containerId: '',
                isFinished: false,
                previousPosition: { latitude: 0, longitude: 0 },
                positions: [],
            });
        } catch (error) {
            console.error('Error starting trip:', error);
        }
    };

    const handleFinishTrip = async () => {
        try {
            const response = await fetch(`http://localhost:8000/trips/${finishTripData.tripId}/finish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finishTripData),
            });

            const data = await response.json();
            alert('Trip finished successfully!');
            setTrips(trips.map(trip => trip._id === data._id ? data : trip));
            setFinishTripData({
                tripId: '',
                additionalInfo: '',
            });
        } catch (error) {
            console.error('Error finishing trip:', error);
        }
    };

    // Filter trips based on the selected filter
    const filteredTrips = trips.filter(trip => {
        if (filter === 'all') return true;
        if (filter === 'finished') return trip.isFinished;
        if (filter === 'unfinished') return !trip.isFinished;
        return true;
    });

    return (
        <div className="main-container">
            <div className="side-nav">
                <h2>Dashboard</h2>
                <button onClick={() => setTripType('incoming')} className={tripType === 'incoming' ? 'active' : ''}>Incoming Cargo</button>
                <button onClick={() => setTripType('outgoing')} className={tripType === 'outgoing' ? 'active' : ''}>Outgoing Cargo</button>
            </div>

            <div className="content">
                <div className="trip-list">
                    <h2>{tripType.charAt(0).toUpperCase() + tripType.slice(1)} Trips</h2>
                    <select onChange={handleFilterChange} value={filter} className="trip-filter">
                        <option value="all">All Trips</option>
                        <option value="finished">Finished Trips</option>
                        <option value="unfinished">Unfinished Trips</option>
                    </select>
                    <ul>
                        {filteredTrips.map(trip => (
                            <li key={trip._id} onClick={() => setSelectedTrip(trip)} className={selectedTrip && selectedTrip._id === trip._id ? 'selected' : ''}>
                                Trip to {trip.destinationId}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="trip-details">
                    {selectedTrip ? (
                        <>
                            <h3>Trip Details</h3>
                            <p><strong>Source ID:</strong> {selectedTrip.sourceId}</p>
                            <p><strong>Destination ID:</strong> {selectedTrip.destinationId}</p>
                            <p><strong>Operating Driver:</strong> {selectedTrip.operatingDriver}</p>
                            <p><strong>Container ID:</strong> {selectedTrip.containerId}</p>
                            <p><strong>Status:</strong> {selectedTrip.isFinished ? 'Finished' : 'In Progress'}</p>
                            <button className="load-map" onClick={handleMap}>Load Real World Map</button>
                            {/* <div className="map-container">
                                <MapView latitude={selectedTrip.previousPosition.latitude} longitude={selectedTrip.previousPosition.longitude} />
                            </div> */}
                        </>
                    ) : (
                        <p>Select a trip to view details</p>
                    )}
                </div>

                <div className="trip-actions">
                    <div className="start-trip">
                        <h3>Start a New Trip</h3>
                        <input type="text" placeholder="Source ID" value={newTrip.sourceId}   onChange={(e) => setNewTrip({ ...newTrip, sourceId: e.target.value })} />
                        <input type="text" placeholder="Destination ID" value={newTrip.destinationId} onChange={(e) => setNewTrip({ ...newTrip, destinationId: e.target.value })} />
                        <input type="text" placeholder="Operating Driver" value={newTrip.operatingDriver} onChange={(e) => setNewTrip({ ...newTrip, operatingDriver: e.target.value })} />
                        <input type="text" placeholder="Container ID" value={newTrip.containerId} onChange={(e) => setNewTrip({ ...newTrip, containerId: e.target.value })} />
                        <button onClick={handleStartTrip}>Start Trip</button>
                    </div>

                    <div className="finish-trip">
                        <h3>Finish a Trip</h3>
                        <input type="text" placeholder="Trip ID" value={finishTripData.tripId} onChange={(e) => setFinishTripData({ ...finishTripData, tripId: e.target.value })} />
                        <input type="text" placeholder="Additional Info" value={finishTripData.additionalInfo} onChange={(e) => setFinishTripData({ ...finishTripData, additionalInfo: e.target.value })} />
                        <button onClick={handleFinishTrip}>Finish Trip</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
