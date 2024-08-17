package com.example.trailtrack.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Color.Blue,
    secondary = Color.Green
)

private val HomeScreenScheme = lightColorScheme(
    primary = Color.Black,
    secondary = Color.White
)

@Composable
fun HomeScreenTheme (
    content:@Composable () -> Unit
){
    MaterialTheme(
        colorScheme = HomeScreenScheme,
        content = content
    )
}

@Composable
fun TrailTrackTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}

