const { Product, Category } = require('../db/model');

export default class ProductsService {
  static async getAllProduct(title) {
    if (title) {
      const category = await Category.find({ title });
      const products = await Product.find({ categoryId: category.id });
      if (!products) {
        throw new Error('존재하지 않는 제품입니다');
      }
      return products;
    } else {
      const allProducts = await Product.find();
      return allProducts;
    }
  }

  static async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('존재하지 않는 제품입니다');
    }
    return product;
  }

  static async addProduct({
    title,
    categoryId,
    shortDescription,
    detailDescription,
    imageKey,
    inventory,
    price,
    role,
  }) {
    if (
      !title ||
      !categoryId ||
      !shortDescription ||
      !detailDescription ||
      !imageKey ||
      !inventory ||
      !price
    ) {
      throw new Error('필수 항목이 모두 채워지지 않았습니다.');
    }
    if (role === 'ADMIN') {
      const createdProduct = await Product.create({
        title,
        categoryId,
        shortDescription,
        detailDescription,
        imageKey,
        inventory,
        price,
      });
      return createdProduct;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async updateProductById({
    id,
    title,
    categoryId,
    shortDescription,
    detailDescription,
    imageKey,
    inventory,
    price,
    role,
  }) {
    if (role === 'ADMIN') {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          ...(title && { title }),
          ...(categoryId && { categoryId }),
          ...(shortDescription && { shortDescription }),
          ...(detailDescription && { detailDescription }),
          ...(imageKey && { imageKey }),
          ...(inventory && { inventory }),
          ...(price && { price }),
        },
        {
          new: true,
        },
      );
      if (!updatedProduct) {
        throw new Error('존재하지 않는 제품 입니다');
      }
      return updatedProduct;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async deleteProductById(id, role) {
    if (role === 'ADMIN') {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error('존재하지 않는 제품 입니다');
      }
      return deletedProduct;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }
}
