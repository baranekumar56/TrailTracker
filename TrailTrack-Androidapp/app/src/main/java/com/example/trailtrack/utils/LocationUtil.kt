package com.example.trailtrack.utils

import LocationData
import android.content.Context
import android.location.Location
import android.widget.Toast
//import com.example.trailtrack.data.model.LocationData
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.tasks.Task
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

class LocationUtil(context: Context) {
    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    suspend fun getCurrentLocation(): LocationData {
        val suspendCancellableCoroutine = suspendCancellableCoroutine { continuation ->
            val locationTask: Task<Location> = fusedLocationClient.lastLocation
            locationTask.addOnSuccessListener { location ->
                if (location != null) {
                    continuation.resume(
                        LocationData(
                            latitude = location.latitude,
                            longitude = location.longitude
                        )
                    )
                } else {
                    continuation.resumeWithException(Exception("Location not available"))
                }
            }
            locationTask.addOnFailureListener { exception ->
                continuation.resumeWithException(exception)
            }
        }
        return suspendCancellableCoroutine
    }
}
