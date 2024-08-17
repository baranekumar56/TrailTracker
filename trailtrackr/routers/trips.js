const express = require('express');
const router = express.Router();
const {authenticate, authorizeVerified}=require('./view')
const User = require('../models/users');
const Trip = require("../models/trip")
const FTrip = require('../models/finisedTrips')

router.post("/createtrip", async (req, res) => {
    const { sourceId, destinationId, operatingDriver, beingSent, containerId, isFinished, previousPosition, positions } = req.body;

    // Construct the object
    const obj = {
        sourceId,
        destinationId,
        operatingDriver,
        beingSent,
        containerId,
        isFinished,
        previousPosition,
        positions,
    };

    try {
        // Create and save the trip data
        const tripData = await Trip.create(obj);
        console.log(tripData);
        res.status(200).json(tripData);
    } catch (error) {
        console.error(error); // Consider using a logging library in production
        res.status(500).json({ message: 'Error creating trip unit', error });
    }
});


router.post("/getTripOfDCentersOutGoing", async (req, res) => {
    const {centerId} = req.body;
    // console.log(req.body)
    try{
        const centerTrip1 = await Trip.find({sourceId:centerId});
        console.log(centerTrip1)
        if (centerTrip1 != null) 
            res.json(centerTrip1);
        else res.json({});
        
    }catch (error) {
        res.status(500).json({ message: 'Error creating users unit', error });
      }
})

router.post("/getTrip", async (req, res) => {
    const {tripId} = req.body;
    try{
        const trip = await Trip.findById(tripId);
        if (!trip) return res.status(404).json({ error: "Trip not found" });
        console.log(trip);
        return res.json(trip);
    }catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
})

router.post("/getTripOfDCentersIncoming", async (req, res) => {
    const {centerId} = req.body;
    try{
  
        const centerTrip2 = await Trip.find({destinationId:centerId});

        if (centerTrip2 != null) 
            res.json(centerTrip2);
        else res.json({});
    }catch (error) {
        res.status(500).json({ message: 'Error creating users unit', error });
      }
})

router.post("/getTripOfDriver", async (req, res) => {
    const {name} = req.body;
    const driversTrip = await Trip.findOne({operatingDriver:name});
    if (driversTrip != null){
        res.json(driversTrip);
    }
    res.json({NoJob:"True"});
})

router.post("/updatePosition", async (req, res) => {
    const { name, latitude, longitude, tripId } = req.body;

    if (!name || latitude === undefined || longitude === undefined || tripId === undefined) {
        return res.status(400).json({ error: "Invalid input" });
    }

    try {
        const trip = await Trip.findById(tripId).select("previousPosition");
        
        if (!trip) {
            return res.status(404).json({ error: "Trip not found" });
        }

        const previousPosition = trip.previousPosition || {};
        if (previousPosition.latitude === latitude && previousPosition.longitude === longitude) {
            return res.status(200).json({ error: "Position has not changed" });
        }
        const r = await Trip.findByIdAndUpdate(tripId, {
    
                $set: { previousPosition: { latitude, longitude } },
                $push: { positions: { latitude, longitude } }
            },
            { new: true, select: 'previousPosition positions' }
        )
        
        return res.status(200).json({ message: "Position updated successfully", r });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: "An error occurred while updating the position" });
    }
})

router.post('/reachedDestination', async (req, res) => {
    const {tripId} = req.body;
    try{
        const trip = await Trip.findByIdAndUpdate({_id:tripId},{isFinished:true});
        // console.log(trip)
        return res.status(200).json(trip)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
})

module.exports = router;
