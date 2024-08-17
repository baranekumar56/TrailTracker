package com.example.trailtrack.data.network

import com.example.trailtrack.data.model.AuthResponse
import com.example.trailtrack.data.model.TripResponse
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.Response
import retrofit2.http.GET

interface ApiService {


    @POST("user/login")
    suspend fun login(@Body credentials: Map<String, String>): Response<AuthResponse>


    @POST("/")
    suspend fun signup(@Body credentials: Map<String, String>): AuthResponse
}
