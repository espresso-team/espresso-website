import { AImodelModel } from "../models/model-profile.js";

export async function insertModel(model) {
    return await AImodelModel.create(model);
}
export async function getModelByModelId(model_id) {
    return await AImodelModel.findOne({model_id: model_id});
}

export async function deleteModel(model) {
    return await AImodelModel.findOneAndDelete(model);
};
