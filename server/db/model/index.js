import Users from '../schemas/user-schema';
import Categorys from '../schemas/category-schema';
import Products from '../schemas/product-schema';
import Orders from '../schemas/order-schema';

import mongoose from 'mongoose';

const User = mongoose.model('User', Users);
const Category = mongoose.model('Category', Categorys);
const Product = mongoose.model('Product', Products);
const Order = mongoose.model('Order', Orders);

export { User, Category, Product, Order };
