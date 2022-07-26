import React from "react";
import { useState } from "react";

function Search() {
    const [input, setInput] = useState("");
    

    const handleChange = (event) => {
        // console.log(event.target.value)
        setInput(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`submitting ${input}`);
        setInput("");
      };
      console.log(input, " <<<input state");
        
        return (
          <div className="SearchPage">
           <h1>Search Page</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Search Form
              <input
                value={input}
                className="input"
                placeholder="Search"
                onChange={handleChange}
              />
            </label>
            <button className="button">GO</button>
          </form>
          </div>
        );
      }

export default Search
