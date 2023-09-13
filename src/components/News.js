import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // console.log("Constructor called");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NayaNews -${this.capitalize(this.props.category)}`;
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  updatePage = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f32f237c1024ec99680880a3276dd72&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    this.setState({
        loading : true
    })
    this.props.setProgress(30);
    let data = await response.json();
    // console.log(data);
    this.props.setProgress(75);
    this.setState({
        articles : data.articles,
        totalResults : data.totalResults,
        loading : false
    })
    this.props.setProgress(100);
  };

  async componentDidMount() {
    // console.log("Component Did Mount");
    this.updatePage();
  }
  fetchData = async() =>{
    this.setState({
        page : this.state.page +1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f32f237c1024ec99680880a3276dd72&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    this.setState({
        loading : true
    })
    let data = await response.json();
    this.setState({
        articles : this.state.articles.concat(data.articles),
        loading : false
    })
    console.log(`${this.state.totalResults} - ${this.state.articles.length}`);
  }
  handleNextPage = async () => {
    console.log(`page no ${this.state.page + 1}`);
    this.setState({
      page: this.state.page + 1,
    });
    this.updatePage();
  };
  handlePreviousPage = async () => {
    console.log(`page no ${this.state.page - 1}`);
    this.setState({
      page: this.state.page - 1,
    });
    this.updatePage();
  };
  render() {
    return (
      <>
        <h3 className="text-center">
          TOP HEADLINES - {this.capitalize(this.props.category)}
        </h3>
        {
            this.state.loading &&  <Spinner /> 
        }
        <InfiniteScroll
          dataLength={this.state.articles.length} 
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
        <div className="container">
          <div className="row">
            {
              this.state.articles.map((article) => {
                return (
                  <div className="col-md-3 mx-3  my-3" key={article.url}>
                    <NewsItem
                      key = {article.title}
                      title={article.title}
                      description={article.description}
                      imgUrl={article.urlToImage}
                      newsUrl={article.url}
                      author={article.author}
                      publishedAt={article.publishedAt}
                      source={article.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousPage}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextPage}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
