import { createSignal } from "solid-js";

type Phase = "pending" | "waiting" | "finishing" | "hiding";

interface IPageLoadProgressBarStore {
    readonly getPercentage: () => number;
    readonly getPhase: () => Phase;
    readonly start: () => void;
    readonly finish: () => void;
}

const [getPercentage, setPercentage] = createSignal<number>(0);
const [getPhase, setPhase] = createSignal<Phase>("pending");

const usePageLoadProgressBarStore = (): IPageLoadProgressBarStore => ({
    getPercentage,
    getPhase,
    start: () => {
        if (getPercentage() === 100) {
            setPercentage(0);
            setPhase("pending");
        }

        setTimeout(() => {
            setPercentage(75);
            setPhase("waiting");
        });
    },
    finish: () => {
        setPercentage(100);
        setPhase("finishing");

        setTimeout(() => {
            setPhase("hiding");
            setTimeout(() => {
                setPhase("pending");
                setPercentage(0);
            }, 205);
        }, 100);
    }
});

export { usePageLoadProgressBarStore };