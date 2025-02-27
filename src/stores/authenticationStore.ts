import { createSignal } from "solid-js";
import { useAuthenticationService } from "@/services/authenticationService";

interface IAuthenticationStore {
    readonly isAuthenticatedAsync: () => Promise<boolean>;
    readonly setAuthenticated: () => void;
    readonly clearAuthenticationStatus: () => void;
}

const [getState, setState] = createSignal({
    hasInitiallyCheckedAuthentication: false,
    isAuthenticated: false
});

function useAuthenticationStore(): IAuthenticationStore {
    return {
        isAuthenticatedAsync: async (): Promise<boolean> => {
            if (!getState().hasInitiallyCheckedAuthentication) {
                try {
                    const authenticationService = useAuthenticationService();
                    const isAuthenticated = await authenticationService
                        .checkAuthenticationStatusAsync();
    
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
        setAuthenticated: (): void => {
            setState(state => ({ ...state, isAuthenticated: true }));
        },
        clearAuthenticationStatus: (): void => {
            setState(state => ({
                state,
                hasInitiallyCheckedAuthentication: false,
                isAuthenticated: false,
            }));
        },
    };
}

export { useAuthenticationStore };