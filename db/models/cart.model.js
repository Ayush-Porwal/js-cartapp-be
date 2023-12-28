import mongoose from 'mongoose';
import cartSchema from '../schemas/carts.schema.js';

const Carts = mongoose.model('Carts', cartSchema);

export default Carts;
