import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

// biz har bitta methodda qayta qayta member.modelts dagi MemberService class dan 
// qayta qayta object yokida instance olmasdan bitta qilib global qilib instance olsak yetadi
const memberService = new MemberService();

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
    // send |  json | render | redirect  |  end |
  } catch (err) {
    console.log("Error, goHome:", err);
    res.redirect("/admin");
  }
};

/** ========================================================= */

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin");
  }
};

/** ========================================================== */

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
    res.redirect("/admin");
  }
};
/** ========================================================== */

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processSignup");
    const file = req.file;  // biz multer orqali upload qilingan faylni req.file orqali olamiz
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    // postmandan kiritgan req.body dagi malumotlaarrni newMemberga tenglab olaybmiz
    const newMember: MemberInput = req.body;
    
    // bu qismda biz olingan fayl manzilini schema modeldagi memberImage ga tenglayabmiz
    newMember.memberImage = file?.path; 

    // Biz admin signup qilishi uchun uni togridan togri RESTAURANT ga tenglab ketayabmiz. chunki bitta admin boladi
    newMember.memberType = MemberType.RESTAURANT;

    // va bu malumotlarnimember.service.model da MemberService class idagi processSignup metodiga argument sifatida berayabmiz 
    const result = await memberService.processSignup(newMember);

    // bu qator requestni ichida session, sessionni  ichida esa member borligini va unga session ichidagi member ga resultni tenglaganimizni bildiradi
    req.session.member = result;  // session collection ga borib result data ni saqlaydi
    // cookie ichiga sid joylaydi
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`,
    );
  }
};

/** ========================================================== */

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processlogin");
    console.log("body:", req.body);

    // postman orqali kiritgan "burak" va "damir2020" malumotlarimizni LoginInput tipidagi input o'zgaruvchiga tenglab olamiz 
    const input: LoginInput = req.body;

    // memberService.processLogin(input); bu qismda req.bodydan kirib kelgan malumotlarni processLogin() ga argument qilib beramiz
    const result = await memberService.processLogin(input);
    
    // bu req dagi session ichidagi member ga member.model.ts dan qaytgan malumotni tenglay
    req.session.member = result;

    // o'sha tenglangan ma'lumotni database ga yozadi
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error, processlogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`,
    );
  }
};

/** =========================================================== */

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, logout", err);
    res.redirect("/admin");
  }
};

/** ==================================================== */



restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result:", result);

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.redirect("/admin/login");
  }
};

/** ********************************************** */

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/** ********************************************** */



restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)  // bu kirib kelayotgan request ning session qismidan member ni qidiramiz
      res.send(             // req.session.member.memberNick agar memberda Nick bo'lsa o'sha nik bilan xabarni keltirib chiqaradi
        `<script> alert(" ${req.session.member.memberNick}") </script>`,
      );
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
}


/** =============================================================== */

restaurantController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      ` <script> alert("${message}"); window.location.replace('/admin/login');</script>`,
    );
  }
};

export default restaurantController;