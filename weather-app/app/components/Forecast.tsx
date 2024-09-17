import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ForecastProps {
  data: any;
}

export function Forecast({ data }: ForecastProps) {
  if (!data) return null;

  const dailyForecasts = data.list.filter((item: any, index: number) => index % 8 === 0).slice(0, 5);

  return (
    <Card className="w-full max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dailyForecasts.map((forecast: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {forecast.main.temp}°C</p>
                <p>{forecast.weather[0].description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}