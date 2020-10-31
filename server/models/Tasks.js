import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: String,
  isDone: Boolean,
  userId: '',
});

export default mongoose.model('tasks', taskSchema);
