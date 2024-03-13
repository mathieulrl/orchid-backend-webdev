import config from '../config.js';
import mongoose from 'mongoose';

export function connect () {
    return mongoose.connect(config.MONGODB_URI)
}