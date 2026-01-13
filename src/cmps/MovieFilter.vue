<template>
    <section class="movie-filter">
        <input @input="onFilterBy" v-model="filterBy.txt" type="text" placeholder="Search">
        <input @input="onFilterBy" v-model="filterBy.maxRunTime" type="number" placeholder="Max. running time">
    </section>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                txt: '',
                maxRunTime: 0,
            }
        }
    },
    methods: {
        onFilterBy() {
            console.log(this.filterBy)
            this.$emit('filter', this.filterBy)
        }
    },
}
</script>

<style>
.movie-filter {
    display: flex;
    gap: 10px;
}
</style>