import { ObjectId } from "mongoose";
import { ViewGroup } from "../enums/view.enum";

export interface View {
    _id: ObjectId;
    memberId: ObjectId;
    viewRefId: ObjectId;
    viewGroup: ViewGroup;
    createdAT: Date;
    updatedAT: Date;
}

export interface ViewInput {
    memberId: ObjectId;
    viewRefId: ObjectId;
    viewGroup: ViewGroup;
}