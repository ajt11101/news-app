import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>Fresh Headlines</h2>
          <div className="row">
            <div className="col-md-4">
              <Newsitem
                title="business"
                description="this is fucking news"
                imageUrl="https://i.ytimg.com/vi/VB4FTva1Bno/maxresdefault_live.jpg"
              />
            </div>
            <div className="col-md-4">
              <Newsitem
                title="business"
                description="this is fucking news"
                imageUrl="https://i.ytimg.com/vi/VB4FTva1Bno/maxresdefault_live.jpg"
              />
            </div>
            <div className="col-md-4">
              <Newsitem
                title="business"
                description="this is fucking news"
                imageUrl="https://i.ytimg.com/vi/VB4FTva1Bno/maxresdefault_live.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
