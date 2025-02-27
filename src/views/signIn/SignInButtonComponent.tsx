import { Show } from "solid-js";

// Props.
interface SignInButtonProps {
    isSignedIn: boolean;
    isSubmitting: boolean;
    isDisabled: boolean;
    onClick: () => any;
}

// Component.
const SignInButton = (props: SignInButtonProps) => {
    return (
        <Show when={!props.isSignedIn}>
            <button class="btn btn-dark w-100"
                    disabled={props.isDisabled}
                    onClick={props.onClick}>
                <Show when={props.isSubmitting} fallback={<span>Login</span>}>
                    <span class="spinner-border spinner-border-sm" aria-hidden="true" />
                </Show>
            </button>
        </Show>
    );
};

export default SignInButton;