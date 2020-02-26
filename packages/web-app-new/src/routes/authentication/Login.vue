<template>
    <form>
        <div class="field">
            <div class="control">
                <input class="input is-large" type="email" placeholder="Your Email" v-model="state.email" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input is-large" type="password" placeholder="Your Password" v-model="state.password" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <h2 class="error is-size-5">{{ state.errors }}</h2>
            </div>
        </div>
        <button
            class="button is-block is-deep-space-sparkle is-large is-fullwidth"
            v-bind:class="{ 'is-loading': state.inProgress }"
            type="button"
            @click="submit"
        >
            <div class="level">
                <div class="level-item">
                    <span>Submit</span>
                    <span class="icon is-small">
                        <LogInIcon />
                    </span>
                </div>
            </div>
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { LogInIcon } from 'vue-feather-icons';

interface IState {
    email: string;
    password: string;
    errors: string;
    inProgress: boolean;
}

export default defineComponent({
    components: { LogInIcon },
    setup() {
        const state: IState = reactive<IState>({
            email: '',
            password: '',
            errors: '',
            inProgress: false,
        });

        function submit() {
            console.log('This would be logging you in');
        }

        return {
            state,
            submit,
        };
    },
});
</script>
