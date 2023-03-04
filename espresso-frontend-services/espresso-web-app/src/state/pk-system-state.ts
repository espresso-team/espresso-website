import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";

export const pkSystemState = {
    isFlippedCardOne: false,
    //isFlippedCardTwo: false,
    //searchQuery: 'ikun 4k',
    images: girls,
    curImageId: 0,
    //rightImageId: 1,
    imageListLength: girls.length,
    curUserId: 0,
    curUserName: "LL",
};

export type PkSystemState = {
    isFlippedCardOne: boolean | undefined;
    //isFlippedCardTwo: boolean | undefined;
    //searchQuery: string;
    images: Array<ImageItem>;
    curImageId: number;
   //rightImageId: number;
    imageListLength: number;
    curUserId: number;
    curUserName: string;
};

