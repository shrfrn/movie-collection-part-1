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
import { debounce } from '@/services/util.service'
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service'

export default {
    methods: {
        async removeMovie(movieId) {
            try {
                await this.$store.dispatch({ type: 'removeMovie', movieId })
                showSuccessMsg(`Movie ${movieId} removed`)
            } catch (err) {
                showErrorMsg(`Problem loading movies...`)
            }
        },
        onFilter(filterBy) {
            this.$store.commit({ type: 'setFilter', filterBy })
            this.debouncedLoadMovies()
        },
        async loadMovies() {
            try {
                await this.$store.dispatch({ type: 'loadMovies' })
                showSuccessMsg('Movies loaded OK')
            } catch (err) {
                showErrorMsg('Error loading movies...')
            }
        }
    },
    computed: {
        movies() { return this.$store.getters.movies }
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
    margin-block-start: .5em;
}
</style>
