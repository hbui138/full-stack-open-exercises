import "./CountryInfo.css"

const CountryInfo = ({ country }) => {
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
    </div>
  );
};

export default CountryInfo;
