# myFlix-client

React frontend for myFlix, a movie database application. Users can browse movies, view details about plots, directors, and genres, and maintain a list of favorites.

Part of a three-repo project:

- [Movie-API](https://github.com/hallibentley/Movie-API) — the Node.js and Express backend this consumes
- [myFlix-Angular-client](https://github.com/hallibentley/myFlix-Angular-client) — the same application rebuilt in Angular and TypeScript

## Stack

**Framework:** React 18  
**HTTP:** axios  
**Types:** prop-types  
**Styling:** SCSS  
**Build:** Parcel

## Architecture

Built as class components with a state-based view router. A single `MainView` component owns application state and switches between child views based on that state rather than URL routing.

`MainView` fetches from the Movie-API on mount, stores the JWT returned at login, and passes data down to presentational components through props. Every authenticated request carries the token in an `Authorization` header.

Components:

- `MainView` — state container and view switching
- `LoginView` / `RegistrationView` — authentication
- `MovieCard` — list item
- `MovieView` — single movie detail

## Features

- Register an account and log in
- Browse all movies
- View a movie's plot, director, and genre
- Add and remove favorites
- Update profile details
- Delete account

## Running locally

```bash
git clone https://github.com/hallibentley/myFlix-client.git
cd myFlix-client
npm install
npm start
```

Requires a running instance of [Movie-API](https://github.com/hallibentley/Movie-API). The API was originally hosted on Heroku, whose free tier ended in November 2022, so run the backend locally and point the client at it.
