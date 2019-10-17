<template>
    <div class="nav-card level">
        <h3> {{ navTile.title }} </h3>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {SideNavTile} from "@/models/SideNav";

    @Component
    export default class NavCard extends Vue {
        @Prop()
        public navTile: SideNavTile | undefined;
    }
</script>

<style scoped>

</style>
