import mongoose from 'mongoose';

/**
 * Utility function to validate MongoDB ObjectId.
 * @param id - The id to validate.
 * @returns {boolean} - Returns true if the id is valid, otherwise false.
 */
export const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);
