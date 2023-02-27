import { Router } from 'express';
import { User } from '../db/model';
import asyncHandler from '../util/async-handler';
import usersService from '../services/users';
import verifyToken from '../middleware/verify-token';

const router = Router();

//전체 유저 목록
router.get(
  '/',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { role } = req.decoded;
    const users = await usersService.getAllUsers(role);
    return res.status(200).json(users);
  }),
);

router.get(
  '/me',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { userId } = req.decoded;
    const user = await usersService.getUserMe(userId);
    return res.status(200).json(user);
  }),
);

//특정 유저 정보
router.get(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.decoded;
    const user = await usersService.getUserById({ id, userId, role });
    return res.status(200).json(user);
  }),
);

//특정 유저 정보 수정
router.put(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { address, fullName } = req.body;
    const { userId, role } = req.decoded;
    const user = await usersService.updateUserById({
      id,
      userId,
      role,
      address,
      fullName,
    });
    return res.status(201).json(user);
  }),
);

//특정 유저 삭제
router.delete(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.decoded;
    const user = await usersService.deleteUserById(id, role);
    return res.status(200).json(user);
  }),
);

//특정 유저 비밀번호 변경
router.put(
  '/:id/password',
  verifyToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    const { userId, role } = req.decoded;
    const user = await usersService.changePasswordById({
      id,
      password,
      newPassword,
      userId,
      role,
    });
    return res.status(200).json(user);
  }),
);

export default router;
