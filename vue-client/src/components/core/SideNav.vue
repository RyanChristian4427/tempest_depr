<template>
    <div class="side-nav">
        <h2 class="title has-text-centered">Tempest</h2>
        <hr>
        <b-menu-list>
            <b-menu-item label="Inbox" icon="inbox" :active="true"></b-menu-item>
            <b-menu-item label="Important" icon="exclamation"></b-menu-item>
            <b-menu-item label="Financials" icon="chevron-right">
                <b-menu-item label="Capital One"></b-menu-item>
                <b-menu-item label="Bank of America"></b-menu-item>
                <b-menu-item label="Chase"></b-menu-item>
            </b-menu-item>
            <b-menu-item label="Trash" icon="delete"></b-menu-item>
        </b-menu-list>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class SideNav extends Vue {}
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

        hr {
            margin: 1.5rem .5vw 10rem;
        }

        .menu-list {
            font-size: 1.5rem;

            li {
                margin: .5vh 1vw .5vh 0;
            }
        }
    }
</style>
