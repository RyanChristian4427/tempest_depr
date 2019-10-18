<template>
    <div class="side-nav">
        <h2 class="title has-text-centered">Tempest</h2>
        <hr>

        <nav-tile v-bind:nav-tile="tile1"></nav-tile>
        <nav-tile v-bind:nav-tile="tile2"></nav-tile>
        <nav-tile v-bind:nav-tile="tile3"></nav-tile>
        <nav-tile v-bind:nav-tile="tile4"></nav-tile>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import NavTile from '@/components/tempest/side-nav/NavTile.vue';
    import {SideNavTile} from '@/models/SideNav';

    @Component({
        components: {
            NavTile,
        },
    })
    export default class SideNav extends Vue {
        public tile1: SideNavTile = {
            title: 'Inbox',
        };
        public tile2: SideNavTile = {
            title: 'Important',
        };
        public tile3: SideNavTile = {
            title: 'Banks',
        };
        public tile4: SideNavTile = {
            title: 'Trash',
        };
    }
</script>

<style scoped lang="scss">
    .side-nav {
        background: $theme-xanadu;
        margin-right: 2px;
        min-height: 100vh;

        .title {
            padding-top: 2vh;
            color: $theme-isabelline;
        }

        h3 {
            padding-left: 1vw;
        }

        hr {
            margin: 1.5rem .5vw 10rem;
        }
    }
</style>
