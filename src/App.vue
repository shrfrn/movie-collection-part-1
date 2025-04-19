<template>
    <UserMsg />
    <AppHeader />
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>

<script>
    import AppHeader from './cmps/AppHeader.vue'
    import AppFooter from './cmps/AppFooter.vue'
    import UserMsg from './cmps/UserMsg.vue'
    
    export default {
        components: {
            AppHeader,
            AppFooter,
            UserMsg,
        }
    }
</script>

<style scoped>
main {
    min-height: calc(90vh - 1rem);
    /* padding: .5em; */
}
</style>
