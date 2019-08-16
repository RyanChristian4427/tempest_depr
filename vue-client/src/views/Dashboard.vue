<template>
    <section>
        <div class="container">
            <ul>
                <email-card v-for="email in inbox"
                            :key="email"
                            v-bind:email="email">
                </email-card>
            </ul>
        </div>
    </section>
</template>

<script lang="ts">
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
            };
        },
    };
</script>

<style scoped lang="scss">
    .container {
        margin: 33vh 5vw;
    }
</style>
