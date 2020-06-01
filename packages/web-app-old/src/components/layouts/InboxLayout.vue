<template>
    <section class="columns">
        <div class="column is-2 side-content">
            <core-side-nav/>
<!--            <h2 class="title has-text-centered">Tempest</h2>-->
        </div>
        <div class="column main-content">
            <core-toolbar/>
            <router-view class="page-content"/>
            <core-footer/>
        </div>
    </section>
</template>

<script lang="ts">
    import CoreFooter from '@/components/core/Footer.vue';
    import CoreSideNav from '@/components/core/SideNav.vue';
    import CoreToolbar from '@/components/core/Toolbar.vue';

    export default {
        name: 'Dashboard-Layout',
        components: {
            CoreFooter,
            CoreSideNav,
            CoreToolbar,
        },
    };
</script>

<style scoped lang="scss">
    .columns {
        margin: 0;
    }

    .side-content {
        min-height: 100vh;
        padding: 0;
        background: $theme-deep-space-sparkle;
    }

    .main-content {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    .page-content {
        flex: 1;
    }
</style>

