<template>
    <header>
	    <MovieFilter @filter="onFilter"/>
        <RouterLink to="/movie/edit"><button>Add a Movie</button></RouterLink>
    </header>
    <MovieList @remove="removeMovie" :movies="movies" />
</template>

<script>
import MovieFilter from '@/cmps/MovieFilter.vue'
import MovieList from '@/cmps/MovieList.vue'
import { movieService } from '@/services/movie.service'
import { debounce } from '@/services/util.service'
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service'

export default {
	data() {
		return {
			movies: [],
		}
	},
    methods: {
        async removeMovie(movieId) {
            await movieService.remove(movieId)

            const idx = this.movies.findIndex(movie => movie._id === movieId)
            this.movies.splice(idx, 1)
        },
        onFilter(filterBy) {
            this.debouncedLoadMovies(filterBy)
        },
        async loadMovies(filterBy = {}) {
            try {
                this.movies = await movieService.query(filterBy)
                showSuccessMsg('Movies loaded')
            } catch (err) {
                showErrorMsg('Error loading movies')
            }
        }
    },
	async created() {
        this.debouncedLoadMovies = debounce(this.loadMovies)
        this.loadMovies()
	},
    components: {
        MovieList,
        MovieFilter,
    }
}
</script>

<style lang="scss" scoped>
header {
    background-color: lightgray;
}
</style>
