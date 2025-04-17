<template>
	<section class="movie-list">
		<ul>
			<li v-for="movie in movies" :key="movie.id">
				<MoviePreview :movie="movie" />
                <div class="actions">
                    <RouterLink :to="`movie/${movie._id}`"><button>Details</button></RouterLink>
                    <RouterLink :to="`movie/edit/${movie._id}`"><button>Edit</button></RouterLink>
                    <button @click="onRemoveMovie(movie._id)">x</button>
                </div>
			</li>
		</ul>
	</section>
</template>

<script>
import MoviePreview from './MoviePreview.vue'

export default {
	props: {
		movies: {
			type: Array,
			required: true,
		},
	},
    methods: {
        onRemoveMovie(movieId) {
            this.$emit('remove', movieId)
        }
    },
    components: {
        MoviePreview,
    }
}
</script>

<style lang="scss">
.movie-list ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;

    padding: 0;
    list-style: none;
}

.movie-list li {
    display: grid;
    padding: 0.5em;
    background-color: lightblue;

    .actions {
        place-self: end;
    }
}
</style>
