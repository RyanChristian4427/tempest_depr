<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <span v-for="link in links" :key="link.name">
                <a :href="link.link">
                    {{ link.name }}
                </a>
            </span>
            <span>
                &copy;
                {{ (new Date()).getFullYear() }}
                Ryan Christian
            </span>
        </div>
    </footer>
</template>

<script lang="ts">
    export default {
        data: () => ({
            links: [
                { name: 'GitHub', link: 'https://github.com/RyanChristian4427' },
            ],
        }),
    };
</script>

