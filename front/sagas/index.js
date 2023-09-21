import { all, fork } from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3065";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}

// redux-toolkit: https://github.com/ZeroCho/react-nodebird/tree/master/toolkit
// thunk를 쓰다보면 takeLatest, throttle같은 effect들을 직접 구현해야함.
