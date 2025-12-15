
import mongoose from 'mongoose';
import { GENRES } from '../utils/constants';

const TVShowSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    genres: { type: [String], enum: GENRES },
    episodes: {
        type: [
            {
                episodeNumber: { type: Number },
                seasonNumber: { type: Number },
                releaseDate: { type: Date },
                director: { type: String },
                actors: { type: [String] },
            }
        ]
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('TVShow', TVShowSchema);
