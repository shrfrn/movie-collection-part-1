<template>
    <form v-if="movie" @submit.prevent="onSave" class="movie-edit">
        <input v-model="movie.title" type="text" >
        <input v-model="movie.director" type="text" >
        <input v-model="movie.genre" type="text" >
        <input v-model="movie.runningTime" type="number" >
        <input v-model="movie.posterUrl" type="text" >
        <button type="button" @click="getPoster">Get Poster</button>

        <div class="actions">
            <button>Save</button>
            <RouterLink to="/movie"><button type="button">Cancel</button></RouterLink>
        </div>
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
    gap: 10px 30px;

    width: max-content;

    padding: 20px 40px;
    background-color: lightslategray;
    margin-block-start: 2rem;
    margin-inline: auto;

    input {
        position: relative;

    }

    input:nth-child(even) {
        grid-column: 2;
    }
}
.actions {
    display: flex;
    gap: .3em;
    grid-column: 1 / 3;

    justify-self: end;
    margin-block-start: 2rem;
}
</style>