# RESTful-API-for-article-manager
A RESTful API made using NodeJS (Express) and MongoDB (mongoose) to manage a platform where users (or authors) can signup and collaborate on different articles, leave reviews and organize their work. 

NOTE: This repo contains only the backend implementation of the project. Users are free to develop their own frontend using this. Follow the readme to know the routes and their implementation.
-------------------------------------------------------------------------------------------------------------------------------------------------------

ROUTES:

User Routes: /api/v1/users

Protected routes can only be accessed by logged in users. To access these routes, pass a bearer authentication token along with the request.
For POST and PATCH, pass required parameters as JSON in request body.

POST /signup                  -- To signup a new user (name, email, password, confirmPassword).
POST /login                   -- To login (email, password).
POST /forgotPassword          -- In case an user forgets his password. A mail is sent to the user's email address (email).
PATCH /resetPassword/:token   -- To reset password (password, passwordConfirm).

(protected) PATCH /updateMyPassword -- To update password for logged in user (currentPassword, password, passwordConfirm).
(protected) GET /me                 -- To get details of current logged in user.
(protected) PATCH /updateMe         -- Update details of current logged in user (:any).
(protected) DELETE /deleteMe        -- Delete current user.

(protected, restricted to admin) GET /        -- Get all users.
(protected, restricted to admin) GET /:id     -- Get a specific user by id.
(protected, restricted to admin) PATCH /:id   -- Update a specific user (:any).
(protected, restricted to admin) DELETE /:id  -- Delete an user.
