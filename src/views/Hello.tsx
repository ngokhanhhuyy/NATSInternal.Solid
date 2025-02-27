import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuthenticationService } from "@/services/authenticationService";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

const Hello = () => {
    // Dependencies.
    const navigate = useNavigate();
    const authenticationService = useAuthenticationService();
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();

    // Hooks.
    onMount(() => {
        pageLoadProgressBarStore.onInitialLoadingFinished();
    });

    // Callback.
    const handleButtonClick = async () => {
        await authenticationService.signOutAsync();
        navigate("/signIn");
    };

    return (
        <div class="container h-100">
            <div class="row align-items-stretch h-100">
                <div class="col col-12 d-flex flex-column justify-content-center align-items-center h-100">
                    <span class="fs-1 fw-bold">HELLO SOLID</span>
                    <button class="btn btn-dark" onClick={handleButtonClick}>
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hello;