<template>
    <section class="main-content">
        <router-view class="page-content"/>
        <footer/>
    </section>
</template>

<script lang="ts">
    import Footer from '@/components/core/Footer.vue';

    export default {
        name: 'Login-Layout',
        components: {
            Footer,
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
