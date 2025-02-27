import { onMount, JSX } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import { useAuthenticationStore } from "./stores/authenticationStore";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/main.css";

// Props.
interface AppProps {
    children?: JSX.Element;
}

const App = (props: AppProps) => {
    // Dependencies.
    const authenticationStore = useAuthenticationStore();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Hooks.
    onMount(async () => {
        const currentRoute = location.pathname;
        const isAuthenticated = await authenticationStore.isAuthenticatedAsync();
        if (currentRoute !== "/signIn" && !isAuthenticated) {
            navigate("/signIn");
        } else if (currentRoute === "/signIn" && isAuthenticated) {
            navigate("/");
        }
    });

    return (
        <>
            {JSON.stringify(location.pathname)}<br/>
            {props.children}
        </>
    );
};

export default App;