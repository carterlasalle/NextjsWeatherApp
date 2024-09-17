import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data) return null;

  return (
    <Card className="w-full max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>Current Weather in {data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Feels like: {data.main.feels_like}°C</p>
        <p>Description: {data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </CardContent>
    </Card>
  )
}