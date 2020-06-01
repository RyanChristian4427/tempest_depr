import { FunctionalComponent, h } from 'preact';

const Login: FunctionalComponent = () => {
    return (
        <div class="auth-page">
            <div class="main-content">
                <div class="columns">
                    <div class="column is-7 first-column">
                        <section class="section has-text-centered">
                            <div class="container">
                                <h1 class="title has-text-white-bis">Welcome Back!</h1>
                                <h1 class="subtitle has-text-white-bis">Login to get back to your email</h1>
                            </div>
                        </section>
                    </div>
                    <div class="column is-5 second-column">
                        <div>Title2</div>
                        <div>Hello World1</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
