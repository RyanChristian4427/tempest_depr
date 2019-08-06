<template>
    <div>
        <section class="hero is-medium is-bold">
            <div class="hero-body">
                <h1 class="title">
                    Login
                </h1>
            </div>
        </section>
        <section>
            <form class="card" id="logon-form">
                <section id="layered-background">
                    <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="email" id="email" placeholder="Email input">
                        </div>
                    </div>
                    <div class="field">
                        <label for="password" class="label">Password</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="password" id="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <a class="button is-xanadu is-rounded"><b>Submit</b></a>
                        </div>
                    </div>
                </section>
            </form>
        </section>
    </div>
</template>

<script>

    export default {
        name: 'Login',
    };
</script>

<style lang="scss">
    html {
        overflow-y: hidden;
    }

    .hero {
        background: $theme-xanadu;
        height: 33vh;
    }

    .hero .title {
        margin-left:25vw;
        color: $theme-isabelline;
    }

    .card {
        border-radius: 20px;
        background: $theme-xanadu;
        width: auto;
        margin: 5vh 25vw;
        padding: 1vh 1vh 1vh;
    }

    #layered-background {
        border-radius: 20px;
        background: $theme-ash-grey;
        padding: 5vh 5vw 5vh;
    }
</style>
