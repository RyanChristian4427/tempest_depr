import { FunctionalComponent, h } from 'preact';
import { Suspense } from 'preact/compat';
import { Route, Router } from 'preact-router';

import Login from './Auth/login';
import Notfound from './NotFound';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Suspense fallback={<Fallback />}>
                <Router>
                    <Route path="/login" component={Login} />
                    <Notfound default />
                </Router>
            </Suspense>
        </div>
    );
};

const Fallback: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <div class="main-content" />
            </div>
        </div>
    );
};

// const AuthenticatedRoute = (props: { path: string; component: FunctionalComponent }): VNode => {
//     const isLoggedIn = useStore().authStore.isAuthenticated;
//
//     useEffect(() => {
//         if (!isLoggedIn) route('/login', true);
//     }, [isLoggedIn]);
//
//     if (!isLoggedIn) return null;
//
//     return <Route {...props} />;
// };

export default App;
