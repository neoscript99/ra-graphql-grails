import { put } from 'redux-saga/effects';
import { crudGetList } from 'react-admin';

export default function* initDictList() {
  //初始化部门列表，作为字典表使用
  yield put(crudGetList('Department', {}, {}, {}));
}