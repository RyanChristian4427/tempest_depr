<template>
    <section class="columns">
        <div class="column is-2">
            <h2 class="title has-text-centered">Tempest</h2>
        </div>
        <div class="main-content column">
            <core-toolbar/>
            <router-view class="page-content"/>
            <core-footer/>
        </div>
    </section>
</template>

<script lang="ts">
    import CoreFooter from '@/components/core/Footer.vue';
    import CoreToolbar from '@/components/core/Toolbar.vue';

    export default {
        name: 'Dashboard-Layout',
        components: {
            CoreFooter,
            CoreToolbar,
        },
    };
</script>

<style scoped lang="scss">
    .columns {
        margin: 0;
    }

    .is-2 {
        background: $theme-xanadu;

        .title {
            margin-top: 2vh;
            color: $theme-isabelline
        }
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

