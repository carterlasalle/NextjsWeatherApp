"use client"

import { useState } from "react"
import { Search, CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Sunrise, Sunset } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Error codes
const ERROR_CODES = {
  CITY_NOT_FOUND: "City not found. Please check the city name and try again.",
  API_ERROR: "An error occurred while fetching weather data. Please try again later.",
}

// Function to determine background color based on temperature (in Fahrenheit)
const getBackgroundColor = (temp: number) => {
  if (temp < 32) return "bg-blue-100"
  if (temp < 50) return "bg-blue-200"
  if (temp < 68) return "bg-green-200"
  if (temp < 86) return "bg-yellow-200"
  return "bg-red-200"
}

// Function to get weather icon
const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case "01d":
    case "01n":
      return <Sun className="h-8 w-8 text-yellow-500" />
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return <Cloud className="h-8 w-8 text-gray-500" />
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return <CloudRain className="h-8 w-8 text-blue-500" />
    case "11d":
    case "11n":
      return <CloudRain className="h-8 w-8 text-purple-500" />
    case "13d":
    case "13n":
      return <CloudRain className="h-8 w-8 text-white" />
    case "50d":
    case "50n":
      return <Wind className="h-8 w-8 text-gray-400" />
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />
  }
}

// Function to format date
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim() === "") {
      setError("Please enter a city name")
      return
    }

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || ERROR_CODES.API_ERROR)
      }

      setWeather(data)
      setError("")
    } catch (err: any) {
      setError(err.message || ERROR_CODES.API_ERROR)
      setWeather(null)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <Card className="mb-8 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-600">Colorful Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow border-2 border-blue-300 focus:border-blue-500"
              />
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-100 border-red-400 text-red-700">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {weather && (
        <>
          <Card className={`mb-8 ${getBackgroundColor(weather.currentWeather.main.temp)}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">Current Weather in {weather.currentWeather.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  {getWeatherIcon(weather.currentWeather.weather[0].icon)}
                  <div>
                    <p className="text-4xl font-bold text-gray-900">{Math.round(weather.currentWeather.main.temp)}°F</p>
                    <p className="text-lg text-gray-700">{weather.currentWeather.weather[0].main} - {weather.currentWeather.weather[0].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <span>Feels like: {Math.round(weather.currentWeather.main.feels_like)}°F</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Humidity: {weather.currentWeather.main.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <span>Wind: {Math.round(weather.currentWeather.wind.speed)} mph</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-gray-400" />
                    <span>Cloudiness: {weather.currentWeather.clouds.all}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-yellow-500" />
                  <span>Sunrise: {formatDate(weather.currentWeather.sys.sunrise)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sunset className="h-5 w-5 text-orange-500" />
                  <span>Sunset: {formatDate(weather.currentWeather.sys.sunset)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">5-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {weather.forecast.list.filter((_: any, index: number) => index % 8 === 0).map((day: any, index: number) => (
                  <Card key={index} className={`${getBackgroundColor(day.main.temp)}`}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800">{formatDate(day.dt)}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {getWeatherIcon(day.weather[0].icon)}
                        <span className="text-lg font-bold text-gray-900">{Math.round(day.main.temp)}°F</span>
                      </div>
                      <p className="text-sm text-gray-700">{day.weather[0].main}</p>
                      <div className="mt-2 text-xs text-gray-600">
                        <p>Humidity: {day.main.humidity}%</p>
                        <p>Wind: {Math.round(day.wind.speed)} mph</p>
                        <p>Precipitation: {(day.pop * 100).toFixed(0)}%</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
