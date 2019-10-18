<template>
    <div class="nav-tile level">
        <h3 class="subtitle is-size-4"> <b>{{ navTile.title }}</b> </h3>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {SideNavTile} from '@/models/SideNav';

    @Component
    export default class NavTile extends Vue {
        @Prop()
        public navTile: SideNavTile | undefined;
    }
</script>

<style scoped lang="scss">
    .nav-tile {
        padding-top: 1vh;
        padding-bottom: 1vh;
        padding-left: 1.5vw;
        margin-right: 1vw;

        .subtitle {
            color: $theme-isabelline
        }
    }

    .level {
        margin-bottom: 0 !important;
    }

    .nav-tile:hover {
        cursor: pointer;
        background: $theme-charleston-green;
        border-bottom-right-radius: 30px;
        border-top-right-radius: 30px;
    }

</style>
