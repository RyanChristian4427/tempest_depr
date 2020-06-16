import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Login from './login';
import ForgottenPassword from './forgottenPassword';
import Register from './register';
import { Link } from 'preact-router';

interface IProps {
    subPage: SubPage;
}

enum SubPage {
    login = 'login',
    forgottenPassword = 'forgotten-password',
    register = 'register',
}

const Auth: FunctionalComponent<IProps> = (props: IProps) => {
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);
    const [links, setLinks] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.login:
                setTitle('Login');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<Login />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/forgotten-password">Forgot Password</Link>&nbsp;·&nbsp;
                        <Link href="/auth/register">Sign Up</Link>
                    </Fragment>,
                );
                break;
            case SubPage.forgottenPassword:
                setTitle('Forgotten Password');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<ForgottenPassword />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/login">Login</Link>&nbsp;·&nbsp;
                        <Link href="/auth/register">Sign Up</Link>
                    </Fragment>,
                );
                break;
            case SubPage.register:
                setTitle('Register');
                setSubtitle('Please provide your details to proceed.');
                setForm(<Register />);
                setLinks(
                    <Fragment>
                        <Link href="/auth/login">Login</Link>&nbsp;·&nbsp;
                        <Link href="/auth/forgotten-password">Forgot Password</Link>
                    </Fragment>,
                );
                break;
        }
    }, [props.subPage]);

    return (
        <div class="auth-page">
            <div class="main-content">
                <div class="login-card card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Tempest Web Mail</p>
                    </header>
                    {form}
                </div>
            </div>
        </div>
    );
};

export default Auth;
