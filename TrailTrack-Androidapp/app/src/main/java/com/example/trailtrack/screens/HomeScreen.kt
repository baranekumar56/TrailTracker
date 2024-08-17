package com.example.trailtrack

import android.location.Location
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.trailtrack.screens.Screen
import com.example.trailtrack.ui.theme.HomeScreenTheme

@Composable
fun HomeScreen(
    navController: NavController,
    location: Location? // Keep this parameter if you still need location data in the UI
) {
    HomeScreenTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.primary // Set the background color
        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.fillMaxSize()
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "TrailTrack",
                        color = MaterialTheme.colorScheme.secondary, // Use the secondary color
                        style = MaterialTheme.typography.headlineLarge
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Image(
                        painter = painterResource(id = R.drawable.truck_image), // Replace with your image resource
                        contentDescription = "TrailTrack Logo",
                        modifier = Modifier
                            .size(150.dp)
                            .clip(CircleShape),
                        contentScale = ContentScale.Crop
                    )

                    Spacer(modifier = Modifier.height(32.dp))

                    // Login Button
                    Button(
                        onClick = {
                            navController.navigate(Screen.Login.route)
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color.White,
                            contentColor = Color.Black
                        ),
                        modifier = Modifier.widthIn(min = 150.dp)
                    ) {
                        Text(text = "Login")
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Signup Button
                    Button(
                        onClick = {
                            navController.navigate(Screen.SignUp.route)
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color.White,
                            contentColor = Color.Black
                        ),
                        modifier = Modifier.widthIn(min = 150.dp)
                    ) {
                        Text(text = "Signup")
                    }
                }
            }
        }
    }
}
