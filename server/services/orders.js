const { Order } = require('../db/model');

export default class OrdersService {
  //전체주문목록
  static async getOrdersList({ userId, role }) {
    if (role === 'ADMIN') {
      return await Order.find({});
    } else if (role === 'USER') {
      const orders = await Order.find({ userId });
      if (!orders) {
        throw new Error('주문이력이 없습니다.');
      }
      return orders;
    }
  }

  //orderId로 특정주문이력조회
  static async getOrderByOrderId({ id, userId, role }) {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('주문이력이 없습니다.');
    } else if (role === 'ADMIN' || order.userId == userId) {
      return order;
    } else {
      throw new Error('권한이 없습니다');
    }
  }

  //주문 수정
  static async updateOrderById({ id, userId, items, address, status, role }) {
    if (role === 'ADMIN') {
      const updateOrder = await Order.findByIdAndUpdate(
        id,
        {
          ...(items && { items }),
          ...(address && { address }),
          ...(status && { status }),
        },
        { new: true },
      );
      return updateOrder;
    }
    let order = await Order.findById(id);
    if (order.userId == userId) {
      const updateOrder = await Order.findByIdAndUpdate(
        id,
        {
          items,
          address,
          status,
        },
        { new: true },
      );
      return updateOrder;
    } else {
      throw new Error('권한이 없습니다 나가세요');
    }
  }

  //주문삭제
  static async deleteOrderById({ id, role, userId }) {
    if (role === 'ADMIN') {
      const order = await Order.findByIdAndDelete(id);
      return order;
    }
    let order = await Order.findById(id);
    if (!order) {
      throw new Error('없는 주문 입니다');
    }
    if (order.userId == userId) {
      order = await Order.findByIdAndDelete(id);
      return order;
    } else {
      throw new Error('오류 or 로그인페이지로 보내기');
    }
  }

  //주문등록
  static async addOrderById({ userId, items, address }) {
    const addOrder = await Order.create({
      userId,
      items,
      address,
      status: '상품 준비 중',
    });
    return addOrder;
  }
}
