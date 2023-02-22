import { girls } from "../api/mocks/girls";
import { ImageItem } from "../types/ImageItem";

export const pkSystemState = {
    isFlippedCardOne: false,
    isFlippedCardTwo: false,
    searchQuery: 'ikun 4k',
    images: girls,
    leftImageId: 0,
    rightImageId: 1,
    imageListLength: girls.length
};

export type PkSystemState = {
    isFlippedCardOne: boolean | undefined;
    isFlippedCardTwo: boolean | undefined;
    searchQuery: string;
    images: Array<ImageItem>;
    leftImageId: number;
    rightImageId: number;
    imageListLength: number;
};

