package com.example.trailtrack.ui.screens

import LocationData
import android.location.Location
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.trailtrack.data.model.Trip

@Composable
fun LocationScreen(
    location: Location?
) {
    var isLocationSent by remember { mutableStateOf(false) }
    val localTrip = Trip(
        _id = "1",
        sourceId = "Source123",
        destinationId = "Dest456",
        operatingDriver = "Driver789",
        beingSent = false,
        containerId = "Container001",
        isFinished = false,
        previousPosition = LocationData(0.0, 0.0),
        positions = listOf(),
        date = "2024-08-16"
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .background(MaterialTheme.colors.background)
    ) {
        TopAppBar(
            title = { Text("Location Screen") }
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text("Trip Details", fontSize = 20.sp)
        Text("Source ID: ${localTrip.sourceId}")
        Text("Destination ID: ${localTrip.destinationId}")
        Text("Driver: ${localTrip.operatingDriver}")
        Text("Container ID: ${localTrip.containerId}")
        Text("Date: ${localTrip.date}")
        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            if (location != null) {
                isLocationSent = true
            }
        }) {
            Text("Start Ride")
        }

        if (isLocationSent) {
            Text("Location data has been recorded.", color = MaterialTheme.colors.primary)
        }
    }
}
