// rootSaga.test.ts
import { expectSaga } from 'redux-saga-test-plan';
import { rootSaga } from '../../redux/sagas';
import watchFetchSalesData from '../../redux/sagas/salesSaga';

describe('rootSaga', () => {
    it('should fork all sagas', () => {
        return expectSaga(rootSaga)
            .fork(watchFetchSalesData) // Expect that watchFetchSalesData saga is forked
            .run(); // Run the saga and verify that expectations are met
    });
});
