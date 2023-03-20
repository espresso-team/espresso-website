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

export async function getModelsByModelType(model_type) {
    if (model_type == "O") {  // return all models
        return await AImodelModel.find({});
    }
    return await AImodelModel.find({model_type: model_type});
}
