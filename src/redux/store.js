import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";
import persistReducer from "./root-reducer";

const middleware = [logger, thunk];
const store = createStore(persistReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { store, persistor };
