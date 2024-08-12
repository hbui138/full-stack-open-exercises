import "./CountryInfo.css"
import axios from "axios"
import { useState, useEffect } from "react"


const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    // Make the API call only when the component mounts or the `country` changes.
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (country.capital) {
      fetchWeather();
    }
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div className="basic-info">
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>
          Land area: {country.area} km<sup>2</sup>
        </p>
      </div>

      <div>
        <b>Main languages</b>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} className="flag-image"/>

      <div>
        <h2>Weather in {country.capital}</h2>
        <div>
          <h3>Temperature</h3>
          <div>{weather.main?.temp} &#8451;</div>
        </div>

        <img
          src={`http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png`}
          alt=''
        />

        <div>
          <h3>Wind</h3>
          <div>{weather?.wind?.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
