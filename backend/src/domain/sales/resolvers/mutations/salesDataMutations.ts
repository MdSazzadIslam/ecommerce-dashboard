import { SalesData } from '../../models';
import { SalesData as SalesDataType, isValidObjectId, salesDataSchema } from '../../../../shared';

export const salesDataMutations = {
    createSalesData: async (_: any, { input }: { input: SalesDataType }) => {
        try {
            const { error } = salesDataSchema.validate(input);
            if (error) {
                return {
                    success: false,
                    message: `Validation error: ${error.message}`,
                    data: null
                };
            }

            const newSalesData = new SalesData(input);
            await newSalesData.save();
            return {
                success: true,
                message: 'Sales data created successfully.',
                data: newSalesData
            };
        } catch (error: unknown) {
            // Type guard to handle 'unknown' type errors
            if (error instanceof Error) {
                return {
                    success: false,
                    message: `Error creating sales data: ${error.message}`,
                    data: null
                };
            }
            return {
                success: false,
                message: 'An unknown error occurred.',
                data: null
            };
        }
    },
    deleteSalesData: async (_: any, { id }: { id: string }) => {
        try {
            // Validate the ObjectId
            if (!isValidObjectId(id)) {
                return {
                    success: false,
                    message: 'Invalid ID format.',
                    data: null
                };
            }

            const result = await SalesData.findByIdAndDelete(id);
            if (result) {
                return {
                    success: true,
                    message: 'Sales data deleted successfully.',
                    data: result
                };
            } else {
                return {
                    success: false,
                    message: 'Sales data not found.',
                    data: null
                };
            }
        } catch (error: unknown) {
            // Type guard to handle 'unknown' type errors
            if (error instanceof Error) {
                return {
                    success: false,
                    message: `Error deleting sales data: ${error.message}`,
                    data: null
                };
            }
            return {
                success: false,
                message: 'An unknown error occurred.',
                data: null
            };
        }
    }
}
