import { Router } from 'express';
import { Product, Category } from '../db/model';
import asyncHandler from '../util/async-handler';
import ProductsService from '../services/products';
import { upload } from '../middleware/save-image';
import verifyToken from '../middleware/verify-token';

const router = Router();

router.get(
  '/img/:key',
  asyncHandler((req, res) => {
    const { key } = req.params;
    res.sendFile(process.cwd() + '/images/' + key);
  }),
);

//모든 물품 목록 가져오기)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category } = req.query;
    const products = await ProductsService.getAllProduct(category);
    return res.status(200).json(products);
  }),
);

//물품 상세정보 가져오기
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await ProductsService.getProductById(id);
    return res.status(200).json(product);
  }),
);

//새로운 물품 등록하기
router.post(
  '/',
  verifyToken,
  upload.single('imageKey'),
  asyncHandler(async (req, res) => {
    const {
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
    } = req.body;
    const { role } = req.decoded;
    const createdProduct = await ProductsService.addProduct({
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      role,
    });
    return res.status(201).json(createdProduct);
  }),
);

//id로 물품 정보 수정하기
router.put(
  '/:id',
  upload.single('imageKey'),
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
    } = req.body;
    const { role } = req.decoded;
    const updatedProduct = await ProductsService.updateProductById({
      id,
      title,
      categoryId,
      shortDescription,
      detailDescription,
      imageKey,
      inventory,
      price,
      role,
    });
    return res.status(201).json(updatedProduct);
  }),
);

//id로 물품 정보 삭제하기
router.delete(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.decoded;
    const deletedProuct = await ProductsService.deleteProductById(id, role);
    return res.status(200).json(deletedProuct);
  }),
);

export default router;
