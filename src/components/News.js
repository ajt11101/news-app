import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //this helps to fetch data from an api
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  //this helps to fetch data from an api
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-My News`;
    updateNews();
  }, []);

  //Now we will finally have the function to fetch more data

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apikey=${props.apiKey}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <div className="container my-3" style={{ marginRight: "unset" }}>
        <h2
          className="text-center"
          style={{ margin: "20px 0px", marginTop: "80px" }}
        >
          Fresh Headlines
        </h2>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={!loading && <Spinner />}
          // loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row" style={{ marginRight: "unset" }}>
              {articles.map((element) => {
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
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default News;
