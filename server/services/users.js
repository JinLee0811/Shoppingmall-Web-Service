const { User } = require('../db/model');
import bcrypt, { hash } from 'bcrypt';
const saltRounds = 10;

import signToken from '../util/sign-token';

export default class usersService {
  static async getAllUsers(role) {
    if (role === 'ADMIN') {
      const users = await User.find().select('_id email address fullName role');
      return users;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async getUserMe(userId) {
    const user = await User.findById(userId).select(
      '_id email address fullName role',
    );
    return user;
  }

  static async getUserById({ id, userId, role }) {
    if (id === userId || role === 'ADMIN') {
      const user = await User.findById(id).select(
        '_id email address fullName role',
      );
      if (!user) {
        throw new Error('없는 사용자 입니다');
      }
      return user;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async updateUserById({ id, userId, role, address, fullName }) {
    if (id === userId || role === 'ADMIN') {
      let user = await User.findByIdAndUpdate(
        id,
        { address, fullName },
        { new: true },
      );
      if (!user) {
        throw new Error('없는 사용자 입니다');
      }
      user = await User.findById(id).select('id role email fullName address');
      return user;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async deleteUserById(id, role) {
    if (role === 'ADMIN') {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('없는 사용자 입니다');
      }
      return user;
    } else {
      throw new Error('권한이 없습니다.');
    }
  }

  static async changePasswordById({ id, password, newPassword, userId, role }) {
    if (role === 'ADMIN') {
      let user = await User.findByIdAndUpdate(
        id,
        { password: await bcrypt.hash(newPassword, saltRounds) },
        { new: true },
      );
      if (!user) {
        throw new Error('없는 유저');
      }
      user = await User.findById(id).select('id role email address fullName  ');
      return user;
    } else if (id === userId) {
      let user = await User.findById(id);
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('비번틀림');
      } else {
        await User.findByIdAndUpdate(
          id,
          { password: await hash(newPassword, saltRounds) },
          { new: true },
        );
        user = await User.findById(id).select(
          '_id email address fullName role',
        );
        return user;
      }
    } else {
      throw new Error('권한이 없습니다');
    }
  }
}
