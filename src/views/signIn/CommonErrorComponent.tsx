import { Show } from "solid-js";

// Props.
interface CommonErrorProps {
    errorMessage: string | null;
}

const CommonError = (props: CommonErrorProps) => {
    return (
        <Show when={props.errorMessage != null}>
            <span class="alert alert-danger d-flex justify-content-center mt-3 w-100">
                <i class="bi bi-exclamation-triangle-fill me-1"> </i>
                {props.errorMessage}
            </span>
        </Show>
    );
};

export default CommonError;