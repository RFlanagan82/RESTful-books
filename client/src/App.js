import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewBook from "./containers/NewBook/NewBook";
import EditBook from "./containers/EditBook/EditBook";
import SingleBook from "./containers/SingleBook/SingleBook";
import AllBooks from "./containers/AllBooks/AllBooks";
import NotFound from "./containers/NotFound/NotFound";
import Home from "./containers/Home/Home";

function App() {
  useEffect(() => {
    console.log("Make an API call");
    axios
      .get("/api/config")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* Installed React-Router-Dom to use Router package */}
      <Router>
        <Switch>
          {/* Need to have created a book and placed in the database before editing it or searching for it. That's why it follows in this order */}
          <Route exact path="/books/new" component={NewBook} />
          <Route exact path="/books/:bookId/edit" component={EditBook} />
          <Route exact path="/books/:bookId" component={SingleBook} />
          <Route exact path="/books" component={AllBooks} />
          <Route exact path="/" component={Home} />
          {/* Catch all page for any url not utilized above - i.e a 404 page. */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
