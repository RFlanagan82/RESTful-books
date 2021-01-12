const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: "First name is required",
    },
    lastName: {
      type: String,
      trim: true,
      required: "Last name is required",
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    // include any virtual properties when data is requested to hold temporary attributes 
    // must state that virtuals are allowed and processed thru JSON.
   toJSON: { virtuals: true }
  }
);

// now set up full name of author that won't be stored in the db
AuthorSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

AuthorSchema.virtual("numBooks").get(function () {
  return this.books.length;
});

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
