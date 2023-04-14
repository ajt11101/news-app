import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  render() {
    return (
      <div>
        This is news.
        <Newsitem title="business" description="this is fucking news" />
        <Newsitem />
        <Newsitem />
        <Newsitem />
        <Newsitem />
      </div>
    );
  }
}

export default News;
