<template>
    <div class="email-card level">
        <div class="level-left">
            <div class="level-item">
                <p class="subtitle is-5">
                    {{ email.sender }}
                </p>
            </div>
            <div class="level-item level-left email-content">
                {{ email.content }}
            </div>
        </div>
        <div class="level-item level-right">
            {{ email.timestamp }}
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'EmailCard',
        props: {
            email: { type: Object, required: true },
        },
    };
</script>

<style scoped lang="scss">
    .email-card {
        border: 1px solid gray;
        margin-bottom: .5vh !important;
        background: $theme-ash-grey;
        cursor: pointer;

        .level-left {
            p {
                margin-left: 1vw;
                width: 3vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .email-content {
            margin-left: 2vw;
            display: inline-block;
            width: 58vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

        }

        .level-right {
            margin-right: 1vw;
        }
    }
</style>
