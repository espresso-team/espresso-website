import GenderType from "../types/GenderType";
import { IMessage } from "../types/IMessage";
import { randomIntBetweenZeroAndXButNotY } from "../util/randomIntBetweenZeroAndX";
import { pkSystemApi } from "./pk-system-hook";
var console = require("console-browserify")
export const pkSystemAction = {
    setGender:
    (gender: GenderType) =>
    ({ setState  }: pkSystemApi) => {
        setState({ userGender: gender });
    },
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
        const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
        newMessageList.push(message);
        setState({ messageList: newMessageList });
    },
    initailMessageList:
    (message: IMessage) =>
    ({ getState, setState  }: pkSystemApi) => {
        const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
        newMessageList.push(message);
        setState({ messageList: newMessageList });
    },
};

export type PkSystemAction = typeof pkSystemAction;
