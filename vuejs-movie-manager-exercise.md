# 🎬 VueJS Movie Manager

## 🧩 Overview

In this project, you will build a VueJS-based CRUD application to manage a collection of movies. This exercise is structured in **three parts**, gradually increasing in complexity and incorporating essential Vue concepts such as routing, Vuex state management, and user interaction.

## 📦 Movie Data Model

In the provided movie service, each movie is represented as a JavaScript object with the following structure:

```js
{
  id: String,                // Unique identifier
  title: String,             // Movie title
  director: String,          // Director's name

  posterUrl: String,         // You can use a defualt posterUrl for now.
  runningTime: Number,       // Running time in minutes
  releaseYear: Number,       // Year of release
  actors: String[],          // Array of actor names
  genre: String              // Genre of the movie
}


export const movieService = {
  query,
  getById,
  remove,
  save,
  getEmptyMovie,
  getDefaultFilter,
}
```

---

## Part 1: Basic App with Routing

In this phase, implement basic routing and UI to view, inspect, and edit movies.

### App Structure

Create an `<AppHeader>` component which will display navigation links (`<RouterLink>`'s) to the application’s routes.

Create an `<AppFooter>` component. You can choose what to display inside it.

In the root component of our app, render the header and footer along with a slot for the routes to be displayed in.

```html
<AppHeader />
    <RouterView />
<AppFooter />
```
### Routes

1. **Home Page (`/`)**

    - Just a simple static page for now. You can add more content to it later.

1. **Movie Index Route (`/movie`)**
    - Display a list of all movies.
    - Each movie preview should include:
        - Poster image (thumbnail size)
        - Title
        - Release year

    -   Use the `movieService` to fetch movies and pass them to `<MovieList>` .
    -   Add a **Delete** button to each movie in the list.
    -   Add a **Details** button to each movie in the list which navigates to the **Movie Details** route.

1. **Movie Details Route (`/movie/:id`)**

    - Display full details for a specific movie:
        - Poster (larger)
        - Title
        - Director
        - Release year
        - Running time
        - Genre
        - Actors list

1. **Movie Edit Route (`/movie/edit/:id`)**
    - Display a form to update any of the movie's fields.
    - On submission, the updated data should reflect in the index and details views.

### Filtering

1. Implement a basic filter component which will be rendered in then `<MovieIndex>` route. 
1. Use a `filterBy` object with a txt field to match for title, director or actor name.
1. Add a maxRunTime field to the filter.

### Adding a movie

Add a **Add a Movie** button to the `<MovieIndex>` Component which will navigate to the **Movie Edit Route**. Refactor the route to support adding as well as editing a movie.

> ℹ️ You will need to make the `/movie/edit/:id?` route param optional

Add a **Get Poster** button to the form which will use the `movieService.getMoviePoster()` to lookup a url for the movie poster by the movie's name.

> ℹ️ You will need to get an API Key at [OMBD](https://www.omdbapi.com/apikey.aspx) and use it in `movieService.getMoviePoster()` 

### Adding a `<UserMsg />` Component

Use the event-bus service to implement a `<UserMsg />` component which will display success and error messages to the user. The messags appear for 2 seconds when triggered and then disapear.

---

## 📁 Project Structure (Suggestion)

```
src/
├── cmps/
│   ├── UserMsg.vue
│   ├── MovieList.vue
│   ├── MoviePreview.vue
│   └── MovieFilter.vue
├── pages/
│   ├── MovieIndex.vue
│   ├── MovieDetail.vue
│   └── MovieEdit.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```
## Part 2 - Connect a store

Let's connect a store to our app.

### Connect a simple store

Start by connecting a simple store with a just a `counter`, and an `increment()` mutation. Use the example from class or the [Vuex docs](https://vuex.vuejs.org/guide/#the-simplest-store) for reference. Make sure to use `strict: true`.


Your project structure should now look like this: 
```
src/
├── cmps/
│   ├── UserMsg.vue
│   ├── MovieList.vue
│   ├── MoviePreview.vue
│   ├── MovieFilter.vue
│   └── ...
├── pages/
│   ├── MovieIndex.vue
│   ├── MovieDetail.vue
│   ├── MovieEdit.vue
│   └── ...
├── router/
│   └── index.js
├── store/
│   ├── modules
│   │   └── movie.js
│   └── index.js
├── App.vue
└── main.js
```

Add a getter to retrieve the counter and render it on the Home page & footer of your app.
Add a button to increment it using the `increment()` mutation.

### Add a movie module

Let's move the `movies` array from the `MovieIndex` component to the store. Here is a step by step breakdown of how to do this:

1. Create a `movie` module with a `movies` array, a `setMovies()` mutation a `loadMovies()` action and `movies()` getter.
1. Remove the `movies` local state from the `MovieIndex` component and define a `movies()` computed property instead, which fetches the movies array from the store (use the `movies()` getter)
1. Add a `removeMovie()` mutation & action.
1. You now have a basic store to handle the movies array of your app.

### Move the filter to the store

1. Define a `filterBy` state + a `setFilterBy()` mutation in the `movie` module.
1. When the user edits the filter, call the mutation to update it in the store.

    > ⚠️ Make sure to save a copy of the fiterBy object in the store to prevent direct editing of store state in the filterBy component

1. The `loadMovies()` action will now use the `filterBy` from the store when quering the service.

### Add Optimistic Mutation behavior 

1. Add a `savedMovies` array + `saveMovies()` and `restoreMovies()` mutations to the movie module.
1. `saveMovies()` will create a copy of the `movies` array in `savedMovies`.
1. `restoreMovies()` will copy `savedMovies` back into the `movies` array.
1. In the `removeMovie()` action: 
- call `saveMovies()` to capture a backup of the movies array.
- call the `removeMovie()` mutation to update the movies array.
- only then, call the `removeMovie()` action to remove the movie from `localStorage`.
1. If the acion fails, restore the movies in the `catch` block.