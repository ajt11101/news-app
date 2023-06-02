import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  //function for navigating to previous page
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f809a08ee88d40559f935a6dd0f07293&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  //function for navigating to next page
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f809a08ee88d40559f935a6dd0f07293&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  //this helps to fetch data from an api
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f809a08ee88d40559f935a6dd0f07293&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  render() {
    return (
      <div>
        <div className="container my-3" style={{ marginRight: "unset" }}>
          <h2>Fresh Headlines</h2>
          {this.state.loading && <Spinner />}
          <div className="row" style={{ marginRight: "unset" }}>
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title !== null
                          ? element.title.slice(0, 40) + "..."
                          : ""
                      }
                      description={
                        element.description !== null
                          ? element.description.slice(0, 70) + "..."
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &laquo;Previous
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / this.props.pageSize) <
              this.state.page + 1
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next&raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
