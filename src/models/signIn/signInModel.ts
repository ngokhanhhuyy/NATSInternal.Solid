import { AbstractClonableModel } from "@/models/base/abstractClonableModel";

export class SignInModel extends AbstractClonableModel<SignInModel> {
    public userName: string = "";
    public password: string = "";

    public toRequestDto(): RequestDtos.SignIn {
        return { userName: this.userName, password: this.password };
    }
}