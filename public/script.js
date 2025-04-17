document.querySelector(".weather").style.display = "none";

const apiUrl = "http://localhost:3000/weather"; // Make sure to use the correct URL
const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weatherImg");

async function checkWeather(city) {
  if (search.value == "") {
    document.querySelector(".weather").style.display = "none";
    alert("Please enter the city");
    return;
  }

  try {
    console.log("Sending request to backend...");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ city })
    });

    if (!response.ok) {
      console.error("Failed to fetch weather data", response.status);
      document.querySelector(".error").style.display = "flex";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();
    console.log(data); // Check the structure of the data received

    // Populate the weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "flex";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data", error);
    document.querySelector(".error").style.display = "flex";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(search.value);
});

