import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { LogIn } from 'preact-feather';
// import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { LoginUser } from 'models/User';
import { login } from 'services/api/auth';
// import { isAuthenticatedState, userState } from 'stores/auth';

const Login: FunctionalComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<string>('');
    const [inProgress, setInProgress] = useState<boolean>(false);

    // const logout = useResetRecoilState(userState);
    // const isAuthenticated = useSetRecoilState(isAuthenticatedState);
    //
    // useEffect(() => logout(), [logout]);
    //
    // const submitDetails = (): void => {
    //     setInProgress(true);
    //     const credentials: LoginUser = { user: { email, password } };
    //     login(credentials).then((result) => {
    //         setInProgress(false);
    //         if (typeof result === 'string') setErrors(result);
    //         else {
    //             isAuthenticated(true);
    //             route('/');
    //         }
    //     });
    // };

    return (
        <form>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onInput={(e): void => {
                            setErrors('');
                            setEmail((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        class="input is-large"
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        onInput={(e): void => {
                            setErrors('');
                            setPassword((e.target as HTMLInputElement).value);
                        }}
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <h2 class="error is-size-5">{errors}</h2>
                </div>
            </div>
            <button
                class={`button is-block is-monmouthshire-green is-large is-fullwidth ${inProgress ? 'is-loading' : ''}`}
                type="button"
                // onClick={(): void => submitDetails()}
            >
                <div class="level">
                    <div class="level-item">
                        <span>Submit</span>
                        <span class="icon is-small">
                            <LogIn />
                        </span>
                    </div>
                </div>
            </button>
        </form>
    );
};

export default Login;
