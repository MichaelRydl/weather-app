const form = document.querySelector( ".weather-header__form-wrapper form" );
const select = document.querySelector( ".weather-header__form-wrapper select" );
const cityList = document.querySelector( ".weather-main__cities-wrapper .cities" );
const weatherCitySection = document.querySelector( ".weather-main__forecast" );
const weatherHeader = document.querySelector( ".weather-header" );
const apiKey = "8a0a03c6952264f306d6cb1cd3a812fa";

form.addEventListener( "submit", e => {
  e.preventDefault();
  weatherHeader.classList.add( "weather-header-move" );
  const selectCity = select.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectCity}&units=metric&appid=${apiKey}`;

  fetch( url )
    .then( response => response.json() )
    .then( data => {
      const { list } = data;

      cityList.innerHTML = "";

      for ( i = 0; i < list.length; i++ ) {
        const li = document.createElement( "li" );
        li.classList.add( "city" );
        const markup = `<div class="markup-section">
        <div class="city-main">${list[i].weather[0].main}</div>
        <img class="city-icon" src="https://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png"></img>
        <div class="city-temp">${Math.round( list[i].main.temp )}<sup>°C</sup></div>
        <br/>
        <div class="city-date">${list[i].dt_txt}</div>
        </div>`;
        li.innerHTML = markup;
        cityList.appendChild( li );

        weatherCitySection.classList.add( "show-cities" );
      }
    } );
} );