# Championship Application Manager

This project is developed to emphasis MEAN stack (MongoDB, Express.js, Angular.js, Node.js) and also uses the following

* [AngularJS Material](https://material.angularjs.org/latest/) - a UI Component framework and a reference implementation of Google's Material Design Specification
* [Mongoose](https://mongoosejs.com/) - object data modeling (ODM) library
* [Jasmine](https://jasmine.github.io/pages/getting_started.html) - an open source testing framework for JavaScript
* [Winston](https://www.npmjs.com/package/winston) - A logger for just about everything

Create and Manage Championship & Tournament lifecycle, which has the following features:

1- Create Championship

2- Create Tournament

3- Set Tournament teams, Stages, Groups & Matches

4- Manage Tournament lifecycle till the final Stage

5- Generate Matches from groups automatically

6- Calculate points, Goal for, Goal against & Goal Difference for every team

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [MongoDB](https://www.mongodb.com/) - NoSQL database program
* [Robo 3T](https://robomongo.org/) - free lightweight GUI for MongoDB

### Installing

1- Install Node.js and check the installation from the command line

```
node -v
```

2- Create new folder for MongoDB data, and run the following through the command line,

Assuming that the location of MongoDB in "D:\MEAN\mongodb\bin"

Also assuming that MongoDB data folder in "D:\MEAN\mongodata"

It's preferred that you create the below in batch file
```
d:
cd "D:\MEAN\mongodb\bin"
mongod.exe --dbpath "D:\MEAN\mongodata"
```

3- Install Robo 3T to make life easier with MongoDB

4- Install dependencies by typing the following through the command line

```
npm install
```

## Running the tests

The tests till now are not fully completed, but for now i've used Jasmine framework

To run the test just type the following through the command line

```
npm test
```
