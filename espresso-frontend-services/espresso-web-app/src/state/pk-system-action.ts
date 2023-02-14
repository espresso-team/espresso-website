import { pkSystemApi } from "./pk-system-hook";

export const pkSystemAction = {
    handleCardFlip:
    () =>
    ({ getState, setState  }: pkSystemApi) => {
        const currentState = getState();
        setState({ isFlipped: !currentState.isFlipped });
    },
};

export type PkSystemAction = typeof pkSystemAction;
