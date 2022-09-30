# Evently

#### A web application for event planners who want to create an itinerary for special occasions.

The most memorable times I've had when visiting a new city, getting together with friends, or attending any celebration was when the events were carefully planned. Now finding cool new places or remembering past favorites can be time consuming and a challenge to organize. With Evently, my friends, family, and I can keep a list of interesting venues and effortlessly create a fun party plan!

## Live Demo
Check out the live site here - [Evently](https://evently.michaelmoncera.com/)

## Technologies Used
* React.js
* Node.js
* Express.js
* PostgreSQL
* JavaScript
* HTML5
* CSS3
* Bootstrap
* Babel
* Webpack
* Dokku
* [Yelp API](https://www.yelp.com/developers/documentation/v3/get_started)

## Current Features
* User can register an account
* User can sign in to their account
* User can sign out of their account
* User can search for an event by location
* User can view search results
* User can bookmark an event
* User can view their bookmarks
* User can delete a bookmark
* User can create an itinerary from a bookmarked event
* User can view their itineraries
* User can add an event to an itinerary
* User can delete an event from an itinerary
* User can delete an itinerary

## Upcoming Features
* User can get directions to events
* User can filter Yelp search results and bookmarks by name, location or category
* User can share their itineraries

## Preview
![demo](./server/public/gifs/demo.gif)

## Development

### System Requirements
* Node.js (18 or higher)
* NPM (8 or higher)
* PostgreSQL

### Getting Started
1. Clone the repository and navigate to the directory.
  ```shell
    git clone git@github.com:mmoncera/evently.git
    cd evently
  ```
2. Install all dependencies with NPM.
  ```shell
  npm install
  ```
3. Make a copy of the `.env.example` file.
  ```shell
  cp .env.example .env
  ```
4. Start PostgreSQL.
  ```shell
  sudo service postgresql start
  ```
5. Create a new database.
  ```shell
  createdb evently
  ```
6. Import the example database to postgreSQL.
  ```shell
  npm run db:import
  ```
7. View the database (optional - if pgweb is installed).
  ```shell
  pgweb --db=evently
  ```
8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
  ```shell
  npm run dev
  ```
