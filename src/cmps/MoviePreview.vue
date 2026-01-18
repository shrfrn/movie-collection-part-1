<template>
    <article class="movie-preview">
        <img 
            :src="movie.posterUrl" 
            alt="Movie poster" 
            onerror="this.src='../../default.png'">
            
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

<style>
.movie-preview {
    grid-column: 1 / 3;
}

img {
    display: block;
    width: 100%;
    height: 200px;
    margin-block-end: 1rem;

    object-fit: cover;
}
</style>