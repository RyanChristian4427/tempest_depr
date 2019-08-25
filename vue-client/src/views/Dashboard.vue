<template>
    <section>
        <div class="container">
            <ul>
                <email-card v-for="email in inbox"
                            v-bind:email="email">
                </email-card>
            </ul>
            <b-pagination
                    :total="total"
                    :current.sync="current"
                    :range-before="rangeBefore"
                    :range-after="rangeAfter"
                    :order="order"
                    :size="size"
                    :simple="isSimple"
                    :rounded="isRounded"
                    :per-page="perPage"
                    aria-next-label="Next page"
                    aria-previous-label="Previous page"
                    aria-page-label="Page"
                    aria-current-label="Current page">
            </b-pagination>
        </div>
    </section>
</template>

<script lang="js">
    import { mapGetters } from 'vuex';
    import EmailCard from '@/components/tempest/EmailCard.vue';

    export default {
        name: 'Dashboard',
        components: {
            EmailCard,
        },
        data() {
            return {
                inbox: [
                    {
                        sender: 'Lorem',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ornare orci. ' +
                            'Sed in velit id dolor pulvinar efficitur nec pellentesque purus. Ut non mauris justo. ' +
                            'Phasellus maximus a nibh in lacinia. Aenean mollis consequat purus sit amet dictum. ',
                        timestamp: '9:35am',
                    },
                    {
                        sender: 'Ipsum',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                            'Pellentesque id nisl nec sapien consequat pulvinar a dignissim nibh. ' +
                            'Curabitur mi velit, consequat non tortor in, commodo varius lorem. ' +
                            'Curabitur ullamcorper. ',
                        timestamp: '9:37am',
                    },
                    {
                        sender: 'Lorem',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ornare orci. ' +
                            'Sed in velit id dolor pulvinar efficitur nec pellentesque purus. Ut non mauris justo. ' +
                            'Phasellus maximus a nibh in lacinia. Aenean mollis consequat purus sit amet dictum. ',
                        timestamp: '9:35am',
                    },
                    {
                        sender: 'Ipsum',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                            'Pellentesque id nisl nec sapien consequat pulvinar a dignissim nibh. ' +
                            'Curabitur mi velit, consequat non tortor in, commodo varius lorem. ' +
                            'Curabitur ullamcorper. ',
                        timestamp: '9:37am',
                    },
                    {
                        sender: 'Lorem',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ornare orci. ' +
                            'Sed in velit id dolor pulvinar efficitur nec pellentesque purus. Ut non mauris justo. ' +
                            'Phasellus maximus a nibh in lacinia. Aenean mollis consequat purus sit amet dictum. ',
                        timestamp: '9:35am',
                    },
                    {
                        sender: 'Ipsum',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                            'Pellentesque id nisl nec sapien consequat pulvinar a dignissim nibh. ' +
                            'Curabitur mi velit, consequat non tortor in, commodo varius lorem. ' +
                            'Curabitur ullamcorper. ',
                        timestamp: '9:37am',
                    },
                    {
                        sender: 'Lorem',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ornare orci. ' +
                            'Sed in velit id dolor pulvinar efficitur nec pellentesque purus. Ut non mauris justo. ' +
                            'Phasellus maximus a nibh in lacinia. Aenean mollis consequat purus sit amet dictum. ',
                        timestamp: '9:35am',
                    },
                    {
                        sender: 'Ipsum',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
                            'Pellentesque id nisl nec sapien consequat pulvinar a dignissim nibh. ' +
                            'Curabitur mi velit, consequat non tortor in, commodo varius lorem. ' +
                            'Curabitur ullamcorper. ',
                        timestamp: '9:37am',
                    },
                ],
                total: 0,
                current: 1,
                perPage: 10,
                rangeBefore: 0,
                rangeAfter: 0,
                order: 'is-centered',
                size: '',
                isSimple: true,
                isRounded: true,
            };
        },
        computed: {
            ...mapGetters([
                'emailsPerPage',
            ]),
        },
        mounted() {
            this.total = this.inbox.length;
            this.perPage = this.emailsPerPage;
        },
    };
</script>

<style scoped lang="scss">
    .container {
        margin: 33vh 5vw;
    }
</style>
