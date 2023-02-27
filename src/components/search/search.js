import React, { Component } from "react";
import axios from "axios";
import ImageResults from "../imageResults/imageResults";
// import REACT_APP_UNSPLASH_API from './cred.js';
import "./search.css";
class search extends Component {
  state = {
    searchText: "",
    apiUrl: "https://api.unsplash.com/photos",
    apiKey: "bTdLq7qtCrpoPySYjqAb_5w4naSgdpN_GRz9eCDVCnA",
    images: [],
    Sort: false
  };
  handleSubmit = (event) => {
    event.preventDefault(); // Prevents the form from submitting
  };
  handleSortClick = () => {
    this.setState(() => ({
      Sort: !this.state.Sort, // toggle sorting order
      images: this.state.images.sort((a, b) =>
        this.state.Sort ? a.likes - b.likes : b.likes - a.likes
      ) // sort images based on likes
    }));
  };
  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      axios
        .get("https://api.unsplash.com/search/photos", {
          params: { query: `${this.state.searchText}`, per_page: 30 },
          headers: {
            Authorization: `Client-ID ${this.state.apiKey}`
          }
        })
        .then((response) => {
          this.setState({ images: response.data.results });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  fill() {
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: "random", per_page: 30 },
        headers: {
          Authorization: `Client-ID ${this.state.apiKey}`
        }
      })
      .then((res) => {
        this.setState({ images: res.data.results });
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
      });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <h1
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Live Image Search
        </h1>
        <div>
          <form className="form-search" onSubmit={this.handleSubmit}>
            <input
              type="search"
              placeholder="Search for 'Car'...."
              name="searchText"
              value={this.state.searchText}
              onChange={this.onTextChange}
            />
            {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> */}

            {this.state.searchText !== "" && (
              <button className="form-search" onClick={this.handleSortClick}>
                Sort Likes
              </button>
            )}
          </form>
        </div>

        <div className="searchResults" style={{ margin: "50px" }}>
          {this.state.searchText === "" && this.fill()}
          <ImageResults images={this.state.images} />
        </div>
      </div>
    );
  }
}

export default search;
