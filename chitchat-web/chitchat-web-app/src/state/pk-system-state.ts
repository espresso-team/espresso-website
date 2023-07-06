import { IMessage } from "../types/IMessage";
import GenderType from "../types/GenderType"
import { Model } from "../types/Model";
import UserRole from "../types/UserRole";

export const pkSystemState: PkSystemState = {
    isFlippedCardOne: false,
    curImageId: 0,
    messageList: [] as IMessage[],
    user: {
        id: "unknown",
        gender: GenderType.UNKNOWN,
        userName: "User",
        role: UserRole.GUEST,  // default guest
        profile: {
            nickname: '',
            birthday: new Date(),
            gender: GenderType.UNKNOWN,
            phoneNumber: '',
            avatar: '',
            mbtiType: '',
            selectedTags: [],
        },
    },
    modelArrays: [] as Model[],
    curModelName: "AI角色",
    curModelSrc: "",
    curModelIdString: "",
    modalOpen: false,
    isLoggedIn: false,
};

export type PkSystemState = {
    isFlippedCardOne: boolean | undefined;
    curImageId: number;
    messageList: IMessage[];
    user: LoginUser;
    modelArrays: Model[];
    curModelName: string;
    curModelSrc: string;
    modalOpen: boolean;
    curModelIdString: string;
    isLoggedIn: boolean;
};

// TODO profile & user tables refactoring
export type Profile = {
    nickname: string,
    birthday: Date,
    gender: GenderType,
    phoneNumber: string,
    avatar: string,
    mbtiType: string,
    selectedTags: string[],
}

export type LoginUser = {
    id: string,
    gender: GenderType,
    userName: string,
    role: UserRole,
    profile: Profile
}