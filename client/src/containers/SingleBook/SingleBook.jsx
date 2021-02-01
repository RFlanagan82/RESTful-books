import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SingleBook = () => {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/books/${bookId}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bookId]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <div className="jumbotron">
            <div className="row">
              <div className="col-sm-12 text-right">
                <Link to={`/books/${bookId}/edit`} className="btn btn-link">
                  Edit
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <h1>{book.title}</h1>
                <h3>Written by: {book.author && book.author.fullName}</h3>
                <p>Pages: {book.pages}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 text-left">
                <Link to={`/books`} className="btn btn-link">
                  View All Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
