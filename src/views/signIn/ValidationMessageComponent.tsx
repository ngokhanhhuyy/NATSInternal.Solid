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

        let resultName = props.modelState.getMessageClass(props.name) ?? "";
        if (!props.modelState.hasError(resultName)) {
            resultName += " d-none";
        }

        return resultName;
    };

    if (!props.modelState) {
        return null;
    }

    return (
        <Show when={!props.modelState}>
            <span class={computeClass()}>
                { props.modelState.getMessage(props.name) }
            </span>
        </Show>
    );
};

export default ValidationMessage;