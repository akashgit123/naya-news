import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,publishedAt,source} = this.props
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          {
            source && <span className="badge bg-info  position-absolute" style={{width:"40%" , left:"60%"}}>{source}</span>
          }
        
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text"> {description} </p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} published on { new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
