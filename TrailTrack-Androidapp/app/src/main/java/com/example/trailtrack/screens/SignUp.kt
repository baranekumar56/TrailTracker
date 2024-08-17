package com.example.trailtrack.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.example.trailtrack.data.network.NetworkModule
import com.example.trailtrack.data.JwtManager
import com.example.trailtrack.data.network.LoginRequest
import kotlinx.coroutines.launch

@Composable
fun SignUpScreen(
    onSignUpSuccess: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var vehicleId by remember { mutableStateOf("") }
    var licenseNumber by remember { mutableStateOf("") }
    var errorMessage by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Sign Up", style = MaterialTheme.typography.titleLarge)

        Spacer(modifier = Modifier.height(16.dp))

        TextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("Username") }
        )

        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation()
        )

        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = vehicleId,
            onValueChange = { vehicleId = it },
            label = { Text("Vehicle ID") }
        )

        Spacer(modifier = Modifier.height(8.dp))

        TextField(
            value = licenseNumber,
            onValueChange = { licenseNumber = it },
            label = { Text("License Number") }
        )

        errorMessage?.let {
            Text(text = it, color = MaterialTheme.colorScheme.error)
            Spacer(modifier = Modifier.height(8.dp))
        }

        Button(
            onClick = {
                scope.launch {
                    try {
                        val request = LoginRequest(
                            username = username,
                            password = password,
//                            vehicleId = vehicleId,
//                            licenseNumber = licenseNumber
                        )
                        val response = NetworkModule.authService.signup(request)

//                        val jwtManager = JwtManager(context)
//                        jwtManager.saveToken(response.token)
                        onSignUpSuccess()
                    } catch (e: Exception) {
                        errorMessage = "Sign up failed: ${e.message}"
                    }
                }
            }
        ) {
            Text("Sign Up")
        }
    }
}
