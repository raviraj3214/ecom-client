import React,{ useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner2 from "../Spinner/Spin";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true while fetching data

      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);

      setValues({ ...values, results: data });

      navigate("/search");
      setLoading(false); // Set loading to true while fetching data

    } catch (error) {
      console.log(error);
    }
  };
  if(loading){
    return(<Spinner2 />)
  }

  return (
    <div className="d-flex align-items-center">
      <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
