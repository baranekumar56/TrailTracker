package com.example.trailtrack.data.model

data class Response<T>(
    val isSuccessful: Boolean,
    val body: T?,
    val errorMessage: String?
)
