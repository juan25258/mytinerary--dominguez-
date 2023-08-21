import React, { useEffect, useState } from "react";
import Style from "./Style.css";
import { Link as LinkDetails } from "react-router-dom";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchCities();
  }, [filter]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/Cities?filter=${filter}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <main>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                id="searchInput"
                placeholder="Search"
                aria-label="Search"
                onChange={handleFilterChange}
                value={filter}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <article className="City container">
          <h2 className="d-flex justify-content-center">Cities</h2>
          <div className="card-deck d-flex flex-wrap justify-content-center gap-5">
            {cities.map((city) => (
              <div className="card" key={city.id}>
                <img
                  src={city.image}
                  className="card-img-top"
                  alt={city.name}
                />
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-center">{city.country}</h5>
                  <h5 className="card-title d-flex justify-content-center">{city.name}</h5>
                  <p className="card-text">{city.details}</p>
                  <a href="#" className="btn btn-primary">
                    <LinkDetails to="/Details">Details</LinkDetails>{" "}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
