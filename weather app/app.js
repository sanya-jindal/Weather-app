const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    
    const cityDets = data.cityDets;
    const weather = data.weather;

    console.log(data);

     details.innerHTML=`
     <h5 class="my-3">${cityDets.EnglishName}</h5>
     <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
     </div>
     `; 
     
     let timePicture = null;
      if(weather.IsDayTime)
      {
          timePicture= "img/day.svg";
      }

      else
      {
          timePicture = "img/night.svg";
      }

    time.setAttribute('src' , timePicture);
     
     if(card.classList.contains('d-none')){
         card.classList.remove('d-none');
     }
         
     iconImg = `icons/${weather.WeatherIcon}.svg`;
     icon.setAttribute('src', iconImg );
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather};     // object shorthand notation

};

cityForm.addEventListener('submit' , e =>{
    e.preventDefault();

    // get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city',city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
      
}

