import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  render() {
    return (
      <div>
        <div>
          <Newsitem title="business" description="this is fucking news" />
          <Newsitem />
          <Newsitem />
        </div>
      </div>
    );
  }
}

export default News;
