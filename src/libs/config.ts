export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === "string"  // agar argumentimiz string bo'lsa
    ? new mongoose.Types.ObjectId(target) // mongoose ning ObjectId type ga aylantirib beradi
    : target; // aks holda o'zi qabul qilgan malumotni o'z type da qaytaradi
};