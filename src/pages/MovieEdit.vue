<template>
    <form v-if="movie" @submit.prevent="onSave" class="movie-edit">
        <input v-model="movie.title" type="text">
        <input v-model="movie.director" type="text">
        <input v-model="movie.genre" type="text">
        <input v-model="movie.runningTime" type="number">
        <button>Save</button>
        <button type="button" @click="getPoster">Get Poster</button>
        <RouterLink to="/movie"><button type="button">Cancel</button></RouterLink>
    </form>
</template>

<script>
import { movieService } from '@/services/movie.service';

export default {
    data() {
        return {
            movie: null,
        }
    },
    methods: {
        async onSave() {
            await movieService.save(this.movie)
            this.$router.push('/movie')
        },
        async getPoster() {
            const posterUrl = await movieService.getMoviePoster(this.movie.title)
            console.log(posterUrl)
            this.movie.posterUrl = posterUrl
        }
    },  
    async created() {
        const { id: movieId } = this.$route.params

        if (movieId) {
            this.movie = await movieService.get(movieId)
        } else {
            this.movie = movieService.getEmptyMovie()
        }
    }
}
</script>

<style lang="scss">
.movie-edit {
    display: grid;
    justify-items: start;
    justify-content: center;
    gap: 10px;

    input:nth-child(even) {
        grid-column: 2;
    }
}
</style>