const express = require ('express');
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/RESTfulbooks",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

//Check to see if Mongoose connection is running
const connection = mongoose.connection;

//  If connected to Mongoose
connection.on("connected", ()=> {
    console.log("Mongoose successfully connected.");
});

// If an error connecting to Mongoose
connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
})

//Check to see if PORT is working
app.get("/api/config", (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost${PORT}`);
});

