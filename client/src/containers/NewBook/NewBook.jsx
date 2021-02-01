import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/books", { title, pages, author: selectedAuthor })
      .then((response) => {
        console.log(response.data);
        //Navigate programmatically from dynamically generated code via importing useHistory hook and calling it in the API call.
        history.push(`/books/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pages" className="form-label">
                Pages
              </label>
              <input
                type="text"
                className="form-control"
                id="pages"
                name={pages}
                value={pages}
                onChange={(e) => {
                  setPages(e.target.value);
                }}
              />
            </div>
            <br></br>
            <div className="form-group">
              <select
                className="custom-select"
                id="authors"
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                }}
              >
                <option>Select an Author...</option>
                {authors.map((author) => (
                  <option value={author._id} key={author._id}>
                    {author.fullName}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-link">
              Don't see your author? Add them here.
            </button>
            <br></br>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create New Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
