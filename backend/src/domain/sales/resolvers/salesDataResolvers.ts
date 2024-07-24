import { salesDataQueries, salesDataMutations } from '../resolvers';

export const salesDataResolvers = {
    Query: salesDataQueries,
    Mutation: salesDataMutations
};
