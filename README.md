# RESTful-books

1. Create Based on RESTful Architecture

Notes: Great for One to Many Relationships but difficult to work with on Many-to-Many Relationships

** 7 RESTful Routes **

BOOK Model // One to Many Relationship

* VIEWS Routes *
GET /book -> Handlebars or HTML (View all books)
GET /book/:id -> Handlebars or HTML (View a single book with that id)
GET /book/edit -> Handlebars or HTML (View a Book form, pre-populated with data.)
GET /book/new -> Handlebars or HTML (View a Book form, empty)

* API Routes *
POST /book -> JSON (Creates a new book in the DB)
PUT-UPDATE /book/:id -> JSON (Update an existing book in the DB)
DELETE /book/:id -> JSON (Delete an existing book in the DB by ID)

=====================================================================================================

2. Resource Driven APIs

Resource = A single item in a database table (single row, single document, single object)
Collection = Multiple items from a db table (multiple rows, documents, or array of objects)

* API ROUTES *

Book Model

GET /book -> JSON (returns a collections of books from the db)
GET /book/:id -> JSON (Returns a single book from the DB by ID)
POST /book -> JSON (Creates a single resource in the DB)
PUT /book/:id -> JSON (Updates a single book in the DB by ID)
DELETE /book/:id -> JSON (Deletes a single book in the DB by ID)