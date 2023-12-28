import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    validate: {
      validator: {
        validator: function (value) {
          return value.length > 0;
        },
        message: 'Category name must be a non-empty string',
      },
    },
  },
  categoryChildren: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
});

export default categorySchema;
