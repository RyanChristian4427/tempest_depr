<template>
    <div>
        <h3>{{ navTileDropDown.title }}</h3>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {SideNavTileDropdown} from '@/models/SideNav';

    @Component
    export default class NavTileDropdown extends Vue {
        @Prop()
        public navTileDropDown: SideNavTileDropdown | undefined;
    }
</script>

<style scoped>

</style>
