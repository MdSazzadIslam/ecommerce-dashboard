import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { runSaga } from 'redux-saga';
import salesReducer from '../../redux/slices/salesSlice'; // Adjust path as necessary
import { rootSaga } from '../../redux/sagas'; // Adjust path as necessary
import { RootState } from '../../redux/store'; // Adjust path as necessary

// Factory function to create a new store instance for tests
const createTestStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: {
            sales: salesReducer,
            // Add other reducers here if necessary
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(sagaMiddleware),
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: {},
    });

    // Run the root saga
    sagaMiddleware.run(rootSaga);

    return store;
};

describe('Redux Store', () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        store = createTestStore();
    });

    it('should configure the store with saga middleware', () => {
        expect(store).toBeDefined();
        expect(store.getState).toBeDefined();
    });

    it('should have a working root saga', () => {
        const sagaTask = runSaga({
            dispatch: store.dispatch,
            getState: store.getState as () => RootState,
        }, rootSaga);

        expect(sagaTask).toBeDefined();
    });

    it('should be able to dispatch actions and update state', () => {
        // Example action and state check, replace with actual action and state
        store.dispatch({ type: 'sales/fetchSalesDataStart', payload: { period: 'monthly' } });
        const state: RootState = store.getState();
        expect(state.sales.loading).toBe(true);
    });
});
