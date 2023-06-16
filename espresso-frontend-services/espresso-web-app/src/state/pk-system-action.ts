import GenderType from "../types/GenderType";
import { IMessage } from "../types/IMessage";
import { randomIntBetweenZeroAndXButNotY } from "../util/randomIntBetweenZeroAndX";
import { pkSystemApi } from "./pk-system-hook";
import axios from 'axios';
import { genderToRequiredGender } from "../util/genderToRequiredGender";
import { HttpStatus } from "../types/HttpStatus";
import { message } from "antd";
import { Model } from "../types/Model";
import { createRandomUserId } from "../util/createRandomUserId";
import { ENDPOINT } from "../types/Env";
import { ChatHistoryItem } from "../types/ChatHistoryItem";
import { RedirectToNewPageFn, useRedirectToNewPage } from "../util/redirectToNewPage";
import { initialize, setUserId } from "../app/GaEvent";

var console = require("console-browserify")
export const pkSystemAction = {
    fetchUserProfile: (gender: GenderType, userName: string) =>
        async ({ setState, getState }: pkSystemApi) => {
            // if user id still unknow, will assgin a random id to this user
            let curUserId = getState().userId;
            if (curUserId === "unknown") {
                console.log("fetchUserProfile - cur user id is unknown")
                curUserId = createRandomUserId();
                setState({ userId: curUserId });
            }
            console.log("Set GA user id", curUserId);
            initialize();
            setUserId(curUserId);
            console.log("fetchUserProfile gender", gender, "userName:", userName, "userID:", curUserId);
            await axios
                .post(`${ENDPOINT}/api/user-profile`,
                    {
                        "user_id": curUserId,
                        "user_name": userName,
                        "gender": gender
                    })
                .then((response) => {
                    console.log("fetchModelProfile", response)
                    if (response.status === HttpStatus.OK) {
                        console.log("fetchModelProfile message", response.data.message)
                    }
                    else {
                        message.error("获取用户信息错误，请刷新重试")
                        console.log("fetchUserProfile response failed", response)
                    }

                })
                .catch((err) => {
                    if (err.response && err.response.status === 409) {
                        // handle conflict error here
                        console.log('User profile already exists for this user_id');
                    } else {
                        message.error("页面错误，请刷新重试");
                        console.error(err);
                    }
                });

        },
    fetchModelProfile:
        (gender: GenderType) =>
            async ({ setState, getState }: pkSystemApi) => {
                // send reqire models
                console.log("gender", gender, "genderToRequiredGender", genderToRequiredGender[gender])
                await axios
                    .get(`${ENDPOINT}/api/model-profile`,
                        {
                            params: {
                                gender: genderToRequiredGender[gender],
                                is_selected: true
                            }
                        })
                    .then((response) => {
                        console.log("fetchModelProfile", response)
                        if (response.status === HttpStatus.OK) {
                            const curModelArray = response.data.data as Model[];
                            setState({ modelArrays: curModelArray });
                            console.log("modelArray[0]", getState().modelArrays[0]);
                        }
                        else {
                            message.error("页面错误，请刷新重试")
                            console.log("fetchModelProfile response failed", response)
                        }

                    })
                    .catch((err) => {
                        message.error("页面错误，请刷新重试");
                        console.log(err)
                    });

            },
    setUserName:
        (uName: string) =>
            ({ setState }: pkSystemApi) => {
                console.log("set user name: ", uName)
                setState({ curUserName: uName });
            },
    setUserToken:
        (uToken: string) =>
            ({ setState }: pkSystemApi) => {
                console.log("set user Token: ", uToken)
                setState({ userToken: uToken });
            },
    setUserId:
        (uId: string) =>
            ({ setState }: pkSystemApi) => {
                console.log("set userId: ", uId)
                setState({ userId: uId });
            },
    setGender:
        (gender: GenderType) =>
            ({ setState }: pkSystemApi) => {
                console.log("set gender: ", gender)
                setState({ userGender: gender });
            },
    setModelOpen:
        (isOpen: boolean) =>
            ({ setState }: pkSystemApi) => {
                console.log("set model open: ", isOpen)
                setState({ modalOpen: isOpen });
            },
    handleFlipCardOne:
        () =>
            ({ getState, setState }: pkSystemApi) => {
                const currentState = getState();
                setState({ isFlippedCardOne: !currentState.isFlippedCardOne });
            },
    randomPickImageId:
        () =>
            ({ getState, setState }: pkSystemApi) => {
                const newImageId = randomIntBetweenZeroAndXButNotY(getState().modelArrays.length, getState().curImageId);
                setState({ curImageId: newImageId });
            },
    isModelSelected:
        () =>
            ({ getState }: pkSystemApi) => {
                if (getState().curModelName === 'AI角色')
                    return false;
                return true;
            },
    cleanMessageList:
        () =>
            ({ setState }: pkSystemApi) => {
                setState({ messageList: [] });
            },
    updateMessageList:
        (message: IMessage) =>
            ({ getState, setState }: pkSystemApi) => {
                const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
                newMessageList.push(message);
                console.log("updateMessageList, current messageList", newMessageList)
                setState({ messageList: newMessageList });
            },
    initailMessageList:
        (message: IMessage) =>
            ({ getState, setState }: pkSystemApi) => {
                const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
                newMessageList.push(message);
                setState({ messageList: newMessageList });
            },
    handleJoinChat:
        (modelId: string) =>
            async ({ getState, setState }: pkSystemApi) => {
                let modelName: string = "AI角色";
                let modelSrc: string = "";
                console.log("pkSystemAction- handleJoinChat", modelId);
                // Fetch modelName and modelSrc from backend
                await axios
                    .get(`${ENDPOINT}/api/model-profile`,
                        {
                            params: {
                                model_id: modelId
                            }
                        })
                    .then((response) => {
                        console.log("handleJoinChat - fetchModelProfile", response)
                        if (response.status === HttpStatus.OK) {
                            const curModelArray = response.data.data as Model[];
                            console.log("handleJoinChat - curModelArray", curModelArray)
                            modelName = curModelArray[0].model_name;
                            modelSrc = curModelArray[0].model_metadata.image_url;
                        }
                        else {
                            message.error("获取角色信息失败，请刷新重试")
                            console.log("handleJoinChat - fetchModelProfile response failed", response)
                        }
                    })
                    .catch((err) => {
                        message.error("获取角色信息失败，请刷新重试");
                        console.log("handleJoinChat - fetchModelProfile Error", err)
                    });
                // update curImage id in state since we will use it on send message post, and convert it to string
                //setState({curImageId: +modelId});
                setState({ curModelIdString: modelId });
                // update curModel name and src
                setState({ curModelName: modelName });
                setState({ curModelSrc: modelSrc });
                await axios
                    .post(`${ENDPOINT}/api/join-chat`,
                        {
                            "user_id": getState().userId,
                            "model_id": modelId
                        }
                    )
                    .then((response) => {
                        setState({ messageList: [] });
                        let chatHistory: ChatHistoryItem[] = [];
                        if (response.data.chat_history) {
                            chatHistory = response.data.chat_history;
                        }
                        console.log("handleJoinChat - chatHistory", chatHistory)
                        const message = response.data.message;
                        const uID = response.data.user_id;
                        const mID = response.data.model_id;

                        // Add chat history to messageList
                        chatHistory.map(chat => {
                            const isUser: boolean = chat.is_user;
                            const messageItem = {
                                "text": chat.message,
                                "id": mID,
                                "sender": {
                                    "name": isUser ? getState().curUserName : modelName,
                                    "uid": uID,
                                    "avatar": isUser ? (getState().userGender === GenderType.FAMALE ? "https://chichat-images-1317940514.cos.ap-nanjing.myqcloud.com/static/WechatIMG4576.jpg" : "https://chichat-images-1317940514.cos.ap-nanjing.myqcloud.com/static/WechatIMG4577.jpg") : modelSrc,
                                }
                            } as IMessage;
                            //pkSystemAction.updateMessageList(messageItem);
                            const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
                            newMessageList.push(messageItem);
                            setState({ messageList: newMessageList });
                        })

                        const initialMessage =
                            {
                                "text": message,
                                "id": mID,
                                "sender": {
                                    "name": modelName,
                                    "uid": uID,
                                    "avatar": modelSrc,
                                }
                            } as IMessage;
                        //pkSystemAction.updateMessageList(initialMessage);
                        const newMessageList: IMessage[] = JSON.parse(JSON.stringify(getState().messageList));
                        newMessageList.push(initialMessage);
                        setState({ messageList: newMessageList });
                    })
                    .catch((err) => console.log(err));
            }
};

export type PkSystemAction = typeof pkSystemAction;
