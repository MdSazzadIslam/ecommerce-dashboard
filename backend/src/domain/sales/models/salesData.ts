import mongoose, { Document, Schema } from 'mongoose';
import { SalesData as SalesDataType } from '../../../shared';

// Define the TypeScript interface for SalesData documents
interface SalesDataDocument extends SalesDataType, Document {
    _id: mongoose.Types.ObjectId;
}

// Create the SalesData schema with validation and indexing
const salesDataSchema = new Schema<SalesDataDocument>({
    product: { type: String, required: true },
    salesRevenue: { type: Number, required: true },
    region: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    cost: { type: Number, required: true },
    profit: { type: Number, required: true },
    ageGroup: { type: String, required: true },
    gender: { type: String, required: true },
    occupation: { type: String, required: true }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create indexes to optimize query performance
salesDataSchema.index({ date: 1 });
salesDataSchema.index({ region: 1 });
salesDataSchema.index({ category: 1 });
salesDataSchema.index({ salesRevenue: -1, product: 1 });
salesDataSchema.index({ product: 1, category: 1 });
salesDataSchema.index({ ageGroup: 1 });
salesDataSchema.index({ gender: 1 });
salesDataSchema.index({ occupation: 1 });
salesDataSchema.index({ date: 1, salesRevenue: 1, cost: 1, profit: 1 });


// Export the SalesData model
export const SalesData = mongoose.model<SalesDataDocument>('SalesData', salesDataSchema);
