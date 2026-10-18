import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";

class ProductService {
  private readonly productModel;

  constructor() {
    
    // bu yerda productModel ga ProductModel(schema) ni tenglashtirib olyabmiz. Chunki biz product.service modelni 
    // chaqirib olyapmiz va shu model orqali database bilan ishlayapmiz
    this.productModel = ProductModel; 
  }

  /** SPA */

  /** SSR */

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  /** *************************************************** */

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  /** *************************************************** */

  public async updateChosenProduct(
    id: string,  // url da kiritilgan product id ni string qilib olamiz. Chunki url da faqat string tipidagi malumotlar keladi
    input: ProductUpdateInput,
  ): Promise<Product> {

    // string => ObjectId ga aylantirishimiz sababi esa biz product.controller da req.params.id ni string qilib olamiz va uni database da ObjectId tipida saqlaymiz. Biz uni database dan ObjectId orqali izlaymiz
    id = shapeIntoMongooseObjectId(id); // nega yana ObjectId ga aylantiryapmiz
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })

      /*
      { _id: id } bu qismda biz database da productni izlayapmiz. Chunki biz productni update qilmoqchimiz va update qilinadigan productni topishimiz kerak. Biz productni id orqali izlayapmiz. Chunki har bir productning unique id si bor va u database da ObjectId tipida saqlanadi. Biz esa url da kiritilgan id ni string qilib olamiz va uni ObjectId ga aylantirib database da izlaymiz
      input bu qismda biz update qilinadigan productni malumotlarini berayapmiz. 
      { new: true } bu qismda biz update qilinadigan productni malumotlarini qaytarayapmiz. Chunki findOneAndUpdate metodi default bo'yicha update qilinadigan productni malumotlarini qaytarmaydi. Biz esa update qilinadigan productni malumotlarini qaytarishimiz kerak. Shuning uchun { new: true } ni berayapmiz
      */ 

      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default ProductService;