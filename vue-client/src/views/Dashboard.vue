<template>
    <section>
        <div class="container">
            <ul>
                <email-card v-for="email in paginatedItems()"
                            v-bind:email="email"
                            v-bind:key="email.sender">
                </email-card>
            </ul>
            <b-pagination
                    :total="total"
                    :current.sync="currentPage"
                    :order="buttonAlignment"
                    :simple="isSimple"
                    :rounded="isRounded"
                    :per-page="emailsPerPage">
            </b-pagination>
        </div>
    </section>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import { Getter } from 'vuex-class';
    import EmailCard from '@/components/tempest/EmailCard.vue';
    import data from '../assets/data.json';

    interface Email {
        sender: string;
        content: string;
        datetime: string;
    }

    @Component({
        components: {
            EmailCard,
        },
    })
    export default class Dashboard extends Vue {
        public currentPage: number = 1;
        public buttonAlignment: string = 'is-centered';
        public isSimple: boolean = true;
        public isRounded: boolean = true;

        @Getter('emailsPerPage') public emailsPerPage!: number;

        public total: number = data.length;

        // Methods
        public paginatedItems() {
            const pageNumber = this.currentPage - 1;
            return data.slice(pageNumber * this.emailsPerPage, (pageNumber + 1) * this.emailsPerPage);
        }

        // noinspection JSMethodCanBeStatic
        private created() {
            data.sort((a: Email, b: Email) => -a.datetime.localeCompare(b.datetime));
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin: 10vh 5vw 5vh;
    }
</style>
