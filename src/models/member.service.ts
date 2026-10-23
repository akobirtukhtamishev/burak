import MemberModel from "../schema/Member.model";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {

  // schema modelni member.service modelga chaqirib olayabmiz
  private readonly memberModel;
  // memberModel bu class dir
  constructor() {
    // Bundan buyog'iga memberModel bu member Schema modeldir
    this.memberModel = MemberModel;
  }

  /**  SPA  */

  public async signup(input: MemberInput): Promise<Member> {
    console.log("before:", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after:", input.memberPassword);

    try {
      const result = await this.memberModel.create(input); // input parametr bu restoran.controllerdagi newMember ga teng
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  /** =======================================================================================**/

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick, memberStatus: { $ne: MemberStatus.DELETE } }, // buni ma'nosi member DELETE Bo'lmagan bo'lsa ruxsat ber login qilishga
        { memberNick: 1, memberPassword: 1, memberStatus: 1 },  //  <=== maxfiy ma'lumotni majburiy chaqirish usuli.
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if(member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }


    // biz bu qismda user kiritayotgan input.memberPassword bilan database dagi member.memberPassword ni solishtiramiz
    const isMatch = await bcrypt.compare(  // bcrypt.compare bu hashing ni tekshiradi
      input.memberPassword,
      member.memberPassword,
    );
    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

    return await this.memberModel.findById(member._id).lean().exec();
  }

  /************** SSR   ****************/

  public async processSignup(input: MemberInput): Promise<Member> { //  Promise<Member> dagi Member tipi bu databasadan olinayotgan malumot

    // bu qatorning vazifasi bizda boshq RESTAURANT admini bor yo'qligini tekshiradi 
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT }) // findOne() statik metodi orqali  RESTAURANT MemberType bor yoqligi tekshiriladi
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();

    // Admin RESTAURANT kiritayotgan signup page dagi memberPassword ni hash qilib olayabmiz  
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      //biz postman orqali jonatgan req.body dagi "burak" va "damir2020" signup malumotlarimizni 
      // memberModel schemamiz yordamida dtabase ga yozib natijani resultga tenglaydi
      /*
      const tempResult = new this.memberModel(input);
      const result = await tempResult.save();

      bu ikki qator pastdagi create(input) statik metodini ishlatish bilan bir xildir
      create() metodi statik bolgani sababli memberModel class idan alohida object yaratish shart emas
      */
      const result = await this.memberModel.create(input);


      // buning vazifasi Member type da database dan qaytayotgan malumotlar orasidagi memberPasswordni "" ga tenglab yuboradi, 
      // natijada bizga password bo'sh string holatda yetib keladi
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

/** ======================================================================================= **/

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        // chapdagi memberNick bu databasega yozilgan malumot, o'ng tarafdagi input.memberNick esa admin RESTAURANT login qilish uchun login page da kiritayotagn memberNick
        { memberNick: input.memberNick }, // filter
        // chapdagi memberPassword bu databasega yozilgan malumot, o'ng tarafdagi input.memberPassword esa admin RESTAURANT login qilish uchun login page da kiritayotagn memberPassword
        { memberNick: 1, memberPassword: 1 }, // (Projection) memberPassword emas member.memberPassword bo'lsa ham togri boladimi? //  <=== maxfiy ma'lumotni majburiy chaqirish usuli.
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    // biz bu qismda user kiritayotgan input.memberPassword bilan database dagi member.memberPassword ni solishtiramiz
    const isMatch = await bcrypt.compare( // bcrypt.compare bu hashing ni tekshiradi
      input.memberPassword,
      member.memberPassword, // agar member.memberPassword emas memberPassword o'zi bolsa togri boladimi?
    );
    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

    return await this.memberModel.findById(member._id).exec(); // umumiy olingan malumotlarni olib processLogin dagi resultga tenglaymiz
  }

/** ======================================================================================= **/

  public async getUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

/** ======================================================================================= **/

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}


export default MemberService;