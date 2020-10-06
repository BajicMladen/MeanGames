import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  //states
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    serched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();

    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };
  //Messge after search acion
  const searchMessage = (serched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Products`;
    }
    if (searched && results.length < 1) {
      return `There Is Not Such A Product!`;
    }
  };
  //Search feature on home page
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4 text-center ">
          {searchMessage(searched, results)}
        </h2>
        <div className="row">
          {results.map((product, i) => (
            <div className="col-3 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  //Search form on home page
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <div className="text-center">
          <h2 className="alert alert-secondary mb-4 text-center">Search</h2>
        </div>
        <div className="form-row input-group">
          <div className="col-3 ml-4  border-secondary">
            <select
              className="custom-select my-1 mr-sm-2  border border-secondary"
              onChange={handleChange("category")}
            >
              <option value="All">All Categories</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 ml-4">
            <input
              type="search"
              className="form-control my-1 mt-2 form-control border border-secondary "
              onChange={handleChange("search")}
              placeholder="Search by Name"
            />
          </div>
          <div className="col-2 ml-4">
            <button className="btn btn-outline-secondary mt-1 my-1">
              Search
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
