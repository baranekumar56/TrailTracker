package com.example.trailtrack.data.model

import LocationData

data class Trip(
    val _id:String,
    val sourceId: String,
    val destinationId: String,
    val operatingDriver: String,
    val beingSent: Boolean,
    val containerId: String,
    val isFinished: Boolean,
    val previousPosition: LocationData,
    val positions: List<LocationData>,
    val date: String // Date as ISO string or formatted date
)
