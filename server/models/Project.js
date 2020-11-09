import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  removable: {
    type: Boolean,
    required: true,
    default: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('project', projectSchema);
