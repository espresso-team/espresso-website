import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";
import { IMessage } from "../types/IMessage";
import GenderType from "../types/GenderType"
import { Model } from "../types/Model";

export const pkSystemState = {
    isFlippedCardOne: false,
    images: girls,
    curImageId: 0,
    curUserName: "User",
    messageList: [] as IMessage[],
    userGender: GenderType.UNKNOWN,
    userId: "unknown",
    userToken: "unknown",
    modelArrays: [] as Model[],
    curModelName: "AI角色",
    curModelSrc: "",
    curModelIdString: "",
    modalOpen: false,
};

export type PkSystemState = {
    isFlippedCardOne: boolean | undefined;
    images: Array<ImageItem>;
    curImageId: number;
    curUserName: string;
    messageList: IMessage[];
    userGender: GenderType;
    userId: string;
    userToken: string;
    modelArrays: Model[];
    curModelName: string;
    curModelSrc: string;
    modalOpen: boolean;
    curModelIdString: string;
};
