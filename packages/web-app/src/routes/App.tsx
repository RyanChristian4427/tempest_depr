import { FunctionalComponent, h } from 'preact';
import { Suspense } from 'preact/compat';
import { Route, Router } from 'preact-router';
import { RecoilRoot } from 'recoil';

import Auth from './Auth';
import Notfound from './NotFound';

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <RecoilRoot>
                <Suspense fallback={<Fallback />}>
                    <Router>
                        <Route path="/auth/:subPage" component={Auth} />
                        <Route default component={Notfound} />
                    </Router>
                </Suspense>
            </RecoilRoot>
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
