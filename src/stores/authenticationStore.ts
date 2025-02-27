import { createSignal } from "solid-js";

interface IAuthenticationStore {
    readonly isAuthenticatedAsync: () => Promise<boolean>;
    readonly clearAuthenticationStatus: () => void;
}

const [getState, setState] = createSignal({
    hasInitiallyCheckedAuthentication: false,
    isAuthenticated: false
});

const authenticationStore: IAuthenticationStore = {
    isAuthenticatedAsync: async (): Promise<boolean> => {
        if (!getState().hasInitiallyCheckedAuthentication) {
            try {
                // const authenticationService = useAuthenticationService();
                // const isAuthenticated = await authenticationService
                //     .checkAuthenticationStatusAsync();

                const isAuthenticated = await new Promise<boolean>(resolve => {
                    setTimeout(() => {
                        resolve(true);
                    }, 500);
                });

                setState(state => ({
                    ...state,
                    isAuthenticated,
                    hasInitiallyCheckedAuthentication: true,
                }));
            } catch {
                setState(state => ({
                    ...state,
                    isAuthenticated: false,
                    hasInitiallyCheckedAuthentication: true,
                }));
            }
        }

        return getState().isAuthenticated;
    },
    clearAuthenticationStatus: (): void => {
        setState(state => ({
            state,
            hasInitiallyCheckedAuthentication: false,
            isAuthenticated: false,
        }));
    },
};

function useAuthenticationStore(): IAuthenticationStore {
    return authenticationStore;
}

export { useAuthenticationStore };