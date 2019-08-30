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
            {{ dateTimePastDay(email.datetime) }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Email } from '@/models/email.ts';

    export default {
        name: 'EmailCard',
        props: {
            email: {
                type: Object as () => Email,
                required: true,
            },
        },
        methods: {
            dateTimePastDay(datetime: string): string {
                const emailDate = new Date(datetime);
                // TODO Update once API call is made
                const day = new Date('2019-08-28T23:59:59Z');

                const dayInMillis = 60 * 60 * 24 * 1000;
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                return (day.getTime() - emailDate.getTime()) > dayInMillis
                    ? months[emailDate.getMonth()] + ' ' + emailDate.getDate()
                    : emailDate.getHours() + ':' + emailDate.getMinutes();
            },
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
                width: 10vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .email-content {
            margin-left: 2vw;
            display: inline-block;
            width: 48vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

        }

        .level-right {
            margin-right: 1vw;
        }
    }
</style>
