# API-Authentication-JWT

This project is a sample implementation of an authentication system that uses JSON Web Token to manage users' login data in Node.js web server.

Express.js, Mongoose Syntax is used in this project.


# Installing & Configuration

1. Install dependencies

```
npm install
```

2. Run the server

```
npm start
```

# APIs

## Auth Route

### Register

POST `/api/user/register`
```
{
    username,
    email,
    password
}
```
Description: creates a new user; Password is stored in HMAC-SHA1 format.


### Login

POST `/api/user/login`

```
{
    email,
    password
}

```
Description: logs in to the server. Server will return a JWT token as:


```
{
    "message": "logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTAwNDNlODQ4ZGRjMTNlYzQ5NDhhMzMiLCJpYXQiOjE2Mjc0MTI1NjJ9.AWmff1edu6kg6D8Df7GHq1jsPRBdOL3SzzlrA1GFJJM"
}
```

## Private Route

GET `/api/private`

It returns a String: `you are allowed to access this private route` . It requires authentication.

The JWT - `access_token` must be sent on the `Authorization` header as follows: `auth-token: Bearer {jwt}`

# Use Postman

Postman provides a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing

