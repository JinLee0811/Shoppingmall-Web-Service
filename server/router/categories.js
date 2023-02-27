import { Router } from 'express';
import asyncHandler from '../util/async-handler';
import CategoriesService from '../services/categories';
import verifyToken from '../middleware/verify-token';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { categoryId } = req.query;
    const categories = await CategoriesService.getAllCategories(categoryId);
    return res.status(200).json(categories);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await CategoriesService.getCategoryById(id);
    return res.status(200).json(category);
  }),
);

router.post(
  '/',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { title } = req.body;
    const { role } = req.decoded;
    const createdCategory = await CategoriesService.addCategory({
      title,
      role,
    });
    return res.status(201).json(createdCategory);
  }),
);

router.put(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const { role } = req.decoded;
    const updatedCategory = await CategoriesService.updateCategoryById({
      id,
      title,
      role,
    });
    return res.status(201).json(updatedCategory);
  }),
);

router.delete(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.decoded;
    const deletedCategory = await CategoriesService.deleteCategoryById(
      id,
      role,
    );
    return res.status(200).json(deletedCategory);
  }),
);

//id별 상품조회
router.get(
  '/prod/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await CategoriesService.getAllProduct(id);
    return res.status(200).json(products);
  }),
);

export default router;
