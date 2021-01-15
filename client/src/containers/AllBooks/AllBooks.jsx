import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div className="col-sm-12">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Pages</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {books.length ? (
                books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.pages}</td>
                    {/* <td>{book.author.fullName}</td> */}
                    {book.author && book.author.fullName}
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
