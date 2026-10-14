import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";

export interface MemberInput {
  // MemberInput bu bizga req.body dan olingan "burak" va "damir" signup malumotlarimizni 
  // qabul qilib olish uchun type yani biz malumotlarni MemberInput korsatgan yo'sinda(membernic va hokazo) qabul qilib olish uchun kerak
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface Member {
  // Database dan qaytayotgan maulomot uchun biriktirilgan type

  // Member bu create() metodi yordamida database yozilgandan keyin u yozilgan malumotlarni 
  // bizga qayta oberish uchun kerak bolgan interface yoki type
  _id: ObjectId;
  memberType: MemberType; // default qiymati USER bolgani uchun databasega yozilgan malumotni qabul qilib olamiz
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string; // (?) so'roq belgini qo'yishimini sababi esa konsole ga yoki umuman qabul qilingan malumotlarni biz chiqarmasligimiz kerak shuning uchun biz so'roq belgisi yordamida kelayotgan malumotlarni yashiramiz 
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
  createdAT: Date;
  updatedAT: Date;
  // (?) belgisi bu bolishi ham mumkin bolmasligi ham mumkin degan manoda
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberStatus?: MemberStatus;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface AdminRequest extends Request {
  // req.session.member = result;
  member: Member;
  session: Session & { member: Member }; // biz bu yerda session ichida member borligini ham ta'kidlayabmiz
  file: Express.Multer.File;
  files: Express.Multer.File[];
}