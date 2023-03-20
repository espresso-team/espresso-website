import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";
import { IMessage } from "../types/IMessage";
import GenderType from "../types/GenderType"

export const pkSystemState = {
    //isFlippedCardTwo: false,
    //searchQuery: 'ikun 4k',
    //rightImageId: 1,
    isFlippedCardOne: false,
    images: girls,
    curImageId: 0,
    imageListLength: girls.length,
    curUserId: 0,
    curUserName: "User",
    messageList: [] as IMessage[],
    userGender: GenderType.UNKNOWN,
    userId: "unknown",
    userToken: "unknown"
};

export type PkSystemState = {
    //isFlippedCardTwo: boolean | undefined;
    //searchQuery: string;
    //rightImageId: number;
    isFlippedCardOne: boolean | undefined;
    images: Array<ImageItem>;
    curImageId: number;
    imageListLength: number;
    curUserId: number;
    curUserName: string;
    messageList: IMessage[];
    userGender: GenderType;
    userId: string;
    userToken: string;
};
