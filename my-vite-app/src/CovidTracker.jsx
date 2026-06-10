import React, { useEffect, useState } from "react";

function CovidTracker() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredCountries = countries.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>COVID Tracker</h1>

      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="cards">
        {filteredCountries.map((item) => (
          <div className="card" key={item.country}>
            <img src={item.countryInfo.flag} alt={item.country} />
            <h2>{item.country}</h2>

            <p>Total Cases: {item.cases}</p>
            <p>Recovered: {item.recovered}</p>
            <p>Deaths: {item.deaths}</p>
            <p>Active Cases: {item.active}</p>

            {item.active > 100000 ? (
              <h3 className="danger">High Risk Country</h3>
            ) : (
              <h3 className="safe">Low / Medium Risk</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CovidTracker;