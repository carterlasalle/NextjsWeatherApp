import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Weather App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Enter city name" />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}