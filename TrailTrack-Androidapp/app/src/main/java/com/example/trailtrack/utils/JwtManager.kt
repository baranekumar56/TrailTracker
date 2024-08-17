package com.example.trailtrack.data

import android.content.Context
import android.content.SharedPreferences

class JwtManager(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("auth_prefs", Context.MODE_PRIVATE)

    var token: String?
        get() = prefs.getString("jwt_token", null)
        set(value) {
            prefs.edit().putString("jwt_token", value).apply()
        }

    fun saveToken(token: String) {
        prefs.edit().putString("jwt_token", token).apply()
    }

    fun clearToken() {
        prefs.edit().remove("jwt_token").apply()
    }
}
