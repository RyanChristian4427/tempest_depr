<template>
    <section class="main-content">
        <router-view class="page-content"/>
        <core-footer/>
    </section>
</template>

<script lang="ts">
    import CoreFooter from '@/components/core/Footer.vue';

    export default {
        name: 'Minimal-Layout',
        components: {
            CoreFooter,
        },
    };
</script>

<style lang="scss">
    .main-content {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    .page-content {
        flex: 1;
    }
</style>
