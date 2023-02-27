const { Category } = require('../db/model');
const { Product } = require('../db/model');
import mongoose from 'mongoose';

export default class CategoriesService {
  //전체카테고리목록
  static async getAllCategories(categoryId) {
    if (!categoryId) {
      return await Category.find({});
    } else {
      const products = await Product.find({ categoryId });
      if (!products) {
        throw new Error('카테고리에 해당하는 제품가 없습니다.');
      }
      return products;
    }
  }

  //id로 카테고리 가져오기
  static async getCategoryById(id) {
    const readCategory = await Category.findById(id);
    if (!readCategory) {
      throw new Error('해당 카테고리는 없습니다.');
    }
    return readCategory;
  }

  //새로운 카테고리 등록
  static async addCategory({ title, role }) {
    // 추가 작업 : 이미 등록된 카테고리 여부 체크
    if (role === 'ADMIN') {
      const createCategory = await Category.create({ title });
      return createCategory;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  //id로 카테고리 수정하기
  static async updateCategoryById({ id, title, role }) {
    if (role === 'ADMIN') {
      const updateCategory = await Category.findByIdAndUpdate(
        id,
        { title },
        {
          new: true,
        },
      );
      if (updateCategory) {
        throw new Error('해당 카테고리는 없습니다.');
      }
      return updateCategory;
    } else {
      throw new Error('권한이 없습니다');
    }
  }

  //id로 카테고리 삭제하기
  static async deleteCategoryById(id, role) {
    if (role === 'ADMIN') {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        throw new Error('해당 카테고리는 없습니다.');
      }
      return deletedCategory;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  //id로 상품 가져오기
  static async getAllProduct(id) {
    const ObjectId = mongoose.Types.ObjectId;
    const obj_id = new ObjectId(id);
    const category = await Category.findById(obj_id);
    return category;
    const products = await Product.find({ categoryId: category._id });
    if (!products) {
      throw new Error('카테고리에 해당하는 제품가 없습니다.');
    }
    return products;
  }
}
