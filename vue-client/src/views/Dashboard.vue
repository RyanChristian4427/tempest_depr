<template>
    <section>
        <div class="container">
            <ul>
                <email-card v-for="email in paginatedItems"
                            v-bind:email="email"
                            v-bind:key="email">
                </email-card>
            </ul>
            <b-pagination
                    :total="this.total"
                    :current.sync="currentPage"
                    :order="order"
                    :simple="isSimple"
                    :rounded="isRounded"
                    :per-page="this.perPage">
            </b-pagination>
        </div>
    </section>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import EmailCard from '@/components/tempest/EmailCard.vue';
const testData = require('@/assets/data.json');

interface Email {
    sender: string;
    content: string;
    datetime: string;
}

export default {
    name: 'Dashboard',
    components: {
        EmailCard,
    },
    data() {
        return {
            currentPage: 1,
            order: 'is-centered',
            isSimple: true,
            isRounded: true,
        };
    },
    computed: {
        ...mapGetters([
            'emailsPerPage',
        ]),
        total(): number {
            return testData.length;
        },
        perPage(this: { emailsPerPage: number }): number {
            return this.emailsPerPage;
        },
        paginatedItems(this: { currentPage: number, perPage: number}): [Email] {
            const pageNumber = this.currentPage - 1;
            return testData.slice(pageNumber * this.perPage, (pageNumber + 1) * this.perPage);

        },
    },
    created() {
        testData.sort((a: Email, b: Email) => -a.datetime.localeCompare(b.datetime));
    },
};
</script>

<style scoped lang="scss">
    .container {
        margin: 25vh 5vw 5vh;
    }
</style>
