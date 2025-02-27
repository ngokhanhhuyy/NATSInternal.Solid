import { createSignal, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { SignInModel } from "@/models/signIn/signInModel";
import { createModelState } from "@/hooks/modelStateHook";
import { useAuthenticationService } from "@/services/authenticationService";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import {
    BadRequestError,
    ConnectionError,
    InternalServerError,
    OperationError } from "@/errors";

// Child components.
import Input from "./InputComponent";
import ValidationMessage from "./ValidationMessageComponent";
import SignInButton from "./SignInButtonComponent";
import CommonError from "./CommonErrorComponent";

// Component.
const SignInView = () => {
    // Dependencies.
    const authenticationStore = useAuthenticationStore();
    const authenticationService = useAuthenticationService();
    const params = useParams();
    const navigate = useNavigate();

    // Model and states.
    const [getModel, setModel] = createSignal(new SignInModel());
    const [getCommonError, setCommonError] = createSignal<string | null>(null);
    const [isSignedIn, setSignedIn] = createSignal<boolean>(false);
    const [isSubmitting, setSubmitting] = createSignal<boolean>(false);
    const modelState = createModelState();

    // Computed.
    const isRequiredFieldsFilled = (): boolean => {
        const userNameFilled = getModel().userName.length > 0;
        const passwordFilled = getModel().password.length > 0;
        return userNameFilled && passwordFilled;
    };

    const login = async (): Promise<void> => {
        setSubmitting(true);
        setCommonError(null);
        modelState.resetErrors();
        try {
            await authenticationService.signInAsync(getModel().toRequestDto());
            authenticationStore.setAuthenticated();
            setSignedIn(true);
            setTimeout(() => {
                if (params.returningPath) {
                    navigate(params.returningPath);
                } else {
                    navigate("/");
                }
            }, 1000);
        } catch (exception) {
            setModel(getModel().from({ password: "" }));
            if (exception instanceof BadRequestError ||
                    exception instanceof OperationError) {
                modelState.setErrors(exception.errors);
            } else if (exception instanceof InternalServerError) {
                setCommonError("Đã xảy ra lỗi từ máy chủ");
            } else if (exception instanceof ConnectionError) {
                setCommonError("Không thể kết nối đến máy chủ");
            } else {
                setCommonError("Đã xảy ra lỗi không xác định");
                throw exception;
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleEnterKeyPressed = async (): Promise<void> => {
        if (isRequiredFieldsFilled()) {
            await login();
        }
    };

    return (
        <div class="container-fluid d-flex flex-column flex-fill justify-content-center"
                style={{ "width": "100vw", "max-width": "100%", "min-height": "100%" }}
                onKeyUp={(event) => event.key === "Enter" && handleEnterKeyPressed()}>
            <div class="row py-3 g-3 justify-content-center">
                <div class="col col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-8
                            col-12 d-flex align-items-center">
                    <div class="block bg-white border border-secondary-subtle rounded-3
                                shadow-sm w-100 p-3">
                        {/* Username */}
                        <div class="form-group mb-3">
                            <div class="form-floating">
                                <Input
                                    modelState={modelState}
                                    value={getModel().userName}
                                    onValueChanged={userName => {
                                        setModel(m => m.from({ userName }));
                                    }}
                                    propertyName="userName"
                                />
                                <label>Tên tài khoản</label>
                            </div>
                            <ValidationMessage name="userName" modelState={modelState} />
                        </div>

                        {/* Password */}
                        <div class="form-group mb-3">
                            <div class="form-floating">
                                <Input
                                    modelState={modelState}
                                    value={getModel().password}
                                    onValueChanged={password => {
                                        setModel(m => m.from({ password }));
                                    }}
                                    propertyName="password"
                                />
                                <label>Mật khẩu</label>
                            </div>
                            <ValidationMessage name="password" modelState={modelState} />
                        </div>
                        <div class="form-group">
                            <SignInButton
                                isSignedIn={isSignedIn()}
                                isSubmitting={isSubmitting()}
                                isDisabled={!isRequiredFieldsFilled()}
                                onClick={login}
                            />
                            <CommonError errorMessage={getCommonError()} />

                            <Show when={isSignedIn()}>
                                <span class="alert alert-success d-flex
                                                justify-content-center w-100">
                                    <i class="bi bi-check-circle-fill me-1"></i>
                                    Đăng nhập thành công!
                                </span>
                            </Show>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInView;