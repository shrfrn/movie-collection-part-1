<template>
    <section class="movie-details">
        <pre>{{movie}}</pre>
        <RouterLink to="/movie"><button>Back</button></RouterLink>
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
    }
}
</script>

<style>

</style>