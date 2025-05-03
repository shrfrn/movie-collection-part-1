import { movieService } from "@/services/movie.service"

export default {
    state() {
        return {
            movies: [],
            filterBy: {},
            savedMovies: [],
        }
    },
    mutations: {
        setMovies(state, { movies }) {
            state.movies = movies
        },
        removeMovie(state, { movieId }) {
            const idx = state.movies.findIndex(movie => movie._id === movieId)
            state.movies.splice(idx, 1)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = { ...filterBy }
        },
        saveMovies(state) {
            state.savedMovies = [...state.movies]
        },
        restoreMovies(state) {
            state.movies = state.savedMovies
        },
    },
    actions: {
        async loadMovies({ commit, state }) {
            const movies = await movieService.query(state.filterBy)
            commit({ type: 'setMovies', movies })
        },
        async removeMovie({ commit }, { movieId }) {
            try {
                commit({ type: 'saveMovies' })
                commit({ type: 'removeMovie', movieId })
                
                await movieService.remove(movieId)
            } catch (err) {
                commit({ type: 'restoreMovies' })
                throw err
            }
        },
    },
    getters: {
        movies(state) { return state.movies }
    }
}