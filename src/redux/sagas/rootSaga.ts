import { all, fork } from 'redux-saga/effects';
import watchFetchSalesData from './salesSaga';

/**
 * Root saga that forks all other sagas.
 */
export default function* rootSaga() {
    yield all([fork(watchFetchSalesData)]);
}