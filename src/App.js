import React, { Component } from "react";
import Search from "./components/search/search";
import "./App.css";

class App extends Component {
  render() {
    document.title = "Live Image Search";
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;
