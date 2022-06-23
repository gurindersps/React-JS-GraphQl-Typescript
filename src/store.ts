import { combineReducers, configureStore } from "@reduxjs/toolkit"
import tokenReducer from "./redux/token"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import thunk from "redux-thunk"

const reducers = combineReducers({
    token: tokenReducer,
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
})
export default store
