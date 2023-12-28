import mongoose from 'mongoose';
import categorySchema from '../schemas/categories.schema';

const Categories = new mongoose.Model('Categories', categorySchema);

export default Categories;
