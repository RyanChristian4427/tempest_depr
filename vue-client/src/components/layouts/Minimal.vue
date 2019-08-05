<template>
    <div class="layout-content">
        <router-view class="page-content"></router-view>
        <core-footer></core-footer>
    </div>
</template>

<script lang="ts">
    import CoreFooter from '@/components/core/Footer.vue';

    export default {
        name: 'Login-Layout',
        components: {
            CoreFooter,
        },
    };
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }
    .page-content {
        flex: 1;
    }
</style>
