# Interactive Weather Forecast App

... (keep the existing content)

## Deployment

This project is set up for automatic deployment to Vercel using GitHub Actions:

1. The `.github/workflows/ci.yml` file includes steps to deploy the app using GitHub Actions.
2. This workflow builds the project and deploys it to Vercel on each push to the main branch.

To set up deployment, you need to configure the following secrets in your GitHub repository:
- `NEXT_PUBLIC_API_KEY`: Your OpenWeather API key
- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

These secrets are used in the GitHub Actions workflow to authenticate with Vercel and deploy your application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).