# TheWeather2

**TheWeather2** is a weather application that provides up-to-date information about the weather in various locations. This application uses OpenWeatherMap to offer accurate and detailed forecasts.

## 🚀 Features

- **Real-time updates:** Get the latest weather information.
- **Detailed forecasts:** Includes temperature, humidity, wind, and more.
- **User-friendly interface:** Intuitive design and easy to use.

## 💻 Technologies Used

- **Frontend:**
  - [React.js](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Sass](https://sass-lang.com/)
- **Weather API:**
  - [OpenWeatherMap](https://openweathermap.org/)
- **Version Control:**
  - [Git](https://git-scm.com/)

## 📋 Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## ⚙️ Installation and Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/adrian-gg/theweather2.git
   ```

2. Navigate to the project directory:

   ```bash
   cd theweather2
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Generate an API Key at [OpenWeatherMap API](https://openweathermap.org/price) and add it to `./src/services/apiService.ts`.

5. Start the application in development mode:

   ```bash
   npm run dev
   ```

Open http://localhost:3000 in your browser to see the application.

## 📝 Additional Notes for Recruiters

- **Use of eslint v8**: Due to the recent update of eslint (v9), the airbnb config still does not work so we have had to go back to a previous version. https://github.com/airbnb/javascript/issues/2961
- **Contact form in a weather app?**: This is a project done for a technical test.
