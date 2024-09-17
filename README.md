# Interactive Weather Forecast App

## Overview

This is a Next.js-based weather application that provides users with an interactive and visually appealing way to check current weather conditions and 5-day forecasts for cities around the world. The app uses the OpenWeather API to fetch real-time weather data and presents it with a dynamic, responsive user interface.

## Features

- Search for weather information by city name
- Display current weather conditions including:
  - Temperature
  - Feels-like temperature
  - Weather description
  - Humidity
  - Wind speed
  - Cloudiness
  - Sunrise and sunset times
- 5-day weather forecast
- Dynamic background gradients based on temperature
- Animated weather icons
- Loading skeletons for improved user experience
- Error handling for failed API requests or city not found scenarios
- Responsive design for various screen sizes

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```
   NEXT_PUBLIC_API_KEY=your_openweather_api_key_here
   ```

### Running the App

To start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Enter a city name in the search bar.
2. Press Enter or click the search button.
3. View the current weather and 5-day forecast for the selected city.
4. The background color will change based on the current temperature.

## CI/CD

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The workflow is defined in `.github/workflows/ci.yml`.

### CI Workflow

The CI workflow runs on every push to the `main` branch and for all pull requests targeting the `main` branch. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Creates a `.env.local` file with the API key (stored as a GitHub secret)
5. Runs linting
6. Builds the project

To set up the CI/CD pipeline:

1. Go to your GitHub repository settings
2. Navigate to Secrets and Variables > Actions
3. Add a new repository secret named `NEXT_PUBLIC_API_KEY` with your OpenWeather API key as the value

### Deployment

The current workflow does not include deployment steps. To deploy your app, you can:

- Set up automatic deployment to Vercel (recommended for Next.js apps)
- Add deployment steps to the GitHub Actions workflow to deploy to your preferred hosting platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request!!

## License

This project is open source and available under the [MIT License](LICENSE).

