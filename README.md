# Overview
This repository houses a toy project of a functional web application. It includes a deployed backend API built with **NodeJS** and a local front end built with **ReactJS**. 

The backend API tests are written with **Mocha**, **Chai** & **ChaiHTTP**, and deployed with **Heroku**. It can be accessed via [link](https://justingnoh-cs3219-task-b.herokuapp.com/).

**Travis** is integrated into this repo for Continuous Integration (CI) and Continuous Deployment (CD).

Screenshots and details can be found in this [pdf](https://github.com/justgnoh/Task-B-CS3219/blob/master/A0202054Y_B.pdf)

# Instructions 
### Setting up the Front End

`cd` into working directory

Run `npm install`

Use `npm run` to spin up the front end locally

Access the application via `localhost:3000`

### Running the API locally (Optional)
This is an optional step as the API is already deployed on **Heroku**

`cd` into working directory

Run `npm install`

Use `node index.js` to spin up the API locally

Test the API works with Postman etc.

## Implementation Details

## Application Programming Interface (API)
Built with Node.JS and tested with Postman.

Automated API testing with **Mocha**, **Chai**, **ChaiHTTP**

Functionalities
|Type|Endpoint|Description| 
|---|---|---|
|GET|/getAllUsers| Returns all users in database| 
|GET|/getUser/:id| Returns a user by specified id| 
|POST|/users/| Adds a user into the database|
|PUT|/users/:id|Updates a specified user id|
|DELETE|/users/:id|Deletes a specified user id|

#### Basic Error handling
|Type|Endpoint|Description|
|---|---|----|
|POST|/users|Returns error code 400 if **name** or **email** is missing|

### Continuous Integration / Development
Setup with **Travis CLI**. 

Test scripts and **Heroku** deployment scripts were automated by **Travis**. See [pdf](https://github.com/justgnoh/Task-B-CS3219/blob/master/A0202054Y_B.pdf) for more information.

### Front End Application
Built with ReactJS and the Bootstrap UI library.

Initialized by [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
