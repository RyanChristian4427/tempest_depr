<template>
    <div class="side-nav">
        <h2 class="title has-text-centered">Tempest</h2>
        <hr>

        <h3 class="title">Test</h3>
    </div>
</template>

<script>
    export default {
        name: 'SideNav',
    };
</script>

<style scoped lang="scss">
    .side-nav {
        background: $theme-xanadu;
        margin-right: 2px;
        min-height: 100vh;

        .title {
            padding-top: 2vh;
            color: $theme-isabelline
        }

        h3 {
            padding-left: 1vw;
        }

        hr {
            margin: 1.5rem .5vw
        }
    }
</style>
