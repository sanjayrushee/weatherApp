function getWeather(){

   const apiKey = '3b287ce5350579dc7a14d10e430dea09';
   const city = document.getElementById("city").value;

   if(!city){
      alert('Enter a city name first');
      return;
   }

   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

   fetch(currentWeatherUrl)
      .then(response=> response.json())
      .then(data => {
         displayWeather(data);
      })
   .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error feching current weather data.please try again');
   });

   fetch(forecastUrl)
   .then(response => response.json())
   .then(data => {
      displayHourlyForecast(data.list);
   })
   .catch(error =>{
      console.error('Error fetching hourly forecast data', error);
      alert('ERROR fetching hourly forecast data. plese try again later.');
   });

}

function displayWeather(data){
   const weatherInfoDiv = document.getElementById("weather-info"); 
   const tempDivInfo = document.getElementById("temp-div"); 
   const weatherIcon = document.getElementById("weather-icon");

   if(data.cod=='404'){
      weatherInfoDiv.innerHTML = `<p> ${data.message}</p>`;
   } else {

      const cityName = data.name;
      const temperature = Math.round(data.main.temp-273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

      const temperatureHTML = `<p>${temperature}℃</p>`;

      const weatherHTML = `<p>${cityName}</p>
      <p>${description}</p>`;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHTML;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;

      showImage();
   }
}

function displayHourlyForecast(hourlyData){

   const hourlyForecastDiv = document.getElementById('hourly-forecast');
   hourlyForecastDiv.innerHTML = '';
   const next24Hours = hourlyData.slice(0,8);

   next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml =`
      <div class= "hourly-item">
      <span>${hour}:00</span>
      <img src="${iconUrl}" alt="Houtly Weather icon">
      <span>${temperature}℃</span>
      </div>`;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;



   });
}

function showImage(){

   const weatherIcon = document.getElementById("weather-icon");
   weatherIcon.style.display = 'block';
}