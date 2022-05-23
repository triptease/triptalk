# Triptalk

It's an app that allows you to submit messages and Like them. We'd like you to extend the functionality to show a count of the number of times a message has been Liked.

This exercise isn't about fully implementing a feature and so there's no need to worry about finishing it in the time. We're interested in coming along a journey with you and seeing how you approach this sort of work. Imagine you're already part of our team and this is the next big feature we want to get in front of customers.

Assume this application is already in production and that every commit (assuming it passes the tests) will be deployed straight to production - this is the way we do work.

The exercise is based on the tech stack we actually use and the code is representative of some of the apps we have to work in - it's not perfect!

We'll be working as a pair so talk through your thinking and don't hesitate to ask questions or for opinions from your pair.

We'd like you to commit your changes to a local git repository. Treat your commit as though it will push and deploy the app to production.

Feel free to look stuff up on the internet, it's not a memory test. There are no deliberate tricks or gotchas here, at least not intentionally.

We'll take a break halfway for 5-10 mins.

There will be 15 minutes at end for questions.

## Required dependencies
- `docker`
- `docker-compose`
- `nvm`
- `yarn`

## Starting the project
```
$ nvm install
$ yarn
$ yarn start
```

This will start the app locally with automatic refreshing of the web and server components when you make a change.

Visit `http://localhost:5001` in your browser.

## Running tests
You need to have the database running in Docker when running the tests. It starts as part of `yarn start`, or you can start it manually by running `docker-compose up`

```
$ yarn test
```