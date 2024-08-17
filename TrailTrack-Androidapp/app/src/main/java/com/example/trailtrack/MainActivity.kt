package com.example.trailtrack

import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.*
import androidx.core.content.ContextCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.trailtrack.screens.Screen
import com.example.trailtrack.ui.screens.LoginScreen
import com.example.trailtrack.ui.screens.SignUpScreen
import com.example.trailtrack.ui.screens.LocationScreen
import com.example.trailtrack.ui.theme.TrailTrackTheme
import com.google.android.gms.location.*

class MainActivity : ComponentActivity() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback

    // State for location
    private var location by mutableStateOf<Location?>(null)

    // Request permission launcher
    private val requestPermissionLauncher = registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
        if (isGranted) {
            startLocationUpdates()
        } else {
            Log.e("MainActivity", "Location permission denied")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TrailTrackTheme {
                val navController = rememberNavController()
                NavHost(navController = navController, startDestination = Screen.HomeScreen.route) {
                    composable(Screen.HomeScreen.route) {
                        // Remove the onPermissionRequested parameter since it's not needed
                        HomeScreen(
                            navController = navController,
                            location = location
                        )
                    }
                    composable(Screen.Login.route) {
                        LoginScreen(navController = navController)
                    }
                    composable(Screen.SignUp.route) {
                        SignUpScreen(onSignUpSuccess = {})
                    }
                    composable(Screen.LocationScreen.route){
                        // Remove the onPermissionRequested parameter since it's not needed
                        LocationScreen(location = location)
                    }
                }
            }
        }

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.locations.forEach { loc ->
                    location = loc
                    Log.d("MainActivity", "Latitude: ${loc.latitude}, Longitude: ${loc.longitude}")
                }
            }
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            startLocationUpdates()
        } else {
            requestPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
        }
    }

    private fun startLocationUpdates() {
        val locationRequest = LocationRequest.Builder(10000).apply {
            setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY)
        }.build()

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, mainLooper)
        Log.d("MainActivity", "Location updates started")
    }

    override fun onStop() {
        super.onStop()
        fusedLocationClient.removeLocationUpdates(locationCallback)
        Log.d("MainActivity", "Location updates stopped")
    }
}
