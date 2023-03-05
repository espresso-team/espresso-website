import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";
import { IMessage } from "../types/IMessage";

export const pkSystemState = {
    //isFlippedCardTwo: false,
    //searchQuery: 'ikun 4k',
    //rightImageId: 1,
    isFlippedCardOne: false,
    images: girls,
    curImageId: 0,
    imageListLength: girls.length,
    curUserId: 0,
    curUserName: "LL",
    messageList: [] as IMessage[],
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
};
