import { IMessage } from "../types/IMessage";
import { randomIntBetweenZeroAndXButNotY } from "../util/randomIntBetweenZeroAndX";
import { pkSystemApi } from "./pk-system-hook";
var console = require("console-browserify")
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
    updateMessageList:
    (message: IMessage) =>
    ({ getState, setState  }: pkSystemApi) => {
        let newMessageList: IMessage[] = getState().messageList;
        newMessageList.push(message);
        console.log("updateMessageList actions newMessageList:",newMessageList);
        setState({ messageList: newMessageList });
    },
};

export type PkSystemAction = typeof pkSystemAction;
