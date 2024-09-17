'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CurrentWeather } from './components/CurrentWeather'
import { Forecast } from './components/Forecast'

interface WeatherData {
  currentWeather: any;
  forecast: any;
}

export default function Home() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setError('')
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()
      if (response.ok) {
        setWeatherData(data)
      } else {
        setError(data.error || 'Failed to fetch weather data')
      }
    } catch (err) {
      setError('An error occurred while fetching weather data')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Weather App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter city name" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {weatherData && (
        <>
          <CurrentWeather data={weatherData.currentWeather} />
          <Forecast data={weatherData.forecast} />
        </>
      )}
    </main>
  )
}
