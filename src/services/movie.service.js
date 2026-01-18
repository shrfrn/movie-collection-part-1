import { storageService } from './async-storage.service.js'
import { loadFromStorage, saveToStorage } from './util.service.js'

import demoData from './movie.data.js'

const KEY = 'movies'

_createMovies()

export const movieService = {
	query,
	get,
	remove,
	save,
	getEmptyMovie,
    getMoviePoster,
}

async function query(filterBy = {}) {
	var movies = await storageService.query(KEY)

	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		movies = 
            movies.filter(movie => 
                regex.test(movie.title) || 
                regex.test(movie.director) || 
                movie.actors.some(actor => regex.test(actor)))
	}

	if (filterBy.maxRunTime) {
		movies = movies.filter(movie => movie.runningTime <= filterBy.maxRunTime)
	}
	return movies
}

async function get(movieId) {
	const movies = await storageService.query(KEY)
    const idx = movies.findIndex(movie => movie._id === movieId)

    if (idx !== 0) movies[idx].prevId = movies[idx - 1]._id
    if (idx !== movies.length - 1) movies[idx].nextId = movies[idx + 1]._id

    return movies[idx]
}

async function remove(movieId) {
	return storageService.remove(KEY, movieId)
}

async function save(movie) {
	if (movie._id) return storageService.put(KEY, movie)
	else return storageService.post(KEY, movie)
}

function getEmptyMovie() {
	return {
		title: '', // Movie title
		director: '', // Director's name
		posterUrl: '', // URL to the movie poster image
		runningTime: 90, // Running time in minutes
		releaseYear: 1999, // Year of release
		actors: [], // Array of actor names
		genre: '', // Genre of the movie
	}
}

async function getMoviePoster(title) {
	const API_KEY = 'c286babf'

	const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`)
    const data = await res.json()
    
    if (data.Response === 'True') {
        return data.Poster // Use this in your UI
    } else {
        return '../../default.png'
    }
}

function _createMovies() {
	var movies = loadFromStorage(KEY)
	if (movies && movies.length) return

	saveToStorage(KEY, demoData)
}
