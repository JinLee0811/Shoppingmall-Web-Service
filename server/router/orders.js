import { Router } from 'express';
import asyncHandler from '../util/async-handler';
import OrdersService from '../services/orders';

import verifyToken from '../middleware/verify-token';

const router = Router();

//전체주문목록
router.get(
  '/',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { userId, role } = req.decoded;
    const orders = await OrdersService.getOrdersList({ userId, role });
    return res.status(200).json(orders);
  }),
);

//orderId로 특정주문이력조회
router.get(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role, userId } = req.decoded;
    const orders = await OrdersService.getOrderByOrderId({ id, role, userId });
    return res.status(200).json(orders);
  }),
);

//주문 수정
router.put(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { userId, role } = req.decoded;
    const { id } = req.params;
    const { items, address, status } = req.body;
    const updatedOrder = await OrdersService.updateOrderById({
      id,
      userId,
      items,
      address,
      status,
      role,
    });
    return res.status(201).json(updatedOrder);
  }),
);

//특정 주문 삭제(관리자 및 회원)
router.delete(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { userId, role } = req.decoded;
    const { id } = req.params;
    const deleteOrder = await OrdersService.deleteOrderById({
      id,
      userId,
      role,
    });
    return res.status(200).json(deleteOrder);
  }),
);

//개인 주문 생성
router.post(
  '/',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { userId, role } = req.decoded;
    const { items, address } = req.body;
    const createdOrder = await OrdersService.addOrderById({
      userId,
      items,
      address,
    });
    return res.status(201).json(createdOrder);
  }),
);

export default router;
