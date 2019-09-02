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
            {{ displayTimeStamp(email.datetime) }}
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import { Email } from '@/models/email.ts';

    @Component
    export default class EmailCard extends Vue {
        @Prop()
        public email: Email | undefined;

        // Methods
        public displayTimeStamp(datetime: string) {
            const emailDate = new Date(datetime);
            // TODO Update once API call is made
            const today = new Date('2019-08-28T23:59:59Z');

            const dayInMillis = 60 * 60 * 24 * 1000;
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // If an email is more than 6 months old (irrespective of date within month), and is the year previous,
            // give it the full date format. If it was in the past 24 hours, give it a timestamp, otherwise,
            // give it mmm / dd format
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(today.getMonth() - 6, 0);

            return sixMonthsAgo > emailDate && today.getFullYear() !== emailDate.getFullYear()
                ? months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate() + ' ' + emailDate.getFullYear()
                : today.getTime() - emailDate.getTime() < dayInMillis
                    ? emailDate.getHours() + ':' + emailDate.getMinutes()
                    : months[emailDate.getMonth()] + ' ' + emailDate.getUTCDate();
        }
    }
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
