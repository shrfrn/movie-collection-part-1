<template>
    <section class="movie-filter">
        <input v-model="filterBy.txt" type="text" placeholder="Search">
        <input v-model="filterBy.maxRunTime" type="number" placeholder="Max. running time">
    </section>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                txt: '',
                maxRunTime: 100,
            }
        }
    },
    watch: {
        filterBy: {
            handler(filterBy) {
                this.$emit('filter', filterBy)
            },
            deep: true,
        }
    }
}
</script>

<style lang="scss">
.movie-filter {
    display: flex;
    gap: 10px;
}
</style>