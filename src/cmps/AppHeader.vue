<template>
	<header>
		<h1>Cars</h1>
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/movie">Movies</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
	</header>
</template>

<script>
export default {}
</script>

<style lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vh;

    padding: 10px;
    background-color: lightblue;

    nav {
        display: flex;
        gap: 1em;
    }
}
</style>
