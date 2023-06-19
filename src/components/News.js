import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-My News`;
  }

  //this helps to fetch data from an api
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f809a08ee88d40559f935a6dd0f07293&page=1&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  //Code length kam krne ke liye refer video tutorial #33
  //function for navigating to previous page

  //Now we have added infifnite scroll button so we dont require this handle next click and previous click

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apikey=f809a08ee88d40559f935a6dd0f07293&page=${
  //     this.state.page - 1
  //   }&pagesize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  //function for navigating to next page

  // handleNextClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apikey=f809a08ee88d40559f935a6dd0f07293&page=${
  //     this.state.page + 1
  //   }&pagesize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  //Now we will finally have the function to fetch more data

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f809a08ee88d40559f935a6dd0f07293&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        {/* <div className="container my-3" style={{ marginRight: "unset" }}> */}
        <h2 className="text-center" style={{ margin: "20px 0px" }}>
          Fresh Headlines
        </h2>
        {/* </div> */}
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={!this.state.loading && <Spinner />}
          // loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row" style={{ marginRight: "unset" }}>
              {this.state.articles.map((element) => {
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
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* </div> */}
        {/* Below code was for adding previous and next buttons before we added infinite scroll */}
        {/* <div className="d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
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
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&raquo;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
