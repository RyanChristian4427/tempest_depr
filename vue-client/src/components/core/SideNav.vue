<template>
    <div class="side-nav">
        <h2 class="title has-text-centered">Tempest</h2>
        <hr>

        <h3 class="title">Test</h3>
        <nav-card v-bind:nav-tile="x"></nav-card>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import NavCard from '@/components/tempest/side-nav/NavCard.vue';
    import {SideNavTile} from "@/models/SideNav";

    @Component({
        components: {
            NavCard,
        },
    })
    export default class SideNav extends Vue {
        public x: SideNavTile = {
            title: 'TestTile',
        }
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
