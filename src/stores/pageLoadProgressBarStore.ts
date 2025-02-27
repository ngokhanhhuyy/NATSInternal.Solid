import { createSignal } from "solid-js";

interface IPageLoadProgressBarStore {
    isInitialLoading: () => boolean;
    onInitialLoadingFinished: () => void;
}

const [isInitialLoading, setInitialLoading] = createSignal<boolean>(true);

const usePageLoadProgressBarStore = (): IPageLoadProgressBarStore => ({
    isInitialLoading,
    onInitialLoadingFinished: () => {
        setInitialLoading(false);
    }
});

export { usePageLoadProgressBarStore };