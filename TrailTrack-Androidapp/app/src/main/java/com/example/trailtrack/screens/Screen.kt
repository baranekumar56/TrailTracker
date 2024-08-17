package com.example.trailtrack.screens

sealed class Screen(val route: String) {
    object HomeScreen : Screen("homescreen")
    object Login : Screen("login")
    object Main : Screen("main")
    object SignUp : Screen("signup")
    object LocationScreen : Screen("locationscreen")
}
