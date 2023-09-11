import {
  all,
  fork,
  delay,
  //   take,
  //   takeEvery,
  takeLatest,
  //   throttle,
  call,
  put,
  //   delay,
  //   debounce,
  //   throttle,
  //   takeMaybe,
  //   takeEvery,
  //   takeLeading
} from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    // ! const result = yield logInAPI(action.data); call effect 안 붙여도 되지 않나? => 이렇게 안쓰는 이유
    yield put({
      type: "LOG_IN_SUCCESS",
      // data: result.data,
      data: action.data,
    });
    // ! put({  type: "LOG_IN_SUCCESS", data: result.data}); effect 앞에 yield 붙이는 이유 => saga는 test할때 편하다.
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/logout", data);
}
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);

    yield put({
      type: "ADD_POST_SUCCESS",
      //   data: result.data,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  //   while (true) {
  //     yield take("LOG_IN_REQUEST", logIn);
  //   }
  yield takeLatest("LOG_IN_REQUEST", logIn);
  //   yield throttle("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  //   while (true) {
  //     yield take("LOG_OUT_REQUEST", logOut);
  //   }
  yield takeLatest("LOG_OUT_REQUEST", logOut);
  //   yield throttle("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  //   while (true) {
  //     yield take("ADD_POST_REQUEST", addPost);
  //   }
  yield takeLatest("ADD_POST_REQUEST", addPost);
  //   yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}

// redux-toolkit: https://github.com/ZeroCho/react-nodebird/tree/master/toolkit
// thunk를 쓰다보면 takeLatest, throttle같은 effect들을 직접 구현해야함.
