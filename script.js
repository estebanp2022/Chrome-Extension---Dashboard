// API to set background image
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=architecture"
)
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(
      "body"
    ).style.backgroundImage = `url("${data.urls.regular}")`;
    document.querySelector(
      ".author"
    ).textContent = `Picture by: ${data.user.name}`;
  })
  .catch((err) => {});

// API to get bitcoin data and render on screen
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.querySelector(
      ".crypto-icon"
    ).innerHTML = `<img src="${data.image.thumb}">`;
    document.querySelector(".crypto-name").textContent = data.name;
    document.querySelector(".current-price").textContent = `Current:
      $${data.market_data.current_price.usd}`;
    document.querySelector(".high-price").textContent = `High: 
      $${data.market_data.high_24h.usd}`;
    document.querySelector(".low-price").textContent = `Low: 
      $${data.market_data.low_24h.usd}`;
  })
  .catch((err) => {
    console.log(err);
  });

// function to render time on screen
setInterval(function () {
  let today = new Date();
  document.querySelector(".date").textContent = today.toLocaleDateString();
  document.querySelector(".time").textContent = today.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}, 1000);

// Get user location and use weather API to set on screen
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.querySelector(".weather-icon").innerHTML = `
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;
      document.querySelector(".city").textContent = data.name;
      document.querySelector(".temp").textContent = `${Math.round(
        data.main.temp
      )}º`;
    })
    .catch((err) => console.log(err));
});
