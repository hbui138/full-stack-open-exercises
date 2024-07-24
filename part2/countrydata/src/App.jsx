import { SearchBar } from "./components/SearchBar/SearchBar";
import ShowSuggested from "./components/ShowSuggested";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setallCountries] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setallCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    setfilteredCountries(
      allCountries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShow = (countryName) => {
    const countryToShow = filteredCountries.find(country => country.name.common === countryName)
    setfilteredCountries([countryToShow])
  }

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <div className="country-list">
        {filteredCountries.length > 10 &&
        searchTerm !== "" ? (
          <div>Too many matches, specify</div>
        ) : filteredCountries.length <= 10 && filteredCountries.length > 1 ? (
          <ShowSuggested filteredCountries={filteredCountries} handleShow={handleShow}/>
        ) : filteredCountries.length === 1 ? (
          <CountryInfo country={filteredCountries[0]}/>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
