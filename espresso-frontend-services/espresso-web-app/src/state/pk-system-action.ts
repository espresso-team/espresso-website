import { randomIntBetweenZeroAndXButNotY } from "../util/randomIntBetweenZeroAndX";
import { pkSystemApi } from "./pk-system-hook";

export const pkSystemAction = {
    handleFlipCardOne:
    () =>
    ({ getState, setState  }: pkSystemApi) => {
        const currentState = getState();
        setState({ isFlippedCardOne: !currentState.isFlippedCardOne });
    },
    randomPickImageId:
    () =>
    ({ getState, setState  }: pkSystemApi) => {
        const newImageId = randomIntBetweenZeroAndXButNotY(getState().imageListLength, getState().curImageId);
        setState({ curImageId: newImageId });
    },
};

export type PkSystemAction = typeof pkSystemAction;
