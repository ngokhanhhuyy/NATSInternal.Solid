import { createSignal, createEffect, JSX, onMount, Switch, Match, lazy, Suspense, useTransition, type Component } from "solid-js";
import { useNavigate, createAsync } from "@solidjs/router";
import { useAuthenticationService } from "@/services/authenticationService";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

const FirstView = lazy(() => {
    return Promise.all([
        new Promise(resolve => setTimeout(resolve, 2000)),
        import("./FirstView")
    ]).then(([_, view]) => view);
});

const SecondView = lazy(() => {
    return Promise.all([
        new Promise(resolve => setTimeout(resolve, 2000)),
        import("./SecondView")
    ]).then(([_, view]) => view);
});

const Hello = () => {
    // Dependencies.
    const navigate = useNavigate();
    const authenticationService = useAuthenticationService();
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();

    // States.
    const [getCurrentViewNumber, setCurrentViewNumber] = createSignal<number>(1);
    const [getCurrentView, setCurrentView] = createSignal<JSX.Element>(<FirstView />);
    const [isLoading, startTransition] = useTransition();

    // Callback.
    const handleSignOutButtonClick = async () => {
        await authenticationService.signOutAsync();
        navigate("/signIn");
    };

    const handleSwitchButtonClick = () => () => startTransition(async () => {
        setCurrentViewNumber(number => {
            if (number + 1 > 3) {
                return 1;
            }

            return number + 1;
        });
        await new Promise(resolve => setTimeout(resolve, 3000));
    });

    // Hooks.
    onMount(() => console.log("mounted"));

    return (
        <div class="container h-100">
            <div class="row align-items-stretch mb-5">
                <div class="col col-12 d-flex flex-column justify-content-center align-items-center h-100">
                    <span class="fs-1 fw-bold">HELLO SOLID</span>
                    <button class="btn btn-dark" onClick={handleSignOutButtonClick}>
                        Sign out
                    </button>
                </div>
            </div>

            <div class="row">
                <div class="col col-12">
                    <button class="btn btn-dark" onClick={handleSwitchButtonClick()}>
                        {isLoading() ? "Loading" : "Switch view"}
                    </button><br/>
                    <Suspense>
                        <Switch>
                            <Match when={getCurrentViewNumber() === 1}>
                                <FirstView />
                            </Match>
                            
                            <Match when={getCurrentViewNumber() === 2}>
                                <SecondView />
                            </Match>

                            <Match when={getCurrentViewNumber() === 3}>
                                <ThirdView />
                            </Match>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

const ThirdView =( ) => {
    const content = createAsync(async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return "Third view";
    });

    return (
        <button class="btn btn-primary">
            {content()}
        </button>
    );
};

export default Hello;