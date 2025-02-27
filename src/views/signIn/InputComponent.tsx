import { type IModelState } from "@/hooks/modelStateHook";

// Props.
interface InputProps {
    modelState: IModelState;
    value: string,
    onValueChanged: (value: string) => void;
    propertyName: "userName" | "password";
}

// Component.
const Input = (props: InputProps) => {
    // Computed.
    const computeClass = (): string => {
        const classes = ["form-control", props.modelState.getInputClass(props.propertyName)];
        return classes.filter(cls => cls).join(" ");
    };

    return (
        <input
            type={props.propertyName === "userName" ? "text" : "password"}
            autoCapitalize="off"
            class={computeClass()}
            placeholder=""
            value={props.value}
            onInput={(event) => props.onValueChanged(event.currentTarget.value)}
        />
    );
};

export default Input;