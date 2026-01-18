<template>
    <section class="movie-details">
        <pre>{{movie}}</pre>
        <nav v-if="movie">
            <RouterLink :to="`/movie/${movie.prevId}`"><button :disabled="!movie.prevId">Prev</button></RouterLink>
            <RouterLink :to="`/movie/${movie.nextId}`"><button :disabled="!movie.nextId">Next</button></RouterLink>
            <RouterLink to="/movie"><button>Back</button></RouterLink>
        </nav>
    </section>
</template>

<script>
import { movieService } from '@/services/movie.service';

export default {
    data() {
        return {
            movie: null,
        }
    },
    async created() {
        const { id: movieId } = this.$route.params
        this.movie = await movieService.get(movieId)
    },
    watch: {
        '$route.params.id' : {
            handler(newId) {
                movieService.get(newId)
                    .then(movie => this.movie = movie)
            }
        }
    }
}
</script>

<style scoped>
nav {
    position: fixed;
    bottom: 10vh;
    right: .5em;

    display: flex;
    justify-content: end;
    gap: .5em;

    width: 100%;

    a:last-child {
        margin-inline-start: 2em;
    }
}

</style>