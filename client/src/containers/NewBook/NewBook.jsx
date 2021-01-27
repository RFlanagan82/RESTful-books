import React, { useState } from 'react';
import axios from "axios";

const NewBook = () => {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("/api/books", {title, pages})
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

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
                      setTitle(e.target.value)
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pages" className="form-label">
                  Pages
                </label>
                <input type="text" className="form-control" 
                id="pages"
                name={pages}
                value={pages}
                onChange={(e) =>{
                    setPages(e.target.value);
                }} 
                />
              </div>
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