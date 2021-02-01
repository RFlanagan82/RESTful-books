import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books").then((response) => {
      console.log(response.data);
      setBooks(response.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 text-right">
          <Link to="/books/new" className="btn btn-primary">
            New Book
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Pages</th>
                <th scope="col">Author</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.length ? (
                books.map((book) => (
                  <tr key={book._id}>
                    <td><Link to={`/books/${book._id}`}>{book.title}</Link></td>
                    <td>{book.pages}</td>
                    <td>{book.author && book.author.fullName}</td>
                    <td>
                      <Link to={`/books/${book._id}`} className="btn btn-secondary">Edit</Link>
                    </td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No books found.</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
