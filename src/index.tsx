import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App";

// View components.
const SignInView = lazy(() => import("./views/signIn/SignInView"));
const HelloView = lazy(() => import("./views/Hello"));

const root = document.getElementById("root");
if (root) {
    render(() => (
        <Router root={App}>
            <Route path="/signIn" component={SignInView} />
            <Route path="/" component={HelloView} />
        </Router>
    ), root);
}
