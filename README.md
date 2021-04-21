# Triptalk

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

This wil start the app locally with automatic refreshing of the web and server components when you make a change.

Visit `http://localhost:5001` in your browser.

## Running tests
You need to have the database running in Docker when running the tests. It starts as part of `yarn start`, or you can start it manually by running `docker-compose up`

```
$ yarn test
```

## Notes
Each push will deploy the app to production.