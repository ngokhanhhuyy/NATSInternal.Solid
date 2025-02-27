import { JSX, Show } from "solid-js";
import { type IModelState } from "@/hooks/modelStateHook";

// Props.
interface ValidationMessageProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    name: string;
    modelState: IModelState;
}

// Component.
const ValidationMessage = (props: ValidationMessageProps) => {
    // Computed.
    const computeClass = () => {
        if (!props.modelState) {
            return "";
        }
        return props.modelState.getMessageClass(props.name) ?? "";
    };

    return (
        <Show when={props.modelState.hasError(props.name)}>
            <span class={computeClass()}>
                {props.modelState.getMessage(props.name)}
            </span>
        </Show>
    );
};

export default ValidationMessage;