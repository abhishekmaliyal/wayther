# 🌤️ Wayther

Wayther is a sleek and simple weather application that allows users to check real-time weather data for any city worldwide. It uses the OpenWeatherMap API to fetch live weather updates and presents them in a user-friendly, responsive interface.

🔗 **Live Demo:** [wayther-app.netlify.app](https://wayther-app.netlify.app)

---

## 📸 Preview

![Wayther Screenshot](https://raw.githubusercontent.com/abhishekmaliyal/wayther/main/public/wayther-preview.png)


---

## 🚀 Features

- 🔍 Search for any city in the world.
- 🌡️ Displays temperature, humidity, weather conditions, and wind speed.
- 💡 Gracefully handles invalid city names or API errors.
- 🧑‍💻 Responsive design — smooth on mobile, tablet, and desktop.
- ⚡ Fast loading using Next.js dev server.

---

## 🛠️ Tech Stack

| Technology               | Purpose                          |
|--------------------------|----------------------------------|
| **Next.js**              | Component-based UI development   |
| **Tailwind CSS**         | Utility-first CSS framework      |
| **OpenWeatherMap API**   | Real-time weather data fetching  |
| **Netlify**              | Hosting and deployment           |

---

## ⚙️ How It Works

1. **Next.js** is used to create reusable components for the UI and handle state management.
2. **Tailwind CSS** makes it quick to build a clean and responsive design.
3. **OpenWeatherMap API** is used to fetch real-time weather information based on user input.
4. **Netlify** hosts the production build for global availability.

---

## 💻 Installation & Setup

If you want to run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/abhishekmaliyal/wayther.git
```

2. Navigate into the project directory

```bash
cd wayther
```

3. Install Dependencies

```bash
npm install
```

4. Create a .env file and add your OpenWeatherMapAPI key

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

5. Start the dev server

```bash
npm run dev
```

6. Open your browser and visit

```bash
http://localhost:3000
```
