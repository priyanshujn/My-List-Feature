
import mongoose from 'mongoose';

const MyListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
  contentType: { type: String, enum: ['MOVIE', 'TV_SHOW'], required: true },
  createdAt: { type: Date, default: Date.now }
});

// unique index to prevent duplicate entries for a user
MyListSchema.index({ userId: 1, contentId: 1 }, { unique: true });  // ensures unique items for every user

// index to sort the list by creation date
MyListSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('MyList', MyListSchema);
