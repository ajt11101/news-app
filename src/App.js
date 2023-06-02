import Navbar from "./components/Navbar";
import "./App.css";
import React, { Component } from "react";
import News from "./components/News";
export class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={10} />
      </div>
    );
  }
}

export default App;
