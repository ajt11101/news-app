import React from "react";

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={imageUrl !== null ? imageUrl : "altimg.jpg"}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author === null ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsitem;
