import mongoose from 'mongoose';
import { GENRES } from '../utils/constants';

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
    preferences: {
        type: {
            favoriteGenres: { type: [String], enum: GENRES, default: [] },
            dislikedGenres: { type: [String], enum: GENRES, default: [] },
        }
    },
    watchHistory: {
        type: [
            {
                contentId: { type: String, required: true },
                watchedOn: { type: Date, default: Date.now },
                rating: { type: Number },
            }
        ]
    }
});

export default mongoose.model('User', UserSchema);
