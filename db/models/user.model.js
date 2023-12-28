import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema.js';

const Users = mongoose.model('Users', userSchema);

export default Users;
