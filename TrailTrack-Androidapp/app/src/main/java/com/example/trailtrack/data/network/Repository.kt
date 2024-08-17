package com.example.trailtrack.data.network

import com.example.trailtrack.data.model.AuthResponse
import retrofit2.Response

class Repository(private val api: ApiService) {

    suspend fun login(username: String, password: String): Response<AuthResponse> {
        val credentials = mapOf("name" to username, "password" to password)
        return api.login(credentials)
    }

    suspend fun signup(
        username: String,
        password: String,
        vehicleId: String,
        licenseNumber: String,
        driverImage: String,  // Base64 or URL after upload
        licenseImage: String, // Base64 or URL after upload
        vehicleImage: String  // Base64 or URL after upload
    ): AuthResponse {
        val credentials = mapOf(
            "username" to username,
            "password" to password,
            "vehicleId" to vehicleId,
            "licenseNumber" to licenseNumber,
            "driverImage" to driverImage,
            "licenseImage" to licenseImage,
            "vehicleImage" to vehicleImage
        )
        return api.signup(credentials)
    }
}
