import { createSignal } from "solid-js";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBarStore";

export interface InitialLoadingState {
    isInitialLoading: () => boolean;
    onInitialLoadingFinished: () => void;
}

/**
 * Enables page initial loading state for a view.
 * 
 * @returns An object loading state API.
 */
export function useInitialLoadingState(): InitialLoadingState {
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();

    // States.
    const [isInitialLoading, setInitialLoading] = createSignal<boolean>(true);

    return {
        isInitialLoading,
        onInitialLoadingFinished: () => {
            setInitialLoading(false);
            pageLoadProgressBarStore.finish();
        }
    };
}