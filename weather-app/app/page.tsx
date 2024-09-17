"use client"

import { useState, useEffect } from "react"
import { Search, CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Sunrise, Sunset, Snowflake, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import Confetti from 'react-confetti'

const ERROR_CODES = {
  CITY_NOT_FOUND: "City not found. Please check the city name and try again.",
  API_ERROR: "An error occurred while fetching weather data. Please try again later.",
}

const getBackgroundGradient = (temp: number) => {
  if (temp < 32) return "from-blue-400 to-blue-600"
  if (temp < 50) return "from-green-400 to-blue-500"
  if (temp < 68) return "from-yellow-300 to-green-500"
  if (temp < 86) return "from-orange-400 to-yellow-500"
  return "from-red-400 to-orange-500"
}

const getWeatherIcon = (icon: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "01d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Sun className="h-16 w-16 text-yellow-400" />
      </motion.div>
    ),
    "01n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Sun className="h-16 w-16 text-yellow-200" />
      </motion.div>
    ),
    "02d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-400" />
      </motion.div>
    ),
    "02n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-300" />
      </motion.div>
    ),
    "03d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-500" />
      </motion.div>
    ),
    "03n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-400" />
      </motion.div>
    ),
    "04d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-600" />
      </motion.div>
    ),
    "04n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Cloud className="h-16 w-16 text-gray-500" />
      </motion.div>
    ),
    "09d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CloudRain className="h-16 w-16 text-blue-400" />
      </motion.div>
    ),
    "09n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CloudRain className="h-16 w-16 text-blue-300" />
      </motion.div>
    ),
    "10d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CloudRain className="h-16 w-16 text-blue-500" />
      </motion.div>
    ),
    "10n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CloudRain className="h-16 w-16 text-blue-400" />
      </motion.div>
    ),
    "11d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Zap className="h-16 w-16 text-yellow-500" />
      </motion.div>
    ),
    "11n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Zap className="h-16 w-16 text-yellow-400" />
      </motion.div>
    ),
    "13d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Snowflake className="h-16 w-16 text-blue-200" />
      </motion.div>
    ),
    "13n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Snowflake className="h-16 w-16 text-blue-100" />
      </motion.div>
    ),
    "50d": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Wind className="h-16 w-16 text-gray-400" />
      </motion.div>
    ),
    "50n": (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Wind className="h-16 w-16 text-gray-300" />
      </motion.div>
    ),
  }
  return iconMap[icon] || iconMap["01d"]
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

const WeatherAnimation = ({ icon }: { icon: string }) => {
  const animations: { [key: string]: JSX.Element } = {
    "01d": (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300 rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    ),
    "10d": (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full w-1 h-4"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0%", "120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 1.5 + 0.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    ),
    "13d": (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ["0%", "120%"],
              x: ["-10%", "10%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>
    ),
  }
  return animations[icon] || null
}

const PulsingButton = ({ isLoading }: { isLoading: boolean }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(59, 130, 246, 0.7)",
        "0 0 0 10px rgba(59, 130, 246, 0)",
        "0 0 0 0 rgba(59, 130, 246, 0)"
      ]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }}
  >
    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300" disabled={isLoading}>
      {isLoading ? (
        <motion.div
          className="h-5 w-5 border-t-2 border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      ) : (
        <Search className="mr-2 h-4 w-4" />
      )}
      {isLoading ? "Searching..." : "Search"}
    </Button>
  </motion.div>
)

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim() === "") {
      setError("Please enter a city name")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || ERROR_CODES.API_ERROR)
      }

      setWeather(data)
      setError("")
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    } catch (err: any) {
      setError(err.message || ERROR_CODES.API_ERROR)
      setWeather(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (weather) {
      document.body.style.background = `linear-gradient(to bottom right, ${getBackgroundGradient(weather.currentWeather.main.temp)})`
    }
    return () => {
      document.body.style.background = ""
    }
  }, [weather])

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-48 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${weather ? getBackgroundGradient(weather.currentWeather.main.temp) : 'bg-gray-100'}`}>
      {showConfetti && <Confetti />}
      <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Interactive Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow border-2 border-blue-300 focus:border-blue-500 rounded-full"
              />
              <PulsingButton isLoading={isLoading} />
            </div>
          </form>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mt-4 bg-red-100 border-red-400 text-red-700">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`mb-8 overflow-hidden relative bg-gradient-to-br ${getBackgroundGradient(weather.currentWeather.main.temp)}`}>
                <WeatherAnimation icon={weather.currentWeather.weather[0].icon} />
                <CardHeader>
                  <CardTitle className="text-3xl font-semibold text-white">Current Weather in {weather.currentWeather.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        {getWeatherIcon(weather.currentWeather.weather[0].icon)}
                      </motion.div>
                      <div>
                        <motion.p
                          className="text-6xl font-bold text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {Math.round(weather.currentWeather.main.temp)}°F
                        </motion.p>
                        <motion.p
                          className="text-xl text-white/90"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {weather.currentWeather.weather[0].main} - {weather.currentWeather.weather[0].description}
                        </motion.p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <motion.div className="flex items-center gap-2 text-white/90" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <Thermometer className="h-5 w-5" />
                        <span>Feels like: {Math.round(weather.currentWeather.main.feels_like)}°F</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2 text-white/90" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <Droplets className="h-5 w-5" />
                        <span>Humidity: {weather.currentWeather.main.humidity}%</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2 text-white/90" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                        <Wind className="h-5 w-5" />
                        <span>Wind: {Math.round(weather.currentWeather.wind.speed)} mph</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2 text-white/90" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                        <Cloud className="h-5 w-5" />
                        <span>Cloudiness: {weather.currentWeather.clouds.all}%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-white/90">
                    <motion.div className="flex items-center gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                      <Sunrise className="h-5 w-5" />
                      <span>Sunrise: {formatDate(weather.currentWeather.sys.sunrise)}</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                      <Sunset className="h-5 w-5" />
                      <span>Sunset: {formatDate(weather.currentWeather.sys.sunset)}</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-800">5-Day Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {weather.forecast.list.filter((_: any, index: number) => index % 8 === 0).map((day: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`bg-gradient-to-br ${getBackgroundGradient(day.main.temp)} hover:shadow-lg transition-shadow duration-300`}>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-white">{formatDate(day.dt)}</h3>
                            <div className="flex items-center gap-2 mt-2">
                              {getWeatherIcon(day.weather[0].icon)}
                              <span className="text-2xl font-bold text-white">{Math.round(day.main.temp)}°F</span>
                            </div>
                            <p className="text-sm text-white/90">{day.weather[0].main}</p>
                            <div className="mt-2 text-xs text-white/80">
                              <p>Humidity: {day.main.humidity}%</p>
                              <p>Wind: {Math.round(day.wind.speed)} mph</p>
                              <p>Precipitation: {(day.pop * 100).toFixed(0)}%</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}
