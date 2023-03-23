import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";
import { IMessage } from "../types/IMessage";
import GenderType from "../types/GenderType"
import { Model } from "../types/Model";

export const pkSystemState = {
    isFlippedCardOne: false,
    images: girls,
    curImageId: 0,
    imageListLength: girls.length,
    curUserName: "User",
    messageList: [] as IMessage[],
    userGender: GenderType.UNKNOWN,
    userId: "unknown",
    userToken: "unknown",
    modelArrays: [] as Model[],
};

export type PkSystemState = {
    //isFlippedCardTwo: boolean | undefined;
    //searchQuery: string;
    //rightImageId: number;
    isFlippedCardOne: boolean | undefined;
    images: Array<ImageItem>;
    curImageId: number;
    imageListLength: number;
    curUserName: string;
    messageList: IMessage[];
    userGender: GenderType;
    userId: string;
    userToken: string;
    modelArrays: Model[];
};
