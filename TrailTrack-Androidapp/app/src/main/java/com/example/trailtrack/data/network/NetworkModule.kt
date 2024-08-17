package com.example.trailtrack.data.network

import LocationData
import com.example.trailtrack.data.model.Trip
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

object NetworkModule {

    private const val BASE_URL = "http://10.0.2.2:3000/" // Replace with your server's IP and port

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val tripService: TripService = retrofit.create(TripService::class.java)

    val authService: AuthService by lazy {
        retrofit.create(AuthService::class.java)
    }
}

data class LoginRequest(val username: String, val password: String)
data class LoginResponse(val token: String, val errorMessage: String? = null)

interface AuthService {

    @POST("login")
    suspend fun login(@Body request: LoginRequest): retrofit2.Response<LoginResponse>

    @POST
    suspend fun signup(@Body request: LoginRequest): retrofit2.Response<LoginResponse>
}

interface TripService {
    @GET("/trips/current")
    suspend fun fetchTrip(): TripResponse

    @POST("/trips/start")
    suspend fun startRide(@Body locationData: LocationData)
}

data class TripResponse(
    val trip: Trip
)

//package com.example.trailtrack.data.network
//
//import com.example.trailtrack.data.model.AuthResponse
//import com.example.trailtrack.data.model.LocationData
//import com.example.trailtrack.data.model.Response
//import com.example.trailtrack.data.model.TripResponse
//import io.ktor.client.*
//import io.ktor.client.call.*
//import io.ktor.client.request.*
//import io.ktor.client.statement.*
//import io.ktor.http.*
//import io.ktor.client.*
//import io.ktor.client.plugins.kotlinx.serializer.KotlinxSerializer
//import io.ktor.util.InternalAPI
//import kotlinx.serialization.json.Json
//
//object NetworkModule {
//    private val client = HttpClient {
//        install(io.ktor.client.plugins.json.JsonPlugin) {
//            serializer = KotlinxSerializer(Json { ignoreUnknownKeys = true })
//        }
//    }
//
//    private const val BASE_URL = "http://localhost:8000" // Update this URL as necessary
//
//    @OptIn(InternalAPI::class)
//    val tripService: TripService = object : TripService {
//        override suspend fun fetchTrip(): TripResponse {
//            return client.get("$BASE_URL/trip").body()
//        }
//
//        override suspend fun startRide(locationData: LocationData) {
//            client.post("$BASE_URL/start-ride") {
//                contentType(ContentType.Application.Json)
//                setBody(locationData)
//            }
//        }
//    }
//
//    @OptIn(InternalAPI::class)
//    val authService: AuthService = object : AuthService {
//        override suspend fun login(name: String, password: String): Response<AuthResponse> {
//            return try {
//
//                val httpResponse = client.post("$BASE_URL/user/login") {
//                    contentType(ContentType.Application.Json)
//                    setBody(mapOf("name" to name, "password" to password))
//                }
//
//                val isSuccessful = httpResponse.status.isSuccess()
//                val responseBody = if (isSuccessful) httpResponse.body<AuthResponse>() else null
//                val errorMessage = if (!isSuccessful) "Error: ${httpResponse.status}" else null
//
//                Response(
//                    isSuccessful = isSuccessful,
//                    body = responseBody,
//                    errorMessage = errorMessage
//                )
//            } catch (e: Exception) {
//                Response(
//                    isSuccessful = false,
//                    body = null,
//                    errorMessage = e.localizedMessage
//                )
//            }
//        }
//
//        override suspend fun signup(name:String, password:String, vehicleId:String, licenseNumber:String):Response<AuthResponse>{
//            return try{
//                System.out.println("$BASE_URL/user/signUp")
//                val httpResponse = client.post("$BASE_URL/user/signUp") {
//                    contentType(ContentType.Application.Json)
//                    setBody(
//                        mapOf(
//                            "name" to name,
//                            "password" to password,
//                            "vehicleId" to vehicleId,
//                            "licenseNumber" to licenseNumber
//                        )
//                    )
//                }
//                    val isSuccessful = httpResponse.status.isSuccess()
//                    val responseBody = if (isSuccessful) httpResponse.body<AuthResponse>() else null
//                    val errorMessage = if (!isSuccessful) "Error: ${httpResponse.status}" else null
//
//                    Response(
//                        isSuccessful = isSuccessful,
//                        body = responseBody,
//                        errorMessage = errorMessage
//                    )
//
//            }catch (e:Exception){
//                Response(
//                    isSuccessful = false,
//                    body = null,
//                    errorMessage = e.localizedMessage
//                )
//            }
//        }
//    }
//}
//
//interface TripService {
//    suspend fun fetchTrip(): TripResponse
//    suspend fun startRide(locationData: LocationData)
//}
//
//interface AuthService {
//    suspend fun login(name: String, password: String): Response<AuthResponse>
//    suspend fun signup(name:String, password:String, vehicleId:String, licenseNumber:String):Response<AuthResponse>
//}
