# Node Tasks

This project is a small TypeScript/Express application that fetches data from NASA APIs. It provides JSON and HTML endpoints for meteor information and a small form to retrieve the latest Mars rover image.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the TypeScript sources:
   ```bash
   npm run build
   ```
3. Start the compiled server:
   ```bash
   npm start
   ```

## Development

Useful scripts are available for development:

- `npm run dev` – compile TypeScript in watch mode.
- `npm run lint` – run ESLint on the project.

## Environment Variables

The application relies on the following variables:

- `NASA_API_KEY` – your NASA API key for the Near Earth Objects feed.
- `NASA_API_URL` – base URL for fetching meteor data.
- `NASA_API_URL_PHOTOS` – base URL for retrieving the latest rover photos.
- `PORT` – port number for the Express server (defaults to `4000`).

Create a `.env` file or set these variables in your environment before starting the server.

## API Endpoints

| Method | Endpoint                  | Description |
| ------ | ------------------------- | ----------- |
| GET    | `/meteors`                | Returns meteor data for a given date. Optional query parameters: `date` (`YYYY-MM-DD`), `count` (`true\|false` to get only the count) and `were-dangerous-meteors` (`true\|false` to know if any hazardous meteors were present). |
| GET    | `/meteors/html`           | Same as `/meteors` but renders an HTML page with the results. |
| GET    | `/latest-rover-image-form`| Displays a form to request the latest Mars rover image. |
| POST   | `/latest-rover-image`     | Accepts `userId`, `userName`, and `userAPIKey` in the body and shows the latest rover image. |

The server listens on the port specified by the `PORT` environment variable.

