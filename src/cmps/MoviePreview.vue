<template>
    <article class="movie-preview">
        <h2>{{movie.title}}</h2>
        <p>directed by: {{movie.director}}</p>
        <p>{{movie.runningTime}} min.</p>
        <span v-for="actor in movie.actors">{{actor}}, </span>
        <span>More...</span>
    </article>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">
</style>