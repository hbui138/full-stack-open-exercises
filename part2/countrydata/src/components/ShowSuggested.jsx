const ShowSuggested = ({ filteredCountries, handleShow }) => {
  return (
    <div>
      {filteredCountries.map((country) => (
        <Country key={country.name.common} country={country} handleShow={handleShow} />
      ))}
    </div>
  );
};

const Country = ({ country, handleShow }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleShow(country.name.common)}>show</button>
    </div>
  )
};

export default ShowSuggested;
