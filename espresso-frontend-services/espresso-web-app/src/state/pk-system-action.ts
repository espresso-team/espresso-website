import { pkSystemApi } from "./pk-system-hook";

export const pkSystemAction = {
    handleFlipCardOne:
    () =>
    ({ getState, setState  }: pkSystemApi) => {
        const currentState = getState();
        setState({ isFlippedCardOne: !currentState.isFlippedCardOne });
    },
    handleFlipCardTwo:
    () =>
    ({ getState, setState  }: pkSystemApi) => {
        const currentState = getState();
        setState({ isFlippedCardTwo: !currentState.isFlippedCardTwo });
    }
};

export type PkSystemAction = typeof pkSystemAction;
