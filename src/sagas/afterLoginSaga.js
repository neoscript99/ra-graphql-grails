import { put, takeEvery } from 'redux-saga/effects';
import { crudGetList, USER_LOGIN_SUCCESS } from 'react-admin';

function* initDictList() {
  //初始化部门列表，作为字典表使用
  yield put(crudGetList('Department', {}, {}, {}));
}

export default function* afterLoginSaga() {
  yield takeEvery(USER_LOGIN_SUCCESS, initDictList);
}
