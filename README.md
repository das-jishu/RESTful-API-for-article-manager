# RESTful-API-for-article-manager

A RESTful API made using NodeJS (Express) and MongoDB (mongoose) to manage a platform where users (or authors) can signup and collaborate on different articles, leave reviews and organize their work. 

------------------------------------------------------------------------------------------------------------------------------------------
### NOTE: 

###### This repo contains only the backend implementation of the project. Users are free to develop their own frontend using this. Follow the Readme to know the routes and their implementation.

-------------------------------------------------------------------------------------------------------------------------------------

## HOW TO

- Fork the repository and clone it.
- Head over to MongoDB Atlas and create a free cluster.
- Add a *config.env* to store all the environment variables.
###### List of environment variables to be written:
- DATABASE
- DATABASE_PASSWORD
- PORT
- NODE_ENV
- JWT_SECRET
- JWT_EXPIRES_IN
- JWT_COOKIE_EXPIRES_IN
- EMAIL_USERNAME
- EMAIL_PASSWORD
- EMAIL_HOST
- EMAIL_PORT

##### NOTE: 
- I have used smtp.google.com to queue and send mails but feel free to use any other smtp you might prefer. 
- Replace the DATABASE variable with your own MongoDB link and the DATABASE_PASSWORD with your password.
- Open the terminal and run the following command:
```
node server.js
```
- You can also use nodemon to run the app. If you don't have nodemon installed, follow this:
```
npm i nodemon
nodemon server.js
```
- That's it. Now make any changes you require for your own project and handle the front-end accordingly. The routes are listed below.

--------------------------------------------------------------------------------------------------------------

### ROUTES:

##### User Routes: /api/v1/users

Protected routes can only be accessed by logged in users. To access these routes, pass a bearer authentication token along with the request.
For POST and PATCH, pass required parameters as JSON in request body.

- POST /signup                  -- To signup a new user (name, email, password, confirmPassword).
- POST /login                   -- To login (email, password).
- POST /forgotPassword          -- In case an user forgets his password. A mail is sent to the user's email address (email).
- PATCH /resetPassword/:token   -- To reset password (password, passwordConfirm).

- (*protected*) PATCH /updateMyPassword -- To update password for logged in user (currentPassword, password, passwordConfirm).
- (*protected*) GET /me                 -- To get details of current logged in user.
- (*protected*) PATCH /updateMe         -- Update details of current logged in user (:any).
- (*protected*) DELETE /deleteMe        -- Delete current user.

- (*protected, restricted to admin*) GET /        -- Get all users.
- (*protected, restricted to admin*) GET /:id     -- Get a specific user by id.
- (*protected, restricted to admin*) PATCH /:id   -- Update a specific user (:any).
- (*protected, restricted to admin*) DELETE /:id  -- Delete an user.

------------------------------------------------------------------------------------------------------------------------------------

##### Article Routes: /api/v1/articles

Protected routes can only be accessed by logged in users. To access these routes, pass a bearer authentication token along with the request.
For POST and PATCH, pass required parameters as JSON in request body.

- GET /top-5-rated                                      -- Get the top 5 rated articles.
- GET /                                                 -- Get all articles.
- GET /:id                                              -- Get a particular article by id.

- (*protected*) POST /                                    -- Create a new article (body, headline, location, collaborators).
- (*protected, restricted to admin, editor*)  PATCH /:id  -- Update a particular article by id (:any).
- (*protected, restricted to admin*) DELETE /:id          -- Delete a particular article.

--------------------------------------------------------------------------------------------------------------------------------------

##### Review Routes: /api/v1/reviews

Protected routes can only be accessed by logged in users. To access these routes, pass a bearer authentication token along with the request.
For POST and PATCH, pass required parameters as JSON in request body.

- (*protected*) GET /                                   -- Get all the reviews.
- (*protected, restricted to user*) POST /              -- Create a new review (rating, article, review).
- (*protected*) GET /:id                                -- Get a review based on id.
- (*protected, restricted to admin, user*) PATCH /:id   -- Update a review based on id (:any).
- (*protected, restricted to admin, user*) DELETE /:id  -- Delete a review based on id.

-----------------------------------------------------------------------------------------------------------------------------------------

##### API Features: 

- Sorting: ?sort=field1,-field2       --  Sorts results first using field1 (ascending), then for same field1 values field2 (decreasing) is used and so on.
- Paginate: ?limit=l&page=p           --  Results are divided into pages. Each page contains l results and page number p is returned.
- Select: ?fields=field1,field2       --  Selects only field1, field2 from the result documents.
- Filter: ?query                      --  Filter results based on the query.

---------------------------------------------------------------------------------------------------------------------------------------------

#### Author: Subham Das.

[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
