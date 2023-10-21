import mongoose from "mongoose";

export const validateMangoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("The id is not valid and not found at all");
}